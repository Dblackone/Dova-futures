# DOVA Futures Intelligence — Initial Architecture

This document records the first implementation boundary for the Jarvis rebuild.

## Scope

The initial platform path is deliberately small:

`UserRequest → Orchestrator → CapabilityRegistry → PolicyEngine → Tool → ExecutionEvent`

The existing desktop application, planner, and action modules remain compatible prototype code. They are not imported by the new core path.

The first usable composition root is `core.bootstrap.create_local_orchestrator`. It registers two deliberately narrow workspace capabilities: directory listing and approved text-file writing.

Provider selection is available through `core.provider_router.ProviderRouter`. The local bootstrap currently registers only the deterministic `mock` provider; live Gemini, OpenRouter, and LM Studio adapters can be added without changing orchestration contracts.

Channel adapters may use `core.request_router.RequestRouter` when they have an explicit normalized tool request. Natural-language guesses are intentionally not executed by this router.

`core.gateway.InteractionGateway` is the current headless entry point. The desktop and voice layers can call its `submit` method without knowing registry, policy, or provider details.

The prototype UI now exposes an explicit local bridge: `/core list [path]` and `/core write <path> <content>`. Ordinary messages continue through Gemini Live. Local writes stop at the approval boundary until the UI gains an approval control.

## Boundaries

- `core.contracts` contains transport-safe domain types.
- `core.registry` owns capability discovery and dispatch.
- `core.policy` evaluates side effects before execution.
- `core.providers` defines the provider seam and a deterministic mock.
- `core.orchestrator` coordinates one request lifecycle.

The desktop UI is an adapter. It must not choose providers or call action implementations directly once migrated.

## First-release assumptions

- Windows is the first supported operating system because the current prototype uses Windows-specific capabilities.
- The first core tests must run without API credentials, a desktop session, or network access.
- Mutating actions require explicit approval. Read-only actions may run without approval.
- The compatibility JSON memory remains outside the new core until a memory provider contract is implemented.

## Out of scope for this slice

Durable workflows, autonomous agents, unrestricted computer control, external integrations, and live provider adapters are intentionally deferred.
