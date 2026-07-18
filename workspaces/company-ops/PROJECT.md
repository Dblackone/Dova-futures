# PROJECT.md — Company Ops (Internal / Admin)

## Identity

- **Workspace slug:** `company-ops`
- **One-line purpose:** Internal and administrative work not tied to one client
  job or one product — payroll documents, registers, automations/heartbeat,
  hub upkeep, connector configuration.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — baseline scaffold

## Why this project exists

Someone has to run the company itself. This workspace holds the operational
work that keeps the hub and the firm functioning (`company/goals.md` goal 3).

## What belongs here

- **Automations & heartbeat** — `automations/heartbeat.md` (scheduled triage /
  health / review runs) and `prompts/automation-triage.md`.
- **Internal documents** — salary slips, internal memos: drafted from the
  templates per `company/document-policy.md`, filed wherever the principal
  directs (they contain personal data — never commit staff personal data to
  the repo).
- **Registers & records** — company-level records that aren't job- or
  BIM-specific. (The project register itself lives with
  `workspaces/bim-standards`.)
- **Hub maintenance** — keeping `company/registry.md` current, pruning stale
  branches, archiving finished workspaces, maintaining `memory/archive/` history.
- **Connector administration** — deciding which connectors (GitHub, Notion,
  Todoist, Calendar, Gmail, Drive) are enabled; the live list is in root
  `CLAUDE.md` §4.

## What does NOT belong here

Anything that fits another workspace. If it touches the website, store,
templates, BIM, or a client job — route it there via `company/registry.md`.

## Project-specific rules & traps

- Payroll/HR documents contain personal data — draft locally, never commit
  them; only the blank templates live in git.
- Automated runs may triage and verify but never merge, send, or take
  irreversible actions (`automations/heartbeat.md` rules +
  `governance/guardrails.md`).

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` → 3. this file →
4. `workspaces/company-ops/memory/status.md` + `next-up.md`
