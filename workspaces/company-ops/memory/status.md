# status.md — Current Snapshot (company-ops)

**Last updated:** 2026-08-24 — OPS-02 product Hub reorganization
**Health:** 🟡 on track; domain handoff and checker pending

## Now
- Hub organized into `company/` (shared control point), `workspaces/`
  (per-project isolation), and repository-level `hub/` (read-only Pages
  artifact); root `CLAUDE.md` is a router.
- Public website and preorder source now live exclusively in their independently
  verified external repositories. Duplicate application/media trees were
  retired from this branch; shared approved assets live in `company/assets/`.
- Full Hub UX prototype preserved under the DOVA Intelligence workspace. It is
  design-only; DOVA Intelligence implementation remains deferred.
- GitHub still assigns `dovafutures.com` to this Hub repository. Automatic Hub
  deployment is disabled until the domain moves to the website repository and
  `hub.dovafutures.com` is configured separately.
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
- OPS-02 (2026-08-24): product-source separation and read-only Hub promotion; checker pending.
- OPS-01 (2026-07-18): collaboration architecture and repository tidy.
- Session 5 (2026-07-09): initial Hub organization.

## Open / blocked
- Heartbeat automation not implemented (needs a scheduler decision: cron,
  GitHub Actions, or Claude Code scheduled tasks/Routines).
- Connector checklist in root CLAUDE.md §4 has no boxes ticked — confirm with
  principal which connectors are actually authorized.
- OneDrive content remains unmoved. A metadata-only inventory and reviewed
  migration plan must precede any file reorganization.
- Website/Hub custom-domain handoff remains external and incomplete.

## Notes for the next run
- Keep `company/registry.md` roll-up current whenever any workspace's status
  materially changes.
