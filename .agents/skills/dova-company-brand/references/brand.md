# brand.md — Brand Identity (Single Source of Truth)

> **These values are canonical. Never re-declare them elsewhere — link here.**
> The tokens below were previously copy-pasted across `documents/README.md`,
> `SESSION_HANDOFF.md` (now `memory/archive/session-handoff-2026-06.md`), and the old `context/05`. This file is now the one place
> they live. If a value changes, it changes here, once.

## Legal + contact

| Field | Value |
|-------|-------|
| Legal name | **DOVA FUTURES LIMITED** |
| Tagline | DESIGNERS · BUILDERS · DEVELOPERS |
| Business | Premium Nigerian design-build construction firm |
| Location | Victoria Island, Lagos |
| Phone / WhatsApp | +234 816 367 5439 |
| Email | info@dovafutures.com |
| Website | dovafutures.com |
| Social | Instagram, TikTok (handles TBD), WhatsApp |

## Colour tokens

| Token | Hex | Usage |
|-------|-----|-------|
| Primary — dark forest green | `#1C4636` | Headers, letterhead, primary buttons, accents |
| Deep green | `#102A20` | Deep-contrast areas |
| Accent — terracotta | `#B85C38` | Dividers, document-type labels, secondary accents |
| Clay / placeholder | `#9E4F30` | `contenteditable` placeholder text in templates |
| Surface — warm cream | `#F5EFE8` | Meta blocks, highlights, text on dark |
| Background — tan | `#E8E1D5` | Page body background |
| Body text | `#1A1A1A` | Default text |
| Mint focus | `#5AA17C` | `contenteditable` focus ring |

## Typography

| Role | Font |
|------|------|
| Display (all-caps headers, titles) | **Bebas Neue** |
| Body (text, tables, labels) | **Inter** |

## Logo

- Primary logo: `assets/logo/DOVA Logo - W.png` (white on transparent, ~28 KB).
- Other lockups: `assets/logo/` (`DOVA Logo.png`, `logo.png`, metadata variant).
- Web favicons/app icons: `public/favicon.png`, `public/apple-touch-icon.png`,
  `public/icon-512.png`, `public/logo/`.
- In document templates the logo is embedded as **inline SVG** — do not replace
  it with a raster image or remove it.

## The programmatic design system

The full, tokenised design system (CSS custom properties for colours, typography,
spacing, effects, fonts) lives in:

```
documents/_ds/dova-futures-design-system-*/
├── tokens/colors.css  typography.css  spacing.css  effects.css  fonts.css
├── styles.css   _ds_bundle.js   _ds_manifest.json
└── README.md
```

When building UI or a new document, pull from those token files rather than
hardcoding hex values, and keep this `brand.md` in sync with them.

## Rule

Any new surface — website UI, a document template, a preorder page, a slide —
uses these exact tokens. If a project genuinely needs to deviate, that is a
decision for `memory/decisions.md`, not a silent local override.
