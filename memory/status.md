# status.md — Current Snapshot

**Last updated:** 2026-07-06 — Session 5 (BIM standards verified live in Revit)
**Health:** 🟢 on track

## Now
- `bim-standards/` firm-wide Revit naming system (Projects, Sheets,
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
- Session 5 (2026-07-06): Live-verified all 5 `bim-standards/` pyRevit tools against a running Revit 2026 session via `Revit_Connector`; fixed 2 bugs found during verification (material-name regex, ProjectBrowser view-type exclusion).
- Session 4 (2026-07-05): Built `bim-standards/` — Revit naming conventions, project template manifest, shared parameters, project register, and pyRevit automation extension (Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates).
- Session 3 (2026-06-22): Created 9 branded HTML document templates from Claude Design export; committed and pushed to main.

## Open / blocked
- BIM standards would still benefit from a `@qa/vera` pass on a real firm
  project (this session's live test used Revit's stock out-of-box template,
  not a firm `.rte` with `DF_ProjectCode` bound or real project content).
- Templates not yet served via Express route — need client decision on public vs. staff-only access.
- Contact form backend not deployed — SMTP env vars not configured on Render.
- Real project photography and social media handles not supplied by client yet.

## Notes for the next run
- Stack: Node/Express on Render; frontend is a single-page `index.html`; templates are standalone HTML files in `project/`.
- BIM standards are firm operational docs, unrelated to the website codebase — see `bim-standards/README.md` as the entry point, not `context/`.
- No test suite. Manual smoke-test for /api/contact.
- Templates use `contenteditable` + `window.print()` — no JS framework or build step.
- Read `SESSION_HANDOFF.md` Section "SESSION 3" for full template integration options before acting.
