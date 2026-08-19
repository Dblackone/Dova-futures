# 02 — Sheet Naming

## Sheet Number

```
[Discipline]-[Series][Sequence]
```

`Discipline` — see README quick reference (`A`, `S`, `M`, `E`, `P`, `C`, `L`,
`ID`, `FP`, `G`).

`Series` + `Sequence` — a 3-digit number where the first digit is the series
(drawing category) and the remaining two digits are the sequence within it:

| Series | Range | Content |
|---|---|---|
| 0xx | 000–099 | General — cover sheet, drawing index, general notes, symbols/legends, code compliance |
| 1xx | 100–199 | Plans — site, floor, roof, reflected ceiling |
| 2xx | 200–299 | Elevations |
| 3xx | 300–399 | Sections (building + wall) |
| 4xx | 400–499 | Large-scale plans / enlarged plans |
| 5xx | 500–599 | Details |
| 6xx | 600–699 | Schedules (doors, windows, finishes, rooms) |
| 7xx | 700–799 | Interior elevations / interior details |
| 8xx | 800–899 | 3D views, renders, diagrams |
| 9xx | 900–999 | Discipline-specific reserve (e.g. structural framing plans use `S-4xx`, MEP riser diagrams use `9xx` per discipline) |

**Examples:** `A-001` (cover sheet), `A-101` (ground floor plan), `A-201`
(north/south elevations), `S-401` (foundation plan), `M-901` (HVAC riser
diagram).

- Sequence numbers go up in tens within a series when practical (`100`, `110`,
  `120`) so sheets can be inserted later without renumbering everything.
- Match-line or continuation sheets append a letter: `A-101A`, `A-101B`.
- Sheet numbers are **never reused** within a project, even if a sheet is
  deleted — retire the number and note it in the drawing register.

## Sheet Name

The Revit **Sheet Name** parameter (shown on the title block) is plain
English, Title Case, and describes the content — not the sheet number a
second time:

- ✅ `First Floor Plan`
- ✅ `North & South Elevations`
- ✅ `Kitchen Details`
- ❌ `A-101 Floor Plan` (number is already in its own field)
- ❌ `floor plan 1` (not descriptive, wrong case)

## Drawing register

Every issued set is tracked in a per-project drawing register (a copy of the
project register pattern, one row per sheet, per revision) stored in
`04_BIM_and_CAD/03_Published/` alongside the issued PDF/DWG set. Fields: Sheet
Number, Sheet Name, Revision, Issue Date, Issue Purpose, Issued To.
