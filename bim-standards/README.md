# Dova Futures BIM Standards

> The firm-wide naming and template system for Revit work. This exists so every
> project — regardless of which architect, engineer, or contractor touches the
> model — produces files, sheets, levels, materials, families, and view
> templates that look and behave the same way. Consistency here is what makes
> models fast to open, coordinate, hand over, and reuse.

## Scope

Covers Architecture (A), Structure (S), Mechanical (M), Electrical (E),
Plumbing/Public Health (P), Civil (C), Landscape (L), Interior Design (ID),
and Fire Protection (FP).

## What's in here

| File | Covers |
|------|--------|
| [`01-naming-projects.md`](01-naming-projects.md) | Project codes, folder tree (CDE), model file names |
| [`02-naming-sheets.md`](02-naming-sheets.md) | Sheet numbers, sheet names, series ranges |
| [`03-naming-levels.md`](03-naming-levels.md) | Level names, elevations, cross-discipline matching |
| [`04-naming-materials.md`](04-naming-materials.md) | Material names, classes, keynotes |
| [`05-naming-families.md`](05-naming-families.md) | Family file names, type names, shared parameters, library tree |
| [`06-naming-view-templates.md`](06-naming-view-templates.md) | View template names, view names, required template set |
| [`07-project-templates.md`](07-project-templates.md) | What must be pre-built into the firm's `.rte` template files |
| [`08-automation-pyrevit.md`](08-automation-pyrevit.md) | The pyRevit extension: install + what each tool does |

Supporting assets:
- `registers/project-register.csv` — master log of every project code ever issued (append-only, never re-use or delete a row)
- `shared-parameters/DovaFutures_SharedParameters.txt` — the one shared parameter file every family and project must use (load once in Revit, never fork it)
- `pyrevit-plugin/DovaBIM.extension/` — the working automation toolkit (see file 08)

## The one rule that makes all of this work

**Every naming decision has exactly one correct answer, and it's written down
in this folder.** If you're about to type a sheet number, level name, material
name, family name, or view template name and you're guessing — stop and check
the relevant file first. If the standard doesn't cover a case you've hit, add
it to `memory/triage.md` and flag it for a decision rather than inventing a
one-off locally; that's how naming systems rot.

## Quick reference — all codes in one place

| Discipline | Code |
|---|---|
| General / multi-discipline | `G` |
| Civil | `C` |
| Landscape | `L` |
| Architectural | `A` |
| Interior Design | `ID` |
| Structural | `S` |
| Mechanical (HVAC) | `M` |
| Electrical | `E` |
| Plumbing / Public Health | `P` |
| Fire Protection | `FP` |

| Phase | Code |
|---|---|
| Concept Design | `CO` |
| Schematic Design | `SD` |
| Design Development | `DD` |
| Construction Documents | `CD` |
| Construction Administration | `CA` |
| As-Built / Record | `AB` |

These two tables are the atoms every other convention in this folder is built
from — a sheet number, a model file name, and a view template name all start
with the same discipline code.
