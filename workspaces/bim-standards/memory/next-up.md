# next-up.md — Prioritised Queue (bim-standards)

1. [ ] **Checker run in real Revit** — load
   `bim-standards/pyRevit-extension/DovaBIM.extension/` in Revit + pyRevit, run
   each of the 5 tools against a test model, confirm the Naming QA Audit
   regexes match the examples in files 02–06. _Acceptance: all 5 tools run
   without error; ≥1 intentional naming violation per category correctly
   flagged._ (Requires a machine with Revit — principal or staff.)
2. [ ] **Adopt on the live job** — apply the standard to the FHS Pool project
   models (coordinate with `workspaces/client-jobs`, job DFL-2026-POOL-001).

## Someday / backlog
- Build the actual `.rte` template files per `07-project-templates.md`.
- Add a pyRevit tool that appends to the project register CSV automatically.
