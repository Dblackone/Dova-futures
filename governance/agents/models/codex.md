# codex — Agent Instructions

> Adds to `governance/agents/SHARED-RULES.md`. Does not replace it.
> **Status: reserved, not yet in use.** This file exists so that onboarding
> Codex later is a fill-in-the-blanks job, not a design job.

## Identity

- **Handle:** `@qa/quartz` (reserved — a cross-model checker, so that work built
  by Claude Code can be independently verified by a different model)
- **Model tag:** `codex`
- **Assistant:** OpenAI Codex
- **Runs:** cloud model with repository access
- **Registered:** reserved — activate by moving its row to Active in
  `REGISTRY.md` and completing the sections below.

## Where it finds its instructions

Codex looks for **`AGENTS.md` at the repository root**. That file already exists
here and forwards to `governance/agents/SHARED-RULES.md` plus `CLAUDE.md` — so Codex
inherits the shared contract with no extra configuration.

If the tooling supports nested `AGENTS.md` files, a per-workspace one may be
added later; today the single root pointer is deliberate, because the routing
rule (STEP 0: pick ONE workspace) does the same job with less duplication.

## Capabilities and limits

_(Complete on activation — do not guess.)_

| Capability | Codex |
|------------|-------|
| Reads files itself | TBC |
| Writes files itself | TBC |
| Runs commands | TBC |
| Git access | TBC |
| Usable context | TBC |

## Model-specific rules

_(Complete on activation. Candidates, based on how this repo is structured —
confirm each against actual behaviour before relying on it:)_

- Confirm it honours STEP 0 routing and does not read every workspace.
- Confirm it does not reformat untouched code (this repo has no formatter
  config, so an assistant that auto-formats will produce enormous diffs).
- Confirm it does not add TypeScript, a bundler, or a framework to the vanilla
  website.

## Governance

Codex is a **contributing** agent, not a governing one. It may not modify
`company/`, `governance/`, `prompts/`, `.claude/`, `.agents/`, `.github/`,
`CLAUDE.md`, `AGENTS.md`, or `README.md`. To change any shared rule it files a
`GP-NNN` proposal in [`REPORT-LOG.md`](../REPORT-LOG.md) §1 for Claude to rule
on, and follows the existing rule while the proposal is pending.

It maintains **this file only**, through the normal PR flow, and appends an
activity-log entry after every task. Full model: [`GOVERNANCE.md`](../GOVERNANCE.md).

## Suggested first role

Use it as a **checker**, not a maker. Its highest value here is breaking the
single-model monoculture: an independent model reviewing Claude Code's work
catches failure modes a second Claude run shares. That is why the reserved
handle is `@qa/quartz` rather than a `build` callsign.

## Verification

Before trusting it: give it one closed task with known correct output (e.g.
"which workspace owns `dova-preorder/`, and what must never move?") and check it
answers from the repo, not from priors.
