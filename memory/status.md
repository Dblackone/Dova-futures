# status.md — Current Snapshot

**Last updated:** 2026-07-05 — Session 5 (Access Road Erosion Repair quote — C. K. Musa)
**Health:** 🟢 on track

## Now
- New job folder `jobs/DFL-2026-ROAD-001_C-K-Musa_Access-Road-Afuze/` with a
  draft Project Quote (`01-Documents/QTE-2026-001.html`) for erosion repair of
  the access road serving Mr. C. K. Musa's residence, Afuze, Edo State.
  Items 1–4 now firm with client-supplied rates: cutting & levelling ₦200,000
  (LS); filling sand 3 trips @ ₦240,000 (₦720,000); blockwork-lined drain 50m
  @ ₦25,000/m (₦1,250,000); earth drain 50m @ ₦2,500/m (₦125,000) — subtotal
  ₦2,295,000. Pavement area confirmed at 200m² (proposed, to be verified by
  site measurement before mobilisation); both alternates fully priced —
  Alternate A (concrete, ₦16,500/m²) Grand Total ₦6,014,625; Alternate B
  (interlocking, ₦13,500/m², recommended) Grand Total ₦5,369,625. Only the
  client's final choice of alternate remains open. Added a client-facing
  "Why the Drainage System Is Needed" section explaining the two-stage
  drainage design (cross-road blockwork channel with a perforated metal
  cover at the head of the works, transitioning to an earth drain tying
  into the existing roadside drain toward the expressway); Items 3/4
  descriptions updated to match. QTE-2026-001 is complete and ready to
  present — this will be the *first* document shown to Mr. Musa on this
  job (confirmed nothing has been sent yet). No invoice exists or should
  be drafted until the client has seen the quote, picked a pavement
  alternate, and the principal has confirmed the payment stage — needs
  principal approval before sending. Print/PDF output spans 3 pages (added
  content pushed it past one page). Fixed the DOVA header and RC-No./
  website/QTE-ref footer to repeat correctly on every page using
  `@page { margin: 0; }` + `position: fixed; top:0/bottom:0` (works for
  both the template's own `window.print()` button and automated PDF
  generation); also fixed the page-shell's cream background bleeding
  through as a border on every printed page. An earlier iteration used a
  reserved `@page` margin, which left an unwanted blank gap before the
  header on every page — removed. While chasing that, found and fixed a
  more serious bug: the scope table could split mid-row across a page
  break, and the fixed footer then painted over the stranded cells,
  genuinely hiding pricing data (Item 2's Trip/₦240,000/₦720,000 values
  were invisible in one iteration). Fixed by giving `.scope-table` (and
  its rows) `break-inside: avoid`, so the whole table now moves to the
  next page as one block rather than splitting — no cells can ever end up
  hidden behind the footer. Verified by rendering to PDF with
  Playwright/Chromium and visually checking every page for gaps, overlap,
  and completeness of all pricing figures.
- New `bim-standards/` folder: firm-wide Revit naming system (Projects, Sheets,
  Levels, Materials, Families, View Templates), a project-template build
  manifest, a loadable shared-parameter file, and a working pyRevit extension
  (5 tools) — see `bim-standards/README.md`.
- Not yet independently verified by a checker run (this was a maker-only
  session) — pyRevit tools have been syntax-checked (`py_compile`) but not
  run inside Revit against a live model.
- 9 print-ready HTML document templates + gallery index still deployed to `project/` directory, not yet wired into Express routes.

## Recently done (last 3)
- Session 5 (2026-07-05): Drafted `QTE-2026-001` — Project Quote for C. K. Musa access road erosion repair (Afuze, Edo State); job folder created under `jobs/`.
- Session 4 (2026-07-05): Built `bim-standards/` — Revit naming conventions, project template manifest, shared parameters, project register, and pyRevit automation extension (Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates).
- Session 3 (2026-06-22): Created 9 branded HTML document templates from Claude Design export; committed and pushed to main.

## Open / blocked
- QTE-2026-001 needs a site/topographic survey to convert `[TBC]` quantities
  and rates into firm figures before it can be sent to the client; also needs
  client confirmation of concrete (Item 5) vs. interlocking (Item 6) surface.
- BIM standards need a checker run (e.g. `@qa/vera`) — verify the pyRevit
  tools actually work inside a real Revit + pyRevit session (script logic was
  reviewed and syntax-checked but never executed against the Revit API).
- Templates not yet served via Express route — need client decision on public vs. staff-only access.
- Contact form backend not deployed — SMTP env vars not configured on Render.
- Real project photography and social media handles not supplied by client yet.

## Notes for the next run
- Stack: Node/Express on Render; frontend is a single-page `index.html`; templates are standalone HTML files in `project/`.
- BIM standards are firm operational docs, unrelated to the website codebase — see `bim-standards/README.md` as the entry point, not `context/`.
- No test suite. Manual smoke-test for /api/contact.
- Templates use `contenteditable` + `window.print()` — no JS framework or build step.
- Read `SESSION_HANDOFF.md` Section "SESSION 3" for full template integration options before acting.
