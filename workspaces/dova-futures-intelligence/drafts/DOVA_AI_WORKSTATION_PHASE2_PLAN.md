# DOVA AI Workstation — Phase 2 RTK Evaluation Plan

**Date:** 2026-09-16
**Planner:** @lead/vector [codex]
**Status:** Ready for implementation review
**Scope:** Evaluate context and tool-output compression after the merged Phase 1 changes

## Decision boundary

This is a planning record. It installs no package, starts no service, changes
no Codex or Claude configuration, and sends no request to a model or cloud
provider. The implementation stage must stop after Phase 2 results and must
not begin Headroom, local-model routing, LinkedIn, or later work.

## Current findings

- OmniRoute **3.8.49** is installed globally under
  `C:\Users\User\AppData\Roaming\npm\node_modules\omniroute`. Its package
  metadata describes an MIT-licensed router with Caveman and RTK compression.
- The `omniroute` CLI is available and its help surface exposes
  `compression`, `context-eng`, and `context-eng rtk` commands. The local
  OmniRoute server was not running during discovery; status/config queries
  returned no usable status output.
- Standalone `rtk` is not on PATH. `bun` is also unavailable.
- OmniRoute's installed source contains an API-free compression harness and
  deterministic engines, including `lite`, `caveman`, `aggressive`, `ultra`,
  `rtk`, `session-dedup`, `headroom`, and `ccr`. The published package does not
  include the referenced `scripts/compression/benchmark.ts` entry point, and a
  direct TypeScript harness import fails because the packaged source's
  `@/shared` alias cannot be resolved by the installed runtime. This is an
  execution limitation to record, not a reason to claim benchmark results.
- Phase 0 already establishes the DOVA architecture, the bounded shared-skill
  router, manual-start local stack, command-output normalisation rules, and
  zero-spend constraints. Phase 1 is merged into `main`.

## Implementation sequence

### 1. Capture the pre-RTK state

From the repository root, record the exact command availability, PATH entries,
current branch/status, OmniRoute version, local process/listener state and the
existing Phase 1 settings. Do not print credential values. Use the Phase 0
BAS-00 capture rules for combined output, line counts, UTF-8 bytes and elapsed
time.

### 2. Exercise the existing OmniRoute path first

Use only local, sanitised request fixtures. Attempt the existing offline RTK
test/preview path and the bundled deterministic compression harness. Record
whether the installed package can run each path without a server or provider.
If the package limitation above prevents execution, preserve the exact error
and mark the bundled result **unmeasured**.

### 3. Evaluate standalone RTK only under the zero-spend gate

Before installation, verify the package identity, licence, local operation,
absence of a mandatory payment method, absence of mandatory paid inference, and
telemetry implications. If any check fails, do not install and record the
finding. If all checks pass and the bundled path cannot supply a usable
comparison, use the approved Windows installation command:

```powershell
winget install rtk-ai.rtk
```

Then verify:

```powershell
rtk --version
rtk gain
```

Do not install a second copy if `rtk --version` already succeeds.

### 4. Inspect Codex integration before any global write

Run and save the dry-run only:

```powershell
rtk init -g --codex --dry-run -v
```

Review the proposed file paths and diff. Do not overwrite the DOVA
`AGENTS.md`/`CLAUDE.md` hierarchy. The default Phase 2 outcome is to leave
global Codex configuration unchanged unless the dry-run contains a small,
reviewable RTK preference that preserves DOVA routing and maker/checker rules.

### 5. Run the controlled comparison

Use the same fixed, sanitised corpus for every condition:

| Case | Representative output |
| --- | --- |
| `git-status` | DOVA repository status with branch and modified-file lines |
| `git-diff` | A bounded documentation/code diff containing repeated metadata |
| `rg-search` | Targeted architecture search with file paths and line numbers |
| `pytest-or-unittest` | Passing and failing test summaries with traceback/error text |
| `npm-or-build` | Install/build output with warnings and final status |
| `json-tool-output` | Structured output containing IDs, paths, statuses and errors |

Capture raw output, OmniRoute bundled output where executable, and standalone
RTK output where installed. Use three repetitions per case after one warm-up.
Do not include credentials, cookies, client records, model prompts or network
responses in fixtures.

Record at minimum:

- raw and compressed UTF-8 bytes, non-empty lines and estimated tokens;
- percentage reduction and wall-clock latency;
- preserved paths, URLs, identifiers, versions, commands, test failures and
  final status;
- whether the compressor failed open, failed closed, truncated output or
  changed exit-status meaning;
- license, telemetry, installation and rollback evidence.

## Acceptance criteria

Phase 2 is successful only when all of the following are true:

1. The DOVA approval boundary, manual-start local stack, bounded skill router,
   and maker/checker governance remain intact.
2. No paid API, subscription, mandatory payment method, credential, cloud
   inference path or unapproved telemetry is introduced.
3. Every benchmark result is reproducible from named fixtures and exact
   commands. Three repetitions report the median and the run spread.
4. A passing result preserves its final status and all actionable diagnostics;
   a failing result preserves the error, command, path and relevant line.
5. A candidate compressor achieves at least **20% median output-token/byte
   reduction** on the noisy command cases while retaining at least **98%
   technical-entity retention** and adding no more than **25% median latency**.
   A case that does not meet the reduction gate is reported as a non-benefit.
6. Any truncation or transformation is explicit, bounded and reversible through
   the raw-output retention path. The original output remains recoverable for
   failures.
7. Standalone RTK is recommended only if it meets the gates and demonstrates a
   material advantage over the usable existing OmniRoute path. A practical
   material-advantage threshold is at least **10 percentage points more median
   reduction** at equal retention and latency, or a capability that the bundled
   path cannot provide. Otherwise the recommendation is **do not install or
   retain standalone RTK**.
8. No Phase 3 or later work begins, regardless of the result.

## Expected deliverable

The builder should produce one concise Phase 2 results record under
`workspaces/dova-futures-intelligence/drafts/` containing the pre-state,
fixture identifiers or hashes, raw/bundled/standalone comparison, zero-spend
checks, dry-run review, rollback instructions, decision and unresolved limits.
It should update the workspace memory and report log, then stop for independent
QA. No Phase 2 configuration write is implied by this plan.

## Rollback

If RTK is installed, remove only the exact package using its documented local
uninstall command after recording the installed version and restore any file
changed by a reviewed integration. Do not run a broad cleanup. If the Codex
dry-run proposes edits that are not accepted, make no global file change.
