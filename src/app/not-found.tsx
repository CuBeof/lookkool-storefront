import Link from "next/link";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";

import { getFeaturedProducts } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { InlineSearch } from "@/components/layout/inline-search";
import { CategoryPills } from "@/components/product/category-pills";
import { ProductGrid } from "@/components/product/product-grid";

export default async function NotFound() {
  const popular = await getFeaturedProducts(4);

  return (
    <div className="container-page py-14 lg:py-20">
      {/* hero */}
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <span className="font-display text-foreground/5 select-none text-[12rem] leading-none font-bold sm:text-[16rem]">
            404
          </span>
        </div>

        <span className="text-6xl">🧸</span>
        <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
          Oopsie! This page wandered off
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md">
          The page you&apos;re looking for is playing hide-and-seek. Let&apos;s
          get you back to the cute stuff!
        </p>

        <div className="mx-auto mt-6 max-w-md">
          <InlineSearch />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" /> Back home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <ShoppingBag className="size-4" /> Shop all
            </Link>
          </Button>
        </div>
      </div>

      {/* browse categories */}
      <div className="mt-12">
        <h2 className="text-muted-foreground mb-4 text-center text-sm font-semibold uppercase tracking-wide">
          Or browse by vibe
        </h2>
        <div className="flex justify-center">
          <CategoryPills />
        </div>
      </div>

      {/* popular products */}
      <div className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold">
            Popular right now 🔥
          </h2>
          <Link
            href="/products"
            className="text-primary hidden items-center gap-1 text-sm font-semibold hover:underline sm:flex"
          >
            Shop all <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductGrid products={popular} />
      </div>
    </div>
  );
}
