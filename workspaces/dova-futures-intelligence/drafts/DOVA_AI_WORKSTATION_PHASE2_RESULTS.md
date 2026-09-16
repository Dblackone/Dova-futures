# DOVA AI Workstation — Phase 2 RTK Evaluation Results

**Date:** 2026-09-16
**Builder:** @lead/vector [codex]
**Runtime model:** OpenAI Codex, GPT-5; executed the approved Luna planning record
**Workspace:** `dova-futures-intelligence`
**Status:** Results complete; awaiting independent QA
**Scope stop:** Phase 3 and later work was not started.

## Decision

Do not adopt or retain standalone RTK as a DOVA integration. The verified
portable RTK v0.48.0 filters produced useful byte reduction on some noisy
fixtures, but failed the technical-entity retention gate by a wide margin and
did not provide a usable comparison against the installed OmniRoute path.

The portable binary was used only from ignored scratch after the approved
winget install failed before installation. It was not added to `PATH`, no RTK
global hook or `RTK.md` was created, and no DOVA or LM Studio configuration was
changed. The local RTK runtime files created during measurement were moved to
the Phase 2 scratch folder for exact rollback/inspection.

## Pre-state and existing path

Captured before the RTK measurement at `2026-09-16T07:55:25.5712049+01:00`:

- Branch: `docs/vector/ai-workstation-phase2`, ahead of `origin/main` by one
  planning commit. The two Phase 2 fixture files were the only expected
  untracked files at that point.
- OmniRoute: `3.8.49`, available through the global npm shim.
- Standalone `rtk`: not on `PATH`; Bun: not available; winget: `1.29.290`.
- No OmniRoute process or listener on its expected `17493` port. LM Studio was
  listening on `127.0.0.1:1234`; Bionic was running. No service was started or
  restarted by Phase 2.
- Phase 1 values remained unchanged: Bionic uses the single shared-router
  override and no other harness directories; the LM Studio skills plugin has
  one skills root, `autoInject=false`, `maxSkillsInContext=1` and
  `commandExecutionMode=disabled`; filesystem-tool confirmation remains
  enabled; HTTP logging remains non-sensitive and non-verbose.

The existing OmniRoute request paths were attempted first with the sanitised
request fixture:

| Command | Result |
| --- | --- |
| `omniroute --no-color --output json compression preview --file DOVA_AI_WORKSTATION_PHASE2_OMNIROUTE_REQUEST.json` | Exit 1; no response payload because no OmniRoute server was listening |
| `omniroute --no-color --output json context-eng rtk test --file DOVA_AI_WORKSTATION_PHASE2_OMNIROUTE_REQUEST.json` | Exit 1; no response payload because no OmniRoute server was listening |
| Direct import of `open-sse/services/compression/harness/benchmark.ts` | Exit 1: `ERR_MODULE_NOT_FOUND`, packaged `@/shared` alias unresolved from `compression/lite.ts` |
| Package scripts | `bench:compression` and `eval:compression` point to files absent from the published package |

Therefore the bundled OmniRoute result is **unmeasured**, not zero, and no
standalone-vs-bundled superiority claim is made.

## Zero-spend and integration gate

Winget identified `rtk-ai.rtk` v0.48.0 as a portable package with Apache-2.0
metadata, an official GitHub release URL, and offline distribution support.
The published telemetry policy is recorded at
<https://github.com/rtk-ai/rtk/blob/develop/docs/TELEMETRY.md>.

The approved command was attempted exactly:

```powershell
winget install --id rtk-ai.rtk --exact --source winget --accept-source-agreements --accept-package-agreements
```

It failed before installation with `InternetOpenUrl() failed` and
`0x80072ee7`. `winget list --id rtk-ai.rtk --exact --source winget` then
reported no installed package.

For measurement only, the exact official portable archive was downloaded to
ignored scratch and verified before extraction:

- URL: `https://github.com/rtk-ai/rtk/releases/download/v0.48.0/rtk-x86_64-pc-windows-msvc.zip`
- Archive size: `4,275,631` bytes
- SHA-256: `8C9AE56BACDE865112777A9FE9791B449186D8B2A081C32C0772EF773F284F93`
- Extracted binary: `rtk 0.48.0`, `9,638,912` bytes
- Scratch root: `C:\Users\User\OneDrive\Documents\GitHub\Dova-futures\sandbox\phase2-rtk-eval-20260916`

