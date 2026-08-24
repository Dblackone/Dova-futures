# registry.md — Master Project Index

> **Route yourself here first.** Find the workspace your task belongs to, then go
> read **only** that workspace's `PROJECT.md` + `memory/`, plus the `company/`
> layer. Do not read other workspaces. This table is the roll-up; the detail
> lives in each workspace.

**Last updated:** 2026-08-24 · **Owner:** Vollmann Akarakiri (principal)

## Active workspaces

| Workspace | Task belongs here if… | Code / files live in | Deployed | One-line status |
|-----------|-----------------------|----------------------|----------|-----------------|
| [`website`](../workspaces/website/PROJECT.md) | it touches the public marketing site `dovafutures.com` | [external repository](https://github.com/Dblackone/Dova-futures-website) | GitHub Pages | Source/default Pages verified; `dovafutures.com` transfer from Hub repo pending |
| [`preorder-store`](../workspaces/preorder-store/PROJECT.md) | it touches the preorder/e-commerce sale platform | [external repository](https://github.com/Dblackone/Dova-preorder) | Render | Migrated; external tests pass, launch configuration remains |
| [`dova-futures-intelligence`](../workspaces/dova-futures-intelligence/PROJECT.md) | it touches DOVA Intelligence, the Hub UX, orchestration, providers, or local capabilities | `workspaces/dova-futures-intelligence/`; overview artifact in `hub/` | GitHub Pages (manual gate) | Hub promoted; domain transfer pending; intelligence implementation deferred |
| [`document-templates`](../workspaces/document-templates/PROJECT.md) | it creates/edits company document templates or the design system | `documents/` (+ `documents/_ds/`, `scripts/`) | — (static) | 10 templates (incl. 00-Letterhead) + design system; Express wiring pending |
| [`bim-standards`](../workspaces/bim-standards/PROJECT.md) | it touches Revit naming standards or the pyRevit toolkit | `bim-standards/` | — | Tools verified live in Revit (2 bugs fixed); Architecture .rte built; QA on real firm project pending |
| [`client-jobs`](../workspaces/client-jobs/PROJECT.md) | it is a specific paid client project or job | `projects/` | — | 3 active: FHS Pool (Ibafo), C.K. Musa road (Afuze), Hall of Worship (Osogbo) |
| [`company-ops`](../workspaces/company-ops/PROJECT.md) | internal/admin work not tied to one client (registers, payroll, automations, heartbeat) | `automations/`, registers, admin docs | — | Product Hub reorganization complete on branch; independent checker pending |

## Starting a new project / side project

Copy `workspaces/_TEMPLATE/` to `workspaces/<new-slug>/`, fill in its
`PROJECT.md`, and add a row to the table above. Log the new project in
`memory/decisions.md`.

## Shared, cross-project surfaces (not a workspace)

- `company/` — brand, voice, goals, ethics, engineering standards, doc policy.
- `governance/guardrails.md` — approval + safety rules.
- `governance/collaboration.md` — multi-session branching, write-scope, promotion flow.
- `governance/team.md` — agent roster + branch naming (was root `TEAM.md`).
- `prompts/` — maker / checker / loop-runner / triage.
- `memory/board.md` — the shared team board (WIP-limited, cross-project).
- `memory/triage.md` — the shared inbox for undecided items.
- `memory/decisions.md` — company-wide decision log (project-specific decisions
  go in that workspace's `memory/decisions.md`).
- `sandbox/` — gitignored per-session scratch (never committed).

## Product and document boundaries

The public website and preorder platform are independent products with their
own repositories and deployments. This repository deploys only `hub/` as a
read-only overview. Existing `projects/` records remain in place until the
separate OneDrive inventory and migration plan is reviewed; no client files are
moved as part of the product-source reorganization.
