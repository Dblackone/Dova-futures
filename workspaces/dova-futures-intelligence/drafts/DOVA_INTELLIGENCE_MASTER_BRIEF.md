> **Draft — @qa/quartz [codex], 2026-08-03.** Unapproved working brief. Review with the principal before implementation scope or architecture is changed.

# DOVA Intelligence — Master Build Brief

## 1. Purpose

DOVA Intelligence is a local-first personal operating system for DOVA Futures. It helps the principal resume work, find trusted company knowledge, plan and execute bounded workflows, and safely use models and computer capabilities when approval is appropriate.

It is not a chatbot, a cloud SaaS product, an unrestricted computer controller, or a multi-user platform in the first release. It must remain useful with AI and network access disabled.

## 2. The synthesis

The older DOVA OS material contains the durable business substrate:

- project and personal scope;
- filesystem indexing without moving the owner’s files;
- Markdown notes, links, tags, timeline and resume context;
- deterministic workflows, stages, next actions and event-triggered decision capture;
- units, currencies, formulas, rates and immutable issued artefacts;
- local ownership, portability, backup and power-loss resilience.

The current DOVA Futures Intelligence workspace contains the control-plane substrate:

- interaction gateway and desktop shell;
- provider-neutral contracts and provider routing;
- capability registry and policy boundary;
- approval-aware execution events;
- compatibility adapters for the existing voice, file, browser, computer and memory prototype;
- an incremental build plan and dependency-free tests.

The combined product is therefore:

```text
Channels (desktop / voice / headless)
        ↓
Jarvis control plane (route · plan · policy · approve · execute · observe)
        ↓
DOVA workspace substrate (projects · files · notes · workflow · knowledge · commercial data)
        ↓
Providers, capabilities and external systems
```

Jarvis coordinates. DOVA Intelligence owns the user context. Deterministic services establish facts; models interpret, retrieve, draft and recommend. A model never becomes the source of truth for quantities, permissions, approvals or issued records.

## 3. Product promise

The system should make these three journeys reliable before it grows:

1. **Morning resume:** open the app and see the last active project, what changed while away, the current stage and the next deterministic action.
2. **Mid-work lookup:** from Revit or another application, search a few words and get a source-linked answer or file quickly, without opening a permanent AI panel.
3. **Safe completion:** ask for a bounded task, see the plan and proposed side effects, approve only what is needed, and later inspect exactly what happened.

Initial targets are under 15 seconds for resume, under 10 seconds for a common lookup, and under 5 seconds for dismissible decision capture.

## 4. Principles that govern the build

1. Local first; cloud providers are optional adapters.
2. The filesystem and open formats remain usable if the app disappears.
3. Calculations and workflow state come before AI interpretation.
4. Passive capture is preferred over asking the owner to maintain another database.
5. Read-only actions may be automatic within scope; mutating, external, financial, communication and code-execution actions require policy and approval.
6. Every side effect is attributable to a request, plan, agent, tool, provider and approval state.
7. No permanent AI-shaped UI surface; AI is summoned when useful.
8. One real workflow must work before adding agent breadth.
9. Every long-running task must be observable, cancellable and resumable before it is called autonomous.
10. Do not build a general rule engine, plugin marketplace, knowledge graph, unrestricted computer control or formal platform abstraction before a concrete second use proves the need.

## 5. Release boundary

### First platform release

- Windows-first desktop shell with text input and an optional voice channel.
- Structured request lifecycle: classify, route, plan where necessary, evaluate policy, request approval, execute, stream events, persist result.
- Capability registry with at least one read-only filesystem capability and one controlled mutating capability.
- Provider seam with a deterministic mock and one principal-approved live provider, preferably local-first.
- Project registry and read-only repository context.
- Durable audit records for requests, plans, tool calls, approvals, results and errors.
- First DOVA workspace slice: project scope, file indexing/search, Markdown notes, timeline and resume context.
- One complete bounded workflow, selected with the principal, proven end-to-end.
- Export and recovery demonstration; no credentials or private runtime memory in Git.

### Later, after the foundation is trusted

- Delivery stages, workflow templates, checklists, dependencies and event-triggered decision capture.
- OCR, semantic retrieval and grounded answers with citations.
- Documentation and commercial workflows: formulas, time-versioned rates, BOQ assembly, valuations and immutable issued documents.
- Revit/IFC metadata and quantity adapters.
- Scheduled and event-triggered workflows.
- Additional research, coding, documentation and construction agents.

