# -*- coding: utf-8 -*-
"""Audit Sheets, Levels, Views, and Materials against the Dova Futures naming
standard and report every violation with a clickable link to the element.

See bim-standards/02..06 for the conventions these patterns encode. If the
standard changes, update the regexes below to match the docs, not the other
way around.
"""
__title__ = "Naming\nQA Audit"
__author__ = "Dova Futures BIM"

import re

from pyrevit import revit, DB, script

output = script.get_output()
doc = revit.doc

DISC = r"(?:G|C|L|A|ID|S|M|E|P|FP)"

SHEET_NUMBER_RE = re.compile(r"^" + DISC + r"-\d{3}[A-Z]?$")
LEVEL_NAME_RE = re.compile(
    r"^(B\d{1,2}|00|\d{2})M? - .+$|^RF - .+$|^PH - .+$|^REF - .+$"
)
VIEW_NAME_RE = re.compile(r"^" + DISC + r" - .+ - .+$")
VIEW_TEMPLATE_NAME_RE = re.compile(r"^" + DISC + r" - .+ - .+$")
MATERIAL_NAME_RE = re.compile(r"^[A-Z][A-Za-z]*(_[A-Za-z0-9\-]+){1,3}$")


def audit_sheets():
    violations = []
    sheets = DB.FilteredElementCollector(doc).OfClass(DB.ViewSheet).ToElements()
    for sheet in sheets:
        if sheet.IsPlaceholder:
            continue
        if not SHEET_NUMBER_RE.match(sheet.SheetNumber):
            violations.append((sheet.Id, sheet.SheetNumber, sheet.Name))
    return violations


def audit_levels():
    violations = []
    levels = DB.FilteredElementCollector(doc).OfClass(DB.Level).ToElements()
    for level in levels:
        if not LEVEL_NAME_RE.match(level.Name):
            violations.append((level.Id, level.Name, ""))
    return violations


def audit_views():
    violations = []
    views = DB.FilteredElementCollector(doc).OfClass(DB.View).ToElements()
    for view in views:
        if view.IsTemplate:
            if not VIEW_TEMPLATE_NAME_RE.match(view.Name):
                violations.append((view.Id, view.Name, "view template"))
            continue
        if isinstance(view, (DB.ViewSheet, DB.ViewSchedule)):
            continue
        if view.ViewType in (DB.ViewType.Internal, DB.ViewType.SystemBrowser):
            continue
        if not VIEW_NAME_RE.match(view.Name):
            violations.append((view.Id, view.Name, str(view.ViewType)))
    return violations


def audit_materials():
    violations = []
    materials = DB.FilteredElementCollector(doc).OfClass(DB.Material).ToElements()
    for material in materials:
        if not MATERIAL_NAME_RE.match(material.Name):
            violations.append((material.Id, material.Name, ""))
    return violations


def report(title, doc_ref, violations, columns):
    output.print_md("## {} — {} violation(s)".format(title, len(violations)))
    if not violations:
        output.print_md("_All clear._")
        return
    rows = []
    for v in violations:
        element_id, name, extra = v
        rows.append([output.linkify(element_id), name, extra])
    output.print_table(table_data=rows, columns=columns)


def main():
    output.print_md("# Dova Futures — Naming QA Audit")
    output.print_md("Project: `{}`".format(doc.Title))

    report(
        "Sheets", doc, audit_sheets(), ["Element", "Sheet Number", "Sheet Name"]
    )
    report("Levels", doc, audit_levels(), ["Element", "Level Name", ""])
    report(
        "Views & View Templates",
        doc,
        audit_views(),
        ["Element", "View Name", "View Type"],
    )
    report("Materials", doc, audit_materials(), ["Element", "Material Name", ""])

    output.print_md(
        "---\nConventions: `bim-standards/02-naming-sheets.md`, "
        "`03-naming-levels.md`, `06-naming-view-templates.md`, "
        "`04-naming-materials.md`."
    )


main()
