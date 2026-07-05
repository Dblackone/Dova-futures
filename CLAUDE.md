# CLAUDE.md — Master Loop Context

> This file is read at the start of EVERY run. It is the single source of truth
> for how agents behave in this project. Keep it short, current, and honest.

## 0. Project

- **Name:** Dova Futures Website
- **Owner:** Dblackone (Dova Futures Limited)
- **One-line purpose:** Marketing website (lead generation + brand credibility) plus a print-ready business document system (quotes, invoices, letters, reports, certificates) for Dova Futures Limited, a Lagos-based design-build construction firm.
- **Current focus:** Get the site launch-ready — wire the document templates into the Express server (`project/`) with the right access level, and deploy the contact-form backend (SMTP env vars on Render) so inquiries actually arrive.

## 1. How every run works (the loop)

You operate as a loop, not a chatbot. Every run:

1. **Goal** — Read this file + `memory/status.md` + `memory/next-up.md`. State the
   goal for this run in one sentence. If no goal is given, pick the top item from
   `memory/next-up.md`.
2. **Discover** — Gather context: relevant files, `context/*`, recent
   `memory/done-log.md` entries. Plan the smallest correct change.
3. **Act** — Make the change. Stay inside scope. Touch the fewest files possible.
4. **Verify** — Run checks (tests / lint / the acceptance criteria). If you are
   the maker, hand off to a checker run — do NOT approve your own work.
5. **Remember** — Update `memory/status.md`, append to `memory/done-log.md`,
   adjust `memory/next-up.md`, and log any decision in `memory/decisions.md`.
6. **Stop** — Report what changed, what was verified, and what's next. Wait for
   approval before anything irreversible (see `governance/guardrails.md`).

## 2. Read these before acting (pillar 3 — context)

- `context/01-build-steps.md` — how to install, run, test, commit
- `context/02-architecture.md` — system overview, boundaries, data flow
- `context/03-team-rules.md` — code style, PR checklist, review flow
- `context/04-dont-do-this.md` — anti-patterns, blocked libs, known traps
- `context/05-document-templates.md` — **mandatory** template rules for all company documents (quotes, invoices, letters, reports, certificates)

## 3. Memory (pillar 6 — the Vault)

Memory lives on disk, never only in chat. Always read before, always write after.

- `memory/status.md` — current system snapshot (what's true right now)
- `memory/next-up.md` — prioritised queue of what to do next
- `memory/done-log.md` — append-only record of completed work + outcomes
- `memory/decisions.md` — why we chose X over Y (so we don't relitigate)
- `memory/triage.md` — incoming items not yet decided

## 4. Connectors (pillar 4 — what you may touch)

Only use the connectors listed here. Adding one is a deliberate decision.

- [ ] GitHub — code & PRs
- [ ] Notion — docs / knowledge base
- [ ] Todoist — task queue
- [ ] Google Calendar — scheduling
- [ ] Gmail — drafts only (never send without approval)
- [ ] Google Drive — assets & documents
- [ ] <add / remove as needed>

## 5. Roles (pillar 5 — maker vs checker)

- A **maker** run builds. It never marks its own work approved.
- A **checker** run verifies independently against acceptance criteria, then
  approves or rejects with reasons. Use `prompts/maker.md` and `prompts/checker.md`.

## 6. Guardrails (you stay the engineer)

- Never push to protected `main` directly — open a PR / propose a diff.
- Never send external messages (email, client docs) without explicit approval.
- Stop and ask if a change is destructive, costly, or outside the stated goal.
- If token cost or scope balloons, stop and summarise instead of pushing on.
- Full policy: `governance/guardrails.md`.

## 7. Definition of done

A run is done only when: the goal is met, verification passed (by a checker, not
the maker), and `memory/` is updated. Anything less is "in progress."
