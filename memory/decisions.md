# decisions.md — Decision Log

> Why we chose X over Y, so we never relitigate it. One entry per real decision.
> Format: date — decision — alternatives considered — reason

- <date> — <what we decided> — considered <alternatives> — because <reason>
- <date> — <what we decided> — considered <alternatives> — because <reason>
- 2026-07-05 — BIM naming/automation system lives in new top-level `bim-standards/`, not `context/` or `project/` — considered folding it into `context/06-...md` — because it's firm operational standards for Revit work, not agent context for running this website codebase, and not a client-facing document template; keeping it separate avoids conflating the two.
- 2026-07-05 — Automation built as a pyRevit extension (plain-text Python scripts) rather than Dynamo graphs or docs-only checklists — considered Dynamo (JSON graphs, harder to diff/review as text) and docs-only (no time saved) — because pyRevit is free, firm-wide, requires no build step, and every tool is reviewable/editable as a normal `.py` file.
