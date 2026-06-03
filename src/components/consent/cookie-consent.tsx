"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

import { useConsent, type ConsentCategory } from "@/lib/consent-context";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CATEGORIES: {
  key: Exclude<ConsentCategory, "necessary"> | "necessary";
  title: string;
  desc: string;
  locked?: boolean;
}[] = [
  {
    key: "necessary",
    title: "Strictly necessary",
    desc: "Required for the site to work — your cart, login, and security. Always on.",
    locked: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    desc: "Remembers choices like region and recently viewed so things feel personal.",
  },
  {
    key: "analytics",
    title: "Analytics",
    desc: "Helps us understand what's loved (anonymous stats) so we can improve.",
  },
  {
    key: "marketing",
    title: "Marketing",
    desc: "Lets us show relevant offers and measure our cute little campaigns.",
  },
];

export function CookieConsent() {
  const {
    consent,
    bannerVisible,
    settingsOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
  } = useConsent();

  // local draft for the settings dialog
  const [draft, setDraft] = React.useState({
    preferences: consent.preferences,
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  // Sync the draft to saved consent each time the dialog opens, so the
  // switches reflect the current choice before editing.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (settingsOpen) {
      setDraft({
        preferences: consent.preferences,
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [settingsOpen, consent]);

  return (
    <>
      {/* banner */}
      {bannerVisible && !settingsOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
          <div className="bg-card animate-in slide-in-from-bottom-5 mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border p-5 shadow-lg sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-3">
              <span className="bg-secondary grid size-10 shrink-0 place-items-center rounded-2xl">
                <Cookie className="size-5 text-primary" />
              </span>
              <p className="text-muted-foreground text-sm">
                We use cookies to keep your bag working, remember your
                preferences, and make lookkool cuter. You choose what&apos;s on.{" "}
                <Link href="/faq" className="text-primary font-semibold underline">
                  Learn more
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={openSettings}
                className="flex-1 sm:flex-none"
              >
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="flex-1 sm:flex-none"
              >
                Reject all
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="flex-1 sm:flex-none"
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* settings dialog */}
      <Dialog
        open={settingsOpen}
        onOpenChange={(o) => (o ? openSettings() : closeSettings())}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="size-5 text-primary" /> Cookie preferences
            </DialogTitle>
            <DialogDescription>
              Turn categories on or off. Your choice is saved and applied right
              away — scripts only load for what you allow.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {CATEGORIES.map((c) => {
              const checked =
                c.key === "necessary"
                  ? true
                  : draft[c.key as keyof typeof draft];
              return (
                <div
                  key={c.key}
                  className="flex items-start justify-between gap-4 rounded-2xl border p-4"
                >
                  <div>
                    <Label
                      htmlFor={`consent-${c.key}`}
                      className="text-sm font-semibold"
                    >
                      {c.title}
                    </Label>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {c.desc}
                    </p>
                  </div>
                  <Switch
                    id={`consent-${c.key}`}
                    checked={checked}
                    disabled={c.locked}
                    onCheckedChange={(v) =>
                      setDraft((d) => ({ ...d, [c.key]: v }))
                    }
                  />
                </div>
              );
            })}
          </div>

          <DialogFooter className="gap-2 sm:flex-row sm:justify-between">
            <Button variant="ghost" onClick={rejectAll}>
              Reject all
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={acceptAll}>
                Accept all
              </Button>
              <Button onClick={() => savePreferences(draft)}>
                Save preferences
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
