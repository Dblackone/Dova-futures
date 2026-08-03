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

### 2026-08-02 21:40 — @docs/quill [claude-code]
- **Model:** Claude Opus 5, Claude Code
- **Workspace:** `document-templates`
- **Task:** Document System Phase 2 — produce one realistic sample document for
  every template in `documents/templates/`, sharing one fictional client and
  project, for the principal to review before Phase 3.
- **Files modified:**
  - new: `workspaces/document-templates/drafts/samples/SAMPLE-00-Letterhead.html`
    … `SAMPLE-09-Milestone-Payment-Request.html` (10 files) + that folder's
    `README.md`
  - modified: `workspaces/document-templates/memory/{status,next-up,done-log}.md`
  - modified: `memory/triage.md` (7 new rows, appended)
  - modified: this file (append)
  - **not touched:** `documents/templates/**` (no template edited),
    `projects/**`, `bim-standards/registers/project-register.csv`
- **Summary of changes:** Invented one client and project — Aterin Heights
  Limited, job `SAMPLE-2026-ATH-001`, a clubhouse and pool deck at Ajah, Lagos
  — and ran it through its lifecycle across the ten templates. Every figure
  derives from a single ₦97,779,000 ex-VAT contract sum and reconciles exactly:
  four milestones mapping onto whole work packages, two invoices, a
  value-weighted progress calculation (69.7% actual vs 72.1% planned), an
  interim milestone claim, and a completion certificate. VAT 7.5% and retention
  5% throughout, per the brief. All ten templates were read in full first.
- **Verified:** Measured all ten samples **and all ten blank templates** in
  headless Chrome (`puppeteer-core` from `workspaces/client-jobs/tools/`), print
  media emulated, `[data-paper]` height against A4 = 1123 px. Result table is in
  the sample `README.md` §4. `document.fonts.check` confirmed Bebas Neue and
  Inter loaded on all ten. Samples 02 and 08 inspected visually in a browser.
  Grep confirms no `[Bracketed Placeholder]` and no italic clay placeholder
  styling survives in any sample. **Not verified:** no PDFs rendered — see
  unresolved issue 2; no checker has reviewed this; the arithmetic was computed
  by hand and re-checked, not by a tool.
- **Governance suggestions submitted:** none.
- **Unresolved issues:**
  1. **🔴 Five templates overflow A4 while completely empty, and all nine
     hardcode a `Page 1 of 1` footer.** 01 = 1297 px, 02 = 1182 px, 04 =
     1238 px, 08 = 1348 px, 09 = 1273 px against A4's 1123 px; 07 has 51 px of
     headroom and the filled sample overflows it. Any two-page document prints
     `Page 1 of 1` mid-document and nothing on page 2. This promotes
     `documents/TEMPLATE-INVENTORY.md` §4 finding 5 from tidy-up to blocking.
  2. **No template renders correctly through `render-pdf.js` as shipped** —
     none carries `@page :first { margin-top: 0 }`, so page 1's letterhead lands
     20 mm down the paper. Adding it to the samples would have meant introducing
     a pagination strategy the templates do not have, which the brief forbade,
     so PDFs were skipped and the defect reported instead.
  3. Five further template defects logged to `memory/triage.md`: templates 04,
     05 and 08 have no reference-number field at all; 03 has no retention row
     while 09 has no VAT line; 08's Variance/Status cells and Impact badges are
     not `contenteditable`; 03 ships a Sort Code field Nigerian NUBAN banking
     does not use; and "Contract Value" is ambiguous across 04, 08 and 09.
  4. Seven filling decisions need the principal's confirmation — listed in the
     sample `README.md` §6. One of them (whether VAT is charged on the gross
     works value or net of retention) is a genuine tax question with a wrong
     answer, and is not mine to settle.
  5. Nothing is merged. This is maker output on a branch, and **Phase 2 is gated
     on the principal's review** by the brief itself.
- **Recommendations for the next agent:**
  - **Do not start Phase 3.** The gate is the principal's review of
    `workspaces/document-templates/drafts/samples/README.md`.
  - A checker run (maker ≠ checker) should independently re-derive the figures
    in that README §3 and re-run the §4 measurement before the principal spends
    time on wording.
  - When Phase 3 does start, the pagination decision comes first — the 12pt body
    scaling the principal asked for on 2026-07-31 makes the overflow worse, so
    scaling before pagination is settled just moves the problem.

---

*This file is permanent. It is never truncated or archived wholesale — if it
grows unwieldy, Claude moves closed proposals and entries older than one year
into `memory/archive/`, leaving a dated pointer here.*

### GP-001 - Register DOVA Futures Intelligence workspace
- **Submitted:** 2026-08-03 by @qa/quartz [codex]
- **Governance file affected:** `company/registry.md` - Active workspaces table
- **Issue identified:** The intelligence prototype is now located at `workspaces/dova-futures-intelligence/` and has a complete `PROJECT.md`, but the workspace is absent from the registry.
- **Why it is a problem:** The repository router cannot reliably complete STEP 0 for future intelligence sessions, and the project status is invisible in the hub index.
- **Proposed change:** Add an Active workspaces row for `dova-futures-intelligence`, pointing to `workspaces/dova-futures-intelligence/PROJECT.md`, code under that workspace, deployed `-`, and status `Active - orchestration foundation; approval resume wired`.
- **Expected benefit:** Future agents will route to the correct project context and the hub will reflect the active build.
- **Possible side effects:** The row adds a new project to the active workspace list; no deploy-critical path changes.
- **Status:** PENDING

### 2026-08-03 02:44 - @qa/quartz [codex]
- **Model:** OpenAI Codex, GPT-5
- **Workspace:** dova-futures-intelligence
- **Task:** Continue the intelligence build from the hand-off workspace and implement the next queued approval-control milestone.
- **Files modified:** `workspaces/dova-futures-intelligence/core/gateway.py`; `workspaces/dova-futures-intelligence/ui.py`; `workspaces/dova-futures-intelligence/main.py`; `workspaces/dova-futures-intelligence/tests/test_gateway.py`; `workspaces/dova-futures-intelligence/memory/status.md`; `workspaces/dova-futures-intelligence/memory/next-up.md`; `workspaces/dova-futures-intelligence/memory/done-log.md`; `workspaces/dova-futures-intelligence/memory/decisions.md`; `governance/agents/REPORT-LOG.md`
- **Summary of changes:** Relocated the unregistered hand-off to `workspaces/dova-futures-intelligence/` and archived its empty nested Git metadata in ignored `sandbox/`. Added one pending-action slot in the gateway, an explicit desktop approval button, and resume handling for approved local writes.
- **Verified:** `python -m unittest discover -s tests -v` - 20 passing; `python -m compileall -q core main.py ui.py`; `git diff --check`. No live desktop session or API provider was run.
- **Governance suggestions submitted:** GP-001
- **Unresolved issues:** Workspace registry row still needs protected-governance approval. The maker has not received an independent checker review.
- **Recommendations for the next agent:** Have an independent checker review the approval flow, then register the workspace and continue with the read-only `file_controller` adapter.
