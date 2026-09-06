# DOVA Futures — Product and Operations Hub

This private repository is DOVA Futures Limited's internal control hub. It
organizes company standards, project routing, agent governance, workspace
status, and reusable tooling without storing the source code for each public
product at the repository root.

## Start here

| Entry | Purpose |
|---|---|
| [`hub/`](hub/) | Read-only browser dashboard deployed by GitHub Pages |
| [`company/registry.md`](company/registry.md) | Canonical workspace and product map |
| [`AGENTS.md`](AGENTS.md) | Entry point for any AI assistant |
| [`CLAUDE.md`](CLAUDE.md) | Workspace router and run loop |
| [`CODEX.md`](CODEX.md) | Lead-orchestrator entry point |
| [`workspaces/`](workspaces/) | Project context, plans, decisions, and status |
| [`company/`](company/) | Shared brand, policy, goals, standards, and approved assets |
| [`governance/`](governance/) | Authority, guardrails, collaboration, and agent rules |

The dashboard is a generated, read-only summary. It does not expose client
documents or implement DOVA Intelligence. Refresh its committed snapshot with:

```powershell
python hub/build_snapshot.py
```

## Product boundaries

| Product | Source of truth | Deployment |
|---|---|---|
| DOVA Futures website | [Dblackone/Dova-futures-website](https://github.com/Dblackone/Dova-futures-website) | GitHub Pages; `dovafutures.com` transfer pending |
| DOVA Preorder | [Dblackone/Dova-preorder](https://github.com/Dblackone/Dova-preorder) | Render |
| DOVA Hub | this repository, [`hub/`](hub/) | Manual Pages gate; `hub.dovafutures.com` pending |

Website and preorder application source is intentionally absent from this
repository. Their workspace records remain here for planning and status, while
implementation belongs in the linked product repositories.

The Hub workflow is intentionally manual at present. GitHub still records
`dovafutures.com` against this repository, while the external website Pages
project has no custom domain. Transfer the marketing domain first, configure
`hub.dovafutures.com` second, then enable automatic Hub deployment.

## Repository boundary

GitHub stores code, standards, templates, and lightweight operational metadata.
Client deliverables and generated business files are moving toward OneDrive as
the protected document system of record. Until that migration is approved and
performed, existing [`projects/`](projects/) records remain untouched.

**Authority:** Vollmann Akarakiri is the owner, project leader, and final
approving authority. Codex (`@lead/vector`) is the lead orchestrator. See
[`governance/agents/GOVERNANCE.md`](governance/agents/GOVERNANCE.md).
