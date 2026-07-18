# decisions.md — Company-Wide Decision Log

> Decisions that affect the whole hub or multiple projects. Project-specific
> decisions live in that workspace's `memory/decisions.md`.
> Format: date — decision — alternatives considered — reason

- 2026-07-05 — BIM naming/automation system lives in top-level `bim-standards/` — (detail moved to `workspaces/bim-standards/memory/decisions.md`)
- 2026-07-09 — Repo reorganized into a multi-project hub: `company/` shared control point + `workspaces/` per-project dossiers with their own memory, root `CLAUDE.md` rewritten as a router — considered a physical monorepo restructure (`projects/<name>/`) — because GitHub Pages ships the entire repo root and Render ships `dova-preorder/`; the overlay isolates per-project context with zero deploy risk. Physical migration remains a documented, deferred option (`company/registry.md`).
- 2026-07-09 — Brand tokens single-sourced in `company/brand.md` — considered leaving copies in project/README, SESSION_HANDOFF, and context/05 — because three drifting copies of hex values is how brands rot; all other files now link instead of re-declaring.
- 2026-07-18 — Multi-session collaboration scaffolding + folder renames (Wave 0/1) — added governance/collaboration.md (branch-per-session, write-scope, sandbox/drafts promotion flow), CODEOWNERS, PR template; renamed `project/`→`templates/`, `jobs/`→`projects/`, `bim-standards/pyRevit-extension/`→`pyrevit-plugin/`; moved `TEAM.md`→`governance/team.md`, `SESSION_HANDOFF.md`+`chats/`→`memory/archive/` — considered a physical `apps/` monorepo (deferred, needs deploy rewiring) — because branches are the isolation mechanism and descriptive folder names + a written contract prevent the accidental-modification and cross-session-collision problems; no deployed paths moved.
