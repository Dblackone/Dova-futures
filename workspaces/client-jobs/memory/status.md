# status.md — Current Snapshot (client-jobs)

**Last updated:** 2026-07-15 — merge of main-side job work (2026-07-05→08) into the hub structure
**Health:** 🟢 on track

## Now
- **3 active jobs:**
  - **DFL-2026-POOL-001** (FHS Hotel Swimming Pool, Ibafo) — invoices
    INV-001..005 issued, VQ-2026-POOL-001 waterfall variation quoted,
    PROGRESS-REPORT-001 (June 2026) filed, HNM July correspondence on file.
  - **DFL-2026-ROAD-001** (C. K. Musa access road erosion repair, Afuze, Edo) —
    QTE-2026-001 complete and **approved in form by the principal** (ROAD-10).
    Items 1–4 firm, subtotal ₦2,295,000; pavement 200m² priced as alternates:
    A concrete ₦6,014,625 / B interlocking ₦5,369,625 (recommended). Nothing
    sent to the client by an agent — presenting is the principal's action.
  - **GM-2026-OSG-001** (Grail Movement Hall of Worship, Osogbo — altar +
    structure remodification) — scope of works, cost-estimate working notes,
    and RPT-2026-OSG-001 project report drafted.

## Recently done (last 3)
- HW: final client-ready combined **Report & Quotation** (`RPT-2026-POOL-002`)
  for new client **Homework** — 5.4×3.2m pool, Sections A–E BOQ. Principal
  signed off then issued corrections (now applied): all pricing-basis/FHS/
  comparison refs removed, client-supply + water/power-to-powerhouse callout
  added, figures revised, warranty 6mo, borderless. **Contract Sum ₦8,374,143**
  (supervision + 7.5% VAT incl.). PDF rendered + delivered. Draft in `drafts/`;
  ready to file into `projects/` on the principal's go-ahead.
- ROAD-10: principal approved final 3-page QTE-2026-001 PDF (2026-07-05).
- Osogbo job created with scope + estimate + report (PR #20, commit 06719e2).

## Open / blocked
- ROAD: blocked on client feedback — pavement alternate choice + quote
  acceptance; then draft INV-2026-ROAD-001 once the principal confirms the
  payment stage (do NOT invoice before acceptance).
- POOL: confirm payment status of INV-001..005 with principal.
- OSG: estimate/report await principal review before any client presentation.

## Notes for the next run
- Job docs start from `documents/templates/` per `company/document-policy.md`.
- QTE-2026-001 print/PDF layout uses the thead/tfoot spacer pattern
  (fixed header/footer + `.header-space`/`.footer-space` + `.avoid-break`) —
  see ROAD-05..09 in done-log before touching its pagination.
- New job codes are appended to `bim-standards/registers/project-register.csv`.
