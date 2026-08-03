# REGISTRY.md — Agent Identity Registry

> **The single source of truth for agent identity.** Who every AI assistant on
> this repository is, and which model it runs on. Append-only in spirit: retire
> a row, don't delete it, so old commits stay resolvable.
> Rules that bind all of them: [`SHARED-RULES.md`](SHARED-RULES.md).
> Who may change any of this: [`GOVERNANCE.md`](GOVERNANCE.md).

**One fact, one home.** Three files touch the agent roster and they do *not*
duplicate each other:

| File | Owns | Does not own |
|------|------|--------------|
| **This file** | **Identity** — which agents exist, their model, their status | how a role behaves; how an agent is implemented; who may approve what |
| `governance/agents/GOVERNANCE.md` | **Authority** — who leads, who approves, what full permission means | who exists |
| `governance/team.md` | The **role taxonomy** (`lead`/`build`/`qa`/`sec`/`arch`/`docs`/`ops`), branch naming, rules of engagement | the list of agents — it points here |
| `.claude/agents/*.md` · `.codex/agents/*.toml` | The **implementation** — system prompts and tool grants for Claude Code and Codex | identity or roles for any other model |

If you are adding an agent, this file is the change. If you find the roster
listed anywhere else, that copy is stale by definition — file a `GP-NNN`.

---

## 1. The identity scheme

An agent's identity has two parts, and both are mandatory wherever work is
signed:

```
@<role>/<callsign>   [<model-tag>]
   │        │            └── WHICH MODEL produced it  (machine-greppable)
   │        └── WHO it is — unique across the whole repo, stable forever
   └── WHAT it does — the role taxonomy from governance/team.md
```

Example: `@build/ember [gemma-lmstudio]`

**Why split it this way.** The role/callsign half already exists in
`governance/team.md` and is used in live branches, board cards, and merged
commits — changing it would orphan history. The model tag is added *alongside*
it, so provenance is explicit without renaming anything. Reading a commit you
learn the job (`build`), the individual (`ember`), and the model
(`gemma-lmstudio`) without opening another file.

### Rules

1. **Callsigns are globally unique and never reused** — not even after an agent
   is retired. One callsign = one model, permanently.
2. **One callsign per model per role.** Two Claude Code implementers running in
   parallel are `@build/forge` and `@build/nova`, not two `forge`s.
3. **Role tags** come from `governance/team.md`: `lead`, `build`, `qa`, `sec`,
   `arch`, `docs`, `ops`. Do not invent new role tags without a decision entry.
4. **Model tags** are lowercase, hyphenated, and name the *assistant*, not the
   weights: `claude-code`, `gemma-lmstudio`, `codex`, `kimi`. If the underlying
   model version changes but the assistant is the same, the tag does not change
   — record the version in the commit's `Model:` trailer instead.
5. **Branches carry the callsign**: `<type>/<callsign>/<slug>` — unchanged from
   `governance/team.md`, so `feat/ember/catalog-filter` is instantly traceable.

---

## 2. Model tags

| Model tag | Assistant | Runs | Filesystem access | Instructions |
|-----------|-----------|------|------|--------------|
| `claude-code` | Claude Code (Anthropic) | Cloud | Yes — full tool access | [`models/claude-code.md`](models/claude-code.md) |
| `gemma-lmstudio` | Gemma via LM Studio | **Local, this PC** | Depends on client — see file | [`models/gemma-lmstudio.md`](models/gemma-lmstudio.md) |
| `codex` | OpenAI Codex | Cloud | Yes — full tool access | [`models/codex.md`](models/codex.md) — **lead orchestrator** |
| `<new>` | — | — | — | copy [`models/_TEMPLATE.md`](models/_TEMPLATE.md) |

Adding a model = one row here + one file in `models/`. Nothing else changes.

---

## 3. The roster

### Active

| Handle | Model tag | Role | Definition | Notes |
|--------|-----------|------|------------|-------|
| `@lead/vector` | `codex` | lead | `.codex/agents/lead-vector.toml` · `models/codex.md` | **LEAD ORCHESTRATOR.** Plans, assigns, coordinates agents, reviews integrations and dependencies, implements approved work, maintains repository consistency. Not the final approving authority. |
| `@lead/atlas` | `claude-code` | lead | `.claude/agents/lead-atlas.md` | **Senior planning & review.** Decompose, plan, document, review, route to QA, own the board — when assigned by Codex or authorized by Vollmann. Not the administrator. |
| `@qa/quartz` | `codex` | qa | `models/codex.md` | Cross-model checker — verifies work built by another model. Active since 2026-08-03. |
| `@build/forge` | `claude-code` | build | `.claude/agents/build-forge.md` | Implementer, one task per branch |
| `@build/nova` | `claude-code` | build | copy of forge | Second parallel implementer |
| `@qa/vera` | `claude-code` | qa | `.claude/agents/qa-vera.md` | Independent verification; read-only on source |
| `@sec/warden` | `claude-code` | sec | `.claude/agents/sec-warden.md` | Security review before sensitive merges |
| `@arch/sol` | `claude-code` | arch | `.claude/agents/arch-sol.md` | Architecture coherence; docs only |
| `@docs/quill` | `claude-code` | docs | `.claude/agents/docs-quill.md` | Documentation |
| `@build/ember` | `gemma-lmstudio` | build | `models/gemma-lmstudio.md` | **Local Gemma in LM Studio.** Small context — works one file at a time. Never merges. |

> The seven `claude-code` callsigns above predate the model tag and are
> **grandfathered**: a bare `@build/forge` in history means `claude-code`.
> Every *new* signature carries the tag explicitly.

**Authority is not in this table.** A handle says what an agent does, not what it
may approve. Vollmann Akarakiri is the final approving authority; `@lead/vector`
is the lead orchestrator; `@lead/atlas` supports planning and review. See
[`GOVERNANCE.md`](GOVERNANCE.md) §1.

**Codex holds two handles**, and which one it signs is which role it is acting
in. Maker ≠ checker still binds across them: work built as `@lead/vector` is not
verified by `@qa/quartz` — same agent, two hats. A different agent checks it.

### Reserved (not yet in use)

| Handle | Model tag | Role | For |
|--------|-----------|------|-----|
| `@build/kite` | `kimi` | build | Placeholder if Kimi is added |

### Retired

_(none yet — when an agent is retired, move its row here with the date. Never
delete it and never reuse the callsign.)_

---

## 4. Callsign naming guidance

Callsigns are short, single-word, pronounceable, and evocative of the role
(`forge` builds, `vera` verifies, `warden` guards, `ember` is the local fire).
Avoid version numbers, model names, and dates in callsigns — the model tag
already carries that, and a callsign must survive a model upgrade unchanged.

To claim one: add the row here in the same PR as the model file, and note it in
`memory/decisions.md`.
