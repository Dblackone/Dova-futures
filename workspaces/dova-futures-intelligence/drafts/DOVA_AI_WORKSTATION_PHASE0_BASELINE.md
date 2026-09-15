# DOVA AI Workstation — Phase 0 Baseline

**Date:** 15 September 2026  
**Status:** Internal technical baseline — ready for independent QA  
**Scope:** DOVA Futures Intelligence workstation optimisation  
**Prepared by:** @lead/vector [codex]  
**Decision boundary:** No configuration, package, model, startup, credential,
service, provider, or external-message change is authorised by this report.

## 1. Purpose and outcome

This baseline records the current DOVA workstation architecture, context load,
toolchain and local-model state before any optimisation work. Its purpose is
to reduce unnecessary token use, context bloat and command output while
preserving DOVA governance, the existing provider-neutral core, and a
zero-spend operating boundary.

The confirmed result is that DOVA does not need a competing agent framework.
The existing core already provides the required control plane:

    User request
        -> Orchestrator
        -> Capability registry
        -> Policy engine
        -> Provider or tool boundary
        -> Execution event

The highest-value opportunity is bounded discovery and instruction loading,
not a new orchestration product.

## 2. Scope and exclusions

Included in discovery:

- Windows, developer-tool and local-model inventory.
- DOVA Intelligence architecture and repository agent routing.
- User-level Codex, Claude, LM Studio, Bionic, OpenClaw and shared-skill
  surfaces.
- Context-load risks, configured MCP surfaces, and representative command
  output sizes.

Excluded from this phase:

- Package installation, upgrades, removal or global enablement.
- Starting a local model, gateway, browser automation or cloud inference.
- Credential inspection, export or replacement.
- LinkedIn activity, publishing, messaging, scraping or browser automation.
- Phase 1 configuration changes, Phase 2 RTK installation, Headroom,
  local-model routing and deployment work.

## 3. Current system baseline

| Area | Confirmed state |
|---|---|
| Operating system | Windows 11 Home, build 26200, x64 |
| Memory | 31.71 GB usable RAM |
| Graphics | Intel UHD and NVIDIA RTX 4060 Laptop GPU |
| Disk | C: has approximately 210 GiB free |
| Git | 2.53.0.windows.1 |
| Node toolchain | Node 24.19.0, npm 11.17.0, pnpm 11.19.0 |
| Python toolchain | Python 3.14.3, uv 0.12.2 |
| Agent CLIs | Codex CLI 0.154.0-alpha.6.2, Claude Code 2.1.221 |
| Other installed local tooling | OpenClaw 2026.7.1-2, OmniRoute 3.8.49, Ollama 0.32.1, FFmpeg 9 |
| Rust toolchain | cargo, rustc and rustup are not on PATH |
| Not present or not usable | Docker and a working WSL distribution |

Relevant PATH entries captured on 15 September 2026:

| Function | PATH entry |
|---|---|
| Python | C:\Python314\Scripts\ and C:\Python314\ |
| Git and GitHub CLI | C:\Program Files\Git\cmd and C:\Program Files\GitHub CLI\ |
| Node.js | C:\Program Files\nodejs\ |
| Local AI | C:\Users\User\.lmstudio\bin and C:\Users\User\AppData\Local\Programs\Ollama |
| Supporting tools | C:\Users\User\AppData\Local\hermes\bin, the ripgrep 15.2.0 WinGet directory, and the FFmpeg 9.0 bin directory |
| User package bin | C:\Users\User\AppData\Roaming\npm |

These paths can be recaptured by the BAS-00 inventory command below.

The RTX 4060 VRAM value needs reconciliation before Phase 4. Prior local
records state 8 GB, while the current WMI AdapterRAM reading is about 4 GB.
This report does not choose a model or change a model setting.

## 4. Local AI and runtime state

