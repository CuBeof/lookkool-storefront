"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { badgeVariant } from "@/lib/badge-variant";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.compareAtPrice);
  const status = product.badges.find((b) => b !== "Bestseller");
  const isBestseller = product.badges.includes("Bestseller");

  function quickAdd() {
    const variant = product.variants[0];
    if (!variant) return;
    addItem(product, variant);
    toast.success(`${product.title} added to your bag`);
  }

  return (
    <div
      className={cn(
        "group bg-card flex flex-col overflow-hidden rounded-2xl border transition-transform duration-200 ease-bounce hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="bg-sunken relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />

          {/* status badge top-left */}
          {(status || discount > 0) && (
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {discount > 0 ? (
                <Badge variant="sale">-{discount}%</Badge>
              ) : (
                status && (
                  <Badge variant={badgeVariant[status] ?? "new"}>
                    {status}
                  </Badge>
                )
              )}
            </div>
          )}

          {/* trust badge top-right */}
          {isBestseller && (
            <div className="absolute top-2.5 right-2.5">
              <Badge variant="bestseller">Bestseller</Badge>
            </div>
          )}

          {!product.inStock && (
            <div className="bg-cream/70 absolute inset-0 grid place-items-center">
              <span className="bg-card text-foreground rounded-sm px-3 py-1 text-[13px] font-semibold">
                Sold out
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/products/${product.handle}`} className="block">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm font-medium leading-snug">
              {product.title}
            </h3>
            <span className="text-muted-foreground flex shrink-0 items-center gap-0.5 pt-0.5 text-[13px]">
              <Star className="size-3 fill-foreground text-foreground" />
              {product.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-1 text-[13px]">
            {product.subtitle}
          </p>
          <div className="mt-1.5 flex items-center gap-2 tabular-nums">
            <span className="text-coral-text text-[17px] font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-strike text-[13px] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </Link>

        <Button
          size="sm"
          className="mt-2.5 w-full"
          disabled={!product.inStock}
          onClick={quickAdd}
        >
          <ShoppingBag className="size-4" />
          {product.inStock ? "Add to cart" : "Sold out"}
        </Button>
      </div>
    </div>
  );
}
