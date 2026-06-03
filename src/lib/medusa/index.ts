/**
 * Storefront data layer.
 *
 * Every function here returns our local domain types (see `lib/types`). They
 * currently resolve against the bundled mock catalog so the site is fully
 * browsable with no backend. Once `isMedusaConfigured()` is true the helpers
 * fetch from the Medusa v2 Store API and map the response onto the same types,
 * so the rest of the app never changes.
 *
 * To wire a real backend, fill in the `fetchFromMedusa*` branches (a thin
 * REST mapping is sketched in `mapMedusaProduct`) or swap them for calls to
 * `@medusajs/js-sdk`.
 */
import { products as mockProducts } from "@/lib/data/products";
import { categories as mockCategories } from "@/lib/data/categories";
import type { Category, Product, ProductQuery } from "@/lib/types";
import { isMedusaConfigured } from "./config";

const SORTS: Record<
  NonNullable<ProductQuery["sort"]>,
  (a: Product, b: Product) => number
> = {
  featured: (a, b) => b.reviews - a.reviews,
  newest: (a, b) => (b.badges.includes("New") ? 1 : 0) - (a.badges.includes("New") ? 1 : 0),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

function queryMock(query: ProductQuery = {}): Product[] {
  let list = [...mockProducts];

  if (query.category) {
    list = list.filter((p) => p.category === query.category);
  }

  if (query.search) {
    const q = query.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.includes(q)
    );
  }

  list.sort(SORTS[query.sort ?? "featured"]);

  if (query.limit) list = list.slice(0, query.limit);
  return list;
}

export async function getCategories(): Promise<Category[]> {
  // Categories are presentation-heavy (gradients, emoji) so we keep them local
  // even with a backend; map Medusa product categories here if you prefer.
  return mockCategories;
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  if (isMedusaConfigured()) {
    try {
      return await fetchFromMedusa(query);
    } catch (err) {
      console.error("[medusa] product fetch failed, using mock data:", err);
    }
  }
  return queryMock(query);
}

export async function getProductByHandle(
  handle: string
): Promise<Product | undefined> {
  if (isMedusaConfigured()) {
    try {
      const list = await fetchFromMedusa({});
      const hit = list.find((p) => p.handle === handle);
      if (hit) return hit;
    } catch (err) {
      console.error("[medusa] product fetch failed, using mock data:", err);
    }
  }
  return mockProducts.find((p) => p.handle === handle);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const all = await getProducts({ sort: "featured" });
  const bestsellers = all.filter((p) => p.badges.includes("Bestseller"));
  const rest = all.filter((p) => !p.badges.includes("Bestseller"));
  return [...bestsellers, ...rest].slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const sameCategory = await getProducts({ category: product.category });
  return sameCategory.filter((p) => p.id !== product.id).slice(0, limit);
}

/* ── Medusa Store API integration ─────────────────────────────────────────
 * Implemented defensively: any failure falls back to the mock catalog above.
 */
import {
  MEDUSA_BACKEND_URL,
  MEDUSA_PUBLISHABLE_KEY,
  MEDUSA_REGION_ID,
} from "./config";

interface MedusaProduct {
  id: string;
  handle: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  images?: { url: string }[];
  tags?: { value: string }[];
  categories?: { handle: string }[];
  variants?: {
    id: string;
    title: string;
    calculated_price?: { calculated_amount?: number };
    inventory_quantity?: number;
  }[];
}

function mapMedusaProduct(p: MedusaProduct): Product {
  const variants =
    p.variants?.map((v) => ({
      id: v.id,
      title: v.title,
      // Medusa v2 returns major-unit amounts; convert to cents.
      price: Math.round((v.calculated_price?.calculated_amount ?? 0) * 100),
      inStock: (v.inventory_quantity ?? 1) > 0,
    })) ?? [];

  const images = p.images?.length
    ? p.images.map((i) => i.url)
    : p.thumbnail
      ? [p.thumbnail]
      : [];

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    category: (p.categories?.[0]?.handle as Product["category"]) ?? "desk",
    price: variants[0]?.price ?? 0,
    images,
    rating: 4.7,
    reviews: 0,
    badges: [],
    tags: p.tags?.map((t) => t.value) ?? [],
    variants,
    inStock: variants.some((v) => v.inStock),
  };
}

async function fetchFromMedusa(query: ProductQuery): Promise<Product[]> {
  const params = new URLSearchParams({
    limit: String(query.limit ?? 100),
    fields:
      "*variants.calculated_price,*images,*tags,*categories",
  });
  if (query.search) params.set("q", query.search);
  if (MEDUSA_REGION_ID) params.set("region_id", MEDUSA_REGION_ID);

  const res = await fetch(`${MEDUSA_BACKEND_URL}/store/products?${params}`, {
    headers: { "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Medusa responded ${res.status}`);

  const data = (await res.json()) as { products: MedusaProduct[] };
  let list = data.products.map(mapMedusaProduct);
  if (query.category) list = list.filter((p) => p.category === query.category);
  if (query.sort) list.sort(SORTS[query.sort]);
  return list;
}
