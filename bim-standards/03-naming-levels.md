# 03 — Level Naming

## The one rule that matters most

**Level names must be character-for-character identical across every
discipline's model on the same project.** Structure's `01 - First Floor` must
match Architecture's `01 - First Floor` exactly — same spacing, same case. This
is what lets `Copy/Monitor` and grid/level linking work; a single stray space
breaks coordination silently.

## Format

```
[Code] - [Name]
```

| Zone | Code pattern | Example |
|---|---|---|
| Basement (below grade) | `B1`, `B2`, ... numbered from grade downward | `B1 - Basement 1` |
| Ground | `00` | `00 - Ground Floor` |
| Upper floors | 2-digit, numbered up from ground | `01 - First Floor`, `02 - Second Floor` |
| Mezzanine | parent level code + `M` | `00M - Ground Mezzanine` |
| Roof | `RF` | `RF - Roof` |
| Plant / penthouse above roof | `PH` | `PH - Roof Plant` |
| Non-storey reference levels (top of parapet, top of steel, etc.) | prefix `REF -` so they're excluded from area/schedule logic | `REF - T.O. Parapet` |

**Full examples:** `B1 - Basement 1`, `00 - Ground Floor`, `01 - First Floor`,
`RF - Roof`, `REF - T.O. Parapet`.

## Rules

- Numbering always counts up from ground (`00`) regardless of how many
  basement or roof levels exist — never number relative to a building's total
  height.
- Every level that generates a floor plan gets a real level line. Reference
  planes or non-story levels use the `REF -` prefix and have "Building Story"
  turned off.
- Elevation values are set once by Architecture at project setup (see file
  07) and every other discipline links/monitors from that model — disciplines
  don't independently retype elevations.
- Renaming a level after other disciplines have linked to it is a
  **coordination event**: flag it in the project channel before doing it, not
  after, since it can break Copy/Monitor for everyone downstream.
