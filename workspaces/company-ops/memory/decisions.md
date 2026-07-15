# decisions.md — Decision Log (company-ops)

> Format: date — decision — alternatives considered — reason

- 2026-07-09 — Hub organized as an overlay (company/ + workspaces/ + router CLAUDE.md) with all code left at historical paths — considered a physical monorepo restructure (projects/<name>/) — because GitHub Pages ships the entire repo root and Render ships dova-preorder/, so moving code risks both live deploys; the overlay achieves per-project context isolation with zero deploy risk. Physical migration documented as a deferred option in company/registry.md.
