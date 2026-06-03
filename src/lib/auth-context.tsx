"use client";

import * as React from "react";
import type { CartLine } from "@/lib/types";

/**
 * Lightweight client-side auth + order history for the MVP.
 *
 * This is intentionally a mock that persists to localStorage so the account
 * and checkout flows are fully clickable without a backend. When Medusa is
 * connected, swap these methods for the Medusa customer + order APIs.
 */

const USER_KEY = "lookkool-user-v1";
const ORDERS_KEY = "lookkool-orders-v1";

export interface User {
  name: string;
  email: string;
}

export interface Order {
  id: string;
  createdAt: string;
  email: string;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "processing" | "shipped" | "delivered";
}

interface AuthContextValue {
  user: User | null;
  orders: Order[];
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  // One-time hydration from localStorage (external store) on mount.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const u = localStorage.getItem(USER_KEY);
      if (u) setUser(JSON.parse(u) as User);
      const o = localStorage.getItem(ORDERS_KEY);
      if (o) setOrders(JSON.parse(o) as Order[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user, hydrated]);

  React.useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const login = React.useCallback((email: string, name?: string) => {
    setUser({ email, name: name ?? email.split("@")[0] });
  }, []);

  const register = React.useCallback((name: string, email: string) => {
    setUser({ name, email });
  }, []);

  const logout = React.useCallback(() => setUser(null), []);

  const addOrder = React.useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const value: AuthContextValue = {
    user,
    orders,
    login,
    register,
    logout,
    addOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
