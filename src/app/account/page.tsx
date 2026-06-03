"use client";

import Link from "next/link";
import { Heart, LogOut, Package, Settings, User } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const { user, orders, logout } = useAuth();

  if (!user) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <div className="grid size-20 place-items-center rounded-full bg-secondary text-4xl">
          🔐
        </div>
        <h1 className="font-display text-2xl font-bold">You&apos;re logged out</h1>
        <p className="text-muted-foreground max-w-sm">
          Log in to see your orders, wishlist, and account details.
        </p>
        <Button size="lg" asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  const recent = orders.slice(0, 3);

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="text-xl">
            {user.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-display text-2xl font-bold">
            Hi, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          className="ml-auto"
          onClick={() => logout()}
        >
          <LogOut className="size-4" /> Log out
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Package, label: "My orders", href: "/account/orders" },
          { icon: Heart, label: "Wishlist", href: "/account" },
          { icon: User, label: "Profile", href: "/account" },
          { icon: Settings, label: "Settings", href: "/account" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-card hover:border-primary/50 flex items-center gap-3 rounded-2xl border p-4 transition-colors"
          >
            <span className="bg-secondary text-secondary-foreground grid size-10 place-items-center rounded-xl">
              <item.icon className="size-5" />
            </span>
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Recent orders</h2>
        <Link
          href="/account/orders"
          className="text-primary text-sm font-semibold hover:underline"
        >
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="bg-card mt-4 rounded-3xl border p-8 text-center">
          <p className="text-muted-foreground">
            No orders yet — your cute haul will show up here. 🛍️
          </p>
          <Button className="mt-4" asChild>
            <Link href="/products">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {recent.map((o) => (
            <div
              key={o.id}
              className="bg-card flex items-center justify-between rounded-2xl border p-4"
            >
              <div>
                <p className="font-display font-bold">{o.id}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(o.createdAt).toLocaleDateString()} ·{" "}
                  {o.items.length} item{o.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <span className="font-semibold">{formatPrice(o.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
