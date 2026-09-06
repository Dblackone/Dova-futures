# decisions.md — Decision Log (company-ops)

> Format: date — decision — alternatives considered — reason

- 2026-08-24 — Product Hub boundary promoted — considered retaining duplicate applications, placing both products under a new `apps/` monorepo tree, or separating application source entirely — keep this repository as the company/product operations Hub, publish only `hub/`, and treat `Dova-futures-website` and `Dova-preorder` as external sources of truth because both migrations were independently verified and the separation reduces navigation ambiguity and accidental exposure.

- 2026-07-09 — Hub organized as an overlay (company/ + workspaces/ + router CLAUDE.md) with all code left at historical paths — considered a physical monorepo restructure (projects/<name>/) — because GitHub Pages ships the entire repo root and Render ships dova-preorder/, so moving code risks both live deploys; the overlay achieves per-project context isolation with zero deploy risk. Physical migration documented as a deferred option in company/registry.md.
