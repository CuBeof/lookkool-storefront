import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function CategoryShowcase() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold">Shop by vibe</h2>
          <p className="text-muted-foreground mt-1">Find your kind of cute.</p>
        </div>
        <Link
          href="/products"
          className="text-primary hidden items-center gap-1 text-sm font-semibold hover:underline sm:flex"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* mobile: sticky stacked cards (deck effect on scroll) */}
      <div className="sm:hidden">
        {categories.map((c, i) => (
          <Link
            key={c.handle}
            href={`/categories/${c.handle}`}
            className="sticky block pb-4"
            // each card pins a little lower than the previous, so the one
            // beneath peeks out at the top — the stacked-deck effect.
            style={{ top: `calc(6.25rem + ${i * 0.85}rem)` }}
          >
            <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border shadow-xl">
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

      {/* desktop: grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.handle}
            href={`/categories/${c.handle}`}
            className={cn(
              "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border bg-gradient-to-br p-5 transition-transform hover:-translate-y-1",
              c.gradient
            )}
          >
            <span className="absolute top-4 right-4 text-4xl transition-transform group-hover:scale-125 group-hover:rotate-12">
              {c.emoji}
            </span>
            <div className="text-neutral-800">
              <p className="text-xs font-bold uppercase tracking-wide opacity-70">
                {c.tagline}
              </p>
              <h3 className="font-display text-xl font-bold">{c.name}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold">
                Shop now{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
