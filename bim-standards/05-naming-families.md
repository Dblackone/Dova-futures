# 05 — Revit Family Naming

## Family file name (on disk and when loaded)

```
[Category]_[Subtype]_[Manufacturer-or-Generic]_[KeyDimension-or-Descriptor]
```

| Example | Reads as |
|---|---|
| `Door_Single-Flush_Generic_900x2100` | Door family, single flush leaf, generic (not manufacturer-specific), 900×2100mm |
| `Furniture_Chair-Office_Herman-Miller_Aeron` | Furniture family, office chair, Herman Miller, Aeron model |
| `Casework_Kitchen-Base-Cabinet_Generic_600` | Casework, kitchen base cabinet, generic, 600mm module |
| `Window_Casement-Double_Generic_1200x1500` | Window, double casement, generic, 1200×1500mm |

- Dimensions are always in millimetres, no unit suffix, width × height order.
- Use `Generic` when the family isn't tied to a specific manufacturer;
  otherwise use the manufacturer name exactly as they brand it (hyphenated if
  multi-word).
- No spaces in file names — hyphens within a field, underscores between
  fields — so files behave predictably across OS, Git, and Revit's own file
  browser.

## Family Type names (inside the family)

Type names use the same dimension convention as the file name:
`900x2100mm`, `1200x1500mm`. For non-dimensional variants, use a short plain
descriptor: `Left-Hand`, `Right-Hand`, `Standard`, `ADA`.

## Shared parameters

All firm-wide shared parameters live in **one file**:
`bim-standards/shared-parameters/DovaFutures_SharedParameters.txt`. Never fork
a copy for a single project or family — load that one file (Manage → Shared
Parameters) everywhere so parameter GUIDs stay consistent and schedules work
across projects.

- Parameter names use `PascalCase` with a firm prefix `DF_` to avoid
  collisions with manufacturer or Autodesk-provided parameters:
  `DF_FireRating`, `DF_KeynoteID`, `DF_ProjectCode`.
- Group new parameters into the existing parameter groups in the shared file
  (`Dova Identity`, `Dova Fire & Life Safety`, `Dova Cost`) — don't create a
  fifth group for one parameter.
- Adding a new shared parameter is a firm-wide decision, not a per-project
  one: propose it, get it added to the canonical file, then reload.

## Family library folder tree

```
Families/
├── 00_Templates/                 ← family templates (.rft), not loadable families
├── 01_Architectural/
│   ├── Doors/
│   ├── Windows/
│   ├── Furniture/
│   ├── Casework/
│   └── Specialty-Equipment/
├── 02_Structural/
├── 03_Mechanical/
├── 04_Electrical/
├── 05_Plumbing/
├── 06_Site/
├── 07_Annotation/
│   ├── Tags/
│   ├── Titleblocks/
│   └── Symbols/
└── 08_Generic-Detail-Items/
```

Project-specific one-off families (won't be reused elsewhere) stay inside
that project's `06_BIM/Families/` folder instead of the firm library — the
firm library is only for families intended for reuse across projects.
