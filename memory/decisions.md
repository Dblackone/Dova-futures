# decisions.md — Decision Log

> Why we chose X over Y, so we never relitigate it. One entry per real decision.
> Format: date — decision — alternatives considered — reason

- <date> — <what we decided> — considered <alternatives> — because <reason>
- <date> — <what we decided> — considered <alternatives> — because <reason>
- 2026-07-05 — BIM naming/automation system lives in new top-level `bim-standards/`, not `context/` or `project/` — considered folding it into `context/06-...md` — because it's firm operational standards for Revit work, not agent context for running this website codebase, and not a client-facing document template; keeping it separate avoids conflating the two.
- 2026-07-05 — Automation built as a pyRevit extension (plain-text Python scripts) rather than Dynamo graphs or docs-only checklists — considered Dynamo (JSON graphs, harder to diff/review as text) and docs-only (no time saved) — because pyRevit is free, firm-wide, requires no build step, and every tool is reviewable/editable as a normal `.py` file.
- 2026-07-05 — QTE-2026-001 (C. K. Musa access road) left with `[TBC]` quantities/rates instead of estimated figures — considered inventing placeholder numbers from assumed dimensions — because no survey data was available and a priced quote with fabricated volumes/costs could mislead the client; `context/05-document-templates.md` requires drafts only, never invented figures, until approval.
- 2026-07-05 — Floor-over-fill surface priced as two alternates (concrete slab vs. interlocking pavers) in one quote rather than issuing two separate quotes — considered separate documents — because both share the same job/quote number and header, and a single scope table with a clear "pick one" note is simpler for the client to compare and sign off on.
