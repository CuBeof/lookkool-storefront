---
version: alpha
name: lookkool
description: >
  Minimal-cute commerce design system for a US-market dropshipping store selling
  small, adorable giftable & decor items ($10-20). Core audience: women 22-35
  (self-purchase); secondary: parents 35-50 buying gifts for kids. Conversion-first,
  mobile-first, playful-but-controlled. Deliberately engineered against generic
  "AI-slop": warm neutral base, one disciplined accent, sticker-style depth, bouncy
  micro-interactions only where they aid the purchase emotion.

colors:
  primary: "#2D2424"
  on-primary: "#FFF8F3"
  secondary: "#8A8178"
  tertiary: "#FF7A8A"
  on-tertiary: "#FFF8F3"
  tertiary-hover: "#FF6275"
  tertiary-shadow: "#E04E62"
  tertiary-text: "#B5485A"
  neutral: "#FFF8F3"
  surface: "#FFFFFF"
  surface-sunken: "#F3E9DE"
  border: "#EADFD4"
  accent-mint: "#A8D8C0"
  on-accent-mint: "#1C5C42"
  accent-butter: "#FFE3A3"
  on-accent-butter: "#7A5A12"
  sale: "#D64545"
  on-sale: "#FFF1F1"
  success: "#2FA37C"
  on-success: "#FFF8F3"
  error: "#D64545"
  on-error: "#FFF1F1"
  price-strikethrough: "#B0A698"

typography:
  display-xl:
    fontFamily: Fredoka
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: Fredoka
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.15
  h1:
    fontFamily: Fredoka
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
  h2:
    fontFamily: Fredoka
    fontSize: 1.375rem
    fontWeight: 500
    lineHeight: 1.25
  h3:
    fontFamily: Fredoka
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.3
  body-lg:
    fontFamily: Nunito
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Nunito
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Nunito
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Nunito
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
  price:
    fontFamily: Nunito
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "tnum"
  button:
    fontFamily: Nunito
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1

rounded:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  pill: 999px

spacing:
  xs: 4px
  sm: 8px
  s2: 12px
  md: 16px
  lg: 24px
  xl: 32px
  x2: 48px
  x3: 64px

components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-hover}"
  button-primary-active:
    backgroundColor: "{colors.tertiary-hover}"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    height: 48px
  button-tertiary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 11px 20px
    height: 48px
  button-disabled:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
    height: 48px
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 0px
  badge-sale:
    backgroundColor: "{colors.sale}"
    textColor: "{colors.on-sale}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 5px 11px
  badge-new:
    backgroundColor: "{colors.accent-mint}"
    textColor: "{colors.on-accent-mint}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 5px 11px
  badge-bestseller:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 5px 11px
  badge-lowstock:
    backgroundColor: "{colors.accent-butter}"
    textColor: "{colors.on-accent-butter}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 5px 11px
  badge-gift:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary-text}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 4px 10px
  input-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 12px 14px
    height: 48px
  cart-drawer:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

lookkool is **minimal-cute**: a clean, warm-neutral canvas where personality lives
in *details* — round shapes, sticker-style depth, and bouncy micro-interactions —
not in visual clutter. The name is a deliberate misspelling of "look cool"; the
doubled `kk` is a brand asset and a license to be a little playful.

The strategy is **bold at the front door, calm on the way to checkout**. The hero
and homepage may carry one confident "pop" to stop a scrolling thumb; product pages
and checkout stay quiet and frictionless so nothing slows the purchase. Playfulness
is *controlled* — fun in interaction, invisible in the moment of paying.

**Audience.** Primary: women 22-35 buying for themselves, mobile-first, emotion-led.
Secondary: parents 35-50 buying gifts for kids. Both reward a friendly, unmistakably
cute identity that reads "this is a great gift" at a glance.

**Anti-AI-slop stance.** This system explicitly rejects the generic AI look: no
Inter/Poppins defaults, no purple-to-blue gradients, no blurry gray drop shadows,
no glassmorphism, no emoji sprinkled as decoration. Every choice below has a reason.

## Colors

A warm neutral foundation, a single coral accent reserved for buying, and a small
set of fixed-meaning status colors. The governing rule: **coral is the "money"
color — it belongs to the primary purchase action and nothing else.** If coral
leaks onto every button and label, the eye loses its anchor and conversion drops.

- **Primary `#2D2424`** — soft near-black (warm charcoal, never pure black) for
  text, the secondary "Buy now" button, and the "Best seller" badge. Softer than
  `#000` so it pairs gently with round type.
