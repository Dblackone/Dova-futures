# -*- coding: utf-8 -*-
"""Stamp Project Information with a validated Dova Futures project code, name,
client, and address in one step — instead of retyping four fields by hand and
risking a code that doesn't match the register.

See bim-standards/01-naming-projects.md for the project code format.
"""
__title__ = "New Project\nSetup"
__author__ = "Dova Futures BIM"

import re

from pyrevit import revit, DB, forms, script

output = script.get_output()
doc = revit.doc

PROJECT_CODE_RE = re.compile(r"^DOVA-\d{2}-\d{3}-[A-Z0-9]+(-[A-Z0-9]+)*$")


def ask_project_code():
    while True:
        code = forms.ask_for_string(
            default="DOVA-26-001-PROJECT-NAME",
            prompt="Project code (DOVA-YY-SEQ-SHORT-NAME) — check "
            "bim-standards/registers/project-register.csv for the next "
            "free sequence before confirming.",
            title="New Project Setup",
        )
        if code is None:
            script.exit()
        code = code.strip().upper()
        if PROJECT_CODE_RE.match(code):
            return code
        forms.alert(
            "'{}' doesn't match DOVA-YY-SEQ-SHORT-NAME, e.g. "
            "DOVA-26-014-LEKKI-VILLA. Try again.".format(code)
        )


def main():
    project_code = ask_project_code()

    project_name = forms.ask_for_string(
        default="", prompt="Project name (short, human readable)", title="New Project Setup"
    )
    if project_name is None:
        script.exit()

    client_name = forms.ask_for_string(
        default="", prompt="Client name", title="New Project Setup"
    )
    if client_name is None:
        script.exit()

    project_address = forms.ask_for_string(
        default="", prompt="Project address", title="New Project Setup"
    )
    if project_address is None:
        script.exit()

    project_info = doc.ProjectInformation

    with revit.Transaction("Dova BIM - New Project Setup"):
        project_info.get_Parameter(DB.BuiltInParameter.PROJECT_NUMBER).Set(project_code)
        project_info.get_Parameter(DB.BuiltInParameter.PROJECT_NAME).Set(project_name)
        project_info.get_Parameter(DB.BuiltInParameter.CLIENT_NAME).Set(client_name)
        project_info.get_Parameter(DB.BuiltInParameter.PROJECT_ADDRESS).Set(
            project_address
        )

        df_code_param = project_info.LookupParameter("DF_ProjectCode")
        if df_code_param and not df_code_param.IsReadOnly:
            df_code_param.Set(project_code)

    output.print_md("## Project Information updated")
    output.print_md(
        "- **Project Number:** {}\n"
        "- **Project Name:** {}\n"
        "- **Client Name:** {}\n"
        "- **Project Address:** {}".format(
            project_code, project_name, client_name, project_address
        )
    )
    output.print_md(
        "\n**Reminder:** confirm this code is logged in "
        "`bim-standards/registers/project-register.csv` — this tool does not "
        "write to the register for you."
    )


main()
