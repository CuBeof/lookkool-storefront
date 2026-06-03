import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProducts } from "@/lib/medusa";
import type { CategoryHandle, ProductQuery } from "@/lib/types";
import { categories, getCategory } from "@/lib/data/categories";
import { ProductGrid } from "@/components/product/product-grid";
import { SortToolbar } from "@/components/product/sort-toolbar";
import { CategoryPills } from "@/components/product/category-pills";

const SORTS = ["featured", "newest", "price-asc", "price-desc", "rating"];

export function generateStaticParams() {
  return categories.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const cat = getCategory(handle);
  if (!cat) return { title: "Category" };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { handle } = await params;
  const { sort: sortParam } = await searchParams;
  const cat = getCategory(handle);
  if (!cat) notFound();

  const sort = (SORTS.includes(sortParam ?? "")
    ? sortParam
    : "featured") as ProductQuery["sort"];

  const products = await getProducts({
    category: handle as CategoryHandle,
    sort,
  });

  return (
    <div>
      {/* category hero */}
      <div className={`bg-gradient-to-br ${cat.gradient}`}>
        <div className="container-page py-10 text-neutral-800 lg:py-14">
          <p className="text-sm font-bold uppercase tracking-wide opacity-70">
            {cat.tagline}
          </p>
          <h1 className="font-display text-4xl font-bold lg:text-5xl">
            {cat.emoji} {cat.name}
          </h1>
          <p className="mt-2 max-w-xl">{cat.description}</p>
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        <div className="mb-6">
          <CategoryPills active={handle} basePath="/products" />
        </div>
        <div className="mb-6">
          <SortToolbar count={products.length} current={sort ?? "featured"} />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
