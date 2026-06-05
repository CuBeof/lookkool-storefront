import type { ComponentProps } from "react";
import type { Badge } from "@/components/ui/badge";

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>["variant"]>;

/** Maps a product badge label to its fixed-meaning visual variant. */
export const badgeVariant: Record<string, BadgeVariant> = {
  Bestseller: "bestseller",
  New: "new",
  Sale: "sale",
  "Low stock": "lowstock",
  "Almost gone": "lowstock",
  Gift: "gift",
};
