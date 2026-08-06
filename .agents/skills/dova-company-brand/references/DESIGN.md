# Design System: DOVA Futures

## Contents

1. Visual theme and atmosphere
2. Colour palette and roles
3. Typography rules
4. Geometry, spacing, and layout
5. Component styling
6. Imagery, logo, and iconography
7. Depth, texture, and motion
8. Responsive and accessibility rules
9. Signature composition

## 1. Visual theme and atmosphere

DOVA uses premium architectural minimalism: calm, precise, materially warm, and deliberately restrained. The visual language should feel like a high-end architecture monograph rather than a generic technology product.

Build hierarchy through:

- deep forest-green and warm-cream surface changes;
- condensed display type paired with highly legible body type;
- generous negative space and disciplined alignment;
- sharp geometry, thin rules, and line-art details;
- real architectural imagery with controlled overlays;
- terracotta used as a small natural-material accent, never the dominant colour.

Avoid playful rounded interfaces, glossy gradients, excessive decoration, glass capsules, neon colour, purple/blue technology palettes, crowded layouts, and generic stock or synthetic-looking construction imagery.

## 2. Colour palette and roles

Use the files in `../assets/design-system/tokens/` as the implementation source. Prefer semantic aliases in component code.

### Primary identity

| Token | Value | Role |
|---|---:|---|
| `--green-950` | `#0B221A` | Deepest hero and footer surfaces |
| `--green-900` | `#102A20` | Active states and deep contrast |
| `--green-800` | `#16382B` | Standard dark sections |
| `--green-700` / `--brand` | `#1C4636` | Primary brand colour and actions |
| `--green-500` | `#357A5B` | Interactive and focus-support colour |
| `--green-400` | `#5AA17C` | Mint highlight and focus treatment |
| `--green-100` | `#DCEBE2` | Soft green tint surface |

### Natural surfaces and text

| Token | Value | Role |
|---|---:|---|
| `--cream` / `--surface-page` | `#F5EFE8` | Signature warm page and text-on-dark colour |
| `--sand` / `--surface-sunken` | `#E8E1D5` | Recessed or alternate neutral surface |
| `--stone` / `--border-light` | `#D1CBC6` | Hairline borders on light surfaces |
| `--white` / `--surface-card` | `#FFFFFF` | Cards requiring crisp separation |
| `--ink-900` / `--text-strong` | `#1A1A1A` | Headings and strongest light-surface text |
| `--slate` / `--text-body` | `#4A4F5C` | Body copy on light surfaces |
| `--slate-400` / `--text-muted` | `#6B7280` | Secondary text |

### Accent and status

| Token | Value | Role |
|---|---:|---|
| `--clay` / `--accent` | `#B85C38` | Restrained dividers, labels, links, and highlights |
| `--clay-dark` | `#9E4F30` | Accent hover and editable-placeholder treatment |
| `--success` | `#357A5B` | Positive state |
| `--warning` | `#C8881F` | Warning state |
| `--danger` | `#B23A2E` | Error or destructive state |
| `--info` | `#2F6B7D` | Informational state |

Alternate forest-green and cream sections to create a measured page rhythm. Use clay as a spark. Do not create new brand colours when a token already fits.

## 3. Typography rules

### Display

Use Bebas Neue for hero and section display headings. Set in uppercase with slight positive tracking (`0.02em`). Use the responsive display tokens:

- `--fs-display-2xl`: hero headlines;
- `--fs-display-xl`: major section statements;
- `--fs-display-lg`: section headings;
- `--fs-display-md`: compact display headings.

Keep display copy short and declarative. Let line breaks feel intentional.

### Body and interface

Use Inter for body copy, labels, tables, forms, buttons, and navigation. Default body size is `--fs-md` (`17px`) with `--lh-normal` (`1.6`) or `--lh-relaxed` (`1.75`). Use weights 300–800 only as defined in the tokens.

Use uppercase Inter eyebrows above major headings at `--fs-2xs` (`11px`) with `--tracking-eyebrow` (`0.28em`). Eyebrows are navigational cues, not decorative slogans.

## 4. Geometry, spacing, and layout

Use an 8px base rhythm with the packaged `--space-*` scale. The core layout is:

- maximum content width: `1280px`;
- horizontal container padding: `32px`, reduced responsibly on small screens;
- section padding: `120px` desktop and `80px` compact/mobile;
- two- or three-column grids only when content remains readable;
- strong shared alignment lines between headings, copy, imagery, and actions.

Keep most corners square or subtly softened:

- `0–4px` for structural cards and buttons;
- `8px` for inputs;
- `12px` only where a softer container is justified;
- pill radius only for tags and compact category chips.

