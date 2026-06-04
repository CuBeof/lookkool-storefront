import type { Review } from "@/lib/types";

/** Photo seed used as a "customer photo" in review galleries. */
function photo(seed: string): string {
  return `https://picsum.photos/seed/lk-rev-${seed}/500/500`;
}

/**
 * Seed reviews so product pages look lively out of the box. User-submitted
 * reviews (from the order history flow) are merged on top of these at runtime.
 */
export const seedReviews: Review[] = [
  {
    id: "rev-seed-1",
    productId: "prod_cloud_plush",
    productHandle: "fluffy-cloud-plush",
    author: "Mia R.",
    rating: 5,
    title: "Softest thing I own 🥺",
    body: "It's even cuter in person and SO soft. Sits on my bed and makes me happy every time I see it. Shipping was fast too!",
    media: [{ type: "image", url: photo("cloud-a") }, { type: "image", url: photo("cloud-b") }],
    createdAt: "2026-04-12T10:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-seed-2",
    productId: "prod_cloud_plush",
    productHandle: "fluffy-cloud-plush",
    author: "Jordan P.",
    rating: 4,
    title: "Adorable, a little smaller than expected",
    body: "Quality is great and the smile is so cute. Just note it's more of a desk-size plush than a giant one. Still love it!",
    media: [],
    createdAt: "2026-03-29T10:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-seed-3",
    productId: "prod_cat_holder",
    productHandle: "kitty-pen-holder",
    author: "Sam T.",
    rating: 5,
    title: "My desk is officially cute now",
    body: "Holds all my pens and the matte finish feels premium. Everyone at the office asked where I got it.",
    media: [{ type: "image", url: photo("kitty-a") }],
    createdAt: "2026-04-02T10:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-seed-4",
    productId: "prod_cloud_lamp",
    productHandle: "dreamy-cloud-night-lamp",
    author: "Avery L.",
    rating: 5,
    title: "Perfect night light",
    body: "The colors are so dreamy and it's not too bright. Great for winding down at night. Bought one for my sister too.",
    media: [{ type: "image", url: photo("lamp-a") }],
    createdAt: "2026-05-01T10:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-seed-5",
    productId: "prod_star_studs",
    productHandle: "twinkle-star-stud-earrings",
    author: "Priya K.",
    rating: 5,
    title: "Dainty and didn't irritate my ears",
    body: "I have super sensitive ears and these are totally fine. The sparkle is subtle and so pretty for everyday.",
    media: [],
    createdAt: "2026-04-20T10:00:00.000Z",
    verified: true,
  },
  {
    id: "rev-seed-6",
    productId: "prod_bunny_plush",
    productHandle: "snuggle-bunny-plush",
    author: "Chris M.",
    rating: 5,
    title: "The weight is so comforting",
    body: "Got this for my anxiety and the gentle weight really helps. Floppy ears are the cutest. 10/10 would snuggle again.",
    media: [{ type: "image", url: photo("bunny-a") }],
    createdAt: "2026-05-10T10:00:00.000Z",
    verified: true,
  },
];

export function getSeedReviews(productId: string): Review[] {
  return seedReviews.filter((r) => r.productId === productId);
}
