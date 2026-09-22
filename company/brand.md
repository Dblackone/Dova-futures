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

The working DOVA logo system is the principal-approved three-building identity
and its placement variants. The canonical files and machine-readable map live in
`documents/_ds/dova-futures-design-system-0aa9ec63-a152-4bb9-a606-37fde9335cce/assets/logo-variations/`.
The portable copy is bundled at
`.agents/skills/dova-company-brand/assets/logo-variations/` for other Codex
projects and sessions.

| Variant | File | Use |
|---------|------|-----|
| Primary horizontal | `01-horizontal-green-on-white.png` | Light document headers, website/light surfaces, presentations and business cards |
| Reversed horizontal | `02-horizontal-cream-on-green.png` | Forest-green headers, dark website surfaces, covers and banners |
| Stacked full name | `03-square-stacked-green-on-white.png` | Square profile or directory placements where the name must remain visible; review the noted line artefact before issue |
| Reversed stacked full name | `04-square-stacked-cream-on-green.png` | Square dark profile tiles and green presentation covers |
| Symbol only, light | `05-symbol-green-on-white.png` | Small light-background avatars, compact markers and favicon source artwork |
| Symbol only, dark | `06-symbol-cream-on-green.png` | Small dark-background avatars and app-icon source artwork |
| Wordmark | `07-wordmark-green-on-white.png` | Narrow name-led placements where the mark is already nearby |
| Monochrome | `08-horizontal-black-on-white.png` | Single-colour printing and black-and-white references |

Use the variant map in `logo-manifest.json` rather than inventing a new lockup.
Keep each file's aspect ratio and clear space. These are opaque RGB PNG export
assets; they are not transparent overlays or manufacturing-ready vector masters.
The vector production master remains a separate follow-up. The existing inline
SVG lockup in document templates remains in place because it carries the
canonical services descriptor `DESIGNERS · BUILDERS · DEVELOPERS`; migrate it
only as a deliberate template-system change.

Legacy files under historical `assets/logo/` paths are provenance only. Do not
use them for new work because some carry the retired “Rethink the future” line.

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
