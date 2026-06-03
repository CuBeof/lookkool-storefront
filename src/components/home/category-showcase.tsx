import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import { CategoryStack } from "@/components/home/category-stack";

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

      {/* mobile: sticky stacked deck with tiered scaling */}
      <CategoryStack />

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
