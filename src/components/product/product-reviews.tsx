"use client";

import * as React from "react";
import Link from "next/link";
import { BadgeCheck, ChevronLeft, ChevronRight, Play } from "lucide-react";

import type { Product } from "@/lib/types";
import { useReviews } from "@/lib/reviews-context";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/product/rating-stars";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";

const PAGE_SIZE = 4;

export function ProductReviews({ product }: { product: Product }) {
  const { getForProduct } = useReviews();
  const reviews = getForProduct(product.id);

  const [filter, setFilter] = React.useState<number | "all">("all");
  const [page, setPage] = React.useState(1);
  const [lightbox, setLightbox] = React.useState<{
    items: LightboxItem[];
    index: number;
    open: boolean;
  }>({ items: [], index: 0, open: false });

  // average + breakdown from all reviews for this product
  const total = reviews.length;
  const average =
    total > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / total
      : product.rating;

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  const filtered =
    filter === "all"
      ? reviews
      : reviews.filter((r) => Math.round(r.rating) === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function changeFilter(value: number | "all") {
    setFilter(value);
    setPage(1);
  }

  function openLightbox(items: LightboxItem[], index: number) {
    setLightbox({ items, index, open: true });
  }

  return (
    <section className="mt-16 scroll-mt-24" id="reviews">
      <h2 className="font-display mb-6 text-2xl font-bold">
        Reviews &amp; ratings ⭐
      </h2>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* summary + filters */}
        <div className="bg-card h-fit space-y-4 rounded-3xl border p-6">
          <div className="text-center">
            <div className="font-display text-5xl font-bold">
              {average.toFixed(1)}
            </div>
            <RatingStars
              rating={average}
              showCount={false}
              className="mt-1 justify-center"
            />
            <p className="text-muted-foreground mt-1 text-sm">
              {total > 0
                ? `Based on ${total} verified review${total > 1 ? "s" : ""}`
                : "No reviews yet"}
            </p>
          </div>

          {total > 0 && (
            <div className="space-y-1.5">
              <button
                onClick={() => changeFilter("all")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-2 py-1 text-xs font-semibold transition-colors",
                  filter === "all" ? "bg-accent" : "hover:bg-accent/60"
                )}
              >
                <span>All ratings</span>
                <span className="text-muted-foreground">{total}</span>
              </button>
              {breakdown.map((b) => (
                <button
                  key={b.star}
                  onClick={() => b.count > 0 && changeFilter(b.star)}
                  disabled={b.count === 0}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-2 py-1 text-xs transition-colors disabled:opacity-40",
                    filter === b.star ? "bg-accent" : "hover:bg-accent/60"
                  )}
                >
                  <span className="text-muted-foreground w-6">{b.star}★</span>
                  <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-5 text-right">
                    {b.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          <p className="text-muted-foreground border-t pt-3 text-xs">
            Only verified buyers can leave a review. Purchased something?{" "}
            <Link href="/account/orders" className="text-primary font-semibold">
              Review it from your orders
            </Link>
            .
          </p>
        </div>

        {/* list */}
        <div className="space-y-5">
          {total === 0 ? (
            <div className="bg-card flex flex-col items-center gap-2 rounded-3xl border border-dashed p-10 text-center">
              <span className="text-4xl">📝</span>
              <p className="font-semibold">No reviews yet</p>
              <p className="text-muted-foreground text-sm">
                Be the first to share your thoughts after you buy!
              </p>
            </div>
          ) : (
            <>
              {filter !== "all" && (
                <p className="text-muted-foreground text-sm">
                  Showing {filtered.length} review
                  {filtered.length !== 1 ? "s" : ""} with {filter}★ ·{" "}
                  <button
                    onClick={() => changeFilter("all")}
                    className="text-primary font-semibold"
                  >
                    Clear filter
                  </button>
                </p>
              )}

              {pageItems.map((r) => {
                const mediaItems: LightboxItem[] = r.media.map((m) => ({
                  type: m.type,
                  url: m.url,
                }));
                return (
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

                    {mediaItems.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {mediaItems.map((m, i) => (
                          <button
                            key={i}
                            onClick={() => openLightbox(mediaItems, i)}
                            aria-label="Open media"
                            className="group bg-muted relative size-20 cursor-zoom-in overflow-hidden rounded-xl border sm:size-24"
                          >
                            {m.type === "image" ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={m.url}
                                alt={`Customer media ${i + 1}`}
                                className="size-full object-cover transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <video
                                  src={m.url}
                                  className="size-full object-cover"
                                />
                                <span className="absolute inset-0 grid place-items-center bg-black/30">
                                  <Play className="size-6 fill-white text-white" />
                                </span>
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}

              {/* pagination */}
              {pageCount > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="hover:bg-accent grid size-9 place-items-center rounded-full border disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        "size-9 rounded-full border text-sm font-semibold transition-colors",
                        currentPage === i + 1
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-accent"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    aria-label="Next page"
                    className="hover:bg-accent grid size-9 place-items-center rounded-full border disabled:opacity-40"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Lightbox
        open={lightbox.open}
        onOpenChange={(o) => setLightbox((s) => ({ ...s, open: o }))}
        items={lightbox.items}
        index={lightbox.index}
        onIndexChange={(i) => setLightbox((s) => ({ ...s, index: i }))}
        alt="Customer media"
      />
    </section>
  );
}
