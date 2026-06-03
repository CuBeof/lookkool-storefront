"use client";

import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductTabs({ product }: { product: Product }) {
  const category = getCategory(product.category);

  const specs: { label: string; value: string }[] = [
    { label: "SKU", value: product.id.replace(/^prod_/, "LK-").toUpperCase() },
    { label: "Category", value: category?.name ?? product.category },
    {
      label: "Options",
      value:
        product.variants.length > 1
          ? product.variants.map((v) => v.title).join(", ")
          : product.variants[0]?.title ?? "One size",
    },
    { label: "Highlights", value: product.subtitle },
    { label: "Tags", value: product.tags.join(", ") },
    {
      label: "Availability",
      value: product.inStock ? "In stock" : "Out of stock",
    },
    { label: "Ships from", value: "United States warehouse" },
  ];

  return (
    <Tabs defaultValue="details" className="mt-12">
      <TabsList>
        <TabsTrigger value="details">Product details</TabsTrigger>
        <TabsTrigger value="shipping">Shipping &amp; returns</TabsTrigger>
        <TabsTrigger value="specs">Specification</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="bg-card text-muted-foreground rounded-3xl border p-6 leading-relaxed">
          <p>{product.description}</p>
          {product.tags.length > 0 && (
            <p className="mt-3">
              <span className="text-foreground font-semibold">Perfect for:</span>{" "}
              {product.tags.join(", ")}.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="shipping">
        <div className="bg-card text-muted-foreground space-y-3 rounded-3xl border p-6 leading-relaxed">
          <p>
            <span className="text-foreground font-semibold">
              Free shipping, always.
            </span>{" "}
            Every order ships free across the U.S. — no minimums, no matter the
            quantity or price.
          </p>
          <p>
            Orders are packed within 1–2 business days and arrive in about 3–7
            business days with tracked delivery. You&apos;ll get a tracking link
            by email as soon as it ships.
          </p>
          <p>
            <span className="text-foreground font-semibold">
              Easy 30-day returns.
            </span>{" "}
            Not in love? Return any item within 30 days for a full refund. Items
            should be unused and in their original packaging.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="specs">
        <div className="bg-card overflow-hidden rounded-3xl border">
          <dl className="divide-y">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-[200px_1fr]"
              >
                <dt className="text-sm font-semibold">{s.label}</dt>
                <dd className="text-muted-foreground text-sm capitalize">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </TabsContent>
    </Tabs>
  );
}
