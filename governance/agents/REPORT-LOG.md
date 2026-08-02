# REPORT-LOG.md — Governance Proposals & Repository Activity Log

> **The shared coordination surface for every AI assistant on this repository.**
> This is the one file inside `governance/` that all assistants may write to.
> Authority model: [`GOVERNANCE.md`](GOVERNANCE.md). Shared rules:
> [`SHARED-RULES.md`](SHARED-RULES.md).

## How to use this file

| | |
|---|---|
| **Every assistant, every task** | Append an **Activity Log** entry (§2) when the task ends. No entry = the lead agent cannot see your work. |
| **Want a shared rule changed?** | Append a **Governance Proposal** (§1). Do **not** edit governance directly. |
| **Claude, starting a run** | Read §1 for `PENDING` proposals and §2 since your last entry, before doing anything else. |

**Append-only.** Add your entry at the **bottom** of the relevant section. Never
edit, reorder, reformat, or delete another agent's entry. The single exception:
Claude, acting as `@lead/atlas`, updates a proposal's `Status:` line in place
when ruling on it.

**Newest last** in both sections, so an append is always a clean diff and two
concurrent sessions rarely collide.

---

# §1 · Governance Proposals

Number sequentially — `GP-001`, `GP-002`, … Never reuse a number. If two agents
race and pick the same number, the later committer renumbers.

<details>
<summary><strong>Template — copy this</strong></summary>

```markdown
### GP-NNN — <short title>
- **Submitted:** YYYY-MM-DD by @role/callsign [model-tag]
- **Governance file affected:** <exact path + section>
- **Issue identified:** <what is factually wrong or missing>
- **Why it is a problem:** <concrete consequence; cite something that happened>
- **Proposed change:** <exact wording or diff>
- **Expected benefit:** <what improves and how anyone would notice>
- **Possible side effects:** <what it could break or make harder>
- **Status:** PENDING
```

</details>

Verdicts Claude may record: `ACCEPTED` · `REJECTED` · `MODIFIED` ·
`ALTERNATIVE` · `DEFERRED` (needs the principal). Every verdict carries a date,
the signing handle, and a reason.

**While your proposal is `PENDING`, follow the existing rule.** A proposal is
not permission.

## Open proposals

_(none yet — the first submission goes here)_

## Closed proposals

_(rulings are recorded on the proposal itself; move it here once closed)_

---

# §2 · Repository Activity Log

One entry per completed task, appended by the agent that did the work —
**including Claude**. This is what lets the next agent, on a different model,
pick up without re-deriving the state of the repository.

<details>
<summary><strong>Template — copy this</strong></summary>

```markdown
### YYYY-MM-DD HH:MM — @role/callsign [model-tag]
- **Model:** <concrete build, e.g. "Gemma 4 E4B, LM Studio, local">
- **Workspace:** <slug from company/registry.md>
- **Task:** <one sentence — what you were asked to do>
- **Files modified:** <explicit paths; "none (advisory only)" is a valid answer>
- **Summary of changes:** <what actually changed and why — 2–4 lines>
- **Verified:** <what you ran/checked and the result, or "not verified — <why>">
- **Governance suggestions submitted:** <GP-NNN, or "none">
- **Unresolved issues:** <blockers, open questions, anything left half-done>
- **Recommendations for the next agent:** <what to do next, or "none">
```

</details>

### Rules for entries

- **Be honest about verification.** "Not verified — no test suite exists for
  this path" is a good entry. Claiming a check you did not run is a defect.
- **List files explicitly.** "Various files" is useless to the next agent.
- **Unresolved issues belong here even when embarrassing** — an issue nobody
  logged is one the next agent rediscovers at full cost.
- This does **not** replace workspace `memory/`. Memory is project state; this
  log is cross-agent activity. Both get written.

## Entries

### 2026-08-02 — @lead/atlas [claude-code]
- **Model:** Claude Opus 5, Claude Code
- **Workspace:** cross-cutting — hub governance (`company-ops` adjacent). Flagged
  explicitly as cross-workspace per `CLAUDE.md` STEP 0 §4; requested directly by
  the principal.
- **Task:** Prepare the repository for multi-model AI development: environment
  configuration, an LM Studio briefing for a local Gemma model, a multi-agent
  collaboration standard, a document-template audit, and this governance layer.
- **Files modified:**
  - new: `AGENTS.md` (root), `.env.ai.example`, `documents/TEMPLATE-INVENTORY.md`
  - new: `governance/agents/{SHARED-RULES,REGISTRY,GOVERNANCE,REPORT-LOG,attribution}.md`
  - new: `governance/agents/models/{_TEMPLATE,claude-code,gemma-lmstudio,codex}.md`
  - modified: `.gitignore`, `CLAUDE.md` (pointer only), `governance/team.md`
    (pointer only), `.github/CODEOWNERS`
  - untracked, local only: `.env`, `dova-preorder/.env`, `.env.ai`
- **Summary of changes:** Established the cross-model layer under
  `governance/agents/`: identity scheme `@role/callsign [model-tag]` (existing
  Claude callsigns grandfathered, nothing renamed), greppable attribution
  trailers, a shared model-agnostic contract, per-model instruction files, and
  this governance/report layer with Claude as lead agent. Wrote the two real
  `.env` files with every variable documented against the line that reads it,
  and closed a `.gitignore` gap where `.env.*` variants were committable.
  Audited all ten document templates (Task 5 Phase 1).
- **Verified:** `git check-ignore` confirms all four env files ignored and all
  three `.example` files still tracked. `git status` confirms no `.env` content
  is visible to git. Template inventory built by reading the template files and
  grepping their `contenteditable` fields, not from assumption. **Not verified:**
  nothing was committed, no PR opened, no checker run — this is maker output.
- **Governance suggestions submitted:** none (acting as lead; changes made
  directly under `GOVERNANCE.md` §1 authority, pending the principal's approval
  at merge).
- **Unresolved issues:**
  1. Nothing is committed. These changes touch protected paths and need a
     branch + principal-approved PR per `.github/CODEOWNERS`.
  2. **Task 5 Phase 2 not started** — ten sample documents, one per template,
     awaiting the principal's review gate. Must use fictional clients/staff and
     land in a review folder, never `projects/`.
  3. `documents/TEMPLATE-INVENTORY.md` §4 lists eleven unresolved document-system
     findings for Phase 3 — including three competing reference-numbering
     schemes, hardcoded VAT at 7.5% against live documents issued at 5%, and
     five issued POOL invoices still carrying the closed Globus bank account.
  4. The brief for Task 5 Phase 5 referenced an existing `build.py`; no such
     file exists in this repository. Phase 5 is new work, not a refactor.
  5. Empty leftover directories `context/`, `chats/`, `jobs/`, `project/` remain
     on disk from the 2026-07 renames (zero files, invisible to git).
- **Recommendations for the next agent:**
  - A **checker** run (maker ≠ checker) should verify this before merge —
    ideally `@qa/vera`, and for the `.env` handling `@sec/warden`.
  - Then Task 5 Phase 2, in its own session — it needs all ten templates read in
    full and will not fit alongside other work.
  - Any assistant other than Claude: read `GOVERNANCE.md` before touching
    anything under `company/`, `governance/`, `prompts/`, or `.github/`.

---

*This file is permanent. It is never truncated or archived wholesale — if it
grows unwieldy, Claude moves closed proposals and entries older than one year
into `memory/archive/`, leaving a dated pointer here.*
