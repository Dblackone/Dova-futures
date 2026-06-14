# board.md — Team Board (shared coordination)

> The office. Agents can't talk to each other, so they coordinate HERE. Read the
> board before acting; write the board after. One card per task. Every card is
> signed with an owner callsign and carries its branch. WIP limit: max 3 active.

## Backlog
- [ ] <task> — _acceptance: <...>_

## Assigned
| Card | Owner | Branch | Acceptance |
|------|-------|--------|------------|
| <task> | @build/forge | feat/forge/<slug> | <criteria> |

## In Progress
| Card | Owner | Branch | Started |
|------|-------|--------|---------|
| <task> | @build/nova | fix/nova/<slug> | <ts> |

## In Review (with QA)
| Card | Built by | Reviewer | Branch | Verdict |
|------|----------|----------|--------|---------|
| <task> | @build/forge | @qa/vera | feat/forge/<slug> | pending |

## Blocked
| Card | Owner | Branch | Why blocked | Needs |
|------|-------|--------|-------------|-------|
| <task> | @build/nova | fix/nova/<slug> | <reason> | <decision / you> |

## Done (pending your merge approval)
| Card | Built by | Verified by | Branch |
|------|----------|-------------|--------|
| <task> | @build/forge | @qa/vera ✅ | feat/forge/<slug> |

## Merged ✅
- <date> — <task> — by @build/forge — verified @qa/vera — merged to main
