"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";

const BASE_REM = 6.25; // sticky offset under the header
const PEEK_REM = 1.0; // how much each card peeks below the previous
const STEP = 0.05; // scale lost per layer stacked on top
const MIN_SCALE = 0.78;

/**
 * Mobile "Shop by vibe" deck: cards are sticky and stack as you scroll.
 * Each card shrinks by `STEP` for every layer stacked on top of it, so the
 * deeper a card sits the smaller it stays — a persistent tiered, multi-layer
 * pyramid even once fully stacked. Driven by a rAF-throttled scroll handler.
 */
export function CategoryStack() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-vibe-card]")
    );
    const rem =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let raf = 0;

    const update = () => {
      raf = 0;
      const n = cards.length;

      // progress[i] = how covered card i is by the next card (0..1)
      const progress = new Array<number>(n).fill(0);
      for (let i = 0; i < n - 1; i++) {
        const stickyTop = (BASE_REM + i * PEEK_REM) * rem;
        const cardHeight = cards[i].offsetHeight;
        const nextTop = cards[i + 1].getBoundingClientRect().top;
        const coverStart = stickyTop + cardHeight;
        const coverEnd = stickyTop + PEEK_REM * rem;
        const denom = Math.max(1, coverStart - coverEnd);
        progress[i] = Math.min(1, Math.max(0, (coverStart - nextTop) / denom));
      }

      // depth_i = number of layers currently on top of card i (cumulative).
      // Scale shrinks with depth so lower layers stay smaller than upper ones.
      let depth = 0;
      for (let i = n - 1; i >= 0; i--) {
        depth += progress[i];
        const scale = Math.max(MIN_SCALE, 1 - depth * STEP);
        cards[i].style.setProperty("--s", scale.toFixed(4));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="sm:hidden">
      {categories.map((c, i) => (
        <Link
          key={c.handle}
          href={`/categories/${c.handle}`}
          className="sticky block pb-4"
          style={{ top: `calc(${BASE_REM}rem + ${i * PEEK_REM}rem)` }}
        >
          <div
            data-vibe-card
            className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border shadow-xl will-change-transform"
            style={{
              transform: "scale(var(--s, 1))",
              transformOrigin: "top center",
            }}
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <span className="bg-background/85 absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur">
              {c.emoji} {c.tagline}
            </span>
            <div className="relative p-5 text-white">
              <h3 className="font-display text-2xl font-bold">{c.name}</h3>
              <p className="mt-0.5 text-sm text-white/85">{c.description}</p>
              <span className="bg-background text-foreground mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
                Shop now
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
