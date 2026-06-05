import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, RefreshCw, Shield, Truck } from "lucide-react";

import {
  getProductByHandle,
  getRelatedProducts,
  getFeaturedProducts,
  getProducts,
} from "@/lib/medusa";
import { formatPrice, discountPercent } from "@/lib/format";
import { getCategory } from "@/lib/data/categories";
import { Badge } from "@/components/ui/badge";
import { badgeVariant } from "@/lib/badge-variant";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/product/rating-stars";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductAccordions } from "@/components/product/product-accordions";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductReviews } from "@/components/product/product-reviews";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const [related, featured, category] = await Promise.all([
    getRelatedProducts(product),
    getFeaturedProducts(10),
    Promise.resolve(getCategory(product.category)),
  ]);
  const discount = discountPercent(product.price, product.compareAtPrice);

  // 3 same-category picks for the sticky sidebar
  const sidebarPicks = related.slice(0, 3);
  const excludeIds = new Set([product.id, ...sidebarPicks.map((p) => p.id)]);
  // a broader set for the full-width grid at the bottom (no overlap)
  const moreToLove = featured.filter((p) => !excludeIds.has(p.id)).slice(0, 4);

  return (
    <div className="container-page py-6 lg:py-10">
      {/* breadcrumb */}
      <nav className="text-muted-foreground mb-6 flex items-center gap-1 text-sm">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        {category && (
          <>
            <Link
              href={`/categories/${category.handle}`}
              className="hover:text-foreground"
            >
              {category.name}
            </Link>
            <ChevronRight className="size-3.5" />
          </>
        )}
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        {/* left: gallery (vertical list on desktop) */}
        <ProductGallery images={product.images} title={product.title} />

        {/* right: info + accordions, sticky until the gallery scrolls out */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <Badge key={b} variant={badgeVariant[b] ?? "bestseller"}>
                  {b}
                </Badge>
              ))}
              {discount > 0 && <Badge variant="sale">Save {discount}%</Badge>}
            </div>
            <h1 className="font-display text-3xl font-bold lg:text-4xl">
              {product.title}
            </h1>
            <p className="text-muted-foreground">{product.subtitle}</p>
            <RatingStars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground text-lg line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <AddToCart product={product} />

          <Separator />

          {/* trust badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Truck, label: "Free U.S.\nshipping always" },
              { icon: RefreshCw, label: "30-day\nreturns" },
              { icon: Shield, label: "Secure\ncheckout" },
            ].map((t) => (
              <div
                key={t.label}
                className="bg-card flex flex-col items-center gap-1 rounded-2xl border p-3"
              >
                <t.icon className="size-5 text-primary" />
                <span className="text-muted-foreground whitespace-pre-line text-xs font-medium">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          {/* Specification · FAQs · Shipping & Return */}
          <ProductAccordions product={product} />

          {/* You may also like — compact picks */}
          {sidebarPicks.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="font-display text-lg font-bold">
                You may also like 💕
              </h2>
              <div className="space-y-2.5">
                {sidebarPicks.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.handle}`}
                    className="group bg-card hover:border-primary/50 flex items-center gap-3 rounded-2xl border p-2.5 transition-colors"
                  >
                    <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="group-hover:text-primary line-clamp-1 text-sm font-semibold">
                        {p.title}
                      </p>
                      <p className="text-muted-foreground line-clamp-1 text-xs">
                        {p.subtitle}
                      </p>
                      <span className="font-display mt-0.5 block text-sm font-bold">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* full-width product description */}
      <section className="mt-12 lg:mt-16">
        <h2 className="font-display mb-4 text-2xl font-bold">
          Product description
        </h2>
        <div className="bg-card text-muted-foreground rounded-3xl border p-6 leading-relaxed sm:p-8">
          <p>{product.description}</p>
          {product.tags.length > 0 && (
            <p className="mt-3">
              <span className="text-foreground font-semibold">Perfect for:</span>{" "}
              {product.tags.join(", ")}.
            </p>
          )}
        </div>
      </section>

      <ProductReviews product={product} />

      {moreToLove.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-2xl font-bold">
            More cute finds you&apos;ll love ✨
          </h2>
          <ProductGrid products={moreToLove} />
        </section>
      )}
    </div>
  );
}