### Explicitly deferred or prohibited for now

- Multi-user accounts, mobile app and cloud sync.
- Autonomous financial actions or sending messages/documents without approval.
- Unrestricted mouse/keyboard/system control.
- Deep Revit/AutoCAD automation and drawing takeoff.
- Live market-pricing feeds.
- Custom model training, microservices, containers and a daemon-based infrastructure.
- Large multi-agent hierarchies before the shared runtime is stable.

## 6. Build architecture

### Control plane

`InteractionGateway → Orchestrator → PolicyEngine → CapabilityRegistry → Tool/Workflow Runtime → ExecutionEvent stream`

Supporting services are provider routing, memory querying, audit persistence, task persistence, approval UI, cancellation and recovery. The desktop UI remains an adapter; it must not contain routing or policy logic.

### DOVA substrate

The substrate is layered and deterministic at its base:

```text
Foundation: projects · scopes · file index · hashes · units · audit · backup
Delivery: stages · tasks · dependencies · next action · decisions · timeline
Knowledge: Markdown · extracted text · links · FTS · OCR · semantic retrieval
Commercial: formulas · rates · BOQ · valuations · issued snapshots
Intelligence: grounded retrieval · provider selection · drafting · explanation
Automation: backups · organisation · reports · reminders · event triggers
```

No AI code belongs in Foundation, Delivery or Commercial calculation paths. Those layers may expose structured context to the control plane, but they must remain independently testable and useful offline.

### Storage boundary

- Filesystem is the source of truth for user files and Markdown notes.
- SQLite is the portable index, event log and structured state store.
- File identity uses content hash, not path.
- Quantities always carry value and unit; money always carries amount, currency, date and rate context.
- Issued documents are frozen byte-level snapshots.
- Embeddings are versioned and stored separately from source chunks.

## 7. Agentic build loop

The build is continuous but gated. Each milestone is a small branch and a separate maker/checker handoff.

```text
Lead decomposes → Maker implements one milestone → Tests + manual evidence
        → Independent checker verifies acceptance criteria
        → Principal reviews irreversible/domain decisions
        → Merge/promote → Memory and next-up updated → next milestone dispatched
```

### Roles

- **Lead/architect:** maintains this brief, resolves dependency order, prevents scope creep, dispatches work.
- **Builder:** changes only the declared files for one milestone and writes tests.
- **Checker:** independently verifies tests, policy boundaries, UX and acceptance criteria; never approves its own work.
- **Security reviewer:** checks permissions, secrets, external actions, generated code and protected paths.
- **Domain reviewer:** principal approval for construction sequence, commercial logic, classifications and other irreversible domain choices.

### Dispatch rules

1. One milestone, one owner, one branch, one acceptance checklist.
2. No downstream milestone begins while its prerequisite is unverified.
3. Read-only discovery can be parallelised; overlapping file edits cannot.
4. Each agent receives: objective, allowed files, non-goals, acceptance tests, known risks and the required handoff format.
5. Every run records status, next action, decisions, verification and unresolved issues.
6. A loop stops on ambiguity, destructive scope, repeated failure, cost expansion or loss of explainability.

## 8. Milestones and gates

### M0 — Baseline and hygiene

Inventory the prototype, remove ambiguity between legacy and new paths, protect local secrets/runtime data, document supported Windows setup, and agree the first workflow.

**Gate:** clean dependency-free tests; capability inventory; no secret/runtime artefacts tracked; principal confirms first workflow.

### M1 — Contracts and safe local execution

Complete request, plan, tool, provider, memory, approval and event contracts. Finish the read-only `file_controller` adapter and one controlled write path through the registry and policy engine.

**Gate:** direct and planned calls share contracts; approval cannot be bypassed; protected paths are tested; audit event shape is defined.

### M2 — Observable orchestration

Move request lifecycle ownership into the orchestrator. Add structured audit persistence, bounded errors/retries, cancellation and visible progress.

**Gate:** a request can be inspected from intake to result; failures are structured; the UI can be replaced without moving routing logic.

### M3 — Project foundation

Add a local SQLite index and filesystem scanner for one real, principal-selected project. Add hash-based move detection, Markdown notes, FTS search, tags/links, timeline and resume context. Do not move user files.

