"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";

const BASE_REM = 6.25; // sticky offset under the header
const PEEK_REM = 0.85; // how much each card peeks below the previous
const MAX_SHRINK = 0.16; // how much a fully-covered card shrinks

/**
 * Mobile "Shop by vibe" deck: cards are sticky and stack as you scroll.
 * A card scales down once the next one starts covering it, so the layers
 * underneath look progressively smaller than the card on top — a tiered,
 * multi-layer effect. Driven by a rAF-throttled scroll handler.
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
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.setProperty("--s", "1");
          return;
        }
        const stickyTop = (BASE_REM + i * PEEK_REM) * rem;
        const cardHeight = card.offsetHeight;
        const nextTop = next.getBoundingClientRect().top;
        // 0 when the next card is just below; 1 when it fully covers this one.
        const coverStart = stickyTop + cardHeight;
        const coverEnd = stickyTop + PEEK_REM * rem;
        const denom = Math.max(1, coverStart - coverEnd);
        const progress = Math.min(1, Math.max(0, (coverStart - nextTop) / denom));
        const scale = (1 - progress * MAX_SHRINK).toFixed(4);
        card.style.setProperty("--s", scale);
      });
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
