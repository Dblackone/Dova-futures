# DOVA Futures Intelligence — Build Handoff

**Date:** 2026-08-03  
**Source project:** MARK XXXIX-OR prototype  
**Destination repository:** https://github.com/Dblackone/Dova-futures  
**Destination workspace:** `workspaces/dova-futures-intelligence/`

## Purpose

This project is the beginning of DOVA Futures Intelligence: a local-first desktop AI operating system that coordinates models, agents, tools, memory, workflows, approvals, and audit history.

The existing MARK XXXIX-OR desktop assistant is being preserved as a capability prototype while its orchestration layer is rebuilt as a modular platform.

## Placement status

This folder has already been placed at:

```text
Dova-futures/workspaces/dova-futures-intelligence/
```

Keep intelligence runtime code in this workspace. The repository-level `hub/`
is the separately deployed read-only overview; public website and preorder
sources now live in their external repositories.

## What is already built

- Shared domain contracts for requests, tools, plans, providers, approvals, events, and memory queries.
- A capability registry with schema-required-input validation.
- A policy engine that blocks high-impact actions until approval is supplied.
- Workspace-scoped filesystem capabilities for safe listing and controlled text writing.
- Provider metadata and fallback routing with a deterministic mock provider.
- A headless interaction gateway for future desktop, voice, and API channels.
- An explicit prototype UI bridge:
  - `/core list [path]`
  - `/core write <path> <content>`
- Architecture, decision, inventory, project, and handoff documentation.
- 18 dependency-free automated tests.

## Verification

From this workspace, run:

```text
python -m unittest discover -s tests -v
```

Expected result at handoff: **18 tests passing**.

The existing desktop prototype still uses the legacy path and requires its normal dependencies plus local API keys. Do not commit `config/api_keys.json`, `.env`, `memory/long_term.json`, or generated runtime files.

## Current architecture

```text
Desktop / voice / headless gateway
              ↓
       Jarvis orchestrator
              ↓
       Policy and approval
              ↓
       Capability registry
              ↓
     Tools / providers / memory
```

The current core entry points are:

- `core.gateway.InteractionGateway`
- `core.bootstrap.create_local_gateway`
- `core.bootstrap.create_local_orchestrator`
- `core.provider_router.ProviderRouter`

## Known limitations

- Natural-language planning is not yet connected to the new core.
- The UI has no approval button yet, so `/core write ...` correctly stops at approval.
- Existing action modules still use legacy direct dispatch.
- `actions.cmd_control` is referenced by legacy planner/executor code but is absent and must remain unavailable until reviewed.
- Live Gemini, OpenRouter, and LM Studio adapters are not yet connected to `ProviderRouter`.
- Durable tasks, audit persistence, layered memory, and domain agents are future milestones.

## Next build order

1. Register this workspace in the Dova-futures company project registry.
2. Read the destination repository's `CLAUDE.md` and `governance/agents/SHARED-RULES.md` before editing there.
3. Add approval controls to the desktop UI.
4. Migrate one read-only `file_controller` capability through the registry.
5. Add structured audit persistence.
6. Add the first live provider adapter.
7. Introduce planning only after routing and policy contracts remain stable.

## Handoff rule

Continue from this state. Do not restart the architecture, replace the existing prototype wholesale, or move files into the Dova-futures repository root.
