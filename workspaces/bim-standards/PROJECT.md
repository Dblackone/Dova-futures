# PROJECT.md — BIM Standards & pyRevit Toolkit

## Identity

- **Workspace slug:** `bim-standards`
- **One-line purpose:** The firm-wide Revit naming system (projects, sheets,
  levels, materials, families, view templates) + the pyRevit automation
  extension that enforces it.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — built (maker-only); checker run in real Revit pending

## Why this project exists

Company goal 3 (operational consistency): every Revit model, regardless of who
touches it, produces files, sheets, and views named the same way — making models
fast to open, coordinate, hand over, and reuse.

## Where the files live

**`bim-standards/`** — see its own `README.md` as the entry point:

| Path | Purpose |
|------|---------|
| `bim-standards/01…06-naming-*.md` | Naming conventions: projects, sheets, levels, materials, families, view templates |
| `bim-standards/07-project-templates.md` | What must be pre-built into the firm's `.rte` templates |
| `bim-standards/08-automation-pyrevit.md` | Extension install + tool docs |
| `bim-standards/registers/project-register.csv` | Master log of every project code issued — **append-only, never reuse/delete a row** |
| `bim-standards/shared-parameters/DovaFutures_SharedParameters.txt` | The ONE shared-parameter file — load once, never fork |
| `bim-standards/pyrevit-plugin/DovaBIM.extension/` | 5 tools: Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates |

## How to run / verify

- Docs: review against the examples inside each numbered file.
- Scripts: `python -m py_compile <script.py>` for syntax; real verification
  requires **Revit + pyRevit against a test model** (this is the outstanding
  checker task). Scope covers disciplines A/S/M/E/P/C/L/ID/FP.

## Project-specific rules & traps

- **The one rule:** every naming decision has exactly one correct answer,
  written down in this folder. If the standard doesn't cover a case, add it to
  `memory/triage.md` (root) and flag for a decision — never invent a one-off.
- The project register and shared-parameter file are firm-wide singletons —
  append-only / never forked (`company/ethics.md` applies).
- Python scripts are IronPython (pyRevit) — standard-library-only, no pip deps.

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` → 3. this file + `bim-standards/README.md` →
4. `workspaces/bim-standards/memory/status.md` + `next-up.md`
