# triage.md — Incoming, Not Yet Decided

> Where automations dump findings and where the loop parks anything out of scope.
> Triaged items move to next-up.md (do it) or get dropped (with a note).

| When | Item | Source | Severity | Decision |
|------|------|--------|----------|----------|
| <ts> | <what was found> | <automation / run> | low/med/high | pending |
| 2026-07-18 | Pre-existing dead link in `projects/DFL-2026-POOL-001_FHS-Hotel_Swimming-Pool-Ibafo/06-Reports/PROGRESS-REPORT-001_June-2026.html` line 22: `href="../../../project/templates/index.html"` — target never existed even before the `project/`→`documents/` rename (correct target should be `../../../documents/index.html`). Found during @qa/vera review of `claude/repo-organization-master-k7k9nm`; not a regression introduced by that branch. | @qa/vera (repo-organization-master-k7k9nm review) | low | pending |
