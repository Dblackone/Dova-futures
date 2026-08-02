# GOVERNANCE.md — Authority, Protected Files, and the Proposal Workflow

> **Who may change the rules, and how.** Binding on every AI assistant.
> The rules themselves live in [`SHARED-RULES.md`](SHARED-RULES.md); this file governs how
> *that* file — and every other shared rule in the repository — is changed.
>
> Established 2026-08-02 by the principal.

---

## 1. The hierarchy

```
   Vollmann Akarakiri — the principal
   ├─ owns the repository, holds the merge key, outranks every agent
   │  and may change anything at any time
   │
   └─ Claude  (@lead/atlas [claude-code])  — LEAD AI AGENT
      ├─ the ONLY assistant permitted to modify shared governance
      ├─ reviews proposals from every other assistant
      └─ coordinates multi-agent contribution
         │
         ├─ @build/ember [gemma-lmstudio]  ─┐
         ├─ @qa/quartz  [codex]             ├─ contribute code, docs,
         └─ …every future assistant        ─┘  planning, implementation
                                               PROPOSE governance changes;
                                               never edit it directly
```

**The principal outranks Claude.** Claude's authority is delegated, not
inherent. If the principal edits a governance file directly, that is final and
Claude records it — Claude does not "review" the owner's decisions.

**Claude's governance authority is exercised as `@lead/atlas`.** A Claude Code
session doing ordinary implementation work is `@build/forge` or another roster
handle and has **no** governance authority. Signing a governance change means
explicitly acting in the lead role. Being a Claude session is not sufficient;
acting as `@lead/atlas` is.

---

## 2. Protected files

These define how the repository operates. **Only Claude, acting as
`@lead/atlas`, may modify them** — and even then through a PR the principal
approves, per `.github/CODEOWNERS`.

| Protected | What it governs |
|-----------|-----------------|
| `CLAUDE.md` | The router + master run loop — read at the start of every run |
| `AGENTS.md` (root) | Cross-tool entry pointer |
| `README.md` | Repository orientation |
| `company/**` | goals · ethics · brand · voice-and-tone · engineering-standards · document-policy · registry |
| `governance/**` | guardrails · collaboration · team · this whole `agents/` layer |
| `prompts/**` | maker · checker · loop-runner · automation-triage |
| `.claude/**` · `.agents/**` | Agent and skill definitions |
| `.github/**` | CODEOWNERS · PR template · deploy workflow |

**The invariant: every path in this table is routed to the principal in
[`.github/CODEOWNERS`](../../.github/CODEOWNERS).** Nothing is protected because
this table says so — it is protected because CODEOWNERS makes GitHub require the
principal's review. **If you add a row here, add the CODEOWNERS entry in the same
change**, or the protection is prose with no mechanism behind it.

CODEOWNERS additionally gates `/projects/` and `/bim-standards/registers/`.
Those are client and financial records, protected for **confidentiality and
append-only integrity** (`company/ethics.md`), not because they govern the
repository. Different reason, same gate.

### Binding, but NOT protected

A separate and weaker category. These bind every agent, but the workspace that
owns them maintains them through its ordinary write-scope — no Claude, no
proposal:

| Binding standard | Maintained by |
|------------------|---------------|
| `documents/README.md` · `documents/TEMPLATE-INVENTORY.md` | `document-templates` workspace |
| `bim-standards/*.md` (the numbered naming files) | `bim-standards` workspace |
| each `workspaces/*/PROJECT.md` | that workspace |

Locking these to Claude would lock each workspace out of its own subject matter,
and would put the lead agent in the path of routine domain work it is not the
best judge of. **Follow them; propose changes to the owning workspace.**

### The two carve-outs

Everything above is read-only for non-Claude assistants **except**:

1. **[`REPORT-LOG.md`](REPORT-LOG.md)** — every assistant appends here. That is
   its entire purpose. Append-only: never edit or delete another agent's entry.
2. **`governance/agents/models/<your-own-model-tag>.md`** — each assistant
   maintains its own file (see §3).

### What is *not* protected

Normal workspace territory stays exactly as `governance/collaboration.md`
defines it: your workspace's `PROJECT.md`, `memory/`, `drafts/`, your declared
code paths, `sandbox/`, `memory/board.md`, `memory/triage.md`, and your one row
in `company/registry.md`. Protected-governance status changes nothing there.

