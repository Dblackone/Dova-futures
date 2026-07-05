# 01 — Project Naming

## Project code

```
DOVA-[YY]-[SEQ]-[SHORT-NAME]
```

| Segment | Rule | Example |
|---|---|---|
| `DOVA` | Fixed firm code. Never changes. | `DOVA` |
| `YY` | 2-digit year the project was won / opened, not the year construction starts. | `26` |
| `SEQ` | 3-digit sequence number, firm-wide, resets to `001` each calendar year. Assigned in order from `registers/project-register.csv` — **never reused, never skipped, never assigned from memory.** | `014` |
| `SHORT-NAME` | Uppercase, hyphen-separated, ≤ 20 characters, derived from client surname/company or site name. No project-type words ("house", "villa", "office") unless needed to disambiguate two projects for the same client. | `LEKKI-VILLA` |

**Full example:** `DOVA-26-014-LEKKI-VILLA`

### Assigning a new project code

1. Open `registers/project-register.csv`.
2. Take the next unused `SEQ` for the current year.
3. Append a new row immediately — before any folder or model file is created —
   so two people can never grab the same number.
4. Use the resulting code everywhere: folder name, model file names, sheet
   title block "Project Number" field, invoices, and correspondence.

This code is the single join key between the website's `project/` document
templates (quotes, invoices, completion forms) and the BIM deliverables — the
same `DOVA-YY-SEQ` appears on both.

## Project folder tree (Common Data Environment)

Every project gets this tree under the firm's project drive, named with the
full project code:

```
DOVA-26-014-LEKKI-VILLA/
├── 01_Admin/
├── 02_Correspondence/
├── 03_Consultants/
├── 04_Site-Photos-Surveys/
├── 05_Specifications/
├── 06_BIM/
│   ├── 01_WIP/              ← work in progress, one subfolder per discipline (A, S, M, E, P...)
│   ├── 02_Shared/           ← coordinated, checked, ready for other disciplines to reference
│   ├── 03_Published/        ← issued to client/contractor — read-only, dated
│   ├── 04_Archive/          ← superseded files, never deleted
│   ├── Families/            ← project-specific families that don't belong in the firm library
│   ├── Exports/             ← IFC, PDF, DWG exports
│   └── Templates/           ← the project template snapshot used to start this job (see file 07)
├── 07_CAD/
└── 08_Renders-Marketing/
```

This mirrors the ISO 19650 CDE states (WIP → Shared → Published → Archive) —
a file only moves right, never sideways, and nothing is ever deleted from
Archive.

## Revit model file naming

```
[ProjectCode]_[Discipline]_[Phase].rvt
```

| Segment | Example |
|---|---|
| `ProjectCode` | `DOVA-26-014-LEKKI-VILLA` |
| `Discipline` | `A`, `S`, `M`, `E`, `P`, `C`, `L`, `ID`, `FP`, `G` (see README quick reference) |
| `Phase` | `CO`, `SD`, `DD`, `CD`, `CA`, `AB` (see README quick reference) |

**Full example:** `DOVA-26-014-LEKKI-VILLA_A_DD.rvt`

- One central model per discipline per phase. When a project moves phase,
  **save-as** into the new phase name — don't rename the live file mid-phase,
  and don't delete the previous phase's file (move it to `04_Archive/`).
- If a discipline's model must be split (e.g. a tower is too large for one
  file), add a location suffix before the phase: `..._A_TOWER-A_DD.rvt`,
  `..._A_PODIUM_DD.rvt`.
- Linked site/context models: `[ProjectCode]_SITE_[Phase].rvt`.
- Local (workshared user) copies keep the central name and add the user's
  initials: `DOVA-26-014-LEKKI-VILLA_A_DD_JD.rvt`. Local files are never
  committed to `02_Shared/` or `03_Published/`.