- **Tertiary / accent `#FF7A8A`** — coral. The sole driver of the primary CTA
  ("Add to cart") and the active price. Hover deepens to `#FF6275`; the sticker
  shadow uses `#E04E62`; coral text on light surfaces uses `#B5485A` for contrast.
- **Neutral `#FFF8F3`** — warm cream page background. Replaces stark white to feel
  soft and cozy.
- **Surface `#FFFFFF`** — cards sit slightly brighter than the page.
- **Surface sunken `#F3E9DE`** — recessed sections, image placeholders.
- **Secondary `#8A8178`** — muted warm taupe for captions, metadata, hints.
- **Border `#EADFD4`** — quiet hairline borders.

**Status & label colors (each has one fixed job so shoppers read them instantly):**

- **Sale `#D64545`** — discounts only. Red signals urgency and stays distinct from
  coral so the two never blur.
- **Mint `#A8D8C0`** — the "New" badge. Fresh, just-arrived.
- **Butter `#FFE3A3`** — "Almost gone / Low stock". Gentle scarcity nudge without
  the alarm of red.
- **Success `#2FA37C`** — confirmations, in-stock, order success.
- **Price strikethrough `#B0A698`** — original (was) price.

Contrast targets WCAG AA (4.5:1 for body text). Coral `#FF7A8A` is a *fill* color;
when coral must read as text on cream it shifts to `#B5485A` to stay legible.

## Typography

Two families, two jobs. Personality up top, clarity everywhere else.

- **Fredoka (display)** — rounded, friendly, slightly chubby. Used *only* for the
  logo, hero, headings (H1-H3), and collection names. It carries the cute.
- **Nunito (body)** — rounded-but-readable sans for body copy, prices, buttons,
  badges, forms, and the entire checkout. It does the reading. Excellent Vietnamese
  diacritics support.

**Discipline:** never more than these two families. Fredoka never sets body text or
prices. Prices and totals use Nunito with **tabular numbers (`tnum`)** so figures
align in clean columns — a quiet professionalism cue.

Both faces are round on purpose; to keep the system from tipping into "childish",
the *restraint* comes from elsewhere — generous whitespace, neutral background, clean
product photography. Friendly type, grown-up layout.

Type scale (rem-based): display-xl 3rem → display-lg 2.25rem → h1 1.75rem →
h2 1.375rem → h3 1.125rem → body-lg 1.0625rem → body-md 1rem → body-sm 0.875rem →
label 0.8125rem. On mobile, display sizes step down roughly one level (see Layout).

## Layout

**Mobile-first, conversion-first.** The primary audience shops on phones, so every
layout is designed at the smallest breakpoint first, then expanded.

**Breakpoints**

| Token | Min width | Target device | Product grid | Container |
| --- | --- | --- | --- | --- |
| `xs` | 0px | small phones | 2 columns | fluid, 16px gutters |
| `sm` | 480px | large phones | 2 columns | fluid, 16px gutters |
| `md` | 768px | tablets | 3 columns | 720px, 24px gutters |
| `lg` | 1024px | laptops | 3-4 columns | 960px, 32px gutters |
| `xl` | 1280px | desktops | 4 columns | 1200px, 32px gutters |
| `x2` | 1536px | large desktops | 4 columns | 1320px max, centered |

**Spacing scale (4px rhythm):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Favor 16/24/32
for breathing room. Section-to-section gaps use 48-64px; in-card padding 12-16px.

**Touch & accessibility:** every tappable target is at least 44×44px. Buttons are
48px tall. On mobile, the product page shows a **sticky bottom "Add to cart" bar**
so the CTA is always in reach.

**Grid guidance:** 2-column product grid on phones (more items per scroll for fast
browsers). Consider a **bento grid** on the homepage to mix product, lifestyle
banners, and a dedicated "Shop gifts for kids" entry point for the parent audience —
they arrive with intent, so keep that path short.

**Structured for AI discovery:** as shoppers increasingly arrive via AI assistants,
keep markup semantic and add product structured data (schema.org/Product) so the
catalog is machine-readable.

## Elevation & Depth

Depth is **playful and intentional**, never the default blurry gray shadow that
marks generic templates.

- **Sticker shadow (signature):** solid, offset, same-hue shadow with no blur — like
  a sticker pressed onto the page. Buttons use `0 4px 0 {colors.tertiary-shadow}`;
  emphasized cards use a charcoal border plus `4px 4px 0 {colors.primary}`.
- **Use sparingly:** sticker depth belongs to buttons and a few hero/highlight
  elements — not every card. Universal shadows become noise.
- **Pressed feedback:** on `:active`, elements translate down and the offset shadow
  shrinks, mimicking a physical press.
