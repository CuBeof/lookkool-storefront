import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, RefreshCw, Shield, Truck } from "lucide-react";

import {
  getProductByHandle,
  getRelatedProducts,
  getProducts,
} from "@/lib/medusa";
import { formatPrice, discountPercent } from "@/lib/format";
import { getCategory } from "@/lib/data/categories";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/product/rating-stars";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductTabs } from "@/components/product/product-tabs";
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

  const [related, category] = await Promise.all([
    getRelatedProducts(product),
    Promise.resolve(getCategory(product.category)),
  ]);
  const discount = discountPercent(product.price, product.compareAtPrice);

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

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
              {discount > 0 && (
                <Badge variant="secondary">Save {discount}%</Badge>
              )}
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

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

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
        </div>
      </div>

      {/* full-width detail tabs */}
      <ProductTabs product={product} />

      <ProductReviews product={product} />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-2xl font-bold">
            You might also love 💕
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