**Gate:** search and resume work offline; power-loss recovery and restore are demonstrated; export is readable without the app; the principal uses it for one week.

### M4 — Delivery workflow

Add project stages, tasks, dependencies, next-action logic and event-triggered decision capture. Start from one real architecture/residential workflow and keep domain choices explicit.

**Gate:** the user can open a project and know what to do next; skipped/reordered work produces a dismissible decision prompt; no generic rule engine is introduced.

### M5 — Grounded intelligence

Add provider adapters, retrieval, citations, prompt/task routing and a first Personal Assistant or Research workflow. AI answers must show source context and uncertainty.

**Gate:** local/mock mode remains functional; retrieval is source-linked; provider failure is recoverable; no side effect is triggered by an answer alone.

### M6 — Durable workflows and agents

Persist plans and checkpoints. Add pause/resume/cancel, scheduled/event triggers and a small registered agent set: Personal Assistant, Research, Coding, Documentation, then Construction/Architecture.

**Gate:** one long-running task survives restart, waits for approval safely, and produces a complete audit trail.

### M7 — Commercial and domain adapters

Only after the foundation and delivery workflow survive real use: formulas, rates, BOQ/valuation records, immutable documents, then Revit/IFC metadata. Quantity takeoff from drawings remains outside this programme until separately approved.

**Gate:** every calculation has deterministic tests, units/currency, provenance and human confirmation where required.

## 9. What is achievable now

- A dependable local desktop shell and headless gateway.
- Safe, workspace-scoped file operations and approval-controlled writes.
- Repository/project status visibility.
- A durable local index, notes, search and timeline.
- Provider switching behind a stable interface.
- Source-grounded research and coding assistance with citations and review.
- Human-approved document drafting and project workflow support.
- Continuous agent-assisted development with tests, branches, checkers and memory.

## 10. What is not yet achievable or should not be promised

- A self-managing general intelligence that safely understands every company process.
- Reliable autonomous computer control across arbitrary applications.
- Trustworthy BOQs from arbitrary drawings without domain-specific model/data preparation.
- Fully offline high-quality reasoning on every task without suitable local hardware/models.
- Automatic sending, publishing, payment, deletion or client decisions.
- A single abstraction that cleanly solves every future tool, provider and agent before real use exposes the boundary.

## 11. Decisions required from the principal before M1/M3

1. First supported workflow: morning resume, research, coding, document drafting, or one construction project workflow.
2. First indexed folder and approximate file count.
3. Local provider/runtime to support first: LM Studio or another approved runtime.
4. Which actions are always read-only, approval-required, or prohibited.
5. Backup destination and restore cadence.
6. Personal/company/project data boundaries and retention rules.
7. Whether Claude Code is model provider, external build agent, or both in the product vocabulary.

These choices should be recorded as decisions, not guessed in code.

## 12. Source material and current evidence

- Older design source: `C:/Users/User/OneDrive/Documents/DOVA Futures limited/DOVA OS/PROJECT_BRIEF.md`, `PHASE_0_SPEC.md`, `PHASE_1_SPEC.md`, `ENGINEERING_STANDARDS.md`, `SETUP.md`, `CLAUDE_CODE_PROMPT.md`, `DESIGN_PROMPT.md`.
- Current implementation context: `workspaces/dova-futures-intelligence/PROJECT.md`, `ARCHITECTURE.md`, `BUILD_PLAN.md`, `CAPABILITY_INVENTORY.md`, `DECISIONS.md`, `memory/`, `core/`, `ui.py`, `main.py`.
- Current verified state at drafting: 22 dependency-free tests passing; read-only repository index and DOVA Intelligence shell present; registry registration and independent checker review remain open; live provider, durable audit, file-controller adapter and durable workflows remain future work.

## 13. Definition of a successful first release

The principal can submit a text or voice request; DOVA Intelligence selects direct execution or a bounded plan; the system uses a registered tool and provider; policy decides whether approval is required; progress and tool calls are visible; memory/retrieval is source-linked; tasks can be cancelled and resumed; and one personal, one research and one coding workflow work end-to-end without exposing secrets or bypassing approval.

Anything beyond that is expansion, not proof that the platform works.

---
*Drafted by @qa/quartz [codex] · 2026-08-03 · see workspace memory and DECISIONS.md for implementation history.*
