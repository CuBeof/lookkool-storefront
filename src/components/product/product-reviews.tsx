"use client";

import * as React from "react";
import { BadgeCheck, PencilLine } from "lucide-react";

import type { Product } from "@/lib/types";
import { useReviews } from "@/lib/reviews-context";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/product/rating-stars";
import { ReviewDialog } from "@/components/product/review-dialog";

export function ProductReviews({ product }: { product: Product }) {
  const { getForProduct } = useReviews();
  const reviews = getForProduct(product.id);

  // Breakdown from the detailed reviews we can show.
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  return (
    <section className="mt-16 scroll-mt-24" id="reviews">
      <h2 className="font-display mb-6 text-2xl font-bold">
        Reviews &amp; ratings ⭐
      </h2>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* summary */}
        <div className="bg-card h-fit space-y-4 rounded-3xl border p-6">
          <div className="text-center">
            <div className="font-display text-5xl font-bold">
              {product.rating.toFixed(1)}
            </div>
            <RatingStars
              rating={product.rating}
              showCount={false}
              className="mt-1 justify-center"
            />
            <p className="text-muted-foreground mt-1 text-sm">
              Based on {product.reviews.toLocaleString()} reviews
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="space-y-1.5">
              {breakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-muted-foreground">{b.star}★</span>
                  <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-5 text-right text-muted-foreground">
                    {b.count}
                  </span>
                </div>
              ))}
            </div>
          )}

          <ReviewDialog
            productId={product.id}
            productHandle={product.handle}
            productTitle={product.title}
            trigger={
              <Button variant="outline" className="w-full">
                <PencilLine className="size-4" /> Write a review
              </Button>
            }
          />
        </div>

        {/* list */}
        <div className="space-y-5">
          {reviews.length === 0 ? (
            <div className="bg-card flex flex-col items-center gap-2 rounded-3xl border border-dashed p-10 text-center">
              <span className="text-4xl">📝</span>
              <p className="font-semibold">No written reviews yet</p>
              <p className="text-muted-foreground text-sm">
                Be the first to share photos and thoughts!
              </p>
            </div>
          ) : (
            reviews.map((r) => (
              <article
                key={r.id}
                className="bg-card space-y-3 rounded-3xl border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{r.author}</span>
                      {r.verified && (
                        <span className="text-primary inline-flex items-center gap-0.5 text-xs font-semibold">
                          <BadgeCheck className="size-3.5" /> Verified buyer
                        </span>
                      )}
                    </div>
                    <RatingStars
                      rating={r.rating}
                      showCount={false}
                      className="mt-1"
                    />
                  </div>
                  <time className="text-muted-foreground text-xs">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </time>
                </div>

                {r.title && <p className="font-semibold">{r.title}</p>}
                {r.body && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {r.body}
                  </p>
                )}

                {r.media.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {r.media.map((m, i) =>
                      m.type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={m.url}
                          alt={`Customer photo ${i + 1}`}
                          className="bg-muted size-20 rounded-xl border object-cover sm:size-24"
                        />
                      ) : (
                        <video
                          key={i}
                          src={m.url}
                          controls
                          className="bg-muted size-20 rounded-xl border object-cover sm:size-24"
                        />
                      )
                    )}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