---

## 3. Agent-specific governance

Every assistant maintains **its own** file at
`governance/agents/models/<model-tag>.md`, and only that file — through the
normal branch-and-PR flow, like any other change. It is **not** carved out of
CODEOWNERS, deliberately: a carve-out would also let any agent rewrite *another*
agent's file unreviewed, and an agent quietly relaxing its own constraints is
precisely what review exists to catch. These files change rarely, so the cost is
low.

Put in it:

- preferences and prompt configuration
- optimisation and performance notes (context handling, sampling, quirks)
- workflow notes specific to how you work
- model-specific behaviour and known failure modes
- implementation guidance for your own future sessions

**Two constraints, and they are absolute:**

1. **It may only ADD constraints, never relax a shared one.** If your model file
   contradicts `SHARED-RULES.md`, `SHARED-RULES.md` wins and your file is the defect.
2. **It binds only you.** Nothing written in a model file applies to any other
   assistant. If you want a rule to apply repository-wide, that is a proposal
   (§4) — writing it into your own file does not make it shared.

Adding a new model file for a *new* assistant is a governance change and goes
through Claude. Editing your *own existing* file does not.

---

## 4. Proposing a governance change

If you believe shared governance is wrong, incomplete, or could be improved:
**do not edit it.** Append a proposal to
[`REPORT-LOG.md`](REPORT-LOG.md) § Governance Proposals, using this shape:

```markdown
### GP-NNN — <short title>
- **Submitted:** YYYY-MM-DD by @role/callsign [model-tag]
- **Governance file affected:** <exact path, and the section or line>
- **Issue identified:** <what is actually wrong — be specific and factual>
- **Why it is a problem:** <the concrete consequence, ideally something that
  already happened, not a hypothetical>
- **Proposed change:** <the exact wording or diff you propose>
- **Expected benefit:** <what improves, and how anyone would notice>
- **Possible side effects:** <what this could break, who else it affects,
  what it makes harder. A proposal with "none" here will be scrutinised —
  every rule change has a cost.>
- **Status:** PENDING
```

Number proposals sequentially (`GP-001`, `GP-002`, …). Never reuse a number.
Never edit another agent's proposal — if you disagree with one, file your own
referencing it.

### Two classes of proposal

| Class | What it covers | Who may apply it |
|-------|----------------|------------------|
| **SUBSTANTIVE** (default) | Any change to what a rule *means* — new rules, changed scope, relaxed constraints, new agents, new protected paths | Claude only, via the §5 review workflow |
| **EDITORIAL** | Typos, dead links, broken cross-references, formatting, a path that changed — **no change to meaning** | Claude, **or the principal directly** |

Mark the class on the proposal. The editorial class exists because Claude runs
in sessions while other assistants run continuously: without it, a dead link
sits broken until someone starts a Claude session. The principal was always
above this rule — this just makes the fast path explicit rather than an
exception someone has to reason about.

**If you are not certain which class applies, it is SUBSTANTIVE.** Rewording a
rule "for clarity" changes what it means more often than anyone expects.

**While a proposal is pending, follow the existing rule.** A proposal is not
permission to act as though it were accepted.

---

## 5. Claude's review workflow

**Reviewing the report log is one of the first things Claude does on any run**,
immediately after `CLAUDE.md` STEP 0 routing.

### 5.1 Read the log

1. Read `REPORT-LOG.md` § **Governance Proposals** — every entry with status
   `PENDING`.
2. Read `REPORT-LOG.md` § **Activity Log** — at minimum the entries since
   Claude's own last entry. Establish:
   - which assistant worked most recently, and on what
   - what files were modified
   - what is still in progress
   - what unresolved issues were flagged
   - what the previous agent recommended for the next one

Cross-check against `memory/board.md` (the WIP ledger) and the active
workspace's `memory/status.md`. Where the log and the board disagree, the board
is authoritative for *work state*; the log is authoritative for *what happened*.

### 5.2 Rule on each pending proposal

One of four verdicts:

| Verdict | Meaning |
|---------|---------|
| **ACCEPTED** | Implement it, as written, in the same run or a named follow-up |
| **REJECTED** | Do not implement. A reason is mandatory — "no" without a reason is not a verdict |
| **MODIFIED** | Accept the problem, change the solution. State what changed and why |
| **ALTERNATIVE** | The identified problem is real but the fix belongs elsewhere (a workspace rule, a `PROJECT.md`, a triage item). Say where it went |

Also valid: **DEFERRED** — the proposal is sound but needs the principal's
decision (it touches money, ethics, brand, client obligations, or deploy paths).
Say what the principal must decide.

### 5.3 Record the decision

Update the proposal's `Status:` line in place — this is the one exception to
append-only, and only Claude may do it:

```markdown
- **Status:** ACCEPTED 2026-08-02 by @lead/atlas — implemented in
  governance/agents/SHARED-RULES.md §6; see memory/decisions.md
```

Then:

- **Accepted or modified** → make the change, and log it in root
  `memory/decisions.md` in the standard format (date — decision — alternatives
  considered — reason — logged by).
- **Rejected** → the reason on the Status line is the record. No decisions.md
  entry needed for a rejection unless it establishes a precedent worth citing.
- **Any verdict** → append Claude's own Activity Log entry for the run.

### 5.4 Standing responsibilities

Claude, as lead, also watches for things no single proposal will report:

- **Drift** — a workspace quietly doing something the standard forbids.
- **Contradiction** — two governance files disagreeing (there are known cases,
  e.g. the three reference-numbering schemes in `documents/TEMPLATE-INVENTORY.md`).
- **Rule rot** — a rule everyone works around. That is a signal the rule is
  wrong, not that everyone is undisciplined.
- **Log health** — assistants that stopped writing entries. Silence in the log
  means the coordination surface has failed, not that nothing happened.

---

## 6. Every assistant's obligations

At the **end** of every task, on every model, including Claude:

1. Append an **Activity Log** entry to `REPORT-LOG.md` (format in that file).
2. Append any **Governance Proposal** you have.
3. Update your workspace `memory/` as `CLAUDE.md` already requires.

A task with no log entry is invisible to the lead agent, and therefore
effectively did not happen.

### The three record surfaces — one axis each

There are three places that record work. They are **not** interchangeable, and
writing the same content into more than one is how they drift apart until none
can be trusted:

| Surface | Tense | Scope | The one question it answers |
|---------|-------|-------|------------------------------|
| `memory/board.md` | **present / future** | cross-project | Who owns which files *right now*? (collision avoidance) |
| `workspaces/<p>/memory/done-log.md` | **past** | one project | What shipped in this project? |
| `governance/agents/REPORT-LOG.md` | **past** | one *session*, cross-project | Which model did what, and what does the next agent need? |

**Link, never restate.** A report-log entry points at the done-log line; it does
not copy it. If you find yourself pasting the same paragraph into two of these,
you have picked the wrong surface for one of them.

Rule of thumb: **board = claims · done-log = project record · report-log =
agent record.** Claude reads all three and treats the board as authoritative for
work state, the log as authoritative for what happened.

---

## 7. Enforcement

This is enforced at three levels, in increasing order of reliability:

1. **Instruction** — this file, `SHARED-RULES.md`, and each model file.
2. **Review** — a checker run rejects any PR that modifies a protected file
   without a `@lead/atlas` signature, or that lacks a log entry.
3. **`.github/CODEOWNERS`** — every protected path routes to `@Dblackone`, so
   GitHub itself requires the principal's review. `REPORT-LOG.md` is carved out
   so routine appends do not need one.

Levels 1 and 2 depend on agents behaving. Level 3 does not. That is why the
CODEOWNERS entries matter more than any wording in this file.

---

## 8. Adding a new assistant (governance view)

Only Claude does this. The steps are unchanged from `SHARED-RULES.md`, with one
addition:

1. Add the row to `REGISTRY.md`.
2. Create `models/<model-tag>.md` from `_TEMPLATE.md` — including its
   §"Governance" section stating it is a proposing, not governing, agent.
3. Point the assistant at root `SHARED-RULES.md`.
4. Log the addition in root `memory/decisions.md` and in `REPORT-LOG.md`.

The new assistant inherits every shared rule automatically and holds no
governance authority. That is the intended default, permanently.
