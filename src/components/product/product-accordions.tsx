"use client";

import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductAccordions({ product }: { product: Product }) {
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

  const faqs: { q: string; a: string }[] = [
    {
      q: "Is this a good gift?",
      a: "Absolutely — it arrives in cute, giftable packaging and is one of our most-loved little treats.",
    },
    {
      q: "How do I care for it?",
      a: "Spot clean only and keep it away from water unless the description notes it's waterproof. Store somewhere cozy and dry.",
    },
    {
      q: "What if it doesn't fit my vibe?",
      a: "No worries! You have 30 days to return it for a full refund if it's not the cutie you hoped for.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="rounded-2xl border px-4">
      <AccordionItem value="spec">
        <AccordionTrigger>Specification</AccordionTrigger>
        <AccordionContent>
          <dl className="-mx-1 divide-y">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[120px_1fr] gap-2 px-1 py-2.5"
              >
                <dt className="text-sm font-semibold">{s.label}</dt>
                <dd className="text-muted-foreground text-sm capitalize">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faqs">
        <AccordionTrigger>FAQs</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-semibold">{f.q}</p>
                <p className="text-muted-foreground text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping &amp; Return</AccordionTrigger>
        <AccordionContent className="text-muted-foreground space-y-2 text-sm">
          <p>
            <span className="text-foreground font-semibold">
              Free shipping, always.
            </span>{" "}
            Every order ships free across the U.S. — no minimums, regardless of
            quantity or price.
          </p>
          <p>
            Orders are packed within 1–2 business days and arrive in about 3–7
            business days with tracked delivery.
          </p>
          <p>
            <span className="text-foreground font-semibold">
              30-day returns.
            </span>{" "}
            Not in love? Return any item within 30 days for a full refund — it
            just needs to be unused and in its original packaging.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
