# -*- coding: utf-8 -*-
"""Build a full set of levels from a CSV (Code,Name,ElevationMM), naming each
one "[Code] - [Name]" per the standard and skipping any that already exist.

CSV format, one header row then one row per level:
    Code,Name,ElevationMM
    B1,Basement 1,-3000
    00,Ground Floor,0
    01,First Floor,3600
    RF,Roof,7200

See bim-standards/03-naming-levels.md for the level naming convention.
"""
__title__ = "Level\nBuilder"
__author__ = "Dova Futures BIM"

import csv

from pyrevit import revit, DB, forms, script

output = script.get_output()
doc = revit.doc

MM_PER_FOOT = 304.8


def read_csv(path):
    rows = []
    with open(path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def main():
    csv_path = forms.pick_file(file_ext="csv", title="Select level list CSV")
    if not csv_path:
        script.exit()

    rows = read_csv(csv_path)
    if not rows:
        forms.alert("CSV had no data rows.", exitscript=True)

    existing_levels = {
        lvl.Name: lvl
        for lvl in DB.FilteredElementCollector(doc).OfClass(DB.Level).ToElements()
    }

    results = []
    with revit.Transaction("Dova BIM - Build Levels"):
        for row in rows:
            code = row["Code"].strip()
            name = row["Name"].strip()
            elevation_mm = float(row["ElevationMM"])
            level_name = "{} - {}".format(code, name)

            if level_name in existing_levels:
                results.append((level_name, elevation_mm, "Skipped (already exists)"))
                continue

            elevation_ft = elevation_mm / MM_PER_FOOT
            try:
                new_level = DB.Level.Create(doc, elevation_ft)
                new_level.Name = level_name
                results.append((level_name, elevation_mm, "Created"))
            except Exception as ex:  # noqa: BLE001 - surface every failure
                results.append((level_name, elevation_mm, "FAILED: {}".format(ex)))

    output.print_md("## Level Builder Results")
    output.print_table(
        table_data=results, columns=["Level Name", "Elevation (mm)", "Status"]
    )


main()
