# next-up.md — Prioritised Queue (bim-standards)

1. [ ] **`@qa/vera` pass on a real firm project** — the 2026-07-06 live test
   used Revit's stock out-of-box template (no real project content, no
   `DF_ProjectCode` shared parameter bound). Run the 5 tools again against an
   actual firm project started from `DovaFutures_Architecture_Template.rte`,
   to catch anything the stock template couldn't surface.
2. [ ] **Finish the Architecture Template manually** — Phases CO/SD/DD/CD/CA/AB
   via the Revit Phasing dialog (~2 min, API can't do it), then re-run the
   Naming QA Audit.
3. [ ] **Move workset creation into New Project Setup** — `.rte` files refuse
   `EnableWorksharing()`; extend the pyRevit tool to enable worksharing +
   create the 6 firm worksets when a project starts from the template.
4. [ ] **Create firm binary assets** — titleblock family (replace stock
   "A1 metric" placeholder), keynote file, tag families, material library
   (clears the ~105 material naming violations on the template).
5. [ ] **Adopt on live jobs** — apply the standard to the FHS Pool project
   models (coordinate with `workspaces/client-jobs`, job DFL-2026-POOL-001).

## Someday / backlog
- pyRevit tool that appends to the project register CSV automatically.
- Structure/MEP variants of the `.rte` template per file 07.
