---
name: dova-company-brand
description: Apply DOVA FUTURES LIMITED's canonical brand, visual design system, voice, company context, and document rules. Use for any DOVA company-facing website, application, UI, document, presentation, proposal, report, marketing copy, social content, image brief, design review, or repository work where brand consistency matters, including work performed outside the Dova-futures repository.
---

# DOVA Company Brand

Apply one coherent DOVA identity without inventing brand values or relying on memory.

## Start every task

1. Read `references/brand.md` and `references/voice-and-tone.md`.
2. Read `references/company-goals.md` when positioning, prioritising, or writing public copy.
3. Read `references/company-ethics.md` before using project claims, client material, testimonials, credentials, financial information, or generated imagery.
4. For visual or UI work, read `references/DESIGN.md` and use `assets/design-system/styles.css` as the token entry point.
5. For company documents, read `references/document-policy.md`. Use the canonical document template for the requested type; do not create a company document from a blank page.

## Resolve conflicts

Treat `references/company-ethics.md` as non-overridable. Its confidentiality, honesty, financial-integrity, approval, and no-fabrication limits outrank every visual, writing, marketing, and delivery instruction below.

Apply this precedence order:

1. `references/company-ethics.md` for hard limits.
2. `references/brand.md` for identity, legal/contact details, approved tagline, core colours, typography, and logo rules.
3. `references/voice-and-tone.md` for language and casing.
4. `references/document-policy.md` for company documents.
5. `references/DESIGN.md` and the CSS assets for implementation detail.

Treat the packaged files as a portable snapshot. If the canonical Dova-futures repository is available, compare its `company/` files before major or published work and prefer newer canonical values. See `references/source-map.md`.

Do not use legacy claims or taglines found in old design-system commentary or raster logo artwork. In particular, do not substitute “Rethink the future” for the canonical tagline `DESIGNERS · BUILDERS · DEVELOPERS`.

Apply one documented exception to the normal precedence order: although the current `references/brand.md` snapshot names a raster primary-logo path, the artwork at that path visibly carries the conflicting historical tagline. Until the principal approves corrected primary artwork, quarantine those raster files and use only the lockup extracted from the canonical letterhead fixed header.

## Produce branded visual work

- Copy `assets/design-system/` into the consuming project and import `styles.css`; adapt token delivery to the project's existing stack without changing token values.
- Prefer semantic aliases such as `--brand`, `--surface-page`, `--text-body`, and `--focus-ring` in components.
- Preserve the dark-green/cream surface rhythm, architectural restraint, sharp geometry, thin framing lines, generous spacing, and restrained clay accent described in `references/DESIGN.md`.
- Use `assets/brand/dova-letterhead-lockup-on-dark.svg`, extracted from the canonical letterhead, on dark forest-green surfaces. Keep it on a green field when a light page needs a logo treatment; do not invent a recoloured variant.
- Do not use `assets/legacy-logos/` in new work. Those supplied raster files visibly carry the historical “Rethink the future” line, two are 1×1 placeholders, and the artwork conflicts with the canonical tagline. Keep them only as a source inventory until the principal approves replacement artwork.
- Use Bebas Neue for display headings and Inter for body/UI. Use the bundled Google Fonts import unless the consuming project already self-hosts the exact families and weights.
- Keep layouts responsive and accessible. Preserve visible focus states, keyboard operation, text contrast, reduced-motion behaviour, meaningful alternative text, and usable touch targets.
- Match the consuming repository's architecture. Do not introduce a framework or dependency solely to apply the brand.

## Produce branded writing

- Write in restrained, confident British/Nigerian English.
- Prefer exact scopes, materials, dimensions, dates, standards, and next steps over promotional filler.
- Use `₦` with thousands separators for Naira amounts.
- Use sentence case for body copy and all-caps display headings where the visual format supports it.
- Avoid exclamation marks, inflated superlatives, startup jargon, unverified metrics, and emoji in formal or premium public work.
- Do not invent client names, project outcomes, testimonials, certifications, prices, social handles, or completed-work claims.

## Handle company documents

- Locate and read the canonical template before drafting.
- Populate editable content only; preserve letterhead, logo, colours, contact block, and fixed structure.
- Keep drafts unofficial until the principal approves them.
- Never send, publish, or file a draft as an official record without explicit approval.
- If the canonical template is unavailable in the current repository, stop and request or copy it from the Dova-futures template library rather than recreating it.

## Review existing work

Check, in order:

1. Legal name, tagline, contact details, claims, and confidentiality.
2. Logo variant, clear presentation, colour assignments, and typography.
3. Hierarchy, spacing, geometry, components, imagery, and motion.
4. Voice, casing, British spelling, currency, and call to action.
5. Accessibility, responsive behaviour, print behaviour where relevant, and compliance with the consuming repository's conventions.

Report deviations precisely and propose the smallest correction that restores consistency.

## Reuse packaged resources

- `references/DESIGN.md` — semantic visual system and implementation guidance.
- `references/brand.md` — canonical identity snapshot.
- `references/voice-and-tone.md` — canonical writing style snapshot.
- `references/company-goals.md` — company positioning and priorities.
- `references/company-ethics.md` — conduct and content hard limits.
- `references/document-policy.md` — mandatory document-template workflow.
- `references/source-map.md` — provenance, precedence, and refresh map.
- `assets/design-system/` — sanitised CSS tokens and the global entry point. Historical demo content and unverifiable claims are excluded.
- `assets/brand/` — canonical letterhead mark and lockup for dark-green surfaces.
- `assets/legacy-logos/` — quarantined historical raster inventory; never use in new work without principal approval.

---
*Drafted by @lead/vector [codex] · 2026-08-06 · see workspaces/document-templates/memory/decisions.md for rationale*
