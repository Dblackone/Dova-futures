# DOVA AI Workstation — Phase 1 Execution Record

**Date:** 2026-09-15  
**Owner:** Vollmann Akarakiri  
**Implementer:** @lead/vector [codex]  
**Status:** Implemented; independent QA pending

## Scope

This record covers the approved Phase 1 context and instruction optimisation
only. It introduces no paid service, model, API, subscription, credential, or
automatic startup behaviour. Phase 2 (RTK) and later phases remain out of
scope and unimplemented.

## Applied changes

| Surface | Final setting | Purpose |
| --- | --- | --- |
| Repository agent handoffs | The six `arch-sol`, `qa-vera`, and `sec-warden` profiles under `.codex/agents/` and `.claude/agents/` now hand work to `@lead/vector`. | Removes stale delegation to `@lead/atlas`; governance and maker/checker separation remain unchanged. |
| Bionic discovery | `skills.enabledOtherHarnessDirectories` is `[]`. | Stops Bionic from eagerly discovering five other harness skill trees. |
| Bionic skill override | `skills.globalSkillOverrides` selects `C:\\Users\\User\\.lmstudio\\skills\\00-shared-skill-router\\SKILL.md`. | Keeps one bounded, on-demand DOVA skill router instead of an unrelated global skill. |
| LM Studio skills plugin | `skillsPaths` is only `C:\\Users\\User\\.lmstudio\\skills`; `autoInject` is `false`; `maxSkillsInContext` is `1`; command execution remains `disabled`. | Limits default skill context while retaining the local router. |
| LM Studio confirmation | `chat.skipToolConfirmationPatterns` is `[]`; `neverAskForToolConfirmation` remains `false`. | Restores user confirmation for filesystem MCP actions. |
| LM Studio HTTP logging | `logSensitiveData` and `verbose` are both `false`; loopback binding, port, and `autoStartOnLaunch` are unchanged. | Reduces sensitive/verbose local server logging without changing launch behaviour. |

No global Codex or Claude configuration was changed. No new instruction
hierarchy, skill framework, dependency, or service was created.

## Rollback

The complete pre-change copies and hashes are in
`C:\\Users\\User\\.codex\\backups\\dova-ai-workstation\\phase1-20260915-154700\\MANIFEST.md`.
Restore only the relevant file from that directory, then restart the affected
desktop application. The earlier `phase1-20260915-154500` directory is not a
rollback source because its duplicate filenames make its contents ambiguous.

## Before and after measurements

The Phase 0 baseline is preserved in
`drafts/DOVA_AI_WORKSTATION_PHASE0_BASELINE.md` and records the command,
working directory and normalisation contract. The post-change capture used the
same commands: combined standard output/error, CRLF normalised to LF, trailing
LF removed, non-empty lines counted, and UTF-8 bytes counted without a byte
order mark. These are output-size indicators, not model-token measurements.

| ID | Baseline lines / bytes | Post-change lines / bytes | Baseline elapsed | Post-change elapsed |
| --- | ---: | ---: | ---: | ---: |
| BAS-01 `git status --short --branch` | 7 / 391 | 1 / 32 | 114.9 ms | 141.9 ms |
| BAS-02 core test suite | 26 / 3,336 | 26 / 3,336 | 697.2 ms | 237.1 ms |
| BAS-03 targeted architecture search | 93 / 11,647 | 93 / 11,647 | 55.4 ms | 39.8 ms |
| BAS-04 tracked intelligence files | 250 / 19,923 | 252 / 20,090 | 56.7 ms | 56.1 ms |
| BAS-05 shared skill-directory listing | 1,565 / 31,454 | 1,565 / 31,454 | 74.3 ms | 78.0 ms |
| BAS-06 Codex agent-file listing | 63 / 1,385 | 63 / 1,385 | 14.2 ms | 13.7 ms |

BAS-01 fell because the implementation is committed on
`fix/vector/phase1-qa-evidence`; it is not claimed as an application-context
gain. BAS-04 rose by two files because the Phase 0 and Phase 1 records are now
tracked. BAS-05 remains deliberately unchanged: Phase 1 prevents Bionic and
the LM Studio skills plugin from eagerly importing that catalogue; it does not
delete or alter the shared library. BAS-00 was also rerun: the relevant PATH
entries remain present and `cargo`, `rustc`, `rustup`, and `rtk` remain absent.

## Verification

- Parsed all four changed JSON configuration files with PowerShell
  `ConvertFrom-Json` successfully.
- Parsed the three changed Codex TOML profiles with Python `tomllib`
  successfully.
- Confirmed all six repository profiles refer to `@lead/vector` and none
  retains `@lead/atlas`.
- Confirmed the final configuration values match the table above.
- Ran `python -B -m unittest discover -s tests -v`: **23 tests passed**, no
  failures.
- Ran `git diff --check`: passed.

## Runtime note

Bionic was already running when its settings file was written. Its current
session may retain the prior values until the user restarts Bionic. This
implementation did not close or restart the user-launched application. The
on-disk configuration is complete and syntax-validated; independent QA should
distinguish this pending live reload from a configuration defect.