- **Banned:** soft blurred gray box-shadows (`0 8px 24px rgba(0,0,0,.18)`),
  glassmorphism, neon glows. These read as off-the-shelf and flatten the brand.

## Shapes

Round, soft, and consistent — the cheapest, strongest "cute" signal.

- **Radius scale:** badges/inputs `8px` → cards `16px` → sections/modals `24px` →
  **buttons are always full pills (`999px`)**. The pill button is a visual signature
  that rhymes with the rounded type.
- **Consistency over variety:** don't mix many radii arbitrarily on one surface.
- **No rounded corners on single-sided borders** (e.g. a left-accent stripe) — round
  only with full borders.
- **Imagery:** product photos sit in rounded frames; favor clean, well-lit shots on
  the cream/sunken background so each item carries itself without decoration.

## Components

**Buttons (one coral CTA per screen):**
- `button-primary` — coral pill with sticker shadow. The main purchase action
  ("Add to cart"). Only one prominent coral button per view.
- `button-secondary` — charcoal pill for decisive secondary intent ("Buy now"),
  visually separated from add-to-cart so the two intents read differently.
- `button-tertiary` — outline/quiet pill ("Add to wishlist").
- `button-disabled` — warm gray, no shadow ("Sold out").

**Product card:** white surface, 16px radius, `1px` cream border. Image area on
sunken cream with badges pinned top-left (status) and top-right (trust/bestseller).
Title (Nunito 500), price row (coral current price + struck-through original in
`#B0A698`), full-width coral Add-to-cart pill.

**Badges (fixed color = fixed meaning, scannable at a glance):**
- `badge-sale` red — discount/urgency · `badge-new` mint — newly added ·
  `badge-bestseller` charcoal — social proof · `badge-lowstock` butter — gentle
  scarcity · `badge-gift` coral-outline — giftable items. Badges never use solid
  coral fill, so they don't compete with the CTA.

**Inputs:** white fill, 8px radius, 48px tall, clear focus ring. Checkout fields
stay visually calm — no decorative motion.

**Cart drawer:** slides in from the right over a dim scrim; 24px radius, cream
surface. Fast and clear — this is a closing surface.

**Motion (apply by tier):**
- *Micro (use freely):* hover lift 2px + thicker sticker shadow; `:active`
  `scale(0.97)`; card hover lift 4px with image `scale(1.03)`. Easing
  `cubic-bezier(0.34, 1.4, 0.64, 1)` for a light bounce. Durations 150-200ms.
- *Add-to-cart delight:* a single cart-icon bounce + cart-count pop. One joyful
  beat — never confetti.
- *Transitions:* drawers/panels 250-350ms, never over 400ms. Skeletons over
  spinners for product grids. Toast confirmations auto-dismiss ~2s.
- *Scroll reveal:* gentle 8-12px fade-up, staggered, **homepage/landing only** —
  never on product or checkout pages.
- *Accessibility:* honor `prefers-reduced-motion` — decorative motion stops; only
  instant feedback (color change) remains. No fast flashing.

## Do's and Don'ts

**Do**
- Reserve coral `#FF7A8A` for the primary purchase action and the active price.
- Keep exactly two type families: Fredoka for display, Nunito for everything else.
- Use the sticker (solid, offset) shadow as the signature depth cue, sparingly.
- Design mobile-first; keep a sticky Add-to-cart bar within thumb reach.
- Give each badge one fixed color/meaning so shoppers parse them instantly.
- Use tabular numbers for prices and totals; lead with the current price.
- Surface trust signals (real-photo reviews, US-ships/returns, delivery ETA) — they
  are essential for a dropshipping store.
- Keep generous whitespace and clean product photography to stay "grown-up cute".
- Provide a dedicated "Gifts for kids" path for the parent audience.
- Honor `prefers-reduced-motion` and maintain WCAG AA contrast.

**Don't**
- Don't use Inter, Poppins, or Montserrat, or purple→blue gradients (generic AI look).
- Don't apply blurry gray drop shadows, glassmorphism, or neon glows.
- Don't put coral on every button/badge — it must stay the unique CTA color.
- Don't set Fredoka on body text or prices.
- Don't sprinkle emoji as decoration or scatter confetti on clicks.
- Don't animate the price, checkout buttons, or payment form — keep them static.
- Don't run scroll-reveal or parallax on product/checkout pages.
- Don't auto-play carousels or use motion that blocks or delays interaction.
- Don't let both type and layout go ultra-sweet at once — that tips into childish.
- Don't mix arbitrary corner radii on a single surface; buttons are always pills.
