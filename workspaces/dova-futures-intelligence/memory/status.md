# Status

**Project:** DOVA Futures Intelligence  
**Status:** Active - DOVA Intelligence shell and read-only repository index implemented.
**Last verified:** 2026-08-03

The desktop shell presents DOVA Intelligence using DOVA Futures brand colours, manual controls, project-file context, activity visibility, approval handling, and a read-only project index sourced from the repository registry. The provider-neutral core remains independent of API credentials.

**Verification:** `python -B -m unittest discover -s tests -v` - 22 tests passing. AST parsing, off-screen `MainWindow` construction, and `git diff --check` pass.

**Handoff note:** Legacy MARK/JARVIS identifiers remain in compatibility/history code only; the visible UI, active prompt, and repository index use DOVA Intelligence naming.
