# status.md — Current Snapshot (document-templates)

**Last updated:** 2026-07-31 — offline reference doc written (TEMPLATES-03)
**Health:** 🟢 on track

## Now
- **10** print-ready branded templates in `documents/` — the original 9 (Session
  3, 2026-06-22) plus `00-Letterhead` (html/pdf/docx, added 2026-07-10 via
  `scripts/gen-letterhead-docx.mjs`, which pulls `docx` + `sharp` from the root
  package.json) — plus a gallery index, `.docx` versions, and the Claude
  Design sources.
- Design system tokens in `documents/_ds/dova-futures-design-system-*/`.
- Company-wide usage rule is now `company/document-policy.md` (was
  `context/05-document-templates.md`).
- Templates are NOT yet reachable from the live site (no Express route / nav
  link decided).

## Recently done (last 3)
- `DOVA-Document-System.md` — portable offline reference for the whole template
  system (field inventories, numbering, workflow). Awaiting checker.
- Document template guidelines + /dova-doc chat skill added (commit 534ac6e).
- 9 templates + gallery index created from Claude Design export (Session 3).

## Open / blocked
- Client decision needed: templates public, password-gated, or admin-linked
  (Options A/B/C in `memory/archive/session-handoff-2026-06.md` § Session 3).
- Full print-to-PDF workflow not yet verified in Safari.
- **Reference-prefix drift** — `documents/README.md` contradicts the HTML on 4
  templates (02, 06, 07, 09); documented in `DOVA-Document-System.md` §3 and
  queued in `next-up.md` item 3. Needs a principal decision, not a guess.

## Notes for the next run
- Never edit letterhead/logo/colours in templates — fixed by `company/brand.md`.
- `.dc.html` files need the Claude Design runtime; production files are the
  plain `.html` ones.
