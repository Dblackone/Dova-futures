# next-up.md — Prioritised Queue (document-templates)

1. [ ] **Wire templates into the site** — Decide with client: public static
   route, password-gated route, or admin/nav link (Options A/B/C in
   `memory/archive/session-handoff-2026-06.md`). Implement, then test browse → edit → print-to-PDF in
   Chrome and Safari. _Acceptance: templates reachable from the live site; no
   broken links; print produces a clean PDF with UI chrome hidden._
2. [ ] **Safari print verification** — run the full print workflow for all 9
   templates in Safari; log fixes.
3. [ ] **Resolve reference-prefix drift** — `documents/README.md` and the
   template HTML disagree on 4 documents: 02 quote is `QUO-` in HTML vs `QTE-`
   in docs; 09 is `MPA-` vs `MPR-`; 06 and 07 use `DOVA/MEMO/YYYY/XXX` and
   `DOVA/LTR/YYYY/XXX` rather than `IL-`/`EL-YYYY-NNN`. Principal decides which
   side is canonical, then align the other. Also decide whether the job-scoped
   form actually in use (`INV-2026-POOL-001`) becomes the documented standard.
   Templates also ship with `2025` baked into sample refs. _Acceptance: one
   convention, stated in `documents/README.md` and matching every template._

## Someday / backlog
- Password protection (`express-basic-auth`) if client wants staff-only access.
- Auto-populate invoices from job data (`projects/` → template fields).
- Additional templates as needs arise (site-visit form, materials requisition).
