# team.md — The Agent Team (Org + Naming)

> **Multi-model note.** This file defines the role/callsign taxonomy for the
> Claude Code roster. Since 2026-08 the repository is worked on by several
> models. The cross-model layer — identity registry, model tags, attribution
> formats, and the shared contract every assistant follows — lives in
> [`governance/agents/`](agents/SHARED-RULES.md). Nothing below changes; the model tag
> is added *alongside* the handle (`@build/forge [claude-code]`).

> Layers a managed team onto the loop. Real life: jobs go to team members on
> branches, a lead manages the repo, QA checks the work. Here: named agents do
> the same, coordinating through the board on disk — because agents can't talk
> to each other directly, they read and write shared memory instead.

## How it merges with loop engineering

- Every agent runs the same loop: **Goal → Discover → Act → Verify → Remember**.
- They don't message each other. They coordinate through `memory/board.md` — the
  shared "office." Read the board, do your card, write the board.
- The Lead runs a **meta-loop** at the project level: decompose → assign →
  collect → route to QA → propose merge → remember.

## Naming system

**Agent identity = `@<role-tag>/<callsign>`**
- `role-tag` = the function (instant role recognition)
- `callsign` = a unique, memorable, accountable name you can summon

**Branch = `<change-type>/<callsign>/<task-slug>`**
- `change-type` ∈ `feat | fix | chore | docs | refactor | exp`
- carries the owner in the path → instant accountability
- e.g. `feat/forge/oauth-login`, `fix/nova/cart-rounding`, `docs/quill/api-ref`

**Accountability ledger** — sign everything with the callsign:
- board cards: `owner: @build/forge`
- commits: trailer `Agent: @build/forge`
- PR titles: `[build/forge] Add OAuth login`
- workspace `memory/done-log.md`: `… — by @build/forge — verified by @qa/vera`

## Role-tag taxonomy

| tag | role | writes code? |
|------|------|--------------|
| `lead` | orchestration / project management | the lead orchestrator (`@lead/vector`) does; `@lead/atlas` does not |
| `build` | implementation (maker) | yes |
| `qa` | verification (checker) | no (read + run tests) |
| `sec` | security review | no (read-only) |
| `arch` | architecture decisions | docs only |
| `docs` | documentation | docs only |
| `ops` | automation / infra / heartbeat | infra only |

## The roster

**The roster lives in [`governance/agents/REGISTRY.md`](agents/REGISTRY.md) —
the single source of truth for agent identity.** It lists every agent, its role,
its model tag, and its status, across all models. It is not duplicated here:
two copies of a roster is two rosters, and one of them is always wrong.

This file owns the **role taxonomy** above and the **naming/branch conventions**
below. The registry owns **who exists**. `.claude/agents/*.md` owns **how a
Claude Code agent is implemented**.

> Keep a small fixed core. Spin up extra `build/*` workers per task; don't create
> a dozen standing agents. WIP limit: max 3 active branches at once to start.

## Who leads

**Vollmann Akarakiri** is the owner, project leader, and final approving
authority. **`@lead/vector [codex]`** is the lead orchestrator — it plans,
assigns, coordinates the other agents, reviews integrations and dependencies,
and implements approved work. **`@lead/atlas [claude-code]`** is the senior
planning and review agent: planning, architecture, documentation, research,
governance review, QA, and risk/consistency review, coordinating only when
assigned by Codex or authorized by Vollmann.

A role tag says what an agent *does*, not what it may *approve*. Authority lives
in [`governance/agents/GOVERNANCE.md`](agents/GOVERNANCE.md), and a direct
instruction from Vollmann outranks every rule in this file.

## Rules of engagement

1. **The orchestrator coordinates.** `@lead/vector` may implement approved work;
   `@lead/atlas` plans, documents and reviews rather than building features.
2. **Maker ≠ checker.** The agent that built a thing never approves it — and
   that holds across a single agent's own handles.
3. **Board is truth.** No agent assumes another's state; it reads the board.
4. **You hold the merge key.** The lead *proposes* merges to protected `main`;
   they gate on a checker's approval and your explicit OK.
5. **Blocked → escalate, don't guess.** Move the card to Blocked, note why.
6. **Vollmann's word is authorization.** He may direct any agent to work on any
   file, in any workspace, including work another agent owns, and may grant an
   agent full permission for a defined goal. Ownership is for coordination, not
   for restricting him. Record the authorization; don't ask him to repeat it.

## Where the files live

- **Codex** agent definitions: `.codex/agents/<name>.toml` — including
  `lead-vector.toml`, the lead-orchestrator definition.
- **Claude Code** agent definitions: `.claude/agents/<name>.md` (project) — copy
  the files from this kit's `agents/` folder there, or run `/agents` to scaffold
  interactively.
- Both directories are protected (`GOVERNANCE.md` §8) and routed to Vollmann in
  `.github/CODEOWNERS`.
- Each file is YAML frontmatter (`name`, `description`, `tools`, optional
  `model`) + a body that is the agent's system prompt.
- The Lead dispatches a worker by passing it the card: the goal, the file paths,
  the branch name, and the acceptance criteria — because the prompt string is the
  only channel into a subagent.
