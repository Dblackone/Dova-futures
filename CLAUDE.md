# CLAUDE.md — Company Hub: Router + Master Loop

> This file is read at the start of EVERY run. It is the single source of truth
> for how agents behave in this repository. Keep it short, current, and honest.
>
> **Every AI assistant follows this file, not just Claude Code.** The
> cross-model layer — agent identity, model tags, and attribution — lives in
> `governance/agents/SHARED-RULES.md`; root `AGENTS.md` is the pointer for tools that
> look for that filename.

## 0. What this repository is — and STEP 0 of every run

- **Name:** Dova-futures — the company hub of **DOVA FUTURES LIMITED**
- **Owner:** Vollmann Akarakiri (the principal)
- **Purpose:** One repository holding ALL company undertakings — the website,
  the preorder store, document templates, BIM standards, client jobs, internal
  ops, and future side projects — each isolated in its own workspace.

**STEP 0 — locate yourself before anything else.** This is a multi-project hub;
most context in it is NOT about your task.

1. Open **`company/registry.md`** and identify which ONE workspace your task
   belongs to.
2. Read **`workspaces/<that-one>/PROJECT.md`** and its `memory/` — this is your
   project context.
3. Read the shared **`company/`** layer (brand, voice, goals, ethics,
   engineering standards, document policy) — it binds every workspace.
4. **Do NOT read other workspaces' folders.** Their context is not yours and
   will contaminate your run. If your task genuinely spans two workspaces,
   say so explicitly and coordinate through `memory/board.md`.
5. If your task fits no workspace: for a new project, copy
   `workspaces/_TEMPLATE/` and register it; for an undecided item, park it in
   `memory/triage.md`. Don't wedge work into the wrong workspace.
6. **Stay in your write-scope.** You may modify only: your workspace (its
   `PROJECT.md`, `memory/`, `drafts/`), the code paths your workspace's
   `PROJECT.md` declares, the gitignored `sandbox/` (scratch), the shared
   board/triage, and your row in the registry. Everything else — `company/`,
   `governance/`, other workspaces, deploy files — is read-only; changes there
   go through a dedicated principal-reviewed PR. Full contract:
   `governance/collaboration.md`.

## 1. How every run works (the loop)

You operate as a loop, not a chatbot. `memory/` below means the **active
workspace's** `memory/` (from STEP 0), not the root one.

1. **Goal** — After STEP 0, read the workspace's `memory/status.md` +
   `memory/next-up.md`. State the goal for this run in one sentence. If no goal
   is given, pick the top item from the workspace's `next-up.md`.
2. **Discover** — Gather context: the workspace's `PROJECT.md`, relevant files,
   recent `done-log.md` entries. Plan the smallest correct change.
3. **Act** — Make the change. Stay inside scope. Touch the fewest files possible.
4. **Verify** — Run the checks defined in the workspace's `PROJECT.md`. If you
   are the maker, hand off to a checker run — do NOT approve your own work.
5. **Remember** — Update the workspace's `status.md`, append to its
   `done-log.md`, adjust its `next-up.md`, log decisions in its `decisions.md`
   (company-wide decisions go in root `memory/decisions.md`). If the project's
   one-line status changed, refresh its row in `company/registry.md`.
6. **Stop** — Report what changed, what was verified, and what's next. Wait for
   approval before anything irreversible (see `governance/guardrails.md`).

## 2. Read these before acting (the control point)

Shared, binding for every workspace:

- `company/registry.md` — the project index (STEP 0)
- `company/goals.md` — mission + current company focus
- `company/ethics.md` — values and hard limits
- `company/brand.md` — the ONLY source of brand tokens; never re-declare them
- `company/voice-and-tone.md` — how all company output reads
- `company/engineering-standards.md` — universal code / commit / PR rules
- `company/document-policy.md` — **mandatory**: every company document starts
  from the canonical templates

Project-specific build steps, architecture, and traps live in each workspace's
`PROJECT.md` — not here.

## 3. Memory (the Vault)

Memory lives on disk, never only in chat. Always read before, always write after.

- **Per workspace** (`workspaces/<slug>/memory/`): `status.md`, `next-up.md`,
  `done-log.md`, `decisions.md` — the project's own state. This is where you
  read and write.
- **Root `memory/`** (cross-project only): `board.md` (shared team board),
  `triage.md` (undecided incoming items), `decisions.md` (company-wide
  decisions). Old pre-hub logs are archived in `memory/archive-2026-07.md`.

## 4. Connectors (what you may touch)

Only use the connectors listed here. Adding one is a deliberate decision.

- [ ] GitHub — code & PRs
- [ ] Notion — docs / knowledge base
- [ ] Todoist — task queue
- [ ] Google Calendar — scheduling
- [ ] Gmail — drafts only (never send without approval)
- [ ] Google Drive — assets & documents
- [ ] <add / remove as needed>

## 5. Roles (maker vs checker)

- A **maker** run builds. It never marks its own work approved.
- A **checker** run verifies independently against acceptance criteria, then
  approves or rejects with reasons. Use `prompts/maker.md` and
  `prompts/checker.md`. Team roster + branch naming: `governance/team.md`.

## 6. Guardrails (you stay the engineer)

- Never push to protected `main` directly — open a PR / propose a diff.
- Never send external messages (email, client docs) without explicit approval.
- Stop and ask if a change is destructive, costly, or outside the stated goal.
- If token cost or scope balloons, stop and summarise instead of pushing on.
- **Deploy-critical paths:** the website ships from the repo ROOT via GitHub
  Pages, and the store ships from `dova-preorder/` via `render.yaml`. Never
  move, rename, or restructure those paths (or `.github/workflows/deploy.yml`,
  `CNAME`) without an explicitly approved migration plan.
- Full policy: `governance/guardrails.md`.

## 7. Definition of done

A run is done only when: the goal is met, verification passed (by a checker,
not the maker), and the active workspace's `memory/` is updated. Anything less
is "in progress."
