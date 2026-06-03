import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about shipping, returns, orders, and more at lookkool.",
};

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Shipping",
    items: [
      {
        q: "Where do you ship?",
        a: "We currently ship across the United States. Orders are dispatched from our U.S. warehouse with tracked delivery.",
      },
      {
        q: "How much is shipping?",
        a: "Shipping is always free on every order — no minimums, no matter the quantity or price. What you see is what you pay.",
      },
      {
        q: "How long will my order take?",
        a: "Orders are packed within 1–2 business days and typically arrive in 3–7 business days depending on your location.",
      },
    ],
  },
  {
    title: "Orders & returns",
    items: [
      {
        q: "Can I change or cancel my order?",
        a: "Reach out within 12 hours of ordering and we'll do our best to update it before it ships. After it ships, you can use our easy returns.",
      },
      {
        q: "What's your return policy?",
        a: "If you're not in love, return any item within 30 days of delivery for a full refund. Items should be unused and in their original packaging.",
      },
      {
        q: "How do I track my order?",
        a: "Once logged in, head to My orders to see the status of every order. We also email you a tracking link when your order ships.",
      },
    ],
  },
  {
    title: "Products & reviews",
    items: [
      {
        q: "Are the products good quality?",
        a: "Every item is hand-picked and quality-checked for maximum cuteness and durability. Browse customer reviews and photos on each product page.",
      },
      {
        q: "Can I leave a review with photos or a video?",
        a: "Yes! After your order arrives, go to My orders and tap Write a review on any item. You can attach photos and a short video to share the cuteness.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container-page max-w-3xl py-10 lg:py-16">
      <header className="mb-8 text-center">
        <span className="text-4xl">💬</span>
        <h1 className="font-display mt-2 text-4xl font-bold">
          Frequently asked questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Everything you need to know about shopping with lookkool.
        </p>
      </header>

      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="font-display mb-2 text-xl font-bold">{g.title}</h2>
            <Accordion
              type="single"
              collapsible
              className="bg-card rounded-3xl border px-5"
            >
              {g.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      <div className="bg-card mt-10 rounded-3xl border p-8 text-center">
        <h2 className="font-display text-xl font-bold">Still have questions?</h2>
        <p className="text-muted-foreground mt-1">
          Our friendly team is happy to help.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
