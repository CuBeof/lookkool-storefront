import type { Metadata } from "next";
import { getProducts } from "@/lib/medusa";
import type { ProductQuery } from "@/lib/types";
import { ProductGrid } from "@/components/product/product-grid";
import { SortToolbar } from "@/components/product/sort-toolbar";

export const metadata: Metadata = {
  title: "Search",
};

const SORTS = ["featured", "newest", "price-asc", "price-desc", "rating"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort: sortParam } = await searchParams;
  const sort = (SORTS.includes(sortParam ?? "")
    ? sortParam
    : "featured") as ProductQuery["sort"];

  const products = q ? await getProducts({ search: q, sort }) : [];

  return (
    <div className="container-page py-8 lg:py-12">
      <header className="mb-6">
        <p className="text-muted-foreground text-sm">Search results for</p>
        <h1 className="font-display text-3xl font-bold lg:text-4xl">
          “{q}”
        </h1>
      </header>

      {q && (
        <div className="mb-6">
          <SortToolbar count={products.length} current={sort ?? "featured"} />
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
