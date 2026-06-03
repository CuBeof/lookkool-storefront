import Link from "next/link";
import { Camera, Heart, Music2, Sparkles } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs text-sm">
              Tiny, cute, hand-picked finds that make you look cool. Shipped
              with love across the U.S. 💌
            </p>
            <div className="flex gap-2">
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:bg-accent grid size-9 place-items-center rounded-full border"
              >
                <Camera className="size-4" />
              </Link>
              <Link
                href="#"
                aria-label="TikTok"
                className="hover:bg-accent grid size-9 place-items-center rounded-full border"
              >
                <Music2 className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold">Shop</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.handle}>
                  <Link
                    href={`/categories/${c.handle}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shop all
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold">Help</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/account/orders" className="hover:text-foreground">
                  Track my order
                </Link>
              </li>
              <li>Shipping &amp; returns</li>
              <li>FAQ</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold">
              <Sparkles className="mr-1 inline size-4 text-primary" />
              Join the cute club
            </h3>
            <p className="text-muted-foreground text-sm">
              Get 10% off your first order plus first dibs on new drops.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="text-muted-foreground mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} lookkool. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="size-3 fill-primary text-primary" /> for
            cute things
          </p>
        </div>
      </div>
    </footer>
  );
}
