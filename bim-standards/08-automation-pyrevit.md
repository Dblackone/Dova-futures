# 08 — Automation (pyRevit)

The naming standard only holds if applying it isn't tedious. This is the
automation layer: a real pyRevit extension (`pyRevit-extension/`) with tools
that do the repetitive, error-prone parts of the standard so nobody has to
retype a sheet number 40 times or eyeball a naming convention by hand.

Full install instructions and tool list: `pyRevit-extension/README.md`.

## Why pyRevit

It's free, firm-wide, and every tool is a plain-text Python script — no
compiled add-in, no licence, no build pipeline. Anyone with edit access to
this repo can open a `script.py` and change it; reload in Revit and the
change is live. That matches the "no repeated task should require a human
the second time" goal directly: the fix goes in once, in one file, and every
machine pointed at this extension picks it up on next reload.

## What's automated today

- **Sheet numbering** (file 02) — `Sheet Renumberer`
- **Naming compliance across sheets/levels/views/materials** (files 02–04,
  06) — `Naming QA Audit`
- **Project setup** (file 01) — `New Project Setup`
- **Level creation** (file 03) — `Level Builder`
- **View template assignment** (file 06) — `Apply View Templates`

Family naming (file 05) is intentionally **not** automated yet — family
creation is a modeling task, not a batch operation, so the highest-value
automation there is the QA audit catching a bad family name once it's loaded
into a project, which the Naming QA Audit tool already does implicitly via
its material/parameter checks. If family-library-wide auditing becomes a
recurring need, add a `Family Audit` pushbutton under `Naming.panel/`
following the same pattern as the existing tools.

## Extending this system

1. Pick the repetitive task. If you've done it more than twice by hand,
   it belongs here.
2. Write it as a `script.py` under the right panel in
   `pyRevit-extension/DovaBIM.extension/`, following the existing tools'
   structure (`revit.Transaction`, `forms` for input, `script.get_output()`
   for reporting).
3. Reference the specific naming file (01–06) it enforces in the script's
   module docstring, the same way the existing tools do.
4. Reload pyRevit and test on a throwaway project before rolling out
   firm-wide.
5. Log the addition in `memory/done-log.md`.

## Non-pyRevit repetition worth eliminating next

Not everything repetitive lives inside Revit. Two candidates for the next
automation pass, once the pyRevit toolkit is in daily use:

- **Project register + folder scaffold** — a small script (can live outside
  Revit, e.g. run from a terminal) that reads the next free sequence from
  `registers/project-register.csv`, appends the new row, and creates the
  full folder tree from file 01 in one command, instead of doing both by
  hand.
- **Template drift check** — a scheduled comparison of the live `.rte` files
  against the file 07 manifest (view template names, loaded shared
  parameters, worksets) so template drift is caught automatically instead of
  discovered mid-project.

Neither exists yet — don't build them speculatively. Add them here (with
their own file and pushbutton, following this same pattern) when the pyRevit
tools above are actually in use and one of these becomes the next bottleneck.
