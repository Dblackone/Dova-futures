# Status

**Project:** DOVA Futures Intelligence  
**Status:** Active - read-only offline hub dashboard prototype implemented; website/store migration awaits destination repositories.
**Last verified:** 2026-08-19

The desktop shell presents DOVA Intelligence using DOVA Futures brand colours, manual controls, project-file context, activity visibility, approval handling, and a read-only project index sourced from the repository registry. The new dependency-free browser dashboard in `hub/` presents workspace status, code locations, next actions, and registry coverage from a refreshable local snapshot. The provider-neutral core remains independent of API credentials. A draft master brief now combines the older DOVA OS foundation/workflow specifications with the current Jarvis orchestration plan.

**Verification:** `python -B -m unittest discover -s tests -v` - 23 tests passing. The snapshot JavaScript validates in Node, the builder emits seven workspace records, and `git diff --check` passes for the new files.

**Handoff note:** Legacy MARK/JARVIS identifiers remain in compatibility/history code only; the visible UI, active prompt, and repository index use DOVA Intelligence naming. The brief is unapproved and must not be treated as implementation authority until the principal confirms the first workflow and provider/runtime choices.
