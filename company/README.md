# `company/` — The Shared Control Point

> **Read by EVERY session, on EVERY run, no matter which project you touch.**
> This folder is the single source of truth for who we are and how we work.
> Individual projects live in `workspaces/`. This layer keeps them consistent.

This repository (`Dova-futures`) is not one project — it is the **company hub**
for DOVA Futures Limited. It holds every task, project, and side project the
company runs, each isolated in its own workspace. This `company/` folder is the
shared layer that binds them: brand, voice, goals, ethics, and the rules every
agent follows regardless of which project it is working on.

## The mandatory read-order for any session

1. **`CLAUDE.md`** (repo root) — the router + the loop. It tells you to locate
   your workspace before doing anything else.
2. **`company/registry.md`** — find your project, its folder, and where its code
   lives.
3. **This `company/` folder** — the shared control point (the files below).
4. **`workspaces/<your-project>/PROJECT.md`** + its `memory/` — your project's
   own context. **Read only your workspace. Do not read other workspaces'
   folders — that context is not yours and will pollute your run.**

## What lives here

| File | What it governs |
|------|-----------------|
| `registry.md` | The master index of every workspace — code path, owner, one-line status. Start here to route yourself. |
| `goals.md` | Company mission, goals, and current top-level focus. |
| `ethics.md` | Company values and hard limits — what we will and will not do. |
| `voice-and-tone.md` | The language and tone of all company output (docs, copy, replies). |
| `brand.md` | The **single source of truth** for brand tokens: colours, fonts, logo, legal name, tagline, contact. Never re-declare these values elsewhere — link here. |
| `engineering-standards.md` | Universal code style, commit, and PR rules that apply to every codebase in the hub. |
| `document-policy.md` | Binding rule: every company document starts from a canonical template. |

## What is NOT here (but still global)

- `governance/guardrails.md` — the safety/approval rules. Still applies to all.
- `prompts/` — maker, checker, loop-runner, triage prompts.
- `TEAM.md` + `.claude/agents/` — the agent roster and definitions.
- `memory/board.md` + `memory/triage.md` — cross-project coordination surfaces.

## Rule for changing anything in `company/`

A change here affects every project and every future session. Treat it as a
deliberate decision: log it in `memory/decisions.md`, and never fork or duplicate
a control file into a workspace — if a project needs something different, that is
a decision to discuss, not a local override.
