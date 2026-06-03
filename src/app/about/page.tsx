import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, Leaf, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About us",
  description:
    "lookkool curates tiny, cute, hand-picked finds — jewelry, plushies, decor, and desk buddies — that make everyday life a little more adorable.",
};

const values = [
  {
    icon: Sparkles,
    title: "Curated for cute",
    desc: "We hand-pick every item for maximum adorableness and good quality.",
  },
  {
    icon: Heart,
    title: "Made for joy",
    desc: "Little things that spark a smile every time you see them.",
  },
  {
    icon: Truck,
    title: "Fast & fair",
    desc: "Quick U.S. shipping and a no-drama 30-day return promise.",
  },
  {
    icon: Leaf,
    title: "Thoughtful packaging",
    desc: "Your cuties arrive safe, snug, and ready to be loved.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* hero */}
      <section className="from-primary/15 via-accent/25 to-secondary/30 bg-gradient-to-br">
        <div className="container-page max-w-3xl py-14 text-center lg:py-20">
          <span className="text-5xl">🎀</span>
          <h1 className="font-display mt-3 text-4xl font-bold lg:text-5xl">
            Hi, we&apos;re lookkool
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
            We believe the smallest things bring the biggest smiles. lookkool
            curates tiny, cute, hand-picked finds that make your everyday a
            little more <span className="text-primary font-semibold">cool</span>.
          </p>
        </div>
      </section>

      {/* story */}
      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {[
            "https://picsum.photos/seed/lookkool-about-1/600/700",
            "https://picsum.photos/seed/lookkool-about-2/600/500",
            "https://picsum.photos/seed/lookkool-about-3/600/500",
            "https://picsum.photos/seed/lookkool-about-4/600/700",
          ].map((src, i) => (
            <div
              key={src}
              className={`bg-muted relative overflow-hidden rounded-3xl border ${
                i % 3 === 0 ? "aspect-[5/6]" : "aspect-[5/4]"
              } ${i === 1 ? "mt-8" : ""}`}
            >
              <Image
                src={src}
                alt="lookkool products"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-bold">Our little story</h2>
          <p className="text-muted-foreground leading-relaxed">
            lookkool started with a simple idea: cute things make people happy.
            What began as a tiny collection of charms and plushies grew into a
            playground of jewelry, toys, decor, and desk buddies — all chosen to
            be small, sweet, and full of personality.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today we ship adorable little finds to thousands of happy humans
            across the U.S. Every order is packed with care because we want that
            unboxing moment to feel like a hug. 💌
          </p>
          <Button asChild>
            <Link href="/products">Shop the cute stuff</Link>
          </Button>
        </div>
      </section>

      {/* values */}
      <section className="border-y bg-card">
        <div className="container-page py-12">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            What we&apos;re about
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <span className="bg-secondary text-secondary-foreground mx-auto grid size-12 place-items-center rounded-2xl">
                  <v.icon className="size-6" />
                </span>
                <h3 className="font-display mt-3 font-bold">{v.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="container-page grid gap-6 py-14 text-center sm:grid-cols-3">
        {[
          { n: "12k+", l: "happy customers" },
          { n: "4.8★", l: "average rating" },
          { n: "500+", l: "cute finds" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-primary text-4xl font-bold">
              {s.n}
            </div>
            <p className="text-muted-foreground mt-1">{s.l}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
