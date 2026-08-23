# Project Decisions

- 2026-08-19 - external tool integration boundary - alternatives considered: vendor six upstream repositories, install every tool globally on the workstation, or keep skills and CLIs repository-scoped while treating desktop/server applications as services - install portable agent skills under `.agents/skills`, pin CLI dependencies under `integrations/`, isolate Agent Reach in an ignored virtual environment, and connect Voicebox over localhost MCP/HTTP without vendoring its application - avoids contaminating live website dependencies, keeps credentials and personal data out of git, preserves upstream licence boundaries, and makes the installation reproducible - logged by @lead/vector [codex].

- 2026-08-19 - first hub interface boundary - alternatives considered: replace the live root website immediately, build a new framework application, or stage a local dashboard beside the existing intelligence core - create a dependency-free browser dashboard under `hub/` with a refreshable Python snapshot, keep it read-only, and defer root promotion until the website and preorder repositories are supplied and independently verified - preserves live deployments, avoids a new frontend stack, and gives the principal a usable repository view now - logged by @lead/vector [codex].

- 2026-08-03 - master brief boundary - alternatives considered: discard the older DOVA OS specifications, merge them wholesale into the current orchestration plan, or use them as the deterministic project/knowledge/workflow substrate beneath Jarvis - combine them as layered responsibilities, keeping Jarvis as the control plane and DOVA OS as the local-first substrate - preserves useful prior design while preventing premature autonomous-agent scope - logged by @qa/quartz [codex].

- 2026-08-03 - repository index boundary - alternatives considered: scan and load every workspace at startup, expose no project context, or read the registry plus this workspace's own memory - use registry and local intelligence metadata only for the first dashboard so startup is lightweight and does not execute or mutate other workspaces - logged by @qa/quartz [codex].

- 2026-08-03 - naming and shell - alternatives considered: retain MARK/JARVIS branding, rename compatibility internals wholesale, or move the active surface to DOVA Intelligence while preserving stable legacy tool identifiers - use DOVA Intelligence for the visible UI and active prompt; retain legacy identifiers only where compatibility depends on them - logged by @qa/quartz [codex].

- 2026-08-03 - approval UX - alternatives considered: discard the pending request and require the user to retype it, or retain one exact pending local action until the explicit approval button is pressed - retain one pending action so approval resumes the request the user already reviewed without broadening the action scope - logged by @qa/quartz [codex].

## 2026-08-03 — Package as a dedicated hub workspace

The project will move into `workspaces/dova-futures-intelligence/` in the Dova-futures repository. The hub root and `dova-preorder/` are deploy-critical and must remain untouched. This keeps the AI platform isolated while allowing Codex to continue with the company repository's routing and memory conventions.
