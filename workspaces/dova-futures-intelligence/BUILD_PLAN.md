# DOVA Futures Intelligence — Jarvis Build Plan

**Status:** Architecture approved for planning; implementation not started  
**Repository:** `dova-futures-intelligence`  
**Purpose:** Rebuild the current MARK XXXIX-OR prototype into a modular, local-first AI orchestration platform for DOVA Futures.

## 1. Build Objective

Build a desktop AI operating system that coordinates models, agents, tools, memory, and workflows.

Jarvis is not intended to be one model that does everything. The core system should decide:

- Which model or provider should handle a request.
- Which agent or workflow should be used.
- Which tools are required.
- Which memory sources should be retrieved.
- Which actions require approval.
- How intermediate results should be combined and reported.

The orchestrator must remain lightweight. Intelligence belongs in providers, agents, tools, and domain workflows.

## 2. Source Repository Assessment

The current repository is a Python desktop assistant containing:

- PyQt6 desktop UI.
- Gemini Live audio interaction.
- OpenRouter text and vision access.
- Direct computer, browser, file, document, messaging, and web tools.
- A basic planner, executor, retry, replan, and task queue system.
- JSON long-term memory.

The current code is a valuable capability prototype, but it is not yet the orchestration core. The rebuild should preserve useful capabilities behind adapters while moving routing, policy, provider selection, memory selection, and workflow control into explicit platform services.

## 3. Target Architecture

```text
Desktop UI / Voice / Chat
            ↓
Interaction Gateway
            ↓
Jarvis Orchestrator
            ├── Intent and Task Classifier
            ├── Planner Selector
            ├── Agent Router
            ├── Tool Router
            ├── Memory Router
            ├── Provider Router
            └── Policy and Approval Engine
            ↓
Execution Engine
            ├── Agent Runtime
            ├── Tool Runtime
            ├── Workflow Runtime
            └── Event and Audit Stream
            ↓
Providers / Tools / Memory / External Systems
```

## 4. Architectural Boundaries

### Interaction layer

Responsible for desktop, text, voice, vision, and future channel inputs. It must not decide which model or tool to use.

### Orchestration layer

Responsible for request lifecycle, routing, planning coordination, result aggregation, cancellation, and user-visible progress.

### Provider layer

Provides common interfaces for Gemini, OpenAI, OpenRouter, LM Studio, Claude Code, and future providers.

Required provider capabilities should include:

- Text generation.
- Streaming text.
- Structured JSON generation.
- Tool calling.
- Vision.
- Audio or realtime sessions where supported.
- Embeddings where supported.
- Capability and model metadata.

### Capability and tool layer

Every tool must be registered through one capability registry. A tool definition must include:

- Stable name and version.
- Description.
- Input schema.
- Output schema.
- Error contract.
- Supported platforms.
- Required permissions.
- Risk classification.
- Confirmation requirement.
- Idempotency information.

### Agent layer

Agents are domain-specific coordinators. They should not directly own provider credentials or arbitrary operating-system access.

Initial agent categories may include:

- Personal assistant.
- Research.
- Coding.
- Documentation.
- Construction and architecture.
- Estimating and tender evaluation.
- Business operations.
- Knowledge management.

Agents should be registered rather than hard-coded into the desktop entry point.

### Memory layer

Memory must become a provider-based subsystem with separate layers:

- Working conversation memory.
- Personal identity and preferences.
- Project memory.
- Company knowledge.
- Document and drawing knowledge.
- Semantic/vector retrieval.
- Structured entities and relationships.
- Source, timestamp, and confidence metadata.

The current JSON memory should be treated as a compatibility adapter, not the final memory architecture.

### Policy and approval layer

No high-impact action should be executed solely because a model requested it.

The policy layer must support:

- Read-only versus mutating actions.
- Confirmation requirements.
- Protected paths.
- Allowed applications and domains.
- Secret access controls.
- Dry-run mode.
- Emergency stop.
- Audit events.

