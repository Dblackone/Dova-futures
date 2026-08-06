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
| `assets/legacy-logos/` | Quarantined inventory copied from `assets/logo/`; not approved for new work |
| `references/DESIGN.md` | Semantic synthesis of the canonical company layer and programmatic CSS tokens |

## Precedence

Treat `company/brand.md`, `company/voice-and-tone.md`, and the other `company/` policy files in the canonical repository as authoritative. Treat the programmatic CSS as the implementation source where it expands the canonical core palette into scales, aliases, spacing, effects, and type sizes.

The original design-system README and compiled demo bundle contain historical narrative material and unverified metrics. They are deliberately excluded. Do not use them as authority for the legal name, approved tagline, founder biography, company reach, metrics, project claims, or contact details when they conflict with the `company/` layer.

The source raster logo files visibly contain the historical “Rethink the future” line even though `company/brand.md` defines `DESIGNERS · BUILDERS · DEVELOPERS` as the canonical tagline. Two source PNGs are only 1×1 pixels. The raster files remain in `assets/legacy-logos/` for provenance but must not be used until the principal resolves the artwork conflict. The active SVG lockup is extracted from the canonical letterhead's fixed header.

## Refresh

When updating this package:

1. Copy canonical policy files again; do not edit the snapshots independently.
2. Copy the design-system CSS token files only. Audit any component or demo bundle for claims before packaging it.
3. Reconcile `references/DESIGN.md` with changed tokens or approved visual rules.
4. Re-extract the active SVG lockup from the canonical letterhead if its fixed header changes.
5. Re-run the skill validator and compare copied assets with their sources.
6. Record the new capture date and source commit.

When using the package outside the canonical repository, record deliberate local deviations in that project's decision log. Never silently change a DOVA brand constant.

---
*Drafted by @lead/vector [codex] · 2026-08-06 · see workspaces/document-templates/memory/decisions.md for rationale*
