# DOVA Futures Intelligence — Handoff Instructions

## Placement status

This folder is already in the Dova-futures repository as:

`workspaces/dova-futures-intelligence/`

Keep intelligence runtime code here. Repository-level `hub/` is the deployed
read-only overview; website and preorder source live in separate repositories.

## After checkout

1. Read the destination repository's `CLAUDE.md` and `governance/agents/SHARED-RULES.md`.
2. Confirm this workspace remains registered in `company/registry.md`.
3. Read this folder's `PROJECT.md`, then `memory/status.md` and `memory/next-up.md`.
4. Keep the existing local `config/api_keys.json` and `memory/long_term.json` out of Git.
5. Run `python -m unittest discover -s tests -v` from this workspace.
6. Continue from `memory/next-up.md`; do not restart the architecture work.

## Current handoff state

- Orchestration contracts, registry, policy engine, provider router, request router, and headless gateway exist.
- The existing desktop UI has an explicit `/core` bridge while normal language remains on Gemini Live.
- The local filesystem capabilities are workspace-scoped; credential files and Git metadata are protected.
- The next implementation boundary is a real approval UX and the first reviewed compatibility adapter, beginning with read-only `file_controller` operations.
