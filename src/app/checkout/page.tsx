"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShoppingBag } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { useAuth, type Order } from "@/lib/auth-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, freeShippingThreshold, clear } = useCart();
  const { user, login, addOrder } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);
  const [email, setEmail] = React.useState(user?.email ?? "");

  const shipping =
    subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 499;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + tax;

  if (items.length === 0 && !submitting) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <span className="text-5xl">🛍️</span>
        <h1 className="font-display text-2xl font-bold">
          Nothing to check out
        </h1>
        <p className="text-muted-foreground">Your bag is empty.</p>
        <Button asChild>
          <Link href="/products">Go shopping</Link>
        </Button>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    if (email && !user) login(email);

    const order: Order = {
      id: `LK-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      email,
      items,
      subtotal,
      shipping,
      total,
      status: "processing",
    };
    addOrder(order);
    clear();
    router.push(`/checkout/success?order=${order.id}`);
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="font-display mb-8 text-3xl font-bold lg:text-4xl">
        Checkout
      </h1>

      <form
        onSubmit={placeOrder}
        className="grid gap-8 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-8">
          {/* contact */}
          <section className="bg-card space-y-4 rounded-3xl border p-6">
            <h2 className="font-display text-xl font-bold">Contact</h2>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>
          </section>

          {/* shipping */}
          <section className="bg-card space-y-4 rounded-3xl border p-6">
            <h2 className="font-display text-xl font-bold">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" required placeholder="Mochi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" required placeholder="Bun" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" required placeholder="123 Cute Street" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="city">City</Label>
                <Input id="city" required placeholder="Austin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" required placeholder="TX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" required placeholder="78701" />
              </div>
            </div>
          </section>

          {/* payment (demo) */}
          <section className="bg-card space-y-4 rounded-3xl border p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Payment</h2>
              <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                <Lock className="size-3.5" /> Secure &amp; encrypted
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Card number</Label>
              <Input id="card" required placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="exp">Expiry</Label>
                <Input id="exp" required placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" required placeholder="123" />
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              This is a demo checkout — no real payment is processed. Connect
              Medusa + Stripe to take live orders.
            </p>
          </section>
        </div>

        {/* order summary */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="bg-card space-y-4 rounded-3xl border p-6">
            <h2 className="font-display text-xl font-bold">Your order</h2>
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {items.map((line) => (
                <div key={line.variantId} className="flex gap-3">
                  <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-xl">
                    {line.image && (
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                    <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full text-[11px] font-bold">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 text-sm">
                    <span className="line-clamp-2 font-medium">
                      {line.title}
                    </span>
                    <span className="font-semibold whitespace-nowrap">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free 🎉" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (est.)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-display text-xl font-bold">
                {formatPrice(total)}
              </span>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              <ShoppingBag className="size-5" />
              {submitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              By placing your order you agree to our terms. Cute guaranteed. 🎀
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
