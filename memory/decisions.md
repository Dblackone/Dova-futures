# decisions.md — Company-Wide Decision Log

> Decisions that affect the whole hub or multiple projects. Project-specific
> decisions live in that workspace's `memory/decisions.md`.
> Format: date — decision — alternatives considered — reason

- 2026-07-05 — BIM naming/automation system lives in top-level `bim-standards/` — (detail moved to `workspaces/bim-standards/memory/decisions.md`)
- 2026-07-09 — Repo reorganized into a multi-project hub: `company/` shared control point + `workspaces/` per-project dossiers with their own memory, root `CLAUDE.md` rewritten as a router — considered a physical monorepo restructure (`projects/<name>/`) — because GitHub Pages ships the entire repo root and Render ships `dova-preorder/`; the overlay isolates per-project context with zero deploy risk. Physical migration remains a documented, deferred option (`company/registry.md`).
- 2026-07-09 — Brand tokens single-sourced in `company/brand.md` — considered leaving copies in project/README, SESSION_HANDOFF, and context/05 — because three drifting copies of hex values is how brands rot; all other files now link instead of re-declaring.