| Component | Installed state | Final observed runtime state | Important boundary |
|---|---|---|---|
| LM Studio | 0.4.23+1 | No process; no listener on 1234 | Main setting enableLocalService is false; HTTP server autoStartOnLaunch is true and loopback-only |
| Bionic | 1.1.1+5 | No process | Default context is 8,192; external-harness discovery is broad |
| OpenClaw | 2026.7.1-2 | No process; no listener on 18789 | Loopback gateway; manual-start operating state remains intact |
| Ollama | 0.32.1 | No process; no listener on 11434 | Startup shortcut exists and was not changed |
| OmniRoute | 3.8.49 | Server stopped | Existing context-eng/compression candidate; no harness configured |

No listener was present on ports 1234, 18789, 11434, 17493 or 18801 at the
final check. No LM Studio, Bionic, Ollama or OpenClaw process remained running.
LM Studio HTTP server autoStartOnLaunch controls server start when the LM Studio
application launches. It is distinct from Windows startup and from the observed
stopped state in this baseline.

The confirmed local LM Studio catalogue includes compact Gemma, Nemotron and
Qwen model files: Gemma 4 E2B, Gemma 4 E4B, NVIDIA Nemotron 3 Nano 4B and
Qwen 3.5 9B. This is sufficient for later evaluation; no model download is
needed in this phase.

## 5. Current architecture and existing capability

The repository already has the following DOVA-specific controls:

| Capability | Current role | Phase 0 finding |
|---|---|---|
| Core orchestrator | Routes a request through registered capabilities | Retain; do not replace |
| Policy engine | Requires policy before side effects | Retain as the approval boundary |
| Capability registry | Narrows accessible local tools | Retain; do not add unrestricted computer control |
| Provider router | Keeps provider integration swappable | Retain; local-first remains compatible |
| Headless gateway | Provides a boundary for desktop or voice clients | Keep stopped until separately approved |
| Repository integration suite | Agent Reach, Career Ops, Hallmark, HyperFrames, World Monitor and optional Voicebox | Reuse rather than install competing suites |
| Shared-skill router | Finds the best one to three relevant skills on demand | Retain as the single discovery pattern |

Existing work already supports future research, career and authorised
integration workflows. Future LinkedIn capability must remain API and
OAuth-gated; no browser automation, scraping, connection requests, messages,
likes or comments are in scope.

## 6. Context and instruction-load baseline

### 6.1 Shared skill catalogue

The main context risk is cross-harness duplication:

| Root imported by Bionic | Top-level skill directories |
|---|---:|
| C:/Users/User/.claude/skills | 2 |
| C:/Users/User/.codex/skills | 30 |
| C:/Users/User/.gemini/skills | 1,500 |
| C:/Users/User/.cursor/skills | 1,500 |
| C:/Users/User/.agents/skills | 1,565 |
| Total configured for discovery | 4,597 |

Representative skill files have identical SHA-256 values across the shared,
Gemini and Cursor roots. They are duplicated catalogues, not separate
capabilities.

Bionic currently has an internal auto-fit context value of 478,187 despite
the normal LM Studio/Bionic default context of 8,192. LM Studio also has
skills auto-injection enabled with a limit of 12 context skills. These settings
create a credible context-overflow and slow-start risk.

OpenClaw is already safer in this respect. Its shared-skill router calls for
on-demand search and opening only the best one to three SKILL.md files. Its
current limits are bounded: 300 candidates per root, 200 skills loaded per
source, 80 skills in prompt and 12,000 prompt characters. Those bounds must
not be raised as part of this work.

### 6.2 Global instruction and agent surfaces

| Surface | Finding | Interpretation |
|---|---|---|
| Global Claude AGENTS.md | About 8.6 KB; broad ECC agent-first, proactive-delegation and test expectations | Potentially high global context cost and a possible mismatch with DOVA's narrow routing |
| Global Claude rules | 115 ECC rule files | Inspect activation before changing anything |
| Global Codex configuration | Broad plugin and remote-MCP surface; the current active profile is capable of unrestricted local filesystem use | Review task-scoped loading and approval policy separately; do not weaken repository governance |
| Repository .agents/skills | 29 roots, approximately 632 files | DOVA-owned capability set; preserve |
| Global shared catalogue | About 1,565 directories and 5,341 files | Use the existing router instead of eager loading |

