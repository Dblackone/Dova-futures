# TEAM.md — The Agent Team (Org + Naming)

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
| `lead` | orchestration / project management | no |
| `build` | implementation (maker) | yes |
| `qa` | verification (checker) | no (read + run tests) |
| `sec` | security review | no (read-only) |
| `arch` | architecture decisions | docs only |
| `docs` | documentation | docs only |
| `ops` | automation / infra / heartbeat | infra only |

## The roster

| Handle | File (`.claude/agents/`) | Job |
|--------|--------------------------|-----|
| `@lead/atlas` | `lead-atlas.md` | Decompose, assign, route to QA, propose merges, own the board |
| `@build/forge` | `build-forge.md` | Implement one task on its own worktree |
| `@build/nova` | (copy of forge) | Second parallel implementer |
| `@qa/vera` | `qa-vera.md` | Independent verification + bug hunt |
| `@sec/warden` | `sec-warden.md` | Security review before sensitive merges |
| `@arch/sol` | `arch-sol.md` | Keep architecture coherent |
| `@docs/quill` | `docs-quill.md` | Documentation |

> Keep a small fixed core. Spin up extra `build/*` workers per task; don't create
> a dozen standing agents. WIP limit: max 3 active branches at once to start.

## Rules of engagement

1. **Lead doesn't code.** Atlas orchestrates and gatekeeps only.
2. **Maker ≠ checker.** The agent that built a thing never approves it.
3. **Board is truth.** No agent assumes another's state; it reads the board.
4. **You hold the merge key.** Atlas *proposes* merges to protected `main`;
   they gate on `@qa/vera` approval and your explicit OK.
5. **Blocked → escalate, don't guess.** Move the card to Blocked, note why.

## Where the files live (Claude Code)

- Agent definitions: `.claude/agents/<name>.md` (project) — copy the files from
  this kit's `agents/` folder there, or run `/agents` to scaffold interactively.
- Each file is YAML frontmatter (`name`, `description`, `tools`, optional
  `model`) + a body that is the agent's system prompt.
- The Lead dispatches a worker by passing it the card: the goal, the file paths,
  the branch name, and the acceptance criteria — because the prompt string is the
  only channel into a subagent.
