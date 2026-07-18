# engineering-standards.md — Universal Code & Process Rules

> Applies to every codebase in this hub (website, preorder store, pyRevit
> scripts, future projects). Project-specific toolchains, traps, and run
> commands live in that workspace's `PROJECT.md`.
> (Migrated from `context/03-team-rules.md` + the universal parts of
> `context/04-dont-do-this.md`.)

## Code style

- Match the style of the surrounding file — formatting, naming, idiom.
- JavaScript projects: camelCase for variables/functions, kebab-case for file
  names, no TypeScript/transpilers unless the workspace says otherwise.
- Comments explain *why*, not *what*.

## Commit rules

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- One logical change per commit. No "misc fixes."
- Never commit `.env`, secrets, credentials, or large binaries.
- Agents sign commits with their callsign trailer: `Agent: @build/forge`
  (see `governance/team.md`).

## PR checklist (the checker enforces this)

- [ ] Scope matches the stated goal — nothing extra crept in
- [ ] Tests added/updated and passing (or manual verification documented)
- [ ] No secrets, no debug logging left in
- [ ] The active workspace's `memory/` updated
- [ ] Docs updated if behaviour changed

## Review flow

1. Maker opens PR with a short summary + how it was verified.
2. Checker reviews against acceptance criteria and this checklist.
3. Owner (the principal) gives final approval for merge. Never push to
   protected `main` directly.

## Universal anti-patterns (never, in any project)

- Don't refactor unrelated code "while you're in there."
- Don't add a new dependency without a one-line justification logged in the
  workspace's `memory/decisions.md`.
- Don't invent file paths, APIs, or config — read first, then act.
- Don't mark your own work approved (maker ≠ checker).
- Don't expand scope silently — if the change is growing beyond the stated
  goal, STOP, write what you found in `memory/triage.md`, and report back.

## Communication

- Decisions get logged in the appropriate `decisions.md` (workspace-level, or
  root `memory/decisions.md` if company-wide) — not lost in chat.
- If blocked, write the blocker in the workspace's `memory/status.md` and stop
  — don't guess.

## Where the rest lives

- Safety/approval rules: `governance/guardrails.md`
- Agent roles + branch naming: `governance/team.md`
- Brand tokens for anything user-facing: `company/brand.md`
- Writing style for user-facing text: `company/voice-and-tone.md`
