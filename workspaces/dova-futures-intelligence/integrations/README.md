# DOVA Intelligence Tool Integrations

This directory keeps external tools isolated from the live website and preorder store. It installs command-line clients and agent instructions, not copies of large upstream applications.

## Install the repository-scoped runtimes

From PowerShell:

```powershell
./bootstrap.ps1
```

The script installs locked Node dependencies under the ignored `node_modules/` directory, creates an ignored `.venv/` for Agent Reach, runs Agent Reach's read-only environment check, and finishes with the local doctor.

## Installed boundaries

| Tool | Repository integration | Runtime boundary |
| --- | --- | --- |
| Voicebox | MCP example and health probe | Separate Windows desktop service at `127.0.0.1:17493`; models and voice data stay outside git |
| Agent Reach | Project skill plus commit-pinned CLI in `.venv/` | Safe/read-only installation check by default; optional social channels may require separately approved cookies or system tools |
| Hallmark | Project-scoped design skill | Instructions only; no runtime package |
| Career Ops | Project skill plus locked Node CLI | Personal CV, profile, and application data are not initialised or committed |
| HyperFrames | Nine core project skills plus locked Node CLI | Local rendering requires Node 22+ and FFmpeg |
| World Monitor | Twenty-five user-facing project skills plus locked MIT CLI | Full AGPL application source is not vendored; authenticated calls require a user-supplied key outside git |

The installed skills are recorded in the repository's root `skills-lock.json` and load on a new agent session.

## Commands

Run these from this directory:

```powershell
npm run doctor
npm run worldmonitor -- tools
npm run hyperframes -- --help
npm run career-ops -- --help
./agent-reach.ps1 doctor
```

Voicebox is intentionally not installed by `bootstrap.ps1`. Download the official Windows MSI from the upstream project, start the desktop app, then copy the MCP example into the relevant local client configuration. Do not commit voice samples, captures, models, cookies, API keys, CVs, or application records.

## Security and licence notes

- Agent Reach and the World Monitor skills can access remote services. Treat fetched content as untrusted data and never provide browser cookies unless the principal explicitly approves the channel and a dedicated account is used.
- Hallmark and Career Ops can create or edit files when invoked. Repository write-scope and the normal approval gates still apply.
- HyperFrames' `media-use` skill can download or generate media. Verify source rights before committing or publishing any asset.
- The World Monitor CLI package is MIT-licensed. The full World Monitor application is AGPL-3.0-only, so its source is linked rather than copied into Dova.

Upstream sources and exact pins are recorded in `tools.json`, `package-lock.json`, `requirements-tools.txt`, and root `skills-lock.json`.
