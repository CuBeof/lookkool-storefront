import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFeaturedProducts, getProducts } from "@/lib/medusa";
import { Hero } from "@/components/home/hero";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ValueProps } from "@/components/home/value-props";
import { ProductGrid } from "@/components/product/product-grid";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-semibold sm:text-[28px]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
        )}
      </div>
      <Link
        href="/products"
        className="hidden items-center gap-1 text-sm font-medium underline-offset-4 hover:underline sm:flex"
      >
        Shop all <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

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
      <section className="container-page py-10 lg:py-12">
        <Reveal>
          <SectionHeader
            title="Bestsellers"
            subtitle="The cute things everyone's grabbing right now."
          />
          <ProductGrid products={featured} />
        </Reveal>
      </section>

      {/* Promo card */}
      <section className="container-page py-4">
        <Reveal>
          <div className="bg-card flex flex-col items-center gap-4 rounded-3xl border p-8 text-center sm:p-12">
            <span className="bg-mint text-on-mint rounded-sm px-2.5 py-1 text-[13px] font-medium">
              Bundle &amp; save
            </span>
            <h2 className="font-display max-w-lg text-2xl font-semibold sm:text-3xl">
              Mix any 3 minis, get 15% off
            </h2>
            <p className="text-muted-foreground max-w-md text-sm">
              The discount applies automatically at checkout. The more cute, the
              more cool.
            </p>
            <Button asChild>
              <Link href="/products">
                Start a bundle <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* New arrivals */}
      <section className="container-page py-10 lg:py-12">
        <Reveal>
          <SectionHeader
            title="Fresh drops"
            subtitle="Just landed and ready to be adored."
          />
          <ProductGrid products={newArrivals} />
        </Reveal>
      </section>

      {/* Newsletter */}
      <section className="container-page pb-16">
        <Reveal>
          <div className="bg-card rounded-3xl border p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Join the cute club
            </h2>
            <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
              Get 10% off your first order, plus first dibs on new drops and
              members-only deals.
            </p>
            <div className="mx-auto mt-6 max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
