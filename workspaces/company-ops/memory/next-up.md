# next-up.md — Prioritised Queue (company-ops)

1. [ ] **Complete the domain handoff** — transfer `dovafutures.com` from this
   repository to `Dova-futures-website`, verify HTTPS/content, configure
   `hub.dovafutures.com`, then re-enable automatic Hub deployment.
2. [ ] **Close the OneDrive migration watch** — confirm the OneDrive client has
   finished syncing, spot-check the organisation roots, then review the 298
   same-name-and-size candidate groups. Do not delete or merge duplicates
   without separate approval; retain the rollback register until accepted.
3. [ ] **Request independent checker review of OPS-02** — verify the Hub-only
   Pages artifact, references, test results, and absence of unintended client
   file changes before merge.
4. [ ] **Confirm connector list** — with principal: tick the connectors actually
   in use in root `CLAUDE.md` §4 (GitHub, Todoist, Gmail, Calendar, Drive,
   Figma appear available in sessions).
5. [ ] **Wire up the heartbeat** — implement the daily triage run per
   `automations/heartbeat.md` (Claude Code Routines or GitHub Actions).
   _Acceptance: a scheduled run writes findings into root `memory/triage.md`._
6. [ ] **Retire/redirect stale pointers** — keep `memory/archive/session-handoff-2026-06.md` as a
   historical log; new sessions onboard via CLAUDE.md → company/ → workspace.

## Someday / backlog
- Archive convention for finished workspaces (e.g. `workspaces/_archive/`).
