# scripts/ — Manually-Invoked Developer Utilities

One-off or repeatable utilities a human or session runs **on demand** to
generate or transform files. Currently: `gen-letterhead-docx.mjs` (builds the
letterhead `.docx` from brand tokens; deps `docx` + `sharp` in the root
`package.json`).

**Boundary with `automations/`:** if you type `node something.mjs` when you
need it → it's a script and lives here. If it's "every day at 09:00 an agent
run does X" — a schedule/trigger + prompt — it's an automation and lives in
`automations/`. Scripts are code; automations are cadence.

Each script gets a one-line usage comment at the top of the file. Scripts that
grow project-specific belong in that project's folder instead.
