# done-log.md — Completed Work (append-only)

> Append a line every time a run finishes something. Never edit old entries.
> Format: date — what — outcome — verified by

- 2026-06-14 — HERO-01 hero reveal built — before/after slider with hover/touch support, hero text intact, no new npm deps — sanity checked via server + grep
- <date> — <what was done> — <outcome / result> — verified by <checker / tests>
- 2026-06-14 — HERO-01 QA verification — all 10 acceptance criteria passed; no anti-patterns, no new deps, no debug logging, setRandomHeroImage absent, assets confirmed present — verified by @qa/vera
- 2026-06-22 — TEMPLATES-01 — 9 standalone print-ready HTML document templates + gallery index created from Claude Design export; committed and pushed to main (commits ff64f00, 20af29a); all templates use contenteditable fields, window.print(), A4 @page CSS, DOVA brand tokens — verified by manual file review
- 2026-07-05 — BIM-01 — Created `bim-standards/` firm-wide Revit standard: naming conventions for Projects, Sheets, Levels, Materials, Families, and View Templates (files 01–06); a project-template build manifest (file 07); a real, loadable shared-parameter file (`DovaFutures_SharedParameters.txt`) and project register CSV; and a working pyRevit extension (`DovaBIM.extension`, 5 tools: Sheet Renumberer, Naming QA Audit, New Project Setup, Level Builder, Apply View Templates) — all `.py` scripts pass `py_compile` — verified by manual review + syntax check (maker run, not yet independently checked by a separate run)
