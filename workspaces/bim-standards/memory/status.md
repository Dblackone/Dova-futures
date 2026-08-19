# status.md — Current Snapshot (bim-standards)

**Last updated:** 2026-08-19 — project naming convention clarification by @lead/vector [codex]
**Health:** 🟢 on track

## Now
- **Project naming standard clarified:** `01-naming-projects.md` now defines the
  canonical DOVA project code, Revit Project Information fields, numbered
  project folders (`00`–`09` + `99_Archive`), and a purpose-based filename rule;
  cross-references in the sheet and family standards now use
  `04_BIM_and_CAD/`.
- **Tools verified live:** the 5 pyRevit tools were run against an open Revit
  2026 document via the `Revit_Connector` MCP (not just `py_compile`) —
  collectors, Transaction usage, and BuiltInParameter access all confirmed
  working against the real API. 2 real bugs found + fixed and re-verified
  (commit a16e731): `MATERIAL_NAME_RE` rejected the hyphenated categories
  (`Finish-Flooring/Wall/Ceiling`), and `ViewType.ProjectBrowser` was missing
  from the exclusion list so Revit's internal "Project View" was mis-flagged.
- **First real template built:** `bim-standards/templates/DovaFutures_Architecture_Template.rte`
  (Revit 2027): firm level numbering, `DF_ProjectCode` bound, all 15 firm view
  templates built (12 assigned), stock view templates deleted, default 3D view +
  sheet-list/room schedules + cover/index sheets added. Naming QA Audit: 0
  sheet/level/view violations (~105 material violations remain — firm material
  library not yet loaded).
- Template blockers (genuine Revit API limits): Phases can't be renamed/created
  via API (needs ~2 min manual Phasing-dialog work); `.rte` documents refuse
  `EnableWorksharing()` so worksets belong in a per-project setup step
  (candidate: extend the New Project Setup pyRevit tool).

## Recently done (last 3)
- BIM-04 (2026-08-19): project folder and file naming convention clarified from
  the existing DOVA code standard; no register rows changed.
- BIM-03 (2026-07-06): Architecture Template `.rte` built live in Revit 2027.
- BIM-02 (2026-07-06): 5 tools verified against live Revit 2026; 2 bugs fixed.
- BIM-01 (2026-07-05): entire `bim-standards/` system created (PR #18).

## Open / blocked
- `@qa/vera` pass on a **real firm project** (this test used the stock Revit
  template — no real project content, no `DF_ProjectCode` bound).
- Phases (CO–AB) — manual Revit UI task on the template.
- Firm binary assets don't exist yet: titleblock family, keynote file, tag
  families, material library (stock "A1 metric" titleblock used as placeholder).

## Notes for the next run
- Entry point is `bim-standards/README.md`.
- Register CSV + shared-parameter file are append-only singletons.
- BIM-04 is maker work; an independent checker should review the updated naming
  docs before firm-wide adoption.
- `View.CreateViewTemplate()` is the correct API for making view templates
  (`IsTemplate` has no public setter) — see BIM-03 done-log entry for detail.
