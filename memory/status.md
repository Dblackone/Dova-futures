# status.md — Current Snapshot

**Last updated:** 2026-07-05 — Session 4 (BIM naming & automation standard)
**Health:** 🟢 on track

## Now
- New `bim-standards/` folder: firm-wide Revit naming system (Projects, Sheets,
  Levels, Materials, Families, View Templates), a project-template build
  manifest, a loadable shared-parameter file, and a working pyRevit extension
  (5 tools) — see `bim-standards/README.md`.
- Not yet independently verified by a checker run (this was a maker-only
  session) — pyRevit tools have been syntax-checked (`py_compile`) but not
  run inside Revit against a live model.
- 9 print-ready HTML document templates + gallery index still deployed to `project/` directory, not yet wired into Express routes.

## Recently done (last 3)
- Session 4 (2026-07-05): Built `bim-standards/` — Revit naming conventions, project template manifest, shared parameters, project register, and pyRevit automation extension (Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates).
- Session 3 (2026-06-22): Created 9 branded HTML document templates from Claude Design export; committed and pushed to main.
- Session 2 (2026-06-14): Added loop engineering scaffold (CLAUDE.md, agents, memory); built hero before/after reveal on homepage.

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
