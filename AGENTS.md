# AGENTS.md — Start Here (any AI assistant)

This repository is worked on by several AI assistants — Claude Code, Gemma via
LM Studio, and others added over time. The rules are the same for all of them
and they are **not** in this file, so that adding a new assistant never means
editing it.

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
| Who you are / which model tag to sign with | [`governance/agents/REGISTRY.md`](governance/agents/REGISTRY.md) |
| How to sign commits, PRs, files, docs | [`governance/agents/attribution.md`](governance/agents/attribution.md) |
| Instructions specific to your model | `governance/agents/models/<model-tag>.md` |
| Branching, write-scope, promotion flow | [`governance/collaboration.md`](governance/collaboration.md) |
| Approval gates and stop conditions | [`governance/guardrails.md`](governance/guardrails.md) |

**The three things most likely to go wrong if you skip the above:**

1. You read the wrong workspace and answer with context that isn't yours.
2. You move or restructure something at the repo root or in `dova-preorder/` —
   both are deploy-critical and ship live sites from those exact paths.
3. You write a company document from scratch instead of from
   `documents/templates/`, which `company/document-policy.md` forbids.
