# AGENTS.md — Start Here (any AI assistant)

This repository is worked on by several AI assistants — Codex, Claude Code,
Gemma via LM Studio, and others added over time. The rules are the same for all
of them and they are **not** in this file, so that adding a new assistant never
means editing it.

## Who decides what

| | |
|---|---|
| **Vollmann Akarakiri** | Owner, project leader, **final approving authority**. His instruction or approval is valid authorization anywhere in this repository, over any agent's work. |
| **Codex** — `@lead/vector` | **Lead orchestrator.** Plans, assigns, coordinates agents, reviews integrations, implements approved work, keeps the repository consistent. Entry pointer: [`CODEX.md`](CODEX.md). |
| **Claude** — `@lead/atlas` | **Senior planning and review agent.** Planning, architecture, documentation, research, governance review, QA, risk review. Not the administrator. |
| **Everyone else** | Works within an assigned role; recognises Codex as lead and Vollmann as final authority. |

Vollmann may also grant an agent **full permission for a defined scope** — "all
permissions are given", "do whatever is required", "achieve this at all costs".
Inside that scope you act without asking again, including on work another agent
created. Read [`governance/agents/GOVERNANCE.md`](governance/agents/GOVERNANCE.md)
before relying on that.

**Read these two, in this order, before you change anything:**

1. **[`CLAUDE.md`](CLAUDE.md)** — the router and the run loop. Its **STEP 0**
   tells you to identify the ONE workspace your task belongs to before doing
   anything else. Despite the filename, its content is model-agnostic and binds
   every assistant.
2. **[`governance/agents/SHARED-RULES.md`](governance/agents/SHARED-RULES.md)** — the shared
   multi-agent contract: read-order, architecture you must respect, write-scope,
   conflict avoidance, attribution, hard limits.

Then:

| If you need… | Read |
|--------------|------|
| **Who may approve, authorize, or override what** | [`governance/agents/GOVERNANCE.md`](governance/agents/GOVERNANCE.md) |
| Who you are / which model tag to sign with | [`governance/agents/REGISTRY.md`](governance/agents/REGISTRY.md) |
| How to sign commits, PRs, files, docs | [`governance/agents/attribution.md`](governance/agents/attribution.md) |
| Instructions specific to your model | `governance/agents/models/<model-tag>.md` |
| Branching, write-scope, promotion flow | [`governance/collaboration.md`](governance/collaboration.md) |
| Approval gates and stop conditions | [`governance/guardrails.md`](governance/guardrails.md) |

**The three things most likely to go wrong if you skip the above:**

1. You read the wrong workspace and answer with context that isn't yours.
2. You publish anything outside `hub/` through GitHub Pages, exposing private
   repository or client records; `hub/` is the only deployable Pages artifact.
3. You write a company document from scratch instead of from
   `documents/templates/`, which `company/document-policy.md` forbids.
