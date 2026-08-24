# status.md — Current Snapshot (company-ops)

**Last updated:** 2026-08-24 — OPS-03 OneDrive ownership reorganization
**Health:** 🟡 on track; OneDrive migration complete, domain handoff and checker pending

## Now
- OneDrive business/personal/education records were reorganized by confirmed
  ownership into DOVA Futures Limited, NU-Avenue Resources Limited, Nature's
  Beauty Construction, Grail Message Foundation (GMF), Personal, Education,
  shared-library, other-organisation and review roots. The GitHub, ChatGPT,
  Claude Code, Custom Office Templates and application-working paths were
  retained. DOVA's `01_Projects` now has 19 project folders directly, without
  lifecycle or mapping wrappers; each project has the standard Documents,
  Design, Drawings and Models, Site, Media, Review and Archive structure. A
  reversible 502-operation register and validation records live in
  `OneDrive/Documents/Needs Review/_Migration_Control/2026-08-24/`.
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
- OPS-03 (2026-08-24): approved OneDrive reorganization and corrected flat DOVA project layout completed with 502 logged moves, no deletion/overwrite and all integrity checks passing.
- OPS-02 (2026-08-24): product-source separation and read-only Hub promotion; checker pending.
- OPS-01 (2026-07-18): collaboration architecture and repository tidy.

## Open / blocked
- Heartbeat automation not implemented (needs a scheduler decision: cron,
  GitHub Actions, or Claude Code scheduled tasks/Routines).
- Connector checklist in root CLAUDE.md §4 has no boxes ticked — confirm with
  principal which connectors are actually authorized.
- OneDrive is running, but shell-level checks cannot prove that all cloud-side
  uploads have completed. Keep the migration register until sync is visibly
  settled; 298 same-name-and-size candidate groups remain review-only.
- Website/Hub custom-domain handoff remains external and incomplete.

## Notes for the next run
- Keep `company/registry.md` roll-up current whenever any workspace's status
  materially changes.
