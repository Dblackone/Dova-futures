# status.md — Current Snapshot (document-templates)

**Last updated:** 2026-07-09 — Session 5 (hub reorganization; workspace created)
**Health:** 🟢 on track

## Now
- **10** print-ready branded templates in `templates/` — the original 9 (Session
  3, 2026-06-22) plus `00-Letterhead` (html/pdf/docx, added 2026-07-10 via
  `scripts/gen-letterhead-docx.mjs`, which pulls `docx` + `sharp` from the root
  package.json) — plus a gallery index, `.docx` versions, and the Claude
  Design sources.
- Design system tokens in `templates/_ds/dova-futures-design-system-*/`.
- Company-wide usage rule is now `company/document-policy.md` (was
  `context/05-document-templates.md`).
- Templates are NOT yet reachable from the live site (no Express route / nav
  link decided).

## Recently done (last 3)
- Document template guidelines + /dova-doc chat skill added (commit 534ac6e).
- 9 templates + gallery index created from Claude Design export (Session 3).
- First real instance produced: Pool invoice INV-2026-POOL-001 (see client-jobs).

## Open / blocked
- Client decision needed: templates public, password-gated, or admin-linked
  (Options A/B/C in `memory/archive/session-handoff-2026-06.md` § Session 3).
- Full print-to-PDF workflow not yet verified in Safari.

## Notes for the next run
- Never edit letterhead/logo/colours in templates — fixed by `company/brand.md`.
- `.dc.html` files need the Claude Design runtime; production files are the
  plain `.html` ones.
