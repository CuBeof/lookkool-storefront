"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, isOpen, setOpen, subtotal, count, updateQuantity, removeItem } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            Your bag ({count})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-secondary text-4xl">
              🧸
            </div>
            <div>
              <p className="font-display text-lg font-semibold">
                Your bag is empty
              </p>
              <p className="text-muted-foreground text-sm">
                Let&apos;s find something cute!
              </p>
            </div>
            <Button onClick={() => setOpen(false)} asChild>
              <Link href="/products">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* free shipping — always, on every order */}
            <div className="px-6 py-3">
              <p className="bg-secondary/60 text-secondary-foreground rounded-2xl px-4 py-2.5 text-center text-sm font-semibold">
                🎉 Free shipping included on every order!
              </p>
            </div>
            <Separator />

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {items.map((line) => (
                <div key={line.variantId} className="flex gap-3">
                  <Link
                    href={`/products/${line.handle}`}
                    onClick={() => setOpen(false)}
                    className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-2xl"
                  >
                    {line.image && (
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.handle}`}
                        onClick={() => setOpen(false)}
                        className="text-sm font-semibold leading-tight hover:text-primary"
                      >
                        {line.title}
                      </Link>
                      <button
                        onClick={() => removeItem(line.variantId)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {line.variantTitle}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity - 1)
                          }
                          className="hover:bg-accent grid size-7 place-items-center rounded-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity + 1)
                          }
                          className="hover:bg-accent grid size-7 place-items-center rounded-full"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t">
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Subtotal</span>
                <span className="font-display text-xl font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                Free shipping included · taxes calculated at checkout.
              </p>
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  Checkout
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/cart">View full bag</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
