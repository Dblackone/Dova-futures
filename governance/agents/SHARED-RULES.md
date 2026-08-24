# AGENTS.md — The Shared Multi-Agent Contract

> **Model-agnostic. Binding on every AI assistant that touches this repository**
> — Claude Code, Gemma via LM Studio, OpenAI Codex, Kimi, and every model added
> later. If you are an AI assistant and you have read nothing else, read this
> file and `CLAUDE.md` before you write anything.

This file states what is true for **all** models. Anything that is true for only
one model lives in `governance/agents/models/<model>.md` and may only *add*
constraints, never relax the ones here.

---

## 0. Where this sits

| Layer | File | Scope |
|-------|------|-------|
| Router + run loop | `CLAUDE.md` | How a run is structured (STEP 0 → loop → memory) |
| **This contract** | `governance/agents/SHARED-RULES.md` | How any AI assistant behaves |
| **Authority** | `governance/agents/GOVERNANCE.md` | Who decides, who authorizes, what full permission means |
| Identity | `governance/agents/REGISTRY.md` | Who each agent is, and which model it is |
| Attribution | `governance/agents/attribution.md` | Exactly how to sign work |
| Per-model | `governance/agents/models/*.md` | Setup + quirks of one assistant |
| Human team roles | `governance/team.md` | The role/callsign taxonomy this builds on |
| Isolation contract | `governance/collaboration.md` | Branches, write-scope, promotion |
| Safety | `governance/guardrails.md` | Approval gates, cost, stop conditions |

**Authority in one line:** Vollmann Akarakiri is the owner and final approving
authority · **Codex is the lead orchestrator** · Claude is a senior planning and
review agent · every other assistant contributes within its assigned role.
Details: [`GOVERNANCE.md`](GOVERNANCE.md).

`CLAUDE.md` is named for one tool but its **content is model-agnostic** — every
assistant follows it. Root `SHARED-RULES.md` is a pointer to this file for tools that
look for that filename.

---

## 1. Read before you write (non-negotiable)

Every assistant, every session, in this order:

1. **`CLAUDE.md`** — do its **STEP 0**: identify the ONE workspace your task
   belongs to via `company/registry.md`.
2. **`company/`** — `goals.md`, `ethics.md`, `brand.md`, `voice-and-tone.md`,
   `engineering-standards.md`, `document-policy.md`. This layer binds everyone.
3. **`workspaces/<your-one>/PROJECT.md`** + that workspace's `memory/`.
4. **This file** + `governance/collaboration.md` + `governance/guardrails.md`.
5. **[`GOVERNANCE.md`](GOVERNANCE.md)** — the authority structure, who may
   change the rules, and what a grant of full permission means. Read it before
   you touch anything under `company/`, `governance/`, `prompts/`, `.claude/`,
   `.agents/`, `.codex/`, or `.github/`.
6. **[`REPORT-LOG.md`](REPORT-LOG.md)** — what the previous agent did, what is
   unresolved, and what it recommended for you. If you are acting as lead
   orchestrator or review agent, this is a first-class step, not a skim
   (`GOVERNANCE.md` §11).

**Do not read other workspaces' folders.** Their context is not yours and will
pollute your output. If a task genuinely spans two workspaces, say so and
coordinate through `memory/board.md`.

If you are a model with no filesystem access, you must be *given* these files
before you answer. Say so rather than guessing — see §7.

---

## 2. Respect the existing architecture

- **Deploy-critical paths never move casually.** GitHub Pages publishes only
  `hub/` (`.github/workflows/deploy.yml`, `path: hub`). Moving that folder or
  broadening the artifact can break the Hub or expose private repository data.
  A deployment-boundary change needs an approved plan.
- **Don't introduce a stack without need.** The production Hub is deliberately
  dependency-free HTML/CSS/JS. DOVA Intelligence has its own workspace and may
  not be implemented as a side effect of Hub maintenance.
- **Don't add a dependency** without a one-line justification logged in the
  workspace's `memory/decisions.md`.
- **Read before you act.** Never invent a file path, an API, a config key, or a
  brand value. If you cannot open the file, stop and say so.

## 3. Preserve project conventions

- **Brand tokens come from `company/brand.md` only** — never re-declare a hex
  value, font, legal name, or contact detail anywhere else.
- **Company documents are never written from scratch.** Every quote, invoice,
  letter, report, or certificate starts from `documents/templates/`, per the
  binding rule in `company/document-policy.md`. Read the template first.