### Persistence and observability layer

The platform must record:

- Requests.
- Plans.
- Tool calls.
- Provider selection.
- Approvals.
- Results.
- Errors.
- Retries.
- Replans.
- Token, latency, and cost metadata where available.

Long-running tasks must survive application restarts once the durable workflow phase begins.

## 5. Rebuild Principles

1. Preserve working capabilities behind adapters where practical.
2. Keep the desktop UI replaceable and keep the core usable without the UI.
3. Prefer explicit contracts over prompt-only conventions.
4. Keep providers interchangeable.
5. Keep tools independently testable.
6. Require policy evaluation before side effects.
7. Make workflows observable and resumable.
8. Add complexity only when a real requirement justifies it.
9. Do not add domain agents before the orchestration contracts are stable.
10. Never commit API keys, personal memory, credentials, or generated local artifacts.

## 6. Build Phases

### Phase 0 — Baseline and repository hygiene

**Objective:** Establish a reliable starting point.

**Work:**

- Confirm the repository root and Git boundary.
- Confirm the public-repository secret policy.
- Inventory all tools, providers, configuration files, and side effects.
- Identify obsolete references, including missing tool modules.
- Define supported operating systems for the first release.
- Separate source files from generated, personal, and local runtime data.

**Exit criteria:**

- The repository contains only intended project files.
- No credentials or private memory are tracked.
- A complete capability inventory exists.
- The design document and this build plan agree on project identity and scope.

### Phase 1 — Stabilize the current prototype

**Objective:** Make the current application internally coherent before extracting architecture.

**Work:**

- Align tool declarations, planner tools, executor tools, and action implementations.
- Resolve missing or obsolete modules such as `cmd_control`.
- Standardize action inputs and result/error behavior.
- Complete dependency declarations.
- Centralize configuration ownership.
- Add tests for pure utilities, schemas, memory merging, and tool validation.

**Exit criteria:**

- The application starts from a documented clean environment.
- Every advertised tool has an implementation or is explicitly marked unavailable.
- Tool failures return structured errors.
- Basic automated checks run without requiring live API credentials.

### Phase 2 — Define shared domain contracts

**Objective:** Introduce stable types and interfaces without changing user-facing behavior.

**Core contracts:**

- `UserRequest`.
- `TaskContext`.
- `Plan` and `PlanStep`.
- `ToolDefinition`.
- `ToolCall` and `ToolResult`.
- `AgentDefinition`.
- `ProviderRequest` and `ProviderResponse`.
- `MemoryQuery` and `MemoryResult`.
- `ApprovalRequest`.
- `ExecutionEvent`.

**Exit criteria:**

- Direct tool calls and planned tool calls use the same contracts.
- The UI does not need to know which provider or action implementation was selected.

### Phase 3 — Provider abstraction

**Objective:** Remove provider-specific decisions from orchestration and tools.

**Initial adapters:**

- Gemini Live and Gemini text.
- OpenRouter.
- LM Studio-compatible local endpoint.

**Future adapters:**

- OpenAI.
- Claude Code.
- Specialist vision, document, and embedding providers.

**Exit criteria:**

- A request can select a provider through configuration or routing policy.
- Provider failures can fall back according to policy.
- Provider-specific SDK details do not leak into tool modules.

### Phase 4 — Capability registry and tool runtime

**Objective:** Replace duplicated hard-coded dispatch tables.

**Work:**

- Create a single capability registry.
- Register existing actions as adapters.
- Add input validation and output normalization.
- Add platform and permission metadata.
- Add timeout, cancellation, and idempotency behavior.
- Add dry-run support where feasible.

**Exit criteria:**

- Adding a tool does not require editing the desktop entry point.
- Planner, direct interaction, and agents resolve tools through the same registry.

### Phase 5 — Jarvis orchestration core

**Objective:** Create the central control plane.

**Responsibilities:**

