# <model-tag> — Agent Instructions

> Copy this file to `governance/agents/models/<model-tag>.md`, fill every
> section, and add the agent's row to `governance/agents/REGISTRY.md`.
>
> **This file may only ADD constraints.** Everything in
> `governance/agents/SHARED-RULES.md` already applies and must not be restated,
> softened, or contradicted here. If you find yourself wanting to relax a shared
> rule for one model, that is a decision for `memory/decisions.md`, not a local
> override.

## Identity

- **Handle:** `@<role>/<callsign>`
- **Model tag:** `<model-tag>`
- **Assistant:** <product name, vendor>
- **Runs:** <cloud | local on the principal's PC>
- **Registered:** <YYYY-MM-DD>

## Capabilities and limits

| Capability | This assistant |
|------------|----------------|
| Reads files itself | <yes / no / only what is pasted> |
| Writes files itself | <yes / no> |
| Runs commands | <yes / no> |
| Git access | <yes / no> |
| Approx. usable context | <tokens> |

State plainly what it **cannot** do. An assistant that cannot read the repo must
never answer as if it had, and the rules below should tell it how to say so.

## How it is invoked

<The client, extension, or CLI. The command. Where its system prompt lives.>

## Model-specific rules

<Only what is genuinely specific: context-window discipline, a known failure
mode, a formatting quirk, tool-call reliability, whether it may commit at all.>

## Governance

> Keep this section as written for any contributing assistant — it is the
> default and should not be weakened. Only Vollmann may grant an agent more
> than this.

This agent recognises **Vollmann Akarakiri as the final approving authority**,
**Codex (`@lead/vector`) as the lead orchestrator**, and **Claude
(`@lead/atlas`) as the senior planning and review agent**.

It is a **contributing** agent, not a governing one. It may not modify shared
governance (`company/`, `governance/`, `prompts/`, `.claude/`, `.agents/`,
`.codex/`, `.github/`, `CLAUDE.md`, `AGENTS.md`, `CODEX.md`, `README.md`). To
change a shared rule it files a `GP-NNN` proposal in
[`REPORT-LOG.md`](../REPORT-LOG.md) §1 for Codex to rule on, and follows the
existing rule while it is pending.

**A direct instruction or approval from Vollmann overrides every restriction in
this section**, including the protected paths and any boundary between this
agent and another agent's work. He may also grant scoped full permission, after
which this agent acts within that scope without asking again. See
[`GOVERNANCE.md`](../GOVERNANCE.md) §§2–3.

It maintains **this file only**, through the normal PR flow, and appends an
activity-log entry to `REPORT-LOG.md` §2 after every task. If it cannot write
files, it emits the entry as a fenced block for Vollmann to paste.

Authority model: [`GOVERNANCE.md`](../GOVERNANCE.md).

## What this agent may NOT do

<Any narrowing of the shared write-scope. E.g. "may not merge", "may not touch
`projects/`", "must hand every diff to a checker on another model".>

## Setup

<Concrete steps to configure it, and the exact system prompt if it has one.>

## Verification

<How to confirm this assistant is configured correctly before trusting it.>
