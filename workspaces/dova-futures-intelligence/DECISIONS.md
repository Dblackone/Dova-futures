# Architecture Decision Records

## ADR-001 — Introduce contracts before migration

**Decision:** Add shared request, tool, provider, memory, approval, and event contracts before moving existing actions.

**Reason:** The prototype currently duplicates dispatch and provider decisions across the UI, planner, executor, and actions. Stable contracts allow incremental migration without requiring a complete rewrite.

**Consequence:** The first slice contains adapters and a small amount of duplication while the old path remains operational.

## ADR-002 — Policy is a mandatory execution boundary

**Decision:** Every registered tool is evaluated by the policy engine before its handler runs.

**Reason:** A model or planner request is intent, not authorization. This is required for file, communication, code execution, and future business actions.

**Consequence:** Mutating tools return an approval-required result until the caller supplies approval.

## ADR-003 — Deterministic core tests

**Decision:** The orchestration core uses a mock provider and local test tools so its tests need no credentials, network, or GUI.

**Reason:** Core behavior must be verifiable independently of optional integrations.

**Consequence:** Live Gemini, OpenRouter, and LM Studio adapters will be added behind the same provider interface in a later milestone.

## ADR-004 — Constrain the first real capabilities to a workspace

**Decision:** The first filesystem adapters can only operate under an explicitly configured workspace root, and credential/Git metadata files are protected.

**Reason:** This proves real tool execution while preventing the new path from inheriting the prototype's unrestricted filesystem surface.

**Consequence:** Existing desktop-wide file actions remain compatibility code until they are split and classified individually.

## ADR-005 — Explicit routing before natural-language autonomy

**Decision:** The first request router executes only tool names and parameters supplied by a normalized channel adapter. It does not infer mutating actions from arbitrary text.

**Reason:** A safe approval flow requires a structured action proposal before execution. Guessing from text would bypass the future planner and make policy decisions ambiguous.

**Consequence:** Natural-language planning remains a separate milestone, with its output validated into `Plan` and `ToolCall` contracts before dispatch.