- Classify incoming requests.
- Select direct execution versus planning.
- Select an agent when appropriate.
- Select memory scopes.
- Select providers.
- Create and validate plans.
- Enforce policy.
- Dispatch execution.
- Aggregate results.
- Report progress.

**Exit criteria:**

- `main.py` becomes composition and startup code rather than the system brain.
- All execution paths pass through the orchestrator.
- The UI can be replaced without rewriting routing logic.

### Phase 6 — Security, permissions, and approvals

**Objective:** Make system control safe enough for real work.

**Work:**

- Classify every existing action by risk.
- Add confirmation for destructive, external, financial, communication, and code-execution actions.
- Add protected filesystem policies.
- Isolate generated code execution.
- Add secret storage and redaction.
- Add audit logging.
- Add global cancellation and emergency stop.

**Exit criteria:**

- High-risk actions cannot run without the required policy decision.
- Every side effect is attributable to a request, plan, agent, and user approval state.

### Phase 7 — Durable tasks and workflows

**Objective:** Support long-running, resumable work.

**Work:**

- Persist task state.
- Persist plans and step checkpoints.
- Add resume after restart.
- Add task progress and history.
- Add approval pauses.
- Add scheduled and event-triggered workflows.

**Exit criteria:**

- A task can be inspected, paused, cancelled, resumed, and audited.
- Application restarts do not silently lose important work.

### Phase 8 — Layered memory and knowledge

**Objective:** Support personal, company, project, and document intelligence.

**Work:**

- Define memory ownership and privacy boundaries.
- Add source-linked memory records.
- Add project and company namespaces.
- Add document ingestion.
- Add embeddings and retrieval.
- Add structured entities and relationships.
- Add explicit forget, correction, and retention policies.

**Exit criteria:**

- Jarvis can retrieve relevant knowledge without injecting all memory into every prompt.
- Retrieved knowledge includes provenance and confidence.

### Phase 9 — Agents, plugins, and integrations

**Objective:** Expand domain capability without destabilizing the core.

**Priority integrations:**

- Filesystem and repository tools.
- Browser and web research.
- GitHub.
- Email and calendar.
- Excel, Word, PDF, and document tools.
- MCP servers.
- LM Studio.
- Claude Code.
- Revit and AutoCAD adapters.

**Exit criteria:**

- New integrations are installed or registered as plugins.
- Domain agents use shared tools, memory, providers, and policy services.

## 7. Initial Agent Delivery Order

Build agents in this order:

1. Personal Assistant — validates core routing and memory.
2. Research Agent — validates web, browser, citations, and summarization.
3. Coding Agent — validates repositories, terminal policy, code execution, and Claude Code integration.
4. Documentation Agent — validates document processing and knowledge capture.
5. Construction/Architecture Agent — validates project memory, drawings, specifications, standards, and domain workflows.
6. Business and Finance Agents — add only after approval, audit, and financial-data boundaries are mature.

## 8. Integration Contracts for the Design Document

The separate design document should define the user experience for these states:

- Listening.
- Thinking.
- Planning.
- Waiting for approval.
- Executing.
- Waiting on an external provider.
- Paused.
- Completed.
- Failed.
- Cancelled.

The design document should also specify:

- How active tasks are displayed.
- How approvals are presented.
- How tool activity is shown.
- How provider selection is exposed, if at all.
- How memory and citations are displayed.
- How users stop or cancel execution.
- How errors are explained without exposing secrets or internal traces.

## 9. Quality Gates

Every build phase must satisfy the relevant gates:

### Architecture gate

- Responsibility boundaries are explicit.
- Simpler alternatives were considered.
- New coupling is justified.
- The design document remains consistent with the build plan.

### Security gate

- No secret is committed.
- Side effects have a policy classification.
- Generated code is not trusted by default.
- Sensitive output is redacted.

### Reliability gate

- Errors are structured.
- Timeouts and cancellation exist.
- Retries are bounded.
- Long-running work has observable state.

### Testing gate

- Pure logic has automated tests.
- Tool schemas are validated.
- Provider adapters have mocked tests.
- Critical workflows have integration tests.
- Destructive actions have policy tests.