### 6.3 MCP distinction

Configured definitions are not automatically active integrations. The table
below preserves that distinction.

| Surface | Observed state | Phase 0 conclusion |
|---|---|---|
| Codex user configuration | Five remote Cloudflare MCP URLs and broad plugins are configured | Treat as configured scope; no remote call was made |
| Claude mcp-servers file | 29 server definitions in a template-style configuration file | Do not treat as active or enable any server without separate approval |
| LM Studio filesystem MCP | mcp.json defines a local filesystem server scoped to the Dova-futures repository | Its filesystem operations are separate from the skills plugin command setting |
| LM Studio skills plugin | plugin-data/lms-skills/settings.json has commandExecutionMode set to disabled | This blocks commands issued by that plugin; it does not disable filesystem MCP operations |
| LM Studio chat confirmation | settings.json has neverAskForToolConfirmation false, but skipToolConfirmationPatterns includes mcp/filesystem:* | Filesystem MCP confirmation is currently bypassed by pattern; this requires an explicit Phase 1 decision |
| LM Studio HTTP server | .internal/http-server-config.json has autoStartOnLaunch true, port 1234 and networkInterface 127.0.0.1 | App-launch server behaviour is configured; no server was running during this baseline |
| OpenClaw | No outbound MCP configured | No action required |

## 7. Repository routing discrepancy

Governance names @lead/vector as the lead orchestrator and @lead/atlas as the
senior planning and review agent. The lead-vector agent definition agrees.
However, the following definitions currently hand their verdict back to
@lead/atlas:

| Files | Current handoff | Intended governance-aligned handoff |
|---|---|---|
| .codex/agents/arch-sol.toml and .claude/agents/arch-sol.md | @lead/atlas | @lead/vector |
| .codex/agents/qa-vera.toml and .claude/agents/qa-vera.md | @lead/atlas | @lead/vector |
| .codex/agents/sec-warden.toml and .claude/agents/sec-warden.md | @lead/atlas | @lead/vector |

This is a concrete documentation/routing defect, not a role redesign. The
build-forge to qa-vera flow remains correct. The six stale handoff lines are a
candidate Phase 1 patch only.

## 8. Representative command-output baseline

These are repeatable size indicators, not model-token counts. The canonical
capture was run on 15 September 2026 at 15:43:04 +01:00 with PowerShell 7.6.5.
Each command ran from the stated directory. Standard output and standard error
were captured together through PowerShell, CRLF and CR were normalised to LF,
trailing LF was removed, non-empty lines were counted, and UTF-8 bytes were
counted without a byte-order mark. The current working-tree status is expected
to include this report and ledger changes.

| ID | Working directory | Exact command | Lines | UTF-8 bytes | Elapsed |
|---|---|---|---:|---:|---:|
| BAS-00 | Repository root | Exact inventory commands below | n/a | inventory only | n/a |
| BAS-01 | Repository root | git status --short --branch | 7 | 391 | 114.9 ms |
| BAS-02 | Intelligence workspace | python -B -m unittest discover -s tests -v | 26 | 3,336 | 697.2 ms |
| BAS-03 | Repository root | rg -n -i architecture&#124;provider&#124;memory&#124;approval on ARCHITECTURE.md, BUILD_PLAN.md and PROJECT.md | 93 | 11,647 | 55.4 ms |
| BAS-04 | Repository root | git ls-files workspaces/dova-futures-intelligence | 250 | 19,923 | 56.7 ms |
| BAS-05 | Repository root | Get-ChildItem C:\Users\User\.agents\skills -Directory -Name | 1,565 | 31,454 | 74.3 ms |
| BAS-06 | Repository root | Get-ChildItem C:\Users\User\.codex\agents -File -Name | 63 | 1,385 | 14.2 ms |

