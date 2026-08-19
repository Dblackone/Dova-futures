# 01 — Project Naming

## At a glance

Use the same project code at every project boundary:

```
DOVA-[YY]-[SEQ]-[SHORT-NAME]
```

The code is the project folder name, the Revit **Project Number**, and the
prefix for every project file. A person should be able to identify the project
and the file purpose without opening the file.

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

### Revit Project Information

When a project is started from a firm template, populate the fields as follows:

| Revit field | Required value | Example |
|---|---|---|
| Project Number | Full project code | `DOVA-26-014-LEKKI-VILLA` |
| Project Name | Human-readable project name in Title Case | `Lekki Villa` |
| Client Name | Legal or agreed client name | `Example Client Ltd` |
| Project Address | Full project address | `Lekki, Lagos` |

The human-readable **Project Name** does not replace the project code in a
folder or filename.

### Assigning a new project code

1. Open `registers/project-register.csv`.
2. Take the next unused `SEQ` for the current year.
3. Append a new row immediately — before any folder or model file is created —
   so two people can never grab the same number.
4. Use the resulting code everywhere: folder name, model file names, sheet
   title block "Project Number" field, invoices, and correspondence.

This code is the single join key between the company's `documents/` document
templates (quotes, invoices, completion forms) and the BIM deliverables — the
same `DOVA-YY-SEQ` appears on both.

## Project folder tree (Common Data Environment)

Every project gets this tree under the firm's project drive, named with the
full project code:

```
DOVA-26-014-LEKKI-VILLA/
├── 00_Project_Admin/
├── 01_Site_Information/
├── 02_Planning_and_Compliance/
├── 03_Design/
├── 04_BIM_and_CAD/
│   ├── 01_WIP/              ← work in progress, one subfolder per discipline (A, S, M, E, P...)
│   ├── 02_Shared/           ← coordinated, checked, ready for other disciplines to reference
│   ├── 03_Published/        ← issued to client/contractor — read-only, dated
│   ├── 04_Archive/          ← superseded files, never deleted
│   ├── Families/            ← project-specific families that don't belong in the firm library
│   ├── Exports/             ← IFC, PDF, DWG exports
│   └── Templates/           ← the project template snapshot used to start this job (see file 07)
├── 05_Consultants/
├── 06_Applications/
├── 07_Issued_Documents/
├── 08_Exports/
├── 09_Construction/
└── 99_Archive/
```

Use two-digit prefixes so the folders remain in process order. Use underscores
between words; do not create parallel folders with alternate spellings. The
`04_BIM_and_CAD/` subfolders mirror the ISO 19650 CDE states (WIP → Shared →
Published → Archive): a file only moves right, never sideways, and nothing is
ever deleted from Archive. `99_Archive/` is for non-BIM superseded material.

## General project file naming

For non-Revit files, use:

```
[ProjectCode]_[FilePurpose]_[Discipline]_[Phase]_[Revision].[ext]
```

- `FilePurpose` is a short, uppercase, hyphen-separated description such as
  `SITE-SURVEY`, `DESIGN-REPORT`, `COORDINATION-SET`, `SPECIFICATION`, or
  `APPLICATION`.
- `Discipline` uses the codes in the README; use `G` for general or
  multi-discipline material.
- `Phase` uses the codes in the README; use `NA` when a file is not phase
  specific.
- `Revision` is the issue/revision code used by the project's drawing or
  document register. Do not add dates or words such as `final`, `latest`, or
  `new` to filenames.

**Example:**
`DOVA-26-014-LEKKI-VILLA_DESIGN-REPORT_A_DD_P01.pdf`

Photos and survey captures may add an ISO date and sequence after the purpose:
`DOVA-26-014-LEKKI-VILLA_SITE-PHOTO_G_NA_20260819_001.jpg`.

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
  and don't delete the previous phase's file (move it to
  `04_BIM_and_CAD/04_Archive/`).
- If a discipline's model must be split (e.g. a tower is too large for one
  file), add a location suffix before the phase: `..._A_TOWER-A_DD.rvt`,
  `..._A_PODIUM_DD.rvt`.
- Linked site/context models: `[ProjectCode]_SITE_[Phase].rvt`.
- Local (workshared user) copies keep the central name and add the user's
  initials: `DOVA-26-014-LEKKI-VILLA_A_DD_JD.rvt`. Local files are never
  committed to `04_BIM_and_CAD/02_Shared/` or
  `04_BIM_and_CAD/03_Published/`.

Existing register entries with an older code format remain unchanged for
historical traceability. They are not examples for new projects; every new
code must follow the DOVA format above and be appended to the register before
the project folder or model is created.

---
*Updated by @lead/vector [codex] · 2026-08-19 · see workspaces/bim-standards/memory/decisions.md for rationale*
