# status.md — Current Snapshot

<<<<<<< Updated upstream
**Last updated:** 2026-07-05 — Session 4 (BIM naming & automation standard)
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
  principal approval before sending. Print/PDF output spans 3 pages
  (description + drainage rationale / pricing table / terms+totals+
  signatures — the drainage box fits on page 1 per user request, achieved
  by trimming paddings/clearances, not fonts). Repeating header/footer
  pattern, now stable after several iterations: `@page { margin: 0; }`,
  `.doc-header`/`.doc-footer` as `position: fixed; top:0/bottom:0`, and
  the flowing content wrapped in a `.layout-table` whose `thead`/`tfoot`
  contain print-only spacer divs
  (`.header-space` 140px / `.footer-space` 58px). Chromium repeats
  thead/tfoot on every printed page, so the spacers reserve real flow
  space under the fixed header and above the fixed footer on ALL pages —
  content can never start behind the header and there's a small clearance
  margin after the header/before the footer. Body fonts enlarged for
  readability (description 14px, scope table 13px, terms 12.5px, Grand
  Totals 18px). Print-only `.avoid-break` on the drainage box, scope
  section, totals boxes, and acceptance block keeps every section whole
  across page breaks (a mid-row table split once left Item 2's
  ₦240,000/₦720,000 figures hidden behind the fixed footer — that class
  of bug is closed). Page-shell's cream background is reset for print so
  it doesn't render as a border. Works for both the template's own
  `window.print()` button and automated PDF generation. Verified by
  rendering to PDF with Playwright/Chromium and visually checking every
  page.
- New `bim-standards/` folder: firm-wide Revit naming system (Projects, Sheets,
=======
**Last updated:** 2026-07-06 — Session 5 (BIM standards verified + first real template built in Revit 2027)
**Health:** 🟢 on track

## Now
- `bim-standards/templates/DovaFutures_Architecture_Template.rte` now exists (built live in Revit 2027 via `Revit_Connector`): correct level numbering, `DF_ProjectCode` shared param bound, 15 firm view templates (file 06) built and 12 assigned to their views, stock Revit view templates deleted, default 3D view + sheet-list/room schedules + cover/drawing-index sheets added. Naming QA Audit run against it: 0 sheet/level/view violations. Still needs Phases (CO-AB, blocked — Revit API won't rename/create Phase objects, needs manual Phasing dialog work) and Worksets (blocked — `.rte` documents refuse `EnableWorksharing()`; belongs in a per-project setup step instead) and firm assets not yet created (titleblock family, keynote file, tag families, material library — used stock Revit "A1 metric" titleblock as placeholder).
- `bim-standards/` firm-wide Revit naming system (Projects, Sheets,
>>>>>>> Stashed changes
  Levels, Materials, Families, View Templates), a project-template build
  manifest, a loadable shared-parameter file, and a working pyRevit extension
  (5 tools) — see `bim-standards/README.md`.
- The 5 pyRevit tools were run live against an open Revit 2026 document via
  the `Revit_Connector` MCP (not just `py_compile`) — collectors, Transaction
  usage, and BuiltInParameter access all confirmed working against the real
  API. Found + fixed 2 real bugs: `MATERIAL_NAME_RE` rejected the hyphenated
  categories (`Finish-Flooring/Wall/Ceiling`); the view-naming audit and
  Apply View Templates both mis-flagged Revit's internal `Project View`
  element because `ViewType.ProjectBrowser` wasn't in the exclusion list next
  to `Internal`/`SystemBrowser`. Both fixed and re-verified live.
- Still recommended before firm-wide rollout: a `@qa/vera` pass against a
  real firm project (not the Revit stock template used for this session's
  test), and loading `DovaFutures_SharedParameters.txt` into an actual
  `.rte` so `New Project Setup`'s `DF_ProjectCode` field has somewhere to
  write to (confirmed absent on the stock template used here — expected,
  not a bug).
- 9 print-ready HTML document templates + gallery index still deployed to `project/` directory, not yet wired into Express routes.

## Recently done (last 3)
- Session 4 (2026-07-05): Built `bim-standards/` — Revit naming conventions, project template manifest, shared parameters, project register, and pyRevit automation extension (Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates).
- Session 3 (2026-06-22): Created 9 branded HTML document templates from Claude Design export; committed and pushed to main.

## Open / blocked
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
