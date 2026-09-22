# Source map and refresh rules

This portable package was assembled from the Dova-futures company hub on 6 August 2026. The captured source commit is `ce9d548301b188016c0aeab40da849dc71a9e0b3`.

| Packaged file | Canonical repository source |
|---|---|
| `references/brand.md` | `company/brand.md` |
| `references/voice-and-tone.md` | `company/voice-and-tone.md` |
| `references/company-goals.md` | `company/goals.md` |
| `references/company-ethics.md` | `company/ethics.md` |
| `references/document-policy.md` | `company/document-policy.md` |
| `assets/design-system/` | Sanitised token subset of `documents/_ds/dova-futures-design-system-*/` |
| `assets/brand/dova-letterhead-lockup-on-dark.svg` | Extracted from the fixed header in `documents/templates/00-Letterhead.html` |
| `assets/logo-variations/` | Principal-approved placement pack copied from the review export and optimised as RGB PNGs |
| `references/logo-usage.md` | Placement guide copied from the canonical design-system `logo-usage.md` |
| `assets/legacy-logos/` | Quarantined inventory copied from `assets/logo/`; not approved for new work |
| `references/DESIGN.md` | Semantic synthesis of the canonical company layer and programmatic CSS tokens |

## Precedence

Treat `company/brand.md`, `company/voice-and-tone.md`, and the other `company/` policy files in the canonical repository as authoritative. Treat the programmatic CSS as the implementation source where it expands the canonical core palette into scales, aliases, spacing, effects, and type sizes.

The original design-system README and compiled demo bundle contain historical narrative material and unverified metrics. They are deliberately excluded. Do not use them as authority for the legal name, approved tagline, founder biography, company reach, metrics, project claims, or contact details when they conflict with the `company/` layer.

The historical raster files visibly contain the retired “Rethink the future” line and remain in `assets/legacy-logos/` for provenance. The active placement pack is the separate `assets/logo-variations/` set. It is an opaque RGB PNG export set; the active SVG lockup is still extracted from the canonical letterhead fixed header.

## Refresh

When updating this package:

1. Copy canonical policy files again; do not edit the snapshots independently.
2. Copy the design-system CSS token files only. Audit any component or demo bundle for claims before packaging it.
3. Reconcile `references/DESIGN.md` with changed tokens or approved visual rules.
4. Re-extract the active SVG lockup from the canonical letterhead if its fixed header changes.
5. Copy the approved `assets/logo-variations/` pack and its manifest from the design system.
6. Re-run the skill validator and compare copied assets with their sources.
7. Record the new capture date and source commit.

When using the package outside the canonical repository, record deliberate local deviations in that project's decision log. Never silently change a DOVA brand constant.

---
*Drafted by @lead/vector [codex] · 2026-08-06 · see workspaces/document-templates/memory/decisions.md for rationale*
