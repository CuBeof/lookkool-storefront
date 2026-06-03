/**
 * Domain types for the lookkool storefront.
 *
 * These are intentionally close to MedusaJS's Store API shapes so that the
 * data layer in `lib/medusa` can map a real Medusa response onto them with
 * minimal friction once a backend is connected. Prices are stored as integer
 * amounts in the smallest currency unit (USD cents).
 */

export type CategoryHandle = "jewelry" | "toys" | "decor" | "desk";

export interface Category {
  handle: CategoryHandle;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  /** soft pastel gradient classes used on category cards */
  gradient: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  /** price in USD cents */
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  category: CategoryHandle;
  /** price in USD cents */
  price: number;
  /** original price in USD cents, when on sale */
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  badges: string[];
  tags: string[];
  variants: ProductVariant[];
  inStock: boolean;
}

export interface CartLine {
  productId: string;
  handle: string;
  title: string;
  variantId: string;
  variantTitle: string;
  image: string;
  /** unit price in USD cents */
  price: number;
  quantity: number;
}

export interface ReviewMedia {
  type: "image" | "video";
  url: string;
}

export interface Review {
  id: string;
  productId: string;
  productHandle: string;
  orderId?: string;
  author: string;
  rating: number; // 1–5
  title: string;
  body: string;
  media: ReviewMedia[];
  createdAt: string;
  verified: boolean;
}

export interface ProductQuery {
  category?: CategoryHandle;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  limit?: number;
}