Use 1px hairline frames. Avoid thick outlines except for deliberate action-button or architectural-frame treatments.

## 5. Component styling

### Buttons

- Primary: forest-green fill, cream/white label, sharp-to-subtle radius, restrained green shadow.
- On hover: darken one green step and lift slightly.
- Outline on light: transparent with green line and text; invert to green fill on hover.
- Outline on dark: transparent with low-opacity cream line; invert to cream fill and dark text.
- Keep labels concise. Do not use pill-shaped primary buttons.

### Cards and containers

Use white or cream cards on light sections and translucent/outlined cards on green sections. Default to a hairline border and little or no shadow. Use `--shadow-md` only when separation is necessary, and `--shadow-lg` for a controlled hover lift.

Service cards may use line icons in framed squares. Project cards should prioritise photography, with information revealed through a dark bottom overlay or a clean adjacent caption.

### Inputs and forms

Use Inter, a light cream/white field surface, an 8px radius, clear labels, and generous vertical padding. Use a visible green focus ring. Error states must include text or an icon in addition to colour.

### Navigation

Use a fixed or sticky dark-green navigation only where the product benefits from it. A roughly 90% opaque surface with `blur(12px)` is acceptable. Keep navigation compact, use a growing underline or colour shift for hover, and retain a clear active state.

### Section headers and metrics

Pair one eyebrow with one concise Bebas Neue heading. Large metrics use the display face or a strong Inter weight, followed by a precise label and context. Never invent a number to fill a visual slot.

## 6. Imagery, logo, and iconography

Use real project photography where authorised: warm daylight, visible materials, construction craft, architectural detail, and human scale. Apply a dark-green protection overlay when text sits over a photograph. Do not present AI-generated imagery as a built-project photograph.

Use `../assets/brand/dova-letterhead-lockup-on-dark.svg` on a dark forest-green surface. It is extracted from the canonical letterhead and carries the canonical tagline. If a light layout needs branding, keep the lockup inside a deliberate green field rather than fabricating a recoloured version. Preserve aspect ratio, clear space, legibility, and the complete lockup. Do not recolour, stretch, crop, trace, rotate, shadow, or place it on a visually noisy background.

Do not use the files in `../assets/legacy-logos/` for new work. They are retained only for provenance: the visible artwork includes the historical “Rethink the future” line and conflicts with the canonical tagline, while two files are empty 1×1 placeholders. Replacement primary logo artwork requires the principal's approval.

Use thin geometric line icons, preferably 1.5–2px strokes on a 24px grid. Lucide is a compatible substitute when a brand-provided icon is unavailable. Do not use emoji as interface or marketing iconography.

## 7. Depth, texture, and motion

Use soft, restrained elevation:

- `--shadow-xs` and `--shadow-sm` for quiet separation;
- `--shadow-md` for cards;
- `--shadow-lg` for hover lift;
- `--shadow-green` for primary action emphasis.

A faint 60px blueprint grid using `--grid-line` may appear on dark hero surfaces. Keep it barely visible and subordinate to content.

Use the packaged calm easing curve. Typical motion is a 0.3-second transition, a 32px fade-and-rise scroll reveal, a 4–6px card lift, or a left-to-right link underline. Avoid bouncing, elastic movement, parallax that harms readability, and decorative motion without purpose. Respect `prefers-reduced-motion`.

## 8. Responsive and accessibility rules

- Preserve reading order when grids collapse.
- Keep body copy comfortably readable and avoid long all-caps paragraphs.
- Maintain visible keyboard focus and logical tab order.
- Provide names for icon-only controls and alternative text for meaningful images.
- Ensure overlays preserve text contrast at every breakpoint.
- Keep touch targets practical, normally at least 44px in each dimension.
- Never rely on colour alone to communicate state.
- Test reduced motion, keyboard use, narrow mobile widths, wide desktop widths, and print output when applicable.

## 9. Signature composition

A recognisably DOVA screen typically combines:

1. a deep forest-green hero or header;
2. a small tracked Inter eyebrow;
3. a large, concise Bebas Neue headline;
4. precise sentence-case supporting copy;
5. one restrained primary action;
6. thin architectural framing or a faint blueprint grid;
7. warm cream as the next major surface;
8. real project imagery or line-art detail;
9. clay used once or twice as an accent, not as a competing identity colour.

Preserve this composition as a language, not a rigid template. Adapt it to the content and the consuming product's architecture.

---
*Drafted by @lead/vector [codex] · 2026-08-06 · see workspaces/document-templates/memory/decisions.md for rationale*
