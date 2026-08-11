# next-up.md — Prioritised Queue (document-templates)

0. [ ] **GATE — principal reviews the Phase 2 samples.** `drafts/samples/` (ten
   documents + `README.md`). Nothing in the document-system effort proceeds
   until this is done. Read the README's §7 "What to look at hardest" first.
   _Acceptance: principal's corrections captured; Phase 3 unblocked._

1. [ ] **Decide the pagination strategy — now blocking.** Five templates (01,
   02, 04, 08, 09) exceed one A4 page while completely empty, and all nine
   hardcode a `Page 1 of 1` footer, so any two-page document prints that footer
   mid-document and nothing on page 2. Choose between the `thead`/`tfoot`
   spacer pattern (`QTE-2026-001`) and the two-pass `render-pdf.js` splice —
   `documents/TEMPLATE-INVENTORY.md` §4 finding 5 — and apply it library-wide.
   Also add `@page :first { margin-top: 0 }` so `render-pdf.js` works at all.
   Measurements and method: `drafts/samples/README.md` §4. _Acceptance: every
   template renders with correct running headers and a truthful page footer at
   whatever length its content reaches._

2. [ ] **Apply the 12pt body scaling** the principal asked for on 2026-07-31
   (`memory/board.md`) across all ten templates + `documents/_ds/`. Do this
   **after** item 1 — the same change added a page to `RPT-2026-DEMO-001`, so
   scaling before pagination is settled just moves the problem.

3. [ ] **Resolve reference-prefix drift** — `documents/README.md` and the
   template HTML disagree on 4 documents: 02 is `QUO-` in HTML vs `QTE-` in
   docs; 09 is `MPA-` vs `MPR-`; 06 and 07 use `DOVA/MEMO/YYYY/XXX` and
   `DOVA/LTR/YYYY/XXX` rather than `IL-`/`EL-YYYY-NNN`. Principal decides which
   side is canonical, then align the other. Also decide whether the job-scoped
   form actually in use (`INV-2026-POOL-001`) becomes the documented standard,
   and add the missing reference fields to templates 04, 05 and 08 — they have
   none at all. Templates also ship with `2025` baked into sample refs.
   _Acceptance: one convention, stated in `documents/README.md` and matching
   every template._

4. [ ] **Wire templates into the site** — Decide with client: public static
   route, password-gated route, or admin/nav link (Options A/B/C in
   `memory/archive/session-handoff-2026-06.md`). Implement, then test browse →
   edit → print-to-PDF in Chrome and Safari. _Acceptance: templates reachable
   from the live site; no broken links; print produces a clean PDF with UI
   chrome hidden._

5. [ ] **Safari print verification** — run the full print workflow for all ten
   templates in Safari; log fixes.

6. [ ] **Independent checker review of the portable DOVA brand skill** — verify
   source precedence, copied-asset integrity, Codex discovery, and one branded
   output from a fresh session. _Acceptance: checker approves or lists precise
   corrections; principal still controls merge._

7. [ ] **Review website handover design-system extraction** — confirm the new
   repository consumes the canonical token files and does not carry stale README
   claims or an unapproved local token fork.

## Someday / backlog
- Password protection (`express-basic-auth`) if client wants staff-only access.
- Auto-populate invoices from job data (`projects/` → template fields).
- Additional templates as needs arise (site-visit form, materials requisition,
  and the three types used in practice with no template: variation quote,
  combined Report & Quotation, email covering note).
