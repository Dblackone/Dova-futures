# 03 — Team Rules

> Conventions and review flow. Written once, applied every run.

## Code style
- Language(s): JavaScript (Node.js backend, vanilla JS frontend) — no TypeScript, no transpiler.
- Formatting: no formatter enforced yet; match the style of the surrounding file.
- Naming: camelCase for JS variables/functions, kebab-case for file names.
- Comments: explain *why*, not *what*.

## PR checklist (the checker enforces this)
- [ ] Scope matches the stated goal — nothing extra crept in
- [ ] Tests added/updated and passing
- [ ] No secrets, no debug logging left in
- [ ] `memory/` updated
- [ ] Docs updated if behaviour changed

## Review flow
1. Maker opens PR with a short summary + how it was verified.
2. Checker reviews against acceptance criteria and this checklist.
3. Owner gives final approval for merge.

## Communication
- Decisions get logged in `memory/decisions.md`, not lost in chat.
- If blocked, write the blocker in `memory/status.md` and stop — don't guess.
