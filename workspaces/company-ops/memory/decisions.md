# decisions.md — Decision Log (company-ops)

> Format: date — decision — alternatives considered — reason

- 2026-08-24 — DOVA projects use one flat project list under `01_Projects` — considered lifecycle folders (`Active`, `On Hold`, `Completed`) and a project-mapping wrapper — keep every project directly under `01_Projects` and organise inside each project instead, because the principal wants the project list visible immediately and the working classification to occur at project-content level.

- 2026-08-24 — OneDrive reorganized first by confirmed owner, then by function — considered placing all construction material under DOVA Futures or classifying everything by file type — retained separate roots for DOVA Futures Limited, NU-Avenue Resources Limited, Nature's Beauty Construction and Grail Message Foundation (GMF), plus person-based Personal/Education roots, because former-employer, foundation and family records have distinct ownership; uncertain material goes to Needs Review, while GitHub and application working folders remain in place.

- 2026-08-24 — Product Hub boundary promoted — considered retaining duplicate applications, placing both products under a new `apps/` monorepo tree, or separating application source entirely — keep this repository as the company/product operations Hub, publish only `hub/`, and treat `Dova-futures-website` and `Dova-preorder` as external sources of truth because both migrations were independently verified and the separation reduces navigation ambiguity and accidental exposure.

- 2026-07-09 — Hub organized as an overlay (company/ + workspaces/ + router CLAUDE.md) with all code left at historical paths — considered a physical monorepo restructure (projects/<name>/) — because GitHub Pages ships the entire repo root and Render ships dova-preorder/, so moving code risks both live deploys; the overlay achieves per-project context isolation with zero deploy risk. Physical migration documented as a deferred option in company/registry.md.
