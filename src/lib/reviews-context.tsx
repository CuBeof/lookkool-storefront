"use client";

import * as React from "react";
import type { Review } from "@/lib/types";
import { seedReviews } from "@/lib/data/reviews";

/**
 * Customer reviews store.
 *
 * Seed reviews ship with the catalog; user-submitted reviews (left from the
 * order history flow) are persisted to localStorage and merged on top. Media
 * (photos/videos) are stored as data URLs — fine for a demo; with a real
 * backend you'd upload to storage and keep only the URLs here.
 */

const STORAGE_KEY = "lookkool-reviews-v1";

interface ReviewsContextValue {
  reviews: Review[];
  getForProduct: (productId: string) => Review[];
  hasReviewed: (productId: string, orderId?: string) => boolean;
  addReview: (review: Review) => boolean;
}

const ReviewsContext = React.createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [userReviews, setUserReviews] = React.useState<Review[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserReviews(JSON.parse(raw) as Review[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
    } catch {
      /* quota exceeded — review stays in memory for this session */
    }
  }, [userReviews, hydrated]);

  const all = React.useMemo(
    () => [...userReviews, ...seedReviews],
    [userReviews]
  );

  const getForProduct = React.useCallback(
    (productId: string) =>
      all
        .filter((r) => r.productId === productId)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [all]
  );

  const hasReviewed = React.useCallback(
    (productId: string, orderId?: string) =>
      userReviews.some(
        (r) =>
          r.productId === productId &&
          (orderId ? r.orderId === orderId : true)
      ),
    [userReviews]
  );

  // keep a ref so addReview can probe persistence without a stale closure
  const userReviewsRef = React.useRef<Review[]>([]);
  React.useEffect(() => {
    userReviewsRef.current = userReviews;
  }, [userReviews]);

  const addReview = React.useCallback((review: Review) => {
    const next = [review, ...userReviewsRef.current];
    setUserReviews(next);
    // Probe storage so the caller can warn if media was too large to persist.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return true;
    } catch {
      return false;
    }
  }, []);

  const value: ReviewsContextValue = {
    reviews: all,
    getForProduct,
    hasReviewed,
    addReview,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextValue {
  const ctx = React.useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within a ReviewsProvider");
  return ctx;
}
