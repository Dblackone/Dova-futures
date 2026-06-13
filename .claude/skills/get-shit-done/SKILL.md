---
name: get-shit-done
description: >
  Structured spec-driven development framework using the GSD (Get Shit Done)
  workflow system. Use when asked to plan, execute, or manage a project using
  GSD phases, milestones, or when the user says "gsd", "new project", "plan
  this feature", "run a phase", or "ship this".
---

# Get Shit Done (GSD)

GSD Core is a context-engineering and spec-driven development framework that drives AI coding agents through a disciplined five-step phase loop. It prevents context rot by running heavy research, planning, and execution in fresh-context subagents.

**Repository**: https://github.com/open-gsd/gsd-core  
**Install**: `npx @opengsd/gsd-core@latest`

---

## The Five-Step Phase Loop

Each milestone repeats this loop, one phase at a time:

| Step | Command | Purpose |
|------|---------|---------|
| 1. Discuss | `/gsd-discuss-phase` | Capture implementation decisions before planning |
| 2. Plan | `/gsd-plan-phase` | Research, decompose, verify the plan fits context |
| 3. Execute | `/gsd-execute-phase` | Run plans in parallel waves with clean contexts |
| 4. Verify | `/gsd-verify-phase` | Walk through what was built; diagnose and fix |
| 5. Ship | `/gsd-ship` | Create PR, archive phase, repeat |

---

## Core Commands

### Project Setup
- `/gsd-new-project` — Initialize a new GSD project
- `/gsd-new-milestone` — Add a new milestone to the roadmap
- `/gsd-new-workspace` — Create a new workspace

### Daily Flow
- `/gsd` or `/gsd-do` — Smart dispatcher: describe what you want, GSD routes it
- `/gsd-next` — Show the next phase to work on
- `/gsd-progress` — View current project progress
- `/gsd-health` — Check project health

### Phase Management
- `/gsd-discuss-phase` — Discuss and capture decisions for a phase
- `/gsd-plan-phase` — Research and create a detailed plan
- `/gsd-execute-phase` — Execute a planned phase
- `/gsd-verify-phase` — Verify phase completion
- `/gsd-complete-milestone` — Archive a completed milestone

### Code Quality
- `/gsd-code-review` — Run a code review
- `/gsd-debug` — Debug an issue with systematic analysis
- `/gsd-audit-fix` — Find and fix audit issues

### Utilities
- `/gsd-explore` — Explore and map the codebase
- `/gsd-fast` — Quick task without full GSD overhead
- `/gsd-sketch` — Rapid prototyping mode
- `/gsd-scan` — Security/quality scan

---

## When to Use GSD vs. Direct Claude

| Situation | Use |
|-----------|-----|
| Complex feature spanning multiple files | GSD plan + execute |
| Quick 1-3 file change | Direct Claude (no GSD) |
| New project or milestone | GSD project setup |
| Debugging a specific bug | `/gsd-debug` |
| Just want to chat / ask questions | Direct Claude |

---

## Project Structure (after `/gsd-new-project`)

```
.planning/
  ROADMAP.md          # Milestones and phases
  STATE.md            # Current project state
  phases/             # Active phase plans
  milestones/         # Archived milestones
```

---

## Context Profiles

GSD supports different output modes via `context` in config:
- **dev** — Concise, code-first, minimal explanation
- **research** — Verbose, trade-offs, citations
- **review** — Critical, correctness-focused

---

## Key Principle

> Each executor starts with a clean 200k-token context. Heavy research, planning, and execution happen in subagents — keeping your main session lean and preventing context rot.
