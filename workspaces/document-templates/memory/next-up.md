# next-up.md — Prioritised Queue (document-templates)

1. [ ] **Wire templates into the site** — Decide with client: public static
   route, password-gated route, or admin/nav link (Options A/B/C in
   `memory/archive/session-handoff-2026-06.md`). Implement, then test browse → edit → print-to-PDF in
   Chrome and Safari. _Acceptance: templates reachable from the live site; no
   broken links; print produces a clean PDF with UI chrome hidden._
2. [ ] **Safari print verification** — run the full print workflow for all 9
   templates in Safari; log fixes.

## Someday / backlog
- Password protection (`express-basic-auth`) if client wants staff-only access.
- Auto-populate invoices from job data (`projects/` → template fields).
- Additional templates as needs arise (site-visit form, materials requisition).