BAS-00 records the exact availability test for the Rust and RTK commands and
the PATH filters used in Section 3. The command strings above, directory
targets, capture normalisation and timestamp are the comparison contract for
every later Phase 1 or Phase 2 measurement.

The BAS-00 inventory actions are:

    $env:Path -split ';' | Where-Object { $_ -match 'lmstudio|Ollama|npm|Node|Python|Git|ripgrep|ffmpeg|hermes' } | Select-Object -Unique
    Get-Command cargo,rustc,rustup,rtk -ErrorAction SilentlyContinue

The remaining actions are:

    git status --short --branch
    python -B -m unittest discover -s tests -v
    rg -n -i 'architecture|provider|memory|approval' 'workspaces/dova-futures-intelligence/ARCHITECTURE.md' 'workspaces/dova-futures-intelligence/BUILD_PLAN.md' 'workspaces/dova-futures-intelligence/PROJECT.md'
    git ls-files 'workspaces/dova-futures-intelligence'
    Get-ChildItem 'C:\Users\User\.agents\skills' -Directory -Name
    Get-ChildItem 'C:\Users\User\.codex\agents' -File -Name

The baseline shows why broad raw listings and unconstrained skill discovery
should be replaced with targeted search plus a small selected set.

## 9. Existing tools and gaps

| Need | Already available | Gap or decision |
|---|---|---|
| DOVA request routing and approvals | Provider-neutral core, policy engine and gateway | No new framework |
| On-demand skill selection | OpenClaw shared-skill router | Apply the same bounded pattern in Bionic |
| Context compression investigation | OmniRoute context-eng/compression capability | Benchmark before installing standalone RTK |
| Local inference | LM Studio/Bionic with installed compact models | Hardware and workload evaluation required before Phase 4 |
| Technical checks | Git, ripgrep, Python tests, Node toolchain | Add no dependency merely for this report |
| LinkedIn/career workflow | Repository Agent Reach and Career Ops skills | Authorised API/OAuth design remains a future approved project |

Standalone RTK and Headroom are not currently installed. Rust, Docker and WSL
are also absent, but none is necessary to complete the approved near-term work.

## 10. Proposed Phase 1 changes — not implemented

No item in this section has been approved for execution by this report.
Each global settings change must first receive a timestamped backup outside the
repository, an exact changed-key list, rollback instructions, and independent
QA.

| Scope | Exact file and key | Current value | Proposed value | Expected benefit and rollback |
|---|---|---|---|---|
| Agent routing | .codex/agents/arch-sol.toml, qa-vera.toml and sec-warden.toml; matching .claude/agents files | Each final handoff names @lead/atlas | Change only those six handoff targets to @lead/vector | Restores lead routing; revert the six lines from a staged diff |
| Bionic cross-app discovery | C:\Users\User\.lmstudio\apps\bionic\.internal\settings.json; skills.enabledOtherHarnessDirectories | Five roots: .claude, .codex, .gemini, .cursor and .agents skills | Empty array, applied through the supported Skills UI and verified in the file | Stops scanning duplicated catalogues; rollback restores the captured five-entry array |
| Bionic router | Same Bionic file; skills.globalSkillOverrides | Enabled agent-introspection-debugging skill from .claude | One enabled override at C:\Users\User\.lmstudio\skills\00-shared-skill-router\SKILL.md | Retains one verified on-demand router; rollback restores the prior override object |
| LM Studio skills plugin | C:\Users\User\.lmstudio\plugin-data\lms-skills\settings.json; skillsPaths, autoInject and maxSkillsInContext | Seven shared paths, true and 12 | C:\Users\User\.lmstudio\skills only, false and 1 | Prevents automatic broad injection; rollback restores the captured JSON values |
| LM Studio filesystem confirmation | C:\Users\User\.lmstudio\settings.json; chat.skipToolConfirmationPatterns | mcp/filesystem:directory_tree and mcp/filesystem:* | Empty array; keep neverAskForToolConfirmation false | Restores user confirmation for filesystem MCP actions; rollback restores both patterns |
| LM Studio logging | C:\Users\User\.lmstudio\.internal\http-server-config.json; logSensitiveData and verbose | true and true | false and false | Reduces sensitive and verbose local logs; rollback restores true and true |
| LM Studio server start | Same HTTP server file; autoStartOnLaunch | true | No Phase 1 value proposed; record and decide separately before any change | Keeps the app-launch setting explicit; no rollback required while unchanged |
| Claude and Codex global scope | C:\Users\User\.claude\AGENTS.md, C:\Users\User\.claude\mcp-configs\mcp-servers.json and C:\Users\User\.codex\config.toml | Claude AGENTS is 8,646 bytes; 29 MCP definitions are template entries; Codex has five configured Cloudflare MCP endpoints and enabled plugins | No Phase 1 file edit proposed; audit actual injection and task activation first | Avoids a broad global rewrite; no rollback required |

