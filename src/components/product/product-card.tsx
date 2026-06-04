"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/rating-stars";

const badgeVariant: Record<string, "default" | "secondary" | "accent"> = {
  Bestseller: "default",
  New: "accent",
  Sale: "secondary",
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.compareAtPrice);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    const variant = product.variants[0];
    if (!variant) return;
    addItem(product, variant);
    toast.success(`${product.title} added to your bag 🎀`);
  }

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn(
        "group bg-card relative flex flex-col overflow-hidden rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="bg-muted relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} variant={badgeVariant[b] ?? "default"}>
              {b}
            </Badge>
          ))}
          {discount > 0 && <Badge variant="secondary">-{discount}%</Badge>}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <span className="bg-background rounded-full border px-3 py-1 text-xs font-bold">
              Sold out
            </span>
          </div>
        )}

        {/* quick add */}
        {product.inStock && (
          <button
            onClick={quickAdd}
            aria-label={`Add ${product.title} to bag`}
            className="bg-primary text-primary-foreground absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full opacity-0 shadow-md transition-all hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus className="size-5" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <h3 className="line-clamp-1 font-semibold leading-tight">
          {product.title}
        </h3>
        <p className="text-muted-foreground line-clamp-1 text-xs">
          {product.subtitle}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="font-display text-lg font-bold">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-muted-foreground text-sm line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
