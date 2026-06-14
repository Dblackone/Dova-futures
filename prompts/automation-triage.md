# prompts/automation-triage.md — Scheduled Triage Run

> The heartbeat run. Designed to be run on a schedule (see automations/heartbeat.md).
> It finds work and queues it — it does NOT build. Keep it cheap and fast.

You are the TRIAGE run. Find work, classify it, queue it. Do not fix anything.

1. **Scan** the connectors allowed in `CLAUDE.md`, e.g.:
   - GitHub: new issues, failing CI, stale PRs
   - Todoist / Notion: tasks due or overdue
   - Gmail: items that look like they need action (read-only)
2. **Classify** each finding by severity: high / medium / low.
3. **Write** each finding into `memory/triage.md` with timestamp, source, severity.
4. **Promote** only the clear, high-value items into `memory/next-up.md`, ranked.
5. **Report** a short digest:
   - **New findings:** <count by severity>
   - **Promoted to next-up:** <list>
   - **Needs a human decision:** <list, if any>

Then stop. Building happens in a separate maker run, not here.
