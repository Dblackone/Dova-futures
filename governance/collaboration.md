# collaboration.md — Multi-Session & Multi-Contributor Contract

> How independent Claude Code sessions and human contributors work in this
> repository at the same time without stepping on each other or on the stable
> structure. Binding for every session, every model, every contributor.

## The core rule

**Git branches are the isolation mechanism. Folders are not.**
A branch is already an isolated copy of the entire repository — nothing you do
on your branch is visible to anyone else until it merges. Every session works
on its own branch; `main` is protected and only changes through reviewed PRs.

## Session lifecycle

1. **Branch** — one session = one branch, never shared:
   `<type>/<owner-or-session>/<slug>` (e.g. `feat/forge/letterhead-fix`,
   `claude/road-invoice-x7k2m1`). `type` ∈ `feat|fix|chore|docs|refactor|exp`.
2. **Route** — do CLAUDE.md STEP 0: find your ONE workspace in
   `company/registry.md`; read only it + the `company/` layer.
3. **Work inside your write-scope** (below). Uncommitted experiments and
   generated intermediates go in `sandbox/` (gitignored — never committed).
4. **Rebase before review** — `git fetch origin main` and rebase/merge onto
   `origin/main` before opening or updating a PR. **Never commit conflict
   markers** (`<<<<<<<`) — grep for them before every commit if you merged.
5. **PR** — open against `main` using the PR template. The maker never
   approves their own work; a checker run (`prompts/checker.md` / @qa/vera)
   verifies. Sensitive areas (auth, payments, client data) also get
   @sec/warden.
6. **Merge** — the principal holds the merge key. Merge = promotion to the
   permanent structure. Delete the branch after merge; a merged branch is
   never reused (restart from `origin/main` with the same name if follow-up
   work is needed).

## Write-scope (what a session may touch)

A session working in workspace `<p>` may modify ONLY:

| Area | Examples |
|------|----------|
| Its workspace | `workspaces/<p>/PROJECT.md`, `workspaces/<p>/memory/*`, `workspaces/<p>/drafts/*` |
| Its declared code paths | the paths listed in `workspaces/<p>/PROJECT.md` § "Where the code lives" |
| Scratch | `sandbox/` (gitignored) |
| Shared coordination surfaces | root `memory/board.md`, `memory/triage.md` (append/update your own cards) |
| The registry roll-up | your project's one row in `company/registry.md` |

**Read-only for normal sessions** (changes require a dedicated PR that
CODEOWNERS routes to the principal): `company/`, `governance/`, `prompts/`,
`.claude/`, `.agents/`, `CLAUDE.md`, `README.md`, `.github/`, and the
deploy-critical files (`index.html`*, `server.js`*, `render.yaml`, `CNAME`,
`package.json`).
*The website workspace's declared code paths include the root site files —
that workspace may edit them; others may not.

**Never, in any session:** another workspace's folders; another session's open
branch; append-only records (done-logs, registers) except by appending.

## Temporary → permanent (the promotion path)

```
sandbox/            uncommitted scratch, experiments, generated intermediates
   │  (worth keeping? commit it)
session branch      committed, isolated, invisible to others
   │  (PR + checker approval)
main                the permanent repository structure
```

**Client documents get one extra gate.** A drafted quote/invoice/letter is
committed to `workspaces/<p>/drafts/` first — explicitly *unofficial*. Only
after the principal approves it (and it is delivered per
`governance/guardrails.md`) does it move to
`projects/<JOB>/01-Documents/` as the official record, and the draft copy is
removed. Never file an unapproved document directly into `projects/`.

## Concurrency etiquette

- **Check the board first.** `memory/board.md` is the WIP ledger. If another
  card already owns the files you need, don't start — coordinate or wait.
- Two tasks touching the same files are serialized, never parallel
  (lead-atlas rule).
- If you find work outside your scope, write it to `memory/triage.md` and
  keep going — don't fix it in place.
- WIP limit: max 3 active branches across the team at once.

## For future Claude Code sessions (quick-start)

1. Read `CLAUDE.md` → do STEP 0 → land in one workspace.
2. Confirm your branch is fresh from `origin/main` and correctly named.
3. Check `memory/board.md` for collisions.
4. Work inside your write-scope; scratch in `sandbox/`; drafts in `drafts/`.
5. Update your workspace `memory/` before ending the run.
6. Rebase, grep for conflict markers, open the PR, hand to a checker. Stop.
