# board.md — Team Board (shared coordination)

> The office. Agents can't talk to each other, so they coordinate HERE.
> WIP limit: max 3 active.

## Backlog
_(empty)_

## Assigned
| Card | Owner | Branch | Acceptance |
|------|-------|--------|------------|
| **HERO-02** Supply placeholder before/after image pairs | @docs/quill | `docs/quill/hero-reveal-assets` | A `memory/decisions.md` entry noting placeholder strategy + instructions for swapping in real assets once available |

## In Progress
_(empty)_

## In Review (with QA)
_(empty)_

## Blocked
| Card | Owner | Branch | Blocker |
|------|-------|--------|---------|
| **DOVA-BRAND-SKILL** Package portable company-brand skill | @lead/vector | `docs/vector/dova-brand-skill` | ❌ REJECTED by @qa/vera [codex] 2026-08-06: remove stale tagline/claims from active reusable assets without breaking canonical provenance, replace the 1×1 UI icon, produce an auditable clean forward test, verify fresh-session discovery, and commit the candidate diff before re-review. |

## Done (pending merge approval)
| Card | Owner | Branch | Notes |
|------|-------|--------|-------|
| **HERO-01** Build before/after reveal component | @build/forge | `feat/forge/hero-reveal` | All 10 AC passed. ✅ APPROVED by @qa/vera 2026-06-14 |
| **OPS-01** Repo reorg: company hub + collaboration scaffolding + folder renames | @company-ops | `claude/repo-organization-master-k7k9nm` | All 8 acceptance criteria (A–H) passed. ✅ APPROVED by @qa/vera 2026-07-18. Minor watch-item: pre-existing dead link (not caused by this branch) logged to memory/triage.md. |

## Merged ✅
_(empty)_

## 2026-07-31 — cross-workspace request: template font sizes (client-jobs → document-templates)

The principal asked for a **general change across the template library**: body /
context text at **12pt**, other sizes increased accordingly. This was applied to
`workspaces/client-jobs/drafts/RPT-2026-DEMO-001` only (body 12.5px → 16px, all
other sizes × 1.28, letterhead untouched).

`documents/templates/` is owned by the **document-templates** workspace and is
read-only from client-jobs, so the library itself was NOT changed. A run in that
workspace should apply the same scaling across all ten templates plus
`documents/_ds/`, and check page counts — on RPT-2026-DEMO-001 the increase added
a page (7 → 8).
