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
  ₦2,295,000. Items 5/6 (concrete @ ₦16,500/m² vs. interlocking @ ₦13,500/m²,
  priced as alternates) have confirmed rates but quantity is still `[TBC]`
  pending pavement-area survey; Grand Total pending that + client's alternate
  choice. Draft only, not yet sent to client.
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
