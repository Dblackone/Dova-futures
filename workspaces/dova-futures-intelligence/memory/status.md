# Status

**Project:** DOVA Futures Intelligence  
**Status:** Active — private Hub and cloud intelligence operational; live GitHub and read-only OneDrive views implemented in draft PR #35; Microsoft registration, merge and deployment pending.
**Last verified:** 2026-09-15 — @lead/vector [codex]

## DOVA AI Workstation Phase 1 — 2026-09-15

The approved Phase 1 context/instruction optimisation and its QA-requested
evidence repair are complete. Vollmann declined the optional checker pass after
the manifest-only repair. PR #39 is merged into main. It corrects six stale repository agent handoffs,
bounds Bionic and LM Studio skill discovery, restores filesystem-tool
confirmation, and reduces local HTTP log sensitivity. No paid service,
credential, model, global Codex/Claude setting, or Windows auto-start setting
was introduced or changed. See
`drafts/DOVA_AI_WORKSTATION_PHASE1_EXECUTION.md` for the exact scope and
rollback evidence. Bionic was already running when its settings were written;
a user restart is needed before its live session is assumed to have reloaded.

## DOVA AI Workstation Phase 2 — 2026-09-16

Phase 2 planning is complete. The plan evaluates the installed OmniRoute
compression path before considering standalone RTK, defines a fixed benchmark
corpus and retention/reduction gates, and preserves zero-spend and manual-start
boundaries. No RTK package or global configuration was installed or changed.
See `drafts/DOVA_AI_WORKSTATION_PHASE2_PLAN.md`.

The workspace retains the provider-neutral local gateway and repository-scoped
integration suite for Agent Reach, Hallmark, Career Ops, HyperFrames, World
Monitor, and the optional Voicebox localhost boundary. Credentials, voice data,
model files, cookies, CVs, and generated media remain outside git.

The repository-level `hub/` is a dependency-free non-sensitive snapshot. The
responsive private application in `hub-app/` provides the approved desktop and
mobile Hub journeys and a server-side OpenAI Responses API adapter using a
dedicated secret key and `gpt-5.4-mini`. The complete design reference remains
in `design/hub-ux-prototype/`.

Microsoft Graph sign-in, project-folder listing, file search and OneDrive web
opening are implemented with delegated `User.Read` + `Files.Read` only. They
remain honestly disconnected until the owner registers the Entra application,
adds the deployment settings and approves the root path. Document writes and
the workstation bridge remain disabled.

Verification includes 23 local intelligence tests, integration health checks,
the Hub production build, five Hub server/authentication tests, ESLint, clean
npm audits, and live retrieval of all three GitHub repository records.

## OpenClaw assessment — 2026-09-01

The separate `drafts/DOVA_OPENCLAW_AI_PRODUCT_BRIEF.md` assesses the installed OpenClaw/LM Studio/Ollama environment and recommends OpenClaw as the runtime beneath a DOVA-specific product layer. Read-only probes recorded OpenClaw `2026.7.1-2`, valid configuration, a stopped Gateway, local LM Studio models, and 32 GB RAM / RTX 4060 8 GB VRAM. No implementation or provider configuration changed. Both product briefs remain unapproved; runtime, first workflow, provider and privacy decisions require principal review. This assessment does not replace the existing private Hub implementation.

## Repository reconciliation — 2026-09-07

PR #34 is already merged. PR #35 is being reconciled with current main; integration deployment and Microsoft registration remain pending. Historical verification above records the original implementation checks.

## AI workstation optimisation — Phase 0 planning — 2026-09-15

Read-only discovery and planning for the DOVA AI workstation brief are
complete. No package, model, service, global configuration, credential,
startup entry, or external integration was installed, enabled, removed, or
rewritten. The working branch is
docs/vector/ai-workstation-phase0.

- **Runtime baseline:** Windows 11 Home; 31.71 GB usable RAM; Intel UHD plus
  RTX 4060 Laptop GPU; Git 2.53.0; Node 24.19.0; npm 11.17.0; pnpm 11.19.0;
  Python 3.14.3; uv 0.12.2; Codex CLI 0.154.0-alpha.6.2; Claude Code
  2.1.221. Rust, rustup, Docker and a working WSL distribution were not
  present.
- **Local stack:** LM Studio 0.4.23+1, Bionic 1.1.1+5 and OpenClaw
  2026.7.1-2 are installed. Target ports 1234, 18789, 11434, 17493 and
  18801 had no listeners at the final check. The Ollama Startup shortcut
  remains and was not changed. No local model or gateway was started for this
  phase.
- **Context risks:** Bionic is configured to discover five external harness
  skill roots containing about 4,597 top-level skill directories, including
  duplicated catalogues. Its internal auto-fit context value is 478,187 while
  the normal LM Studio/Bionic default is 8,192. LM Studio has auto-injection
  enabled for up to 12 skills. The existing OpenClaw shared-skill router is
  already bounded and should remain the single on-demand discovery pattern.
- **Routing drift:** the repository arch-sol, qa-vera and sec-warden agent
  definitions hand verdicts to @lead/atlas, while the registry and lead-vector
  definition make @lead/vector the lead orchestrator. This is a Phase 1
  correction candidate, not a Phase 0 mutation.
- **Existing capability:** the DOVA provider-neutral orchestrator, policy
  engine, capability registry, gateway, repository-scoped integration suite
  and shared-skill router already cover the proposed control-plane and
  discovery roles. OmniRoute is installed globally and advertises RTK/Caveman
  context compression, but its server is stopped and Codex/Claude/OpenClaw
  are not configured for it; it must be evaluated before any standalone RTK
  installation is considered.

The baseline report at drafts/DOVA_AI_WORKSTATION_PHASE0_BASELINE.md now
contains the reproducible BAS-00 through BAS-06 measurement contract, exact
proposed Phase 1 configuration keys and values, and the corrected LM Studio
MCP, confirmation and app-launch distinctions. Final independent QA is the
next action. No global instruction, skill, logging, startup or MCP
configuration has been changed.
