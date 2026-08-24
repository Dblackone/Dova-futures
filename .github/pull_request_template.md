# Pull Request

## Goal
<!-- One sentence: what this PR accomplishes and why. -->

## Workspace
<!-- Which ONE workspace this belongs to (company/registry.md). Cross-workspace PRs must say so explicitly and reference the board card. -->

## What changed
<!-- Files/areas touched, and the smallest honest summary of the change. -->

## Verification
<!-- What was run/checked and the result. "Tests pass" alone is not enough — say which checks, per the workspace PROJECT.md. -->

## Checklist
- [ ] Scope matches the stated goal — nothing extra crept in
- [ ] Branch rebased on `origin/main`; no conflict markers anywhere
- [ ] No secrets, no debug logging, no `.env` values
- [ ] Active workspace `memory/` updated (status, done-log, next-up)
- [ ] Pages boundary remains limited to `hub/` (`hub/` and `.github/workflows/deploy.yml` untouched unless this is approved Hub work)
- [ ] Checker run requested (maker ≠ checker)

## Needs principal approval for
<!-- Anything irreversible/external: merging, sending documents, spending. "Nothing" if none. -->
