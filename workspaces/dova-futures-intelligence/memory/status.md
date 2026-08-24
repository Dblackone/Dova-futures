# Status

**Project:** DOVA Futures Intelligence

**Status:** Private Hub application deployed; cloud DOVA Intelligence operational; OneDrive and workstation bridges not connected.

**Last verified:** 2026-08-24 — @lead/vector [codex]

The responsive Hub application lives in `hub-app/` and is deployed privately
through OpenAI Sites. It provides Overview, DOVA Intelligence, Projects, Files,
Workspaces, Products, Attention, Activity, Repository Guide, and Settings views.

The OpenAI Responses API adapter is active with a dedicated server-side key and
defaults to `gpt-5.4-mini`. The key is stored only in ignored local environment
configuration and the hosting provider's secret store.

Project and file views intentionally show an unconnected state. No project
names, client records, or OneDrive files are simulated or copied into GitHub.
Microsoft Graph/OneDrive requires an approved Entra application and explicit
folder scope before it can be enabled. The optional workstation/local-model
bridge remains planned.

The repository-level `hub/` remains a dependency-free public snapshot fallback.
The complete desktop/mobile design reference remains in
`design/hub-ux-prototype/`.
