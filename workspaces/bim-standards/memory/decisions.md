# decisions.md — Decision Log (bim-standards)

> Format: date — decision — alternatives considered — reason
> (Migrated from the old global memory/decisions.md.)

- 2026-07-05 — BIM naming/automation system lives in top-level `bim-standards/`, not `context/` or `project/` — considered folding it into `context/06-...md` — because it's firm operational standards for Revit work, not agent context for the website codebase, and not a client-facing document template.
- 2026-07-05 — Automation built as a pyRevit extension (plain-text Python) rather than Dynamo graphs or docs-only checklists — considered Dynamo (JSON graphs, hard to diff) and docs-only (no time saved) — because pyRevit is free, firm-wide, requires no build step, and every tool is reviewable as a normal `.py` file.
