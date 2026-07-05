# 04 — Material Naming

## Format

```
[Category]_[Type]_[Finish-or-Spec]
```

Underscores separate the three fields; hyphens join multi-word values within
a single field. Title Case each word.

| Category (fixed list) | Examples |
|---|---|
| `Concrete` | `Concrete_CastInPlace_Exposed`, `Concrete_Precast_Painted-White` |
| `Masonry` | `Masonry_Block_Rendered`, `Masonry_Brick_Face-Red` |
| `Wood` | `Wood_Oak_Stained-Walnut`, `Wood_Plywood_Unfinished` |
| `Metal` | `Metal_Aluminum_Anodized-Bronze`, `Metal_Steel_Powder-Coated-Black` |
| `Glass` | `Glass_Clear_Tempered`, `Glass_Low-E_Laminated` |
| `Finish-Flooring` | `Finish-Flooring_Porcelain-Tile_Matte-Grey`, `Finish-Flooring_Timber_Engineered-Oak` |
| `Finish-Wall` | `Finish-Wall_Paint_RAL9010`, `Finish-Wall_Wallpaper_Textured-Linen` |
| `Finish-Ceiling` | `Finish-Ceiling_Gypsum_Painted-White`, `Finish-Ceiling_Acoustic-Tile_Standard` |
| `Insulation` | `Insulation_Rigid-Foam_R20` |
| `Membrane` | `Membrane_Waterproofing_Torch-On` |
| `Site` | `Site_Paving_Concrete-Unit`, `Site_Landscape_Turf` |
| `Generic` | `Generic_Void`, `Generic_By-Others` |

## Rules

- The **Material Name** in Revit is the field above — always. Never leave
  `Material <1>` or a manufacturer catalog string as the live name.
- The **Class** field (Revit's material class dropdown) is set to match the
  Category segment where a matching class exists.
- The **Description** field carries the spec section reference (e.g. `09 65
  00`) so a schedule can filter/report by spec section without parsing the name.
- The **Keynote** field is always populated when the firm's keynote file has
  an entry for that material — never left blank if one exists.
- One material = one name, firm-wide. If Structure and Architecture both use
  `Concrete_CastInPlace_Exposed`, it's the same material asset, not two
  near-duplicates — check the project's material library before creating a
  new one.
