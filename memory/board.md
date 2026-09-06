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
| **TOOL-SUITE-01** Integrate six external AI tools | @lead/vector [codex] | `feat/vector/intelligence-tool-suite` | Hallmark and HyperFrames available as project skills; Voicebox, Agent Reach, Career Ops, and World Monitor have repository-scoped, non-secret installation/launch paths; upstream licences and runtime boundaries documented; intelligence tests pass |

## In Review (with QA)
| Card | Owner | Branch | Review state |
|------|-------|--------|--------------|
| **DOVA-BRAND-SKILL** Package portable company-brand skill | @lead/vector | `docs/vector/dova-brand-skill` | Exact commit `0212965` passed an isolated Codex QA instance's full technical suite. Formal checker gate remains open because `@qa/vera` is registered to `claude-code` and `models/codex.md` forbids Codex from approving Codex-built work. |
| **AFUZE-DOCS-01** Verify Afuze quotation/invoice drafts | @lead/vector [codex] | `feat/vector/intelligence-tool-suite` (working-tree drafts) | ✅ **APPROVED** 2026-08-21 — quotation, full invoice and short-form `INV-2026-AFUZE-002` pass Engineer C. K. Musa naming, consistent ₦5,300,000.00 lump sum, no VAT/professional-fee lines, 12px body and draft safeguards; short invoice is one page and contains all seven requested scope headings — verified by @qa/vera |

## Blocked
_(empty)_

## Done (pending merge approval)
| Card | Owner | Branch | Notes |
|------|-------|--------|-------|
| **HERO-01** Build before/after reveal component | @build/forge | `feat/forge/hero-reveal` | All 10 AC passed. ✅ APPROVED by @qa/vera 2026-06-14 |
| **OPS-01** Repo reorg: company hub + collaboration scaffolding + folder renames | @company-ops | `claude/repo-organization-master-k7k9nm` | All 8 acceptance criteria (A–H) passed. ✅ APPROVED by @qa/vera 2026-07-18. Minor watch-item: pre-existing dead link (not caused by this branch) logged to memory/triage.md. |
| **PERSONAL-CARD-01** Personal digital portfolio card | @lead/vector [codex] | external `feat/vector/personal-digital-card` · `9011324` | Technical review APPROVED: responsive card, portfolio/contact actions, share fallbacks, OG image, CRLF vCard and QR decode pass. Principal merge/deploy approval pending. |

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