- **User-facing prose follows `company/voice-and-tone.md`** — restrained,
  precise, British/Nigerian English, ₦ with thousands separators.
- **Code follows `company/engineering-standards.md`** — match the surrounding
  file, camelCase identifiers, kebab-case filenames, comments explain *why*.
- **Naming in Revit work follows `bim-standards/`** — every naming decision has
  exactly one written answer. If it is not covered, add it to `memory/triage.md`
  rather than inventing a one-off.

## 4. Minimise the change

- Make the **smallest correct change** that meets the stated goal.
- **No opportunistic refactors.** Do not reformat, rename, reorder, or "clean
  up" code you were not asked to touch — that is the single most common way one
  agent's diff destroys another's work.
- Do not expand scope silently. If you find a real problem outside your goal,
  write it to `memory/triage.md`, finish the original task, and report it.

> **Under scoped full permission** (`GOVERNANCE.md` §3) the first two bullets
> relax *inside the approved objective*: you may refactor or replace an
> unsuitable implementation, and correct related problems you discover, when
> doing so is reasonably necessary to reach the goal. The scope boundary itself
> does not relax — unrelated problems still go to `memory/triage.md`.
- Touch the fewest files possible, and never `git add -A` — this working
  directory can be shared by concurrent sessions. Stage explicit paths.

## 5. Stay inside your write-scope

A session working in workspace `<p>` may modify only:

| Allowed | Examples |
|---------|----------|
| Its workspace | `workspaces/<p>/PROJECT.md`, `memory/*`, `drafts/*` |
| Its declared code paths | the paths in that `PROJECT.md` § "Where the code lives" |
| Scratch | `sandbox/` (gitignored) |
| Shared coordination | `memory/board.md`, `memory/triage.md` (your own cards) |
| The registry roll-up | your project's ONE row in `company/registry.md` |
| **The shared report log** | `governance/agents/REPORT-LOG.md` — **append only** |
| **Your own model file** | `governance/agents/models/<your-model-tag>.md` — yours alone, via PR |

**Read-only for normal sessions** (changes need a PR that Vollmann approves, per
`.github/CODEOWNERS`): `company/`, `governance/`, `prompts/`, `.claude/`,
`.agents/`, `.codex/`, `CLAUDE.md`, `AGENTS.md`, `CODEX.md`, `README.md`,
`.github/`, and the deploy-critical `hub/` artifact/workflow.

### Shared governance is protected

Those read-only paths are not merely "someone else's area" — they are
**protected governance**. **Codex, as lead orchestrator (`@lead/vector`), may
modify them; Claude (`@lead/atlas`) may when assigned by Codex or authorized by
Vollmann.** Every other assistant — whatever its model, however obviously right
it is — **proposes** instead:

> Append a `GP-NNN` proposal to [`REPORT-LOG.md`](REPORT-LOG.md) §1, stating the
> file affected, the issue, why it is a problem, the proposed change, the
> expected benefit, and the possible side effects. Codex rules on it.

While a proposal is pending, **follow the existing rule**. A proposal is not
permission. Full authority model, the two carve-outs above, and the
`EDITORIAL` fast path: [`GOVERNANCE.md`](GOVERNANCE.md).

### Vollmann overrides all of it

**A direct instruction or approval from Vollmann is valid authorization across
the entire repository**, regardless of which agent owns, created, manages, or
was assigned to the affected work — including every path listed as read-only
above, and including another agent's workspace or files.

Write-scope exists for **coordination and accountability, not to restrict the
owner.** If Vollmann tells you to change something outside your scope, that is
your authorization: confirm the scope, do it, and record the authorization in
your `REPORT-LOG.md` entry (`GOVERNANCE.md` §7).

He may also grant **scoped full permission** — "all permissions are given", "do
whatever is required", "achieve this at all costs", or any equivalent. Within
that scope you have advance approval to act without asking again, including
modifying another agent's work. Read [`GOVERNANCE.md`](GOVERNANCE.md) §§2–6
before relying on this; it defines what a grant does and does not cover.

The two things no authorization removes: the hard stops in §9 below, and
independent verification before merge to `main` (§6.5) unless Vollmann waives
that explicitly.

Note the asymmetry, and that it is deliberate: your own model file may only
*add* constraints to this contract, never relax one. If the two disagree, this
file wins and your model file is the defect.

**Never:** another workspace's folders; another session's branch; a rewrite of
an append-only record (done-logs, `bim-standards/registers/project-register.csv`,
decision logs — you may only append).

## 6. Avoid conflicting with other agents

