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

## Runtime note

Bionic was already running when its settings file was written. Its current
session may retain the prior values until the user restarts Bionic. This
implementation did not close or restart the user-launched application. The
on-disk configuration is complete and syntax-validated; independent QA should
distinguish this pending live reload from a configuration defect.
