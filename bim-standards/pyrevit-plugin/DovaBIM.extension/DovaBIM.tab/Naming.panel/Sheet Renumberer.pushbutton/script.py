# -*- coding: utf-8 -*-
"""Batch renumber sheets to the Dova Futures standard: [Discipline]-[Series][Sequence].

Pick a discipline code and a starting series, choose sheets (selection or all),
choose a sort key, and this renumbers them in order, incrementing by 10.
See bim-standards/02-naming-sheets.md for the full convention.
"""
__title__ = "Sheet\nRenumberer"
__author__ = "Dova Futures BIM"

from pyrevit import revit, DB, forms, script

output = script.get_output()
doc = revit.doc

DISCIPLINES = ["G", "C", "L", "A", "ID", "S", "M", "E", "P", "FP"]


def get_target_sheets():
    selection = revit.get_selection()
    selected_sheets = [
        el for el in selection.elements if isinstance(el, DB.ViewSheet)
    ]
    if selected_sheets:
        use_selection = forms.alert(
            "{} sheet(s) are selected. Renumber only the selection?".format(
                len(selected_sheets)
            ),
            yes=True,
            no=True,
        )
        if use_selection:
            return selected_sheets

    all_sheets = list(
        DB.FilteredElementCollector(doc).OfClass(DB.ViewSheet).ToElements()
    )
    return [s for s in all_sheets if not s.IsPlaceholder]


def main():
    sheets = get_target_sheets()
    if not sheets:
        forms.alert("No sheets found to renumber.", exitscript=True)

    discipline = forms.SelectFromList.show(
        DISCIPLINES, title="Discipline code", button_name="Use this discipline"
    )
    if not discipline:
        script.exit()

    series = forms.ask_for_string(
        default="100", prompt="Series/start number (e.g. 100)", title="Sheet Renumberer"
    )
    if not series or not series.isdigit():
        forms.alert("Series must be numeric, e.g. 100.", exitscript=True)
    start_number = int(series)

    sort_key = forms.SelectFromList.show(
        ["Current Sheet Number", "Sheet Name"],
        title="Sort sheets by",
        button_name="Sort",
    )
    if not sort_key:
        script.exit()

    if sort_key == "Sheet Name":
        sheets.sort(key=lambda s: s.Name)
    else:
        sheets.sort(key=lambda s: s.SheetNumber)

    results = []
    with revit.Transaction("Dova BIM - Renumber Sheets"):
        next_number = start_number
        for sheet in sheets:
            new_number = "{}-{:03d}".format(discipline, next_number)
            old_number = sheet.SheetNumber
            try:
                sheet.SheetNumber = new_number
                results.append((old_number, new_number, sheet.Name, True))
            except Exception as ex:  # noqa: BLE001 - report every failure to the user
                results.append((old_number, new_number, sheet.Name, str(ex)))
            next_number += 10

    output.print_md("## Sheet Renumbering Results")
    output.print_table(
        table_data=[
            [r[0], r[1], r[2], "OK" if r[3] is True else "FAILED: {}".format(r[3])]
            for r in results
        ],
        columns=["Old Number", "New Number", "Sheet Name", "Status"],
    )


main()
