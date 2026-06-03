"use client";

import * as React from "react";
import type { CartLine, Product, ProductVariant } from "@/lib/types";

const STORAGE_KEY = "lookkool-cart-v1";
const FREE_SHIPPING_THRESHOLD = 3500; // cents

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  freeShippingThreshold: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartLine[]>([]);
  const [isOpen, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Load persisted cart on mount. Hydrating from localStorage is an
  // intentional one-time sync from an external store, hence the disable.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Persist on change (after initial hydration).
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable */
    }
  }, [items, hydrated]);

  const addItem = React.useCallback(
    (product: Product, variant: ProductVariant, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((l) => l.variantId === variant.id);
        if (existing) {
          return prev.map((l) =>
            l.variantId === variant.id
              ? { ...l, quantity: l.quantity + qty }
              : l
          );
        }
        const line: CartLine = {
          productId: product.id,
          handle: product.handle,
          title: product.title,
          variantId: variant.id,
          variantTitle: variant.title,
          image: product.images[0] ?? "",
          price: variant.price,
          quantity: qty,
        };
        return [...prev, line];
      });
      setOpen(true);
    },
    []
  );

  const updateQuantity = React.useCallback((variantId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) =>
            l.variantId === variantId ? { ...l, quantity: qty } : l
          )
    );
  }, []);

  const removeItem = React.useCallback((variantId: string) => {
    setItems((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const count = items.reduce((sum, l) => sum + l.quantity, 0);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    isOpen,
    setOpen,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
