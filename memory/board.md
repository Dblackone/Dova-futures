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
| Card | Owner | Branch | Acceptance |
|------|-------|--------|------------|
_(empty)_

## In Review (with QA)
| Card | Owner | Branch | Review state |
|------|-------|--------|--------------|
| **OPS-02** Promote the repository to a product Hub and retire migrated app duplicates | @lead/vector [codex] | `codex/reorganize-product-hub` | Maker verification complete: external source/default deployments verified, 23 intelligence tests pass, scripts parse, Hub snapshot refreshes, artifact is `hub/` only, prototype and OneDrive prompt preserved. Automatic deployment is safely gated because `dovafutures.com` still belongs to this repo; domain transfer and independent checker remain open. |
| **DOVA-BRAND-SKILL** Package portable company-brand skill | @lead/vector | `docs/vector/dova-brand-skill` | Exact commit `0212965` passed an isolated Codex QA instance's full technical suite. Formal checker gate remains open because `@qa/vera` is registered to `claude-code` and `models/codex.md` forbids Codex from approving Codex-built work. |
| **AFUZE-DOCS-01** Verify Afuze quotation/invoice drafts | @lead/vector [codex] | `main` (untracked drafts) | ✅ **APPROVED** by @qa/vera [claude-code] 2026-08-13 — arithmetic, 12px body content, quote 2-page pagination, invoice 1-page rendering, A/B/C-only scope, footer markers, and draft safeguards pass |
| **AFUZE-PAY-01** Verify Afuze balance-payment invoice | @lead/vector [codex] | `main` (untracked draft) | ✅ **APPROVED** by @qa/vera 2026-08-24 — `INV-2026-AFUZE-003` reconciles ₦5,300,000 less ₦4,000,000 received to ₦1,300,000 due; one-page rendering, client details, Providus account, 12px body and draft safeguard pass |

## Blocked
_(empty)_

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
