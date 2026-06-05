import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div className="space-y-6">
          <span className="bg-card inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium">
            <Sparkles className="text-coral-text size-3.5" />
            New drops every week
          </span>
          <h1 className="font-display text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[56px]">
            Cute little finds that make you{" "}
            <span className="text-coral-text">look cool</span>.
          </h1>
          <p className="text-muted-foreground max-w-md text-[17px] leading-relaxed">
            Hand-picked jewelry, plushies, decor, and desk buddies. Tiny,
            adorable, and shipped fast across the U.S.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop the cute stuff <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories/toys">Browse plushies</Link>
            </Button>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[13px]">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-4" /> Always-free U.S. shipping
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-3.5 fill-foreground text-foreground" /> 4.8
              from 12k+ happy humans
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {[
              "https://picsum.photos/seed/lookkool-hero-1/600/700",
              "https://picsum.photos/seed/lookkool-hero-2/600/500",
              "https://picsum.photos/seed/lookkool-hero-3/600/500",
              "https://picsum.photos/seed/lookkool-hero-4/600/700",
            ].map((src, i) => (
              <div
                key={src}
                className={`bg-sunken group relative overflow-hidden rounded-2xl ${
                  i % 3 === 0 ? "aspect-[5/6]" : "aspect-[5/4]"
                } ${i === 1 ? "mt-8" : ""}`}
              >
                <Image
                  src={src}
                  alt="Cute lookkool product"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
          {/* emphasized sticker card */}
          <div className="bg-card border-foreground absolute -bottom-3 -left-3 hidden items-center gap-2 rounded-xl border-2 px-4 py-3 shadow-sticker-ink sm:flex">
            <span className="text-coral-text text-xl font-bold">%</span>
            <div className="text-xs leading-tight">
              <p className="font-semibold">10% off</p>
              <p className="text-muted-foreground">your first order</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
