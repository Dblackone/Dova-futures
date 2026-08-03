# Project Decisions

- 2026-08-03 - approval UX - alternatives considered: discard the pending request and require the user to retype it, or retain one exact pending local action until the explicit approval button is pressed - retain one pending action so approval resumes the request the user already reviewed without broadening the action scope - logged by @qa/quartz [codex].

## 2026-08-03 — Package as a dedicated hub workspace

The project will move into `workspaces/dova-futures-intelligence/` in the Dova-futures repository. The hub root and `dova-preorder/` are deploy-critical and must remain untouched. This keeps the AI platform isolated while allowing Codex to continue with the company repository's routing and memory conventions.
