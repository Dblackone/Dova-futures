# PROJECT.md — Client Jobs

## Identity

- **Workspace slug:** `client-jobs`
- **One-line purpose:** Container for every paid client project — documents,
  drawings, models, photos, correspondence, and reports, one folder per job.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active

## Why this project exists

This is the revenue: delivering client jobs profitably and professionally
(`company/goals.md` goal 4). **Everything in `jobs/` is client-confidential**
— `company/ethics.md` confidentiality rules apply in full.

## Where the files live

**`jobs/`** — one folder per job, named `<JOB-CODE>_<Client>_<Project-Name>`:

```
jobs/DFL-2026-POOL-001_FHS-Hotel_Swimming-Pool-Ibafo/
├── 01-Documents/       ← quotes, invoices, contracts (from the template library)
├── 02-Drawings/
├── 03-Models/
├── 04-Photos/
├── 05-Correspondence/
└── 06-Reports/
```

## Active jobs

| Job code | Client / project | Status |
|----------|------------------|--------|
| `DFL-2026-POOL-001` | FHS Hotel — Swimming Pool, Ibafo | active; INV-001..005 issued, VQ-001 waterfall variation, progress report June 2026 |
| `DFL-2026-ROAD-001` | C. K. Musa — Access road erosion repair, Afuze, Edo | active; QTE-2026-001 approved by principal, awaiting client alternate choice |
| `GM-2026-OSG-001` | Grail Movement — Hall of Worship, Osogbo (altar + structure remodification) | active; scope + estimate + RPT-001 drafted, principal review pending |

## Opening a new job

1. Issue the next job code and **append it to
   `bim-standards/registers/project-register.csv`** (append-only; never reuse a
   code). Follow `bim-standards/01-naming-projects.md`.
2. Create `jobs/<JOB-CODE>_<Client>_<Project-Name>/` with the six numbered
   subfolders above (`.gitkeep` in empty ones).
3. Add the job to the Active jobs table above and note it in this workspace's
   `memory/status.md`.

## Project-specific rules & traps

- **All documents** (quotes, invoices, letters, reports) start from the
  canonical templates — `company/document-policy.md` is binding. Generated
  documents live in the job's `01-Documents/`.
- **Nothing leaves this folder** to a client without the principal's explicit
  approval (`governance/guardrails.md`).
- Revit work on a job follows `workspaces/bim-standards` conventions.
- Do not use one client's material (photos, drawings, pricing) in another
  client's deliverable or in marketing without approval.

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` (especially `ethics.md` +
   `document-policy.md`) → 3. this file →
4. `workspaces/client-jobs/memory/status.md` + `next-up.md`
