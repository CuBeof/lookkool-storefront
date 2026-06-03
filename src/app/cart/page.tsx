"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, subtotal, count, updateQuantity, removeItem } = useCart();

  // Free shipping on every order, regardless of quantity or price.
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="grid size-24 place-items-center rounded-full bg-secondary text-5xl">
          🛍️
        </div>
        <h1 className="font-display text-2xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground max-w-sm">
          Looks like you haven&apos;t added any cute things yet. Let&apos;s fix
          that!
        </p>
        <Button size="lg" asChild>
          <Link href="/products">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="font-display mb-8 text-3xl font-bold lg:text-4xl">
        Your bag ({count})
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* line items */}
        <div className="space-y-4">
          {items.map((line) => (
            <div
              key={line.variantId}
              className="bg-card flex gap-4 rounded-3xl border p-4"
            >
              <Link
                href={`/products/${line.handle}`}
                className="bg-muted relative size-28 shrink-0 overflow-hidden rounded-2xl"
              >
                {line.image && (
                  <Image
                    src={line.image}
                    alt={line.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${line.handle}`}
                      className="font-semibold hover:text-primary"
                    >
                      {line.title}
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {line.variantTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(line.variantId)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1 rounded-full border p-1">
                    <button
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity - 1)
                      }
                      className="hover:bg-accent grid size-8 place-items-center rounded-full"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity + 1)
                      }
                      className="hover:bg-accent grid size-8 place-items-center rounded-full"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="bg-card space-y-4 rounded-3xl border p-6">
            <h2 className="font-display text-xl font-bold">Order summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Free 🎉" : formatPrice(shipping)}
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-display text-xl font-bold">
                {formatPrice(total)}
              </span>
            </div>
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">
                <ShoppingBag className="size-5" /> Checkout
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
