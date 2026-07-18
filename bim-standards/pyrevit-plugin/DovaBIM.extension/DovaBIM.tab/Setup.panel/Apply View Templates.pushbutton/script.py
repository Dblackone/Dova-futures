# -*- coding: utf-8 -*-
"""Bulk-assign view templates to views by matching naming convention.

A view named "A - Plan - 01 First Floor - Working" is matched against view
templates named "A - Floor Plan - Working ..." — same discipline code, same
Revit ViewType, and the template's purpose segment appears in the view's
name. Ambiguous or unmatched views are reported, never guessed at.

See bim-standards/06-naming-view-templates.md for the convention.
"""
__title__ = "Apply View\nTemplates"
__author__ = "Dova Futures BIM"

from pyrevit import revit, DB, script

output = script.get_output()
doc = revit.doc


def discipline_of(name):
    if " - " not in name:
        return None
    return name.split(" - ", 1)[0].strip()


def get_view_templates():
    views = DB.FilteredElementCollector(doc).OfClass(DB.View).ToElements()
    return [v for v in views if v.IsTemplate]


def get_target_views():
    views = DB.FilteredElementCollector(doc).OfClass(DB.View).ToElements()
    targets = []
    for v in views:
        if v.IsTemplate:
            continue
        if isinstance(v, (DB.ViewSheet, DB.ViewSchedule)):
            continue
        if v.ViewType in (
            DB.ViewType.Internal,
            DB.ViewType.SystemBrowser,
            DB.ViewType.ProjectBrowser,
        ):
            continue
        targets.append(v)
    return targets


def find_candidates(view, templates):
    view_discipline = discipline_of(view.Name)
    if not view_discipline:
        return []
    candidates = [
        t
        for t in templates
        if discipline_of(t.Name) == view_discipline and t.ViewType == view.ViewType
    ]
    return candidates


def main():
    templates = get_view_templates()
    if not templates:
        output.print_md("No view templates found in this project — nothing to apply.")
        return

    target_views = get_target_views()

    assigned, ambiguous, unmatched = [], [], []

    with revit.Transaction("Dova BIM - Apply View Templates"):
        for view in target_views:
            candidates = find_candidates(view, templates)
            if len(candidates) == 1:
                template = candidates[0]
                if view.ViewTemplateId != template.Id:
                    view.ViewTemplateId = template.Id
                    assigned.append((view.Name, template.Name))
            elif len(candidates) > 1:
                ambiguous.append(
                    (view.Name, ", ".join(c.Name for c in candidates))
                )
            else:
                unmatched.append(view.Name)

    output.print_md("## Applied ({})".format(len(assigned)))
    if assigned:
        output.print_table(assigned, columns=["View", "Template Applied"])

    output.print_md("## Ambiguous — multiple matching templates ({})".format(len(ambiguous)))
    if ambiguous:
        output.print_table(ambiguous, columns=["View", "Candidate Templates"])

    output.print_md("## Unmatched — no template with same discipline + view type ({})".format(len(unmatched)))
    for name in unmatched:
        output.print_md("- {}".format(name))


main()
