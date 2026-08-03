# Status

**Project:** DOVA Futures Intelligence  
**Status:** Active - orchestration foundation implemented; local approval resume is wired.  
**Last verified:** 2026-08-03

The provider-neutral core and headless gateway work independently of API credentials. The legacy desktop assistant remains operational as the compatibility path. The project now lives at `workspaces/dova-futures-intelligence/` in the hub.

**Verification:** `python -m unittest discover -s tests -v` - 20 tests passing. `python -m compileall -q core main.py ui.py` and `git diff --check` also pass.

**Handoff note:** Registry registration remains pending because `company/registry.md` is protected governance; a proposal is recorded in the shared report log.
