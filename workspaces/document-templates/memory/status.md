# status.md — Current Snapshot (document-templates)

**Last updated:** 2026-08-06 — Portable DOVA company-brand skill packaged and
registered globally in Codex; Document System Phase 2 still awaits review
**Health:** 🟡 blocked on review — and Phase 2 surfaced a high-severity library
defect (see "Open / blocked")

## Now
- **10** print-ready branded templates in `documents/` — the original 9 (Session
  3, 2026-06-22) plus `00-Letterhead` (html/pdf/docx, added 2026-07-10 via
  `scripts/gen-letterhead-docx.mjs`, which pulls `docx` + `sharp` from the root
  package.json) — plus a gallery index, `.docx` versions, and the Claude
  Design sources.
- Design system tokens in `documents/_ds/dova-futures-design-system-*/`.
- Company-wide usage rule is `company/document-policy.md`.
- Portable Codex skill at `.agents/skills/dova-company-brand/`, globally linked
  at `C:\Users\User\.codex\skills\dova-company-brand` for use from other repos.
- **Document System Phase 2 done:** ten sample documents in
  `drafts/samples/`, one per template, sharing one fictional client and project
  (Aterin Heights Limited / `SAMPLE-2026-ATH-001`). Read that folder's
  `README.md` first — it holds the figures, the reconciliation, the
  verification and the questions for the principal.
- Templates are NOT yet reachable from the live site (no Express route / nav
  link decided).

## Recently done (last 3)
- Portable DOVA company-brand Codex skill — canonical policy snapshots,
  semantic `DESIGN.md`, sanitised token CSS, a canonical-letterhead SVG lockup,
  and quarantined legacy logo inventory; validated and forward-tested after the
  first QA rejection. Awaiting re-review of the committed candidate.
- Phase 2 sample set — ten documents + review README (`drafts/samples/`).
  Awaiting principal review and a checker.
- `DOVA-Document-System.md` — portable offline reference for the whole template
  system. Awaiting checker.

## Open / blocked
- **BLOCKING — Phase 3 cannot start until the principal reviews the Phase 2
  samples.** That is the stated gate on the whole effort.
- 🔴 **Five templates overflow A4 while completely empty, and all nine hardcode
  a `Page 1 of 1` footer.** Measured 2026-08-02 in headless Chrome (A4 =
  1123 px at the 794 px width the templates are built to): 01 = 1297 px,
  02 = 1182 px, 04 = 1238 px, 08 = 1348 px, 09 = 1273 px. 07 has 51 px of
  headroom. Any two-page document prints `Page 1 of 1` mid-document and nothing
  on page 2. This makes the pagination-strategy decision blocking, not cosmetic.
  Six further template defects logged the same day — all in root
  `memory/triage.md`.
- Client decision needed: templates public, password-gated, or admin-linked
  (Options A/B/C in `memory/archive/session-handoff-2026-06.md` § Session 3).
- Full print-to-PDF workflow not yet verified in Safari.
- **Reference-prefix drift** — `documents/README.md` contradicts the HTML on 4
  templates (02, 06, 07, 09), and live jobs use a third, job-scoped form.
  Needs a principal decision, not a guess.
- Cross-workspace request still outstanding: apply the principal's 12pt body
  scaling across all ten templates + `documents/_ds/` (`memory/board.md`,
  2026-07-31). Note this interacts directly with the A4 overflow above — the
  same change added a page to `RPT-2026-DEMO-001`.

## Notes for the next run
- Never edit letterhead/logo/colours in templates — fixed by `company/brand.md`.
- `.dc.html` files need the Claude Design runtime; production files are the
  plain `.html` ones.
- To re-measure page heights, the method is in `drafts/samples/README.md` §4:
  headless Chrome via `workspaces/client-jobs/tools/node_modules/puppeteer-core`,
  print media emulated, measure `[data-paper]` against 1123 px.