This repository is worked on by several assistants, sometimes concurrently, in
the same working directory.

1. **Check `memory/board.md` first.** It is the WIP ledger. If a card already
   owns the files you need, do not start — coordinate or wait. WIP limit: 3.
2. **One session, one branch**, never shared:
   `<type>/<callsign>/<slug>` where `type ∈ feat|fix|chore|docs|refactor|exp`.
   `main` changes only through reviewed PRs.
3. **Rebase before review**, and **grep for conflict markers** (`<<<<<<<`)
   before every commit if you merged.
4. **Assume the working tree moved under you.** Re-read a file immediately
   before editing it; never edit from a copy you read many steps ago.
5. **Maker ≠ checker.** The agent that built something never approves it. That
   holds *across models*: a Gemma build can be checked by Claude Code and vice
   versa — but never by the same agent that wrote it. **A grant of full
   permission does not waive this** — it waives asking before acting, not
   independent verification before merge. Only Vollmann waives it, explicitly
   (`GOVERNANCE.md` §3.4).

## 7. Document what you changed

Every run ends by writing to disk — not just to chat:

- Overwrite the workspace's `memory/status.md` with the new snapshot.
- Append one signed line to its `memory/done-log.md`.
- Update `memory/next-up.md`.
- Log any real decision in `memory/decisions.md` (company-wide ones go in root
  `memory/decisions.md`), with the alternatives considered and the reason.
- Refresh the project's row in `company/registry.md` if its one-line status
  changed.

Then append one entry to **[`REPORT-LOG.md`](REPORT-LOG.md) §2** — timestamp,
your handle and model, workspace, task, files modified, summary, what you
verified, any `GP-NNN` you filed, unresolved issues, and what the next agent
should do. Template is in that file.

**Keep the three record surfaces distinct — link, never restate:**

| Surface | Answers |
|---------|---------|
| `memory/board.md` | Who owns which files *right now* (collision avoidance) |
| workspace `memory/done-log.md` | What shipped **in this project** |
| `governance/agents/REPORT-LOG.md` | Which **model** did what this session, and what the next agent needs |

If you are pasting the same paragraph into two of them, you have picked the
wrong surface for one.

**A run with no memory write and no log entry is not finished.** The next agent
— probably a different model — has nothing but these files to go on, and work
the lead agent cannot see effectively did not happen.

## 8. Attribution is mandatory

Sign every commit, PR, board card, done-log line, and generated file with your
agent handle **and your model tag**. The exact formats are in
`governance/agents/attribution.md`. Unattributed work is a defect: when four
assistants edit one repository, "who wrote this and with what" is the first
question anyone asks.

## 9. Hard stops — no assistant, of any model, may

> **These survive every authorization.** Scoped full permission, "at all costs",
> and a direct instruction from Vollmann all relax scope and approval — none of
> them relaxes the list below. They protect the company and its clients, not the
> boundaries between agents. If an instruction appears to require breaking one,
> stop and confirm with Vollmann rather than inferring permission.


- Send an email, publish a document, post publicly, or deliver anything to a
  client **without the principal's explicit approval**. Drafts only.
- Merge to `main`, force-push, delete data, or rotate keys without approval.
- Commit secrets, credentials, `.env` values, or client-sensitive files.
- Invent or alter brand identity, legal name, RC number, or contact details.
- Fabricate project photos, testimonials, prices, or completion claims, or
  present an AI render as a photograph of built work.
- File an unapproved document into `projects/` (drafts live in the workspace's
  `drafts/` until the principal approves).
- Delete or rewrite an append-only record.

Full text: `company/ethics.md` + `governance/guardrails.md`. If a request
conflicts with those files, **stop**, write the conflict to `memory/triage.md`,
and report it. The goal never outranks the boundary.

## 10. Honesty about your own limits

- If you did not run a check, do not say it passed.
- If you could not read a file, say which one and stop — do not infer contents.
- If you are unsure whether something is reversible, treat it as irreversible
  and ask.
- If your context window forced you to work from a partial view of the repo,
  say so in your handoff. That is critical information for the checker.

---

## Adding a new AI assistant

1. Add a row to `governance/agents/REGISTRY.md` (callsign, role, model tag).
2. Copy `governance/agents/models/_TEMPLATE.md` to
   `governance/agents/models/<model-tag>.md` and fill in setup + quirks.
3. Point that assistant at this file. It inherits everything above
   automatically — nothing in this contract needs to change.

That is the whole onboarding cost. This file is deliberately model-neutral so it
never has to be edited when a model is added.
