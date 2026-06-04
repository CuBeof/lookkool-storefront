import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    handle: "jewelry",
    name: "Jewelry & Charms",
    tagline: "Tiny sparkle, big mood",
    description:
      "Dainty necklaces, beaded bracelets, and enamel charms that add a little shine to everyday looks.",
    emoji: "💍",
    gradient: "from-pink-100 to-rose-200",
    image: "https://picsum.photos/seed/lookkool-jewelry/800/800",
  },
  {
    handle: "toys",
    name: "Toys & Plushies",
    tagline: "Squishy, cuddly, kawaii",
    description:
      "Soft plushies, fidget toys, and collectible blind boxes made to be hugged and displayed.",
    emoji: "🧸",
    gradient: "from-amber-100 to-pink-200",
    image: "https://picsum.photos/seed/lookkool-toys/800/800",
  },
  {
    handle: "decor",
    name: "Home Decor",
    tagline: "Cozy up your space",
    description:
      "Pastel candles, fairy lights, and quirky little accents that make any room feel like a hug.",
    emoji: "🏡",
    gradient: "from-violet-100 to-sky-200",
    image: "https://picsum.photos/seed/lookkool-decor/800/800",
  },
  {
    handle: "desk",
    name: "Desk Buddies",
    tagline: "Small but mighty cute",
    description:
      "Mini desk companions, kawaii stationery, and tidy organizers to keep your workspace adorable.",
    emoji: "✨",
    gradient: "from-emerald-100 to-teal-200",
    image: "https://picsum.photos/seed/lookkool-desk/800/800",
  },
];

export function getCategory(handle: string): Category | undefined {
  return categories.find((c) => c.handle === handle);
}
