import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFeaturedProducts, getProducts } from "@/lib/medusa";
import { Hero } from "@/components/home/hero";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ValueProps } from "@/components/home/value-props";
import { ProductGrid } from "@/components/product/product-grid";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([
    getFeaturedProducts(8),
    getProducts({ sort: "newest", limit: 4 }),
  ]);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryShowcase />

      {/* Bestsellers */}
      <section className="container-page py-12 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Bestsellers 🔥
            </h2>
            <p className="text-muted-foreground mt-1">
              The cute things everyone&apos;s grabbing right now.
            </p>
          </div>
          <Link
            href="/products"
            className="text-primary hidden items-center gap-1 text-sm font-semibold hover:underline sm:flex"
          >
            Shop all <ArrowRight className="size-4" />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Promo banner */}
      <section className="container-page py-6">
        <div className="from-primary/15 via-accent/30 to-secondary/30 relative overflow-hidden rounded-3xl border bg-gradient-to-r p-8 text-center sm:p-14">
          <span className="text-5xl">🎀</span>
          <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
            Build-a-bundle &amp; save
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md">
            Mix any 3 minis and get 15% off automatically at checkout. The more
            cute, the more cool.
          </p>
          <Link
            href="/products"
            className="bg-primary text-primary-foreground mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            Start a bundle <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-page py-12 lg:py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold">Fresh drops ✨</h2>
          <p className="text-muted-foreground mt-1">
            Just landed and ready to be adored.
          </p>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      {/* Newsletter */}
      <section className="container-page pb-16">
        <div className="bg-card rounded-3xl border p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl font-bold">
            Join the cute club 💌
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md">
            Get 10% off your first order, plus first dibs on new drops and
            members-only deals.
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
