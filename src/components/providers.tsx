"use client";

import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ReviewsProvider } from "@/lib/reviews-context";
import { ConsentProvider } from "@/lib/consent-context";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { ConsentScripts } from "@/components/consent/consent-scripts";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <AuthProvider>
        <ReviewsProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CookieConsent />
            <ConsentScripts />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </ReviewsProvider>
      </AuthProvider>
    </ConsentProvider>
  );
}
