# automations/heartbeat.md — Cadence

> Pillar 1: a loop needs a heartbeat. These are the scheduled runs that keep the
> loop alive. Implement them with cron, GitHub Actions, Claude Code scheduled
> tasks, or a simple OS scheduler — whatever you run.

## Suggested schedule

| Cadence | Run | Prompt | Purpose |
|---------|-----|--------|---------|
| Daily 09:00 | Triage | `prompts/automation-triage.md` | Scan connectors, queue work |
| Per commit / PR | Checker | `prompts/checker.md` | Verify changes before merge |
| Every 4 hours | Health | (read-only) | Update `memory/status.md` health flag |
| Weekly | Review | (you) | Read `done-log.md` + `decisions.md`, re-plan |

## Example: cron-style entries
```
# Daily triage at 09:00
0 9 * * *   cd /path/to/project && run-claude-loop --prompt prompts/automation-triage.md

# Health check every 4 hours
0 */4 * * * cd /path/to/project && run-claude-loop --prompt prompts/status-check.md
```
> `run-claude-loop` is a stand-in for however you invoke Claude Code headlessly.

## Rules for automated runs
- Automated runs may TRIAGE and VERIFY freely (read-mostly, low risk).
- Automated runs may NOT merge, send external messages, or take irreversible
  actions. Those wait for a human. (See `governance/guardrails.md`.)
- Every automated run still updates `memory/`. No silent runs.
