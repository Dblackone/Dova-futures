# DOVA Futures Intelligence — Project Workspace

## Identity

- **Workspace slug:** `dova-futures-intelligence`
- **One-line purpose:** Local-first desktop AI orchestration platform for DOVA Futures.
- **Owner:** DOVA Futures Limited / principal approval required for high-impact actions.
- **Status:** active — architecture and orchestration foundation in progress.

## Where the code lives

This workspace contains the Python desktop prototype and the new provider-neutral orchestration core:

- `main.py`, `ui.py` — existing desktop and Gemini Live integration.
- `core/` — contracts, registry, policy, providers, gateway, and local capabilities.
- `actions/` — compatibility action modules awaiting incremental adapter migration.
- `agent/` — legacy planner/executor/task queue path.
- `memory/` — compatibility JSON memory code plus workspace handoff records.

## How to run and verify

Core-only verification requires no API keys or network:

```text
python -m unittest discover -s tests -v
```

The existing desktop prototype requires the dependencies in `requirements.txt`, local API keys in the ignored `config/api_keys.json`, and a configured audio/desktop environment:

```text
python main.py
```

## Architecture

The target flow is:

`Desktop / voice / headless gateway → orchestrator → policy → capability registry → tool/provider/memory adapter`

The current usable path is `core.gateway.InteractionGateway`. It supports explicit local bridge commands from the prototype UI: `/core list [path]` and `/core write <path> <content>`. The write path requires approval and is not yet connected to an approval control in the UI.

## Project-specific traps

- Do not commit `config/api_keys.json`, `.env`, `memory/long_term.json`, or generated runtime artifacts.
- Do not expand unrestricted computer control or generated-code execution into the new core without policy tests.
- `actions.cmd_control` is referenced by the legacy executor but absent; keep it unavailable until a reviewed implementation exists.
- Preserve the legacy UI/action path while migrating capability by capability.
- The destination Dova-futures repository is a hub. This project belongs under `workspaces/dova-futures-intelligence/`, not at the repository root.
