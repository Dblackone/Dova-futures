# DOVA Futures Intelligence — Handoff Instructions

## Destination

Move this folder into the Dova-futures repository as:

`workspaces/dova-futures-intelligence/`

Do not place it at the Dova-futures repository root. The root contains the live marketing website, and `dova-preorder/` is a separate deploy-critical application.

## After moving

1. Read the destination repository's `CLAUDE.md` and `governance/agents/SHARED-RULES.md`.
2. Register this workspace in `company/registry.md` using the destination repository's review process.
3. Read this folder's `PROJECT.md`, then `memory/status.md` and `memory/next-up.md`.
4. Keep the existing local `config/api_keys.json` and `memory/long_term.json` out of Git.
5. Run `python -m unittest discover -s tests -v` from this workspace.
6. Continue from `memory/next-up.md`; do not restart the architecture work.

## Current handoff state

- Orchestration contracts, registry, policy engine, provider router, request router, and headless gateway exist.
- The existing desktop UI has an explicit `/core` bridge while normal language remains on Gemini Live.
- The local filesystem capabilities are workspace-scoped; credential files and Git metadata are protected.
- The next implementation boundary is a real approval UX and the first reviewed compatibility adapter, beginning with read-only `file_controller` operations.
