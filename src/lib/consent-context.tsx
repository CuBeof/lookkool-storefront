"use client";

import * as React from "react";

/**
 * Cookie consent state.
 *
 * Categories other than `necessary` default to OFF until the visitor opts in
 * (GDPR-friendly). The chosen preferences are persisted to both localStorage
 * and a `lookkool-consent` cookie so the server could read them too. Scripts
 * that depend on a category (see `ConsentScripts`) only load when its toggle
 * is on, and unload when it's turned back off — so the switches truly work.
 */

export type ConsentCategory =
  | "necessary"
  | "analytics"
  | "marketing"
  | "preferences";

export type ConsentState = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "lookkool-consent-v1";
const COOKIE_NAME = "lookkool-consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

const DENIED: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const GRANTED: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

interface ConsentContextValue {
  consent: ConsentState;
  /** true once the visitor has made (and saved) a choice */
  decided: boolean;
  bannerVisible: boolean;
  settingsOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Omit<ConsentState, "necessary">) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const ConsentContext = React.createContext<ConsentContextValue | null>(null);

function persist(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  try {
    const value = encodeURIComponent(JSON.stringify(state));
    document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = React.useState<ConsentState>(DENIED);
  const [decided, setDecided] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setConsent({ ...DENIED, ...(JSON.parse(raw) as ConsentState) });
        setDecided(true);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const commit = React.useCallback((state: ConsentState) => {
    setConsent(state);
    setDecided(true);
    setSettingsOpen(false);
    persist(state);
  }, []);

  const acceptAll = React.useCallback(() => commit(GRANTED), [commit]);
  const rejectAll = React.useCallback(() => commit(DENIED), [commit]);

  const savePreferences = React.useCallback(
    (prefs: Omit<ConsentState, "necessary">) =>
      commit({ necessary: true, ...prefs }),
    [commit]
  );

  const value: ConsentContextValue = {
    consent,
    decided,
    bannerVisible: hydrated && !decided,
    settingsOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = React.useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
