"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [variantId, setVariantId] = React.useState(
    product.variants.find((v) => v.inStock)?.id ?? product.variants[0]?.id
  );
  const [qty, setQty] = React.useState(1);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const canBuy = product.inStock && variant?.inStock;

  const hasRealVariants =
    product.variants.length > 1 || product.variants[0]?.title !== "One size";

  function add() {
    if (!variant || !canBuy) return;
    addItem(product, variant, qty);
    toast.success(`Added ${qty} × ${product.title} to your bag 🎀`);
  }

  function buyNow() {
    if (!variant || !canBuy) return;
    addItem(product, variant, qty);
    router.push("/checkout");
  }

  return (
    <div className="space-y-5">
      {hasRealVariants && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            Choose an option:{" "}
            <span className="text-muted-foreground font-normal">
              {variant?.title}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                disabled={!v.inStock}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  v.id === variantId
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="hover:bg-accent grid size-9 place-items-center rounded-full"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="hover:bg-accent grid size-9 place-items-center rounded-full"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1"
          disabled={!canBuy}
          onClick={add}
        >
          <ShoppingBag className="size-5" />
          {canBuy
            ? `Add to bag · ${formatPrice((variant?.price ?? product.price) * qty)}`
            : "Sold out"}
        </Button>
      </div>

      <Button
        size="lg"
        variant="secondary"
        className="w-full"
        disabled={!canBuy}
        onClick={buyNow}
      >
        <Zap className="size-5" />
        {canBuy ? "Buy now" : "Sold out"}
      </Button>
    </div>
  );
}