All runs used `RTK_TELEMETRY_DISABLED=1` and `NO_COLOR=1`. `rtk telemetry
status` reported consent never asked, enabled no, and the environment override
blocked telemetry. `rtk config` reported the default config but did not create
`C:\Users\User\AppData\Roaming\rtk\config.toml`.

## Codex dry-run review

The literal plan command `rtk init -g --codex --dry-run -v` exits 2 because
this RTK version accepts `-v` only before the subcommand. The corrected,
read-only command was:

```powershell
rtk -v init -g --codex --dry-run
```

It exits 0 and proposes:

- create `C:\Users\User\.codex\RTK.md`;
- append `@C:\Users\User\.codex\RTK.md` to `C:\Users\User\.codex\AGENTS.md`.

The dry-run ends with `[dry-run] Nothing written`. These proposed global
changes were rejected for Phase 2 because they would add a second instruction
source beside DOVA's existing AGENTS/CLAUDE hierarchy. No global file was
written; `.codex\RTK.md` remains absent.

## Controlled benchmark

The fixed sanitised corpus is
`DOVA_AI_WORKSTATION_PHASE2_CORPUS.json`. It contains six named cases:
`git-status`, `git-diff`, `rg-search`, `pytest-or-unittest`, `npm-or-build` and
`json-tool-output`. It contains no credentials, cookies, client records, model
prompts or network responses.

| Fixture | SHA-256 | UTF-8 bytes | Non-empty lines |
| --- | --- | ---: | ---: |
| `DOVA_AI_WORKSTATION_PHASE2_CORPUS.json` | `BA0125AF7A7DD7ADA173368CB39620C74EDEB07D0B7F81062EC4A6AF500BE0AD` | 6,790 | 95 |
| `DOVA_AI_WORKSTATION_PHASE2_OMNIROUTE_REQUEST.json` | `266500A2B5E465E17080A511322733870FB6430577E0A4EC78E04F0294313EC0` | 1,055 | 16 |

The tracked runner is
`DOVA_AI_WORKSTATION_PHASE2_BENCHMARK.ps1`. It uses one discarded warm-up
and three measured repetitions per case. Raw metrics use UTF-8 bytes and the
same estimated-token rule for every condition (`ceil(bytes / 4)`). Retention
is exact substring survival for the technical entities declared by each
fixture. Filter latency is compared with the same-process RTK passthrough
baseline to isolate wrapper/filter overhead. The original raw fixture remains
recoverable from the corpus file.

Exact runner command:

```powershell
$env:RTK_TELEMETRY_DISABLED='1'
$env:NO_COLOR='1'
pwsh -NoProfile -File DOVA_AI_WORKSTATION_PHASE2_BENCHMARK.ps1 `
  -Corpus DOVA_AI_WORKSTATION_PHASE2_CORPUS.json `
  -RtkExe C:\path\to\verified\rtk.exe `
  -Scratch C:\path\to\phase2-rtk-eval
