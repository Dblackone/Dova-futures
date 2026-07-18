# DovaBIM pyRevit Extension

A pyRevit UI extension. No installer needed — pyRevit discovers extensions by
folder structure alone.

## Install (one time, per machine)

1. Install [pyRevit](https://pyrevitlabs.notion.site/) if it isn't already on
   the machine.
2. In Revit: **pyRevit tab → Settings → Custom Extension Directories → Add
   Folder** → point it at this folder
   (`bim-standards/pyrevit-plugin/`, the parent of `DovaBIM.extension/`).
3. **pyRevit tab → Reload.**
4. A new **DovaBIM** tab appears in the Revit ribbon with **Naming** and
   **Setup** panels.

## Tools

| Panel | Tool | What it does |
|---|---|---|
| Naming | Sheet Renumberer | Batch-renumbers sheets (selected or all) to `[Discipline]-[Series][Seq]`, incrementing by 10 |
| Naming | Naming QA Audit | Scans sheets, levels, views/view templates, and materials against the standard; reports every violation with a clickable link to the element |
| Setup | New Project Setup | Prompts for and validates a project code, then stamps Project Information (Number, Name, Client, Address) in one step |
| Setup | Level Builder | Reads a `Code,Name,ElevationMM` CSV and creates any missing levels, named per convention |
| Setup | Apply View Templates | Matches views to view templates by discipline + Revit view type and bulk-assigns them |

## Updating a tool

Each tool is one `script.py` under its `.pushbutton` folder — edit it, save,
then **pyRevit tab → Reload** in Revit to pick up the change. No build step,
no compilation.

## Adding a new tool

Create a new `<Name>.pushbutton/` folder under the relevant `.panel/` folder
(or a new `<Name>.panel/` folder for a new group) with a `script.py` inside.
pyRevit picks it up on the next reload — folder names *are* the UI structure.
