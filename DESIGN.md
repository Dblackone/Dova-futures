# Dova Futures — Design System (`DESIGN.md`)

This file is the **authoritative** brand/design source of truth for the site.
Where it conflicts with any PDF brand sheet, **this file wins** (per the
`taste-design` skill direction: "skill always wins"). Tokens here are encoded in
`tailwind.config.js` and `app/globals.css`.

Voice: **precise, confident, plain English — never hype.** No AI clichés.

---

## 1. Colour — strict 60 / 30 / 10, ONE accent

| Token | Hex | Role | Rule |
|---|---|---|---|
| `cream` | `#F5EFEB` | Default background (**60%**) | The page is cream. |
| `charcoal` | `#2E2B2B` | Headlines & dark sections (**30%**) | **Never pure black.** |
| `terracotta` | `#B85C38` | **The ONE accent (10%)** | CTAs & accents only. **Never body text.** |
| `terracotta.hover` | `#A24E2E` | CTA hover | — |
| `white` | `#FFFFFF` | Cards, text on dark | — |
| `grey` | `#666666` | Secondary text | **Never < 16px on charcoal.** |
| `success` | `#3E7C4F` | **Functional** success / "AFTER" state only | Not a second accent. |
| `hairline` | `#DDDDDD` | Card / divider borders | 1.5px. |

Shadows: warm-tinted, **≤ 10% opacity** (`shadow-card`, `shadow-soft`). No neon /
outer-glow / oversaturated accents.

---

## 2. Typography — swappable architecture

Hierarchy is driven by **weight + colour**, not size alone.

| Use | Family (active) | Swap target | Notes |
|---|---|---|---|
| Display / hook | **Space Grotesk** (variable) | Cabinet Grotesk | track-tight, web 40–56px, ≤ 7 words for hooks |
| Body | **Manrope** (variable) | Satoshi | 16–18px, ≤ 65ch, relaxed leading |
| Subhead | Display/Body SemiBold | — | terracotta or charcoal |
| Caption / meta / pill | Body Medium | — | all-caps allowed **here only**, +5% letter-spacing |

Fonts are wired behind CSS variables `--font-display` and `--font-body`
(`app/globals.css`). Real brand fonts (Cabinet Grotesk + Satoshi) drop into
`public/fonts/` as a **2-file swap** — see the FONT ARCHITECTURE comment at the
top of `globals.css`. (Fontshare is network-blocked in this build; commit the
font files rather than fetching at runtime.)

**Banned:** Inter; gradient text on big headers.

---

## 3. Five signature devices (built as components)

1. **AccentBar** (`components/AccentBar.tsx`) — terracotta vertical bar, 8×64px,
   top-left beside the kicker, ~64px from edges.
2. **Pill** (`components/Pill.tsx`) — rounded-full, 1.5px grey border, cream fill,
   charcoal Medium text. Renders carry a `3D VISUALISATION` label; reveal "after"
   uses an `AFTER` pill in Success Green (`variant="after"`).
3. **Card** (`components/Card.tsx`) — white on cream, 1.5px `#DDDDDD` border, 16px
   radius, 48px padding, shadow ≤ 10% opacity.
4. **Whitespace** — min **64px** outer margins (`container-site`, `spacing.gutter`).
   If a layout feels full, remove an element — never shrink margins.
5. **CTABlock** (`components/CTABlock.tsx`) — outro strip on charcoal:
   `dovafutures.com · DESIGN · BUILD · DIGITAL · Follow @dovafutures`.

---

## 4. Layout & motion

- **Asymmetric** — NO centered hero, NO "3 equal cards" rows. Use 2-col zig-zag /
  asymmetric grids.
- CSS Grid; max-width **~1400px** (`max-w-site`); clamp() type.
- Full-height via `min-h-[100dvh]` — **never `h-screen`**.
- 44px minimum tap targets; single column < 768px; no horizontal overflow; no
  overlapping elements.
- Motion: spring-like easing (`ease-spring`), staggered reveals, **transform /
  opacity only**. Respects `prefers-reduced-motion`.

---

## 5. Image safety — `SafeImage` + `RevealFrame`

- **Every** image goes through `components/SafeImage.tsx`: fixed aspect-ratio box
  + `object-fit` (cover default, `contain` for logos/diagrams). Per-context ratio
  tokens: hero `16:9`, card `4:3`, portrait `3:4`, square `1:1`, wide `21:9`.
  Cream skeleton placeholder → **no layout shift**. Optional `watermark` monogram.
- **`RevealFrame`** (`components/RevealFrame.tsx`) — signature raw→finished pair.
  Modes: `scrub` (drag + desktop hover + tap-toggle + keyboard) and `scroll`
  (hero). `3D VISUALISATION` pill + Success-Green `AFTER` marker + terracotta
  scrub handle. Accessible (`role="slider"`, arrows/Home/End). No layout shift.

---

## 6. Logo rules

- White logo on dark/photo (scrim behind on busy areas); dark logo on cream/white,
  min 24px tall. Monogram favicon/watermark 60–70% opacity, bottom-right, 24px
  from edges.
- **Never** stretch, recolour, or shadow the logo. Files: `public/logo/
  dova-logo-dark.png`, `public/logo/dova-logo-white.png`.

---

## 7. Banned patterns (AI tells — do NOT ship)

Emojis · Inter · pure black · neon / outer-glow shadows · oversaturated accents ·
gradient text on big headers · **fabricated metrics/stats** (use real data or
`[metric]` placeholders — never invent numbers/percentages/uptime) ·
`LABEL // YEAR` formatting · AI clichés ("Elevate / Seamless / Unleash /
Next-Gen") · "scroll to explore" / bouncing chevrons · circular spinners (use
skeletal loaders) · broken image links · empty voids (compose empty states).

---

## 8. Business facts (use these; do NOT invent others)

- **Dova Futures Limited**, Victoria Island, Lagos.
- Tagline: **DESIGN · BUILD · DIGITAL**. Headline voice: "Built with precision."
- WhatsApp: **+234 816 367 5439** → `https://wa.me/2348163675439`.
- Email: **info@dovafutures.com**. Domain: **dovafutures.com** (keep CNAME).
- Social: **@dovafutures** (exact Instagram/TikTok URLs TBD — `#` placeholders).
- Services: Architecture · BIM/Revit · Interior Design · Landscape · Construction
  · Visualization. **No fabricated project counts, years, or stats.**

All facts live in `lib/brand.ts` — import from there, don't hard-code.
