# Repository Reorganisation Plan — Product Hub Boundary

**Status:** Approved for implementation by the principal in the active 2026-08-24 session

**Owner:** @lead/vector [codex]

**Scope:** Repository organisation only. DOVA Intelligence runtime and OneDrive integration are explicitly excluded.

## Objective

Make `Dova-futures` the company and product Hub repository. The marketing website and preorder store are now independent products with their own repositories, deployments and application roots. This repository keeps their governance, status and handoff records, not duplicate editable application source.

## Verified migration state

| Product | Source of truth | Verification performed |
|---|---|---|
| DOVA website | `https://github.com/Dblackone/Dova-futures-website` | Migration PR is merged into `main`; `npm ci` and two Playwright site audits passed; default Pages URL returns HTTP 200. `dovafutures.com` remains assigned to the Hub repository and must be transferred before Hub deployment. |
| DOVA preorder | `https://github.com/Dblackone/Dova-preorder` | Migration PR is merged into `main`; root-level Render Blueprint is present; `npm ci` and three Node tests passed. |

## Target repository layout

```text
Dova-futures/
├── hub/                         # Read-only repository overview deployed by Pages
├── company/                     # Shared company policy, brand and registry
│   └── assets/                  # Small canonical shared brand assets only
├── governance/                  # Multi-agent and repository governance
├── workspaces/                  # Project context, memory, drafts and isolated tools
│   ├── dova-futures-intelligence/
│   │   └── design/              # Saved UX prototype; not a runtime implementation
│   ├── website/                 # External-product status and handoff records
│   └── preorder-store/          # External-product status and handoff records
├── documents/                   # Blank company templates and document design system
├── bim-standards/               # BIM standards and reusable tooling
├── projects/                    # Temporary legacy client records pending OneDrive migration
├── memory/                      # Cross-project coordination and decisions
├── prompts/                     # Shared agent prompts
├── automations/                 # Scheduled-work specifications
└── scripts/                     # Repository utilities
```

## Changes in this reorganisation

1. Promote the existing dependency-free, read-only Hub dashboard from the Intelligence workspace to top-level `hub/`.
2. Change GitHub Pages packaging from the entire repository to `hub/` only, preventing unrelated repository content from entering the Pages artifact. Keep deployment manual until the website custom domain is transferred and the Hub subdomain is configured.
3. Preserve the approved desktop/mobile UX prototype under `workspaces/dova-futures-intelligence/design/hub-ux-prototype/`.
4. Remove duplicate website and preorder application source now that both destination `main` branches are verified.
5. Retain small shared logo/icon assets under `company/assets/`; remove website-specific media already held by the website repository.
6. Update registry, workspace pointers, root documentation and deployment guardrails to describe the new boundaries.
7. Leave `projects/` untouched until the OneDrive inventory and migration plan are reviewed.
8. Do not add OpenAI, Microsoft Graph, OneDrive, authentication, database or DOVA Intelligence runtime code.

## Recovery

All removed application files remain recoverable from this repository's Git history. Current maintained source is also available from each verified destination repository. No client project file is deleted or moved in this change.
