# 06 — View Naming & View Templates

## View Template name

```
[Discipline] - [View Type] - [Purpose]
```

**Examples:** `A - Floor Plan - Working 1:50`, `A - Floor Plan - Presentation
1:100`, `S - Framing Plan - Coordination`, `A - RCP - Presentation`,
`M - Duct Plan - Working`.

### Required template set per discipline

Every discipline model needs at minimum these purposes for its relevant view
types (plans, RCPs, elevations, sections as applicable to that discipline):

| Purpose | Used for |
|---|---|
| `Working` | Full detail, no graphic cleanup — the modeling/coordination view |
| `Presentation` | Client-facing — cleaned line weights, hidden construction/reference elements |
| `Coordination` | Multi-discipline overlay, underlays at reduced line weight/transparency |
| `Existing` | Renovation/retrofit projects — existing-to-remain vs. demolish graphics |
| `Diagram` | Schematic/analysis views (area plans, egress diagrams, solar studies) |

Templates are pre-built into the project template (see file 07) — nobody
creates a one-off view template inside a live project without naming it per
this convention and, if it's reusable, proposing it back into the firm
template.

## View name

```
[Discipline] - [View Type] - [Level/Area] - [Purpose]
```

**Examples:** `A - Plan - 01 First Floor - Working`, `A - Elevation - North -
Presentation`, `S - Framing Plan - RF Roof - Working`.

- View names are what appear in the Project Browser — keep the browser
  organized by discipline first, then view type, matching this naming so
  scrolling the browser reads like a table of contents.
- Sheet-placed views can drop the trailing `- Purpose` segment once a
  template is assigned, since the template's name already carries that
  information — but the browser view name should still make sense on its own
  without opening the view.
- Dependent views (for match lines) append `- Dependent [n]` per Revit's own
  convention; don't fight Revit's auto-naming there.
