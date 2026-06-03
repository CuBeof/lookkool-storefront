import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* playful blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/20 absolute -top-20 -left-16 size-72 rounded-full blur-3xl" />
        <div className="bg-accent/40 absolute top-10 right-0 size-72 rounded-full blur-3xl" />
        <div className="bg-secondary/40 absolute -bottom-24 left-1/3 size-72 rounded-full blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div className="space-y-6">
          <span className="bg-card inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold shadow-sm">
            <Sparkles className="size-4 text-primary" />
            New drops every week
          </span>
          <h1 className="font-display text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Cute little finds that make you{" "}
            <span className="text-primary">look cool</span>.
          </h1>
          <p className="text-muted-foreground max-w-md text-lg">
            Hand-picked jewelry, plushies, decor, and desk buddies — tiny,
            adorable, and shipped fast across the U.S. 💌
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop the cute stuff <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories/toys">Browse plushies 🧸</Link>
            </Button>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-4 text-primary" /> Free shipping over $35
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" /> 4.8/5
              from 12k+ happy humans
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {[
              "https://picsum.photos/seed/lookkool-hero-1/600/700",
              "https://picsum.photos/seed/lookkool-hero-2/600/500",
              "https://picsum.photos/seed/lookkool-hero-3/600/500",
              "https://picsum.photos/seed/lookkool-hero-4/600/700",
            ].map((src, i) => (
              <div
                key={src}
                className={`bg-muted relative overflow-hidden rounded-3xl border shadow-sm ${
                  i % 3 === 0 ? "aspect-[5/6]" : "aspect-[5/4]"
                } ${i === 1 ? "mt-8" : ""}`}
              >
                <Image
                  src={src}
                  alt="Cute lookkool product"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="bg-card absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-2xl border px-4 py-3 shadow-lg sm:flex">
            <span className="text-2xl">🎁</span>
            <div className="text-xs leading-tight">
              <p className="font-bold">10% off</p>
              <p className="text-muted-foreground">your first order</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
