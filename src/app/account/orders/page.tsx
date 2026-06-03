"use client";

import Image from "next/image";
import Link from "next/link";

import { Star } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { useReviews } from "@/lib/reviews-context";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReviewDialog } from "@/components/product/review-dialog";

const STATUS_STYLES: Record<string, string> = {
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-sky-100 text-sky-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

export default function OrdersPage() {
  const { user, orders } = useAuth();
  const { hasReviewed } = useReviews();

  if (!user) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <span className="text-5xl">🔐</span>
        <h1 className="font-display text-2xl font-bold">Please log in</h1>
        <p className="text-muted-foreground">
          Log in to view your order history.
        </p>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="font-display mb-8 text-3xl font-bold lg:text-4xl">
        My orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-4 rounded-3xl border p-12 text-center">
          <span className="text-5xl">📦</span>
          <p className="font-display text-lg font-semibold">No orders yet</p>
          <p className="text-muted-foreground max-w-sm">
            When you place an order, it&apos;ll appear here so you can track it.
          </p>
          <Button asChild>
            <Link href="/products">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <div key={o.id} className="bg-card rounded-3xl border p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{o.id}</p>
                  <p className="text-muted-foreground text-sm">
                    Placed {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold capitalize",
                    STATUS_STYLES[o.status]
                  )}
                >
                  {o.status}
                </span>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                {o.items.map((line) => {
                  const reviewed = hasReviewed(line.productId, o.id);
                  return (
                    <div key={line.variantId} className="flex items-start gap-3">
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
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${line.handle}`}
                              className="font-semibold hover:text-primary"
                            >
                              {line.title}
                            </Link>
                            <p className="text-muted-foreground">
                              {line.variantTitle} · Qty {line.quantity}
                            </p>
                          </div>
                          <span className="font-semibold whitespace-nowrap">
                            {formatPrice(line.price * line.quantity)}
                          </span>
                        </div>

                        <div className="mt-2">
                          {reviewed ? (
                            <span className="text-primary inline-flex items-center gap-1 text-xs font-semibold">
                              <Star className="size-3.5 fill-primary" /> Review
                              submitted — thank you!
                            </span>
                          ) : (
                            <ReviewDialog
                              productId={line.productId}
                              productHandle={line.handle}
                              productTitle={line.title}
                              orderId={o.id}
                              trigger={
                                <Button size="sm" variant="outline">
                                  <Star className="size-3.5" /> Write a review
                                </Button>
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Total ({o.items.length} item
                  {o.items.length > 1 ? "s" : ""})
                </span>
                <span className="font-display text-lg font-bold">
                  {formatPrice(o.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