Every approved change must first receive a timestamped backup outside the
repository. The backup manifest must list the file hash, keys, before values,
after values, restoration command and BAS measurements. No template MCP entry
may be enabled merely because it exists.

## 11. Acceptance criteria for any Phase 1 patch

- The DOVA architecture and approval boundary remain unchanged.
- No paid inference, mandatory telemetry, cloud account, new credential or
  unauthorised network call is introduced.
- The shared-skill router remains the discovery authority; no eager index or
  duplicated catalogue is introduced.
- Bionic no longer scans all five external harness roots by default.
- OpenClaw remains manual-start and loopback-only. LM Studio remains
  loopback-only; its configured app-launch HTTP-server behaviour is recorded
  separately and may change only after an explicit decision.
- Each configuration edit has a backup, exact rollback instruction, affected
  test, and before/after measurement.
- The six stale handoffs, if edited, route to @lead/vector and preserve
  independent checker authority.
- Core verification remains green and an independent checker reviews the
  diff without editing it.

## 12. Later-phase gates

### Phase 2 — RTK

First test the existing OmniRoute context-eng/compression path. Only if it is
insufficient may a separate RTK evaluation be proposed. Any later RTK install
must verify its licence, local operation, no mandatory payment, no mandatory
telemetry and no paid inference before installation. The required standalone
checks are rtk --version, rtk gain and rtk init -g --codex --dry-run -v.

### Phase 3 — Headroom

Requires a new principal approval after the Phase 2 benchmark. Do not install
or configure it beforehand.

### Phase 4 — local-model routing

Requires VRAM reconciliation, a local workload definition and an explicit
approval. Start with one fast model and one stronger model at 8,192 to 16,384
context and parallelism one. Do not download several models or restore
automatic startup.

### Phase 5 — LinkedIn

Requires a separate authorised API and OAuth design. Publishing may use a
reviewed, pinned publisher integration only after source audit and credential
approval. Browser automation, scraping, connections, messages, likes and
comments remain prohibited.

## 13. Builder verification

This baseline contains no executable implementation change. Maker-side checks:

- Reviewed the report against the approved Phase 0 scope and exclusions.
- Confirmed no package, model, configuration, service, credential, startup or
  external integration was changed in this stage.
- python -B -m unittest discover -s tests -v: 23 passed, zero failures.
- git diff --check: passed.
- Final local process and target-port checks: no LM Studio, Bionic, Ollama or
  OpenClaw process/listener observed.
- Repair verification added the BAS-00 through BAS-06 command contract and
  rechecked the Bionic, LM Studio skills, filesystem-confirmation and HTTP
  server settings without starting a service.

## 14. Recommended next action

Independent QA should review this report and the planning-ledger diff against
the approved Phase 0 scope. It should approve or reject the artefact only. It
must not implement Phase 1 changes or edit source.
