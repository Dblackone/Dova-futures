# status.md — Current Snapshot (company-ops)

**Last updated:** 2026-07-09 — Session 5 (hub reorganization; workspace created)
**Health:** 🟢 on track

## Now
- Hub reorganized into `company/` (shared control point) + `workspaces/`
  (per-project isolation); root `CLAUDE.md` is a router.
- Collaboration layer added (2026-07-18): `governance/collaboration.md`
  (branch-per-session, write-scope, sandbox/drafts promotion), `.github/`
  CODEOWNERS + PR template, gitignored `sandbox/`, per-workspace `drafts/`,
  scope READMEs for assets/public/data/scripts.
- Folder renames done: `project/`→`documents/`, `jobs/`→`projects/`,
  `pyRevit-extension/`→`pyrevit-plugin/`; `TEAM.md`→`governance/team.md`;
  `SESSION_HANDOFF.md`+`chats/`→`memory/archive/`.
- Heartbeat schedule documented (`automations/heartbeat.md`) but no scheduled
  runs are actually wired up yet.

## Recently done (last 3)
- Session 5 (2026-07-09): hub reorganization (this workspace's first entry).

## Open / blocked
- Heartbeat automation not implemented (needs a scheduler decision: cron,
  GitHub Actions, or Claude Code scheduled tasks/Routines).
- Connector checklist in root CLAUDE.md §4 has no boxes ticked — confirm with
  principal which connectors are actually authorized.

## Notes for the next run
- Keep `company/registry.md` roll-up current whenever any workspace's status
  materially changes.
