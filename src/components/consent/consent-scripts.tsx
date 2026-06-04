"use client";

import * as React from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent-context";

/**
 * Loads third-party scripts ONLY for the categories the visitor allowed.
 *
 * - Analytics tag (e.g. Google Analytics) renders only when `analytics` is on.
 * - Marketing pixel (e.g. Meta Pixel) renders only when `marketing` is on.
 * Toggling a category off in the cookie settings removes the script tag and
 * fires a teardown, so the switches have a real, observable effect.
 *
 * Real IDs are read from env so nothing loads in dev unless configured:
 *   NEXT_PUBLIC_GA_ID         e.g. G-XXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID e.g. 123456789
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function ConsentScripts() {
  const { consent } = useConsent();

  // Observable init/teardown so the toggles visibly do something even before
  // real tags are configured.
  React.useEffect(() => {
    const w = window as unknown as Record<string, boolean>;
    if (consent.analytics) {
      w.__lookkoolAnalytics = true;
      console.info("[consent] analytics enabled");
    } else if (w.__lookkoolAnalytics) {
      delete w.__lookkoolAnalytics;
      console.info("[consent] analytics disabled");
    }
  }, [consent.analytics]);

  React.useEffect(() => {
    const w = window as unknown as Record<string, boolean>;
    if (consent.marketing) {
      w.__lookkoolMarketing = true;
      console.info("[consent] marketing enabled");
    } else if (w.__lookkoolMarketing) {
      delete w.__lookkoolMarketing;
      console.info("[consent] marketing disabled");
    }
  }, [consent.marketing]);

  return (
    <>
      {consent.analytics && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {consent.marketing && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
