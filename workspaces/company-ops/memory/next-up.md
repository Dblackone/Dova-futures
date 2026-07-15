# next-up.md — Prioritised Queue (company-ops)

1. [ ] **Confirm connector list** — with principal: tick the connectors actually
   in use in root `CLAUDE.md` §4 (GitHub, Todoist, Gmail, Calendar, Drive,
   Figma appear available in sessions).
2. [ ] **Wire up the heartbeat** — implement the daily triage run per
   `automations/heartbeat.md` (Claude Code Routines or GitHub Actions).
   _Acceptance: a scheduled run writes findings into root `memory/triage.md`._
3. [ ] **Retire/redirect stale pointers** — keep `SESSION_HANDOFF.md` as a
   historical log; new sessions onboard via CLAUDE.md → company/ → workspace.

## Someday / backlog
- Archive convention for finished workspaces (e.g. `workspaces/_archive/`).
