"use client";

import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ReviewsProvider } from "@/lib/reviews-context";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReviewsProvider>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </ReviewsProvider>
    </AuthProvider>
  );
}
