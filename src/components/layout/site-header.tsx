"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, Sparkles, User } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SearchBar({
  className,
  autoFocus,
  onSubmitted,
}: {
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = React.useState("");

  return (
    <form
      className={cn("relative w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) {
          router.push(`/search?q=${encodeURIComponent(q.trim())}`);
          onSubmitted?.();
        }
      }}
    >
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search cute things…"
        className="pl-10"
        aria-label="Search products"
        autoFocus={autoFocus}
      />
    </form>
  );
}

function MobileSearch() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
          <Search className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="gap-0 rounded-b-3xl">
        <SheetHeader className="pb-3">
          <SheetTitle className="flex items-center gap-2">
            <Search className="size-5 text-primary" /> Search
          </SheetTitle>
          <SheetDescription className="sr-only">
            Search lookkool products
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-6">
          <SearchBar autoFocus onSubmitted={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [hideAnnounce, setHideAnnounce] = React.useState(false);

  // Collapse the announcement bar once scrolled down, reveal it near the top.
  // Uses a Schmitt trigger (two thresholds) so the band between them absorbs
  // jitter — and the layout shift from collapsing the bar — without flicker.
  React.useEffect(() => {
    const SHOW_BELOW = 32; // y <= this → show
    const HIDE_ABOVE = 140; // y >= this → hide (band must exceed the bar height)
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setHideAnnounce((prev) => {
        if (y <= SHOW_BELOW) return false;
        if (y >= HIDE_ABOVE) return true;
        return prev; // inside the band → keep current state (hysteresis)
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      {/* announcement bar — collapses on scroll down */}
      <div
        className={cn(
          "bg-primary text-primary-foreground overflow-hidden px-4 text-center text-xs font-semibold transition-all duration-300",
          hideAnnounce ? "max-h-0 py-0 opacity-0" : "max-h-10 py-1.5 opacity-100"
        )}
      >
        <Sparkles className="mr-1 inline size-3" />
        Free U.S. shipping on every order · Cute guaranteed
      </div>

      <div className="container-page flex h-16 items-center gap-4">
        {/* mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {categories.map((c) => (
                <SheetClose asChild key={c.handle}>
                  <Link
                    href={`/categories/${c.handle}`}
                    className="hover:bg-accent flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-semibold"
                  >
                    <span className="text-xl">{c.emoji}</span>
                    {c.name}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href="/products"
                  className="hover:bg-accent flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-semibold"
                >
                  <span className="text-xl">🛍️</span> Shop all
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        <Logo />

        {/* desktop nav */}
        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.handle}
              href={`/categories/${c.handle}`}
              className="hover:bg-accent rounded-full px-3 py-2 text-sm font-semibold transition-colors"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/products"
            className="hover:bg-accent rounded-full px-3 py-2 text-sm font-semibold transition-colors"
          >
            Shop all
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <SearchBar className="hidden max-w-xs md:block" />
          <MobileSearch />

          {/* account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuLabel>Hi, {user.name} 👋</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">My orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Welcome to lookkool</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">Log in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login?mode=register">Create account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            asChild
          >
            <Link href="/cart" aria-label="View cart">
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full text-[11px] font-bold">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