### Documentation gate

- New interfaces are documented.
- Configuration is documented.
- Supported platforms are documented honestly.
- Operational recovery is documented.

## 10. Definition of a First Platform Release

The first meaningful Jarvis platform release is complete when:

- A user can submit text or voice requests through the desktop UI.
- The orchestrator selects direct execution or planning.
- Providers are interchangeable for supported capabilities.
- Tools are discovered through a registry.
- Memory is queried through an abstraction.
- High-risk actions require approval.
- Tasks expose progress and cancellation.
- Errors and tool calls are observable.
- No credentials or private runtime data are committed.
- At least one personal workflow, one research workflow, and one coding workflow work end-to-end.

## 11. Explicit Non-Goals for the First Release

Do not begin with:

- A large multi-agent hierarchy.
- Revit or AutoCAD deep automation.
- A knowledge graph before retrieval requirements are proven.
- Autonomous financial actions.
- Unrestricted computer control.
- Cloud deployment of the entire desktop system.
- A custom model-training pipeline.
- A complex microservice architecture.

## 12. Recommended First Build Sprint

The first implementation sprint should be limited to:

1. Confirm repository boundary and public-repository hygiene.
2. Create the architecture and design decision records.
3. Define shared request, tool, provider, memory, and event contracts.
4. Create a capability inventory from the existing `actions` modules.
5. Create provider interfaces with mocked implementations.
6. Create a tool registry with one read-only tool and one controlled mutating tool.
7. Add a minimal orchestrator that routes one request end-to-end.
8. Add tests for routing, schemas, policy decisions, and error handling.

The sprint is successful when the new orchestration path works alongside the existing prototype without requiring the complete migration of every action.

## 13. Decision Log

### D-001 — Orchestration over monolithic intelligence

**Decision:** Jarvis coordinates specialized providers, agents, tools, memory, and workflows.  
**Reason:** This matches the intended personal AI operating system and avoids making one model responsible for every task.  
**Trade-off:** More interfaces and routing logic are required, but the platform becomes replaceable and extensible.

### D-002 — Preserve capabilities behind adapters

**Decision:** Existing actions are migrated incrementally rather than discarded immediately.  
**Reason:** The repository already contains substantial computer, browser, file, document, and vision capability.  
**Trade-off:** Temporary adapter complexity is accepted to reduce migration risk.

### D-003 — Policy before side effects

**Decision:** Model intent is not sufficient authorization for high-impact actions.  
**Reason:** Jarvis will control files, applications, communications, code execution, and future business systems.  
**Trade-off:** Some interactions require confirmation, but safety and auditability are essential.

### D-004 — Local-first with cloud-capable routing

**Decision:** The architecture must support local providers without making cloud providers impossible.  
**Reason:** Offline operation, privacy, cost, and specialized cloud capabilities all matter.  
**Trade-off:** Provider capability negotiation is required.

## 14. Open Decisions Before Implementation

- Is the primary operating system Windows, or must the first release support multiple platforms?
- Which workflows are highest priority for DOVA Futures?
- Which data is personal, company-confidential, or public?
- Which actions may run without approval?
- Is generated code allowed at all, and if so, in what sandbox?
- Which local model runtime will be supported first: LM Studio or another runtime?
- Is Claude Code an agent, provider, or external tool in the product model?
- Should the desktop application also expose a headless service/API?
- What is the minimum acceptable offline capability?
- What should the first design document treat as the primary user journey?

## 15. Build Session Instructions

When this file is used in a future implementation session together with the design document:

1. Read both documents before changing code.
2. Resolve contradictions in favor of explicit user decisions.
3. Work in one milestone at a time.
4. Do not implement future agents or integrations prematurely.
5. Preserve unrelated user changes.
6. Inspect the repository before every structural change.
7. Add tests and documentation with each new platform boundary.
8. Stop for approval before expanding scope beyond the current milestone.

