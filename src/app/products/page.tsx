import type { Metadata } from "next";
import { getProducts } from "@/lib/medusa";
import type { CategoryHandle, ProductQuery } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { ProductGrid } from "@/components/product/product-grid";
import { SortToolbar } from "@/components/product/sort-toolbar";
import { CategoryPills } from "@/components/product/category-pills";

export const metadata: Metadata = {
  title: "Shop all cute finds",
  description:
    "Browse every adorable thing at lookkool — jewelry, plushies, decor, and desk buddies.",
};

const SORTS = ["featured", "newest", "price-asc", "price-desc", "rating"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category as CategoryHandle | undefined;
  const sort = (SORTS.includes(params.sort ?? "")
    ? params.sort
    : "featured") as ProductQuery["sort"];

  const products = await getProducts({ category, sort });
  const cat = category ? getCategory(category) : undefined;

  return (
    <div className="container-page py-8 lg:py-12">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold lg:text-4xl">
          {cat ? `${cat.emoji} ${cat.name}` : "Shop all cute finds"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {cat?.description ??
            "Every tiny, adorable thing we love, all in one place."}
        </p>
      </header>

      <div className="mb-6">
        <CategoryPills active={category} />
      </div>

      <div className="mb-6">
        <SortToolbar count={products.length} current={sort ?? "featured"} />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