```

The benchmark used RTK `git-status`, `git-diff`, `rg` and `log` pipe filters;
the unittest fixture used the generic `log` filter rather than claiming
pytest-parser coverage; the JSON fixture used `rtk json`.

### Median results

| Case | RTK operation | Raw B / lines / tokens | Output B / lines / tokens | Reduction | Retention | Filter ms median (spread) | Overhead vs passthrough |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `git-status` | `pipe --filter git-status` | 261 / 4 / 66 | 259 / 4 / 65 | 0.8% | 100.0% | 104.3 (84.8–104.3) | 8.3% |
| `git-diff` | `pipe --filter git-diff` | 970 / 17 / 243 | 760 / 15 / 190 | 21.6% | 66.7% | 48.2 (40.5–48.2) | -38.5% |
| `rg-search` | `pipe --filter rg` | 791 / 7 / 198 | 675 / 12 / 169 | 14.7% | 100.0% | 65.7 (51.7–65.7) | 36.0% |
| `pytest-or-unittest` | `pipe --filter log` | 758 / 12 / 190 | 255 / 7 / 64 | 66.4% | 28.6% | 99.4 (50.4–99.4) | 57.6% |
| `npm-or-build` | `pipe --filter log` | 478 / 9 / 120 | 273 / 7 / 69 | 42.9% | 28.6% | 57.6 (50.7–57.6) | -21.7% |
| `json-tool-output` | `json` | 296 / 11 / 74 | 277 / 12 / 70 | 6.4% | 100.0% | 83.1 (71.8–83.1) | 5.7% |

Aggregate medians:

- all six cases: **18.2% reduction**, **83.4% retention**;
- noisy command cases (`git-diff`, `rg-search`, `pytest-or-unittest`,
  `npm-or-build`): **32.2% reduction**, **47.7% retention**, **7.2% median
  overhead** versus passthrough;
- the reduction and aggregate median latency gates pass on the noisy subset,
  but the 98% retention gate fails. `rg-search` and `pytest-or-unittest` also
  exceed 25% per-case median overhead.

The lost technical entities were:

- `git-diff`: commit IDs `0370d19` and `705587b`;
- `pytest-or-unittest`: three test identifiers, `Ran 23 tests`, and `status 1`;
- `npm-or-build`: package identity, three output paths and `Build status: success`.

The pipe filter process itself exits 0 even when the fixture text contains
`Command exited with status 1`; this is recorded as a status-meaning limitation
of the isolated pipe comparison. Raw output is retained so a failure can be
recovered, but the compressed stream must not replace the raw failure record.

## Acceptance review

| Criterion | Result | Evidence |
| --- | --- | --- |
| DOVA approval boundary, manual-start stack, bounded router and maker/checker governance intact | PASS | No DOVA runtime, Bionic, LM Studio, startup or protected instruction-hierarchy file changed; only the append-only report log and workspace ledgers were updated; no service started |
| No paid API, credentials, cloud inference or unapproved telemetry | PASS | Local sanitised fixtures only; telemetry environment disabled; no package-manager install completed |
| Reproducible named fixtures, hashes and three repetitions | PASS | Tracked corpus and runner; 18 rows; one warm-up plus three repetitions per case |
| Final status and actionable diagnostics preserved | FAIL | Diff/test/build filters drop IDs, paths or final status; pipe exit code does not represent producer status |
| At least 20% noisy median reduction, at least 98% retention, at most 25% median latency | FAIL | Reduction 32.2% and aggregate overhead 7.2%, but retention 47.7%; two per-case latency medians exceed 25% |
| Raw output recoverable and transformations explicit/reversible | PASS | Raw fixture remains in the tracked corpus; only bounded scratch files were used |
| Standalone RTK has material advantage over usable bundled path | UNMEASURED / NOT RECOMMENDED | OmniRoute bundled path could not execute; standalone itself failed retention and no integration need was demonstrated |
| Phase 3 or later work started | PASS | No Phase 3 changes were made |

## Rollback and final local state

No package-manager installation or global integration exists to uninstall.
The temporary portable archive, extracted binary, generated JSON scratch file,
benchmark helper and the two RTK runtime files are confined to the exact
ignored Phase 2 scratch root. The two runtime files created by measurement were
moved out of `C:\Users\User\AppData\Local\rtk`; that directory has no remaining
files. `.codex\RTK.md` is absent and winget reports no RTK package.

If the scratch evidence is no longer needed after QA, remove or move only
`C:\Users\User\OneDrive\Documents\GitHub\Dova-futures\sandbox\phase2-rtk-eval-20260916`.
If a future approved run ever installs the winget package, use the exact
documented rollback command `winget uninstall --id rtk-ai.rtk --exact` and
verify that no global hook/configuration remains. Do not apply the dry-run
proposal without a separate review of DOVA's instruction hierarchy.

## Maker verification and handoff

- Tracked benchmark runner: 18 rows, six cases, three repetitions each,
  zero filtered/passthrough process errors and zero captured stderr.
- Required workspace unit suite passed: 23 tests, zero failures, with Python
  bytecode disabled. JSON fixtures and benchmark-script parsing passed;
  `git diff --check` passed and the target evidence files contain no conflict
  markers.
- Independent QA must review this record, the corpus and runner, verify the
  numbered acceptance failures, and must not edit the implementation.
