# status.md — Current Snapshot (client-jobs)

**Last updated:** 2026-07-31 — Broll Properties (Ikeja City Mall) Report & Quotation repriced by the principal; rebuilt + re-rendered
**Health:** 🟢 on track

## Now
- **4 active jobs:**
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

## Pipeline (prospective — no job code issued yet)
- **Broll Properties — Ikeja City Mall, Alausa, Ikeja, Lagos.** Tile demolition
  to expose the structural ground slab (≈5,000 m²) + carting away.
  `RPT-2026-DEMO-001` combined Report & Quotation drafted in `drafts/`.
  **Repriced by the principal 2026-07-31** (BROLL-03): Section A demolition
  5,000 m² @ **₦750/m²** = ₦3,750,000 (firm) + Section B carting away
  **30 trips @ ₦100,000** = ₦3,000,000 = works ₦6,750,000 + 7.5% VAT =
  **Contract Sum ₦7,256,250** — down 57.8% from the original ₦17,200,000.
  Section B is now a **capped maximum, not a provisional sum**: the Contract Sum
  is a ceiling, every trip below 30 is refunded at ₦107,500 incl. VAT, and trips
  beyond 30 are to DOVA's account. Final account band **₦6,718,750–₦7,256,250**
  on 25–30 trips. Payment **60/30/10** (₦4,353,750 / ₦2,176,875 / ₦725,625),
  70% milestone defined as 3,500 m² stripped. 7-page A4 PDF re-rendered;
  header/footer + page numbering verified on pages 2–7, page 1 letterhead clean.
  **Draft only, not sent.** Job code opens on acceptance.

## Recently done (last 3)
- BROLL-03: `RPT-2026-DEMO-001` repriced and rebuilt on the principal's rates
  (₦750/m², ₦100,000/trip × 30), converted from provisional-quantity to
  capped-ceiling-with-refund, payment terms changed to 60/30/10. PDF
  re-rendered. `tools/render-pdf.js` gained a `CHROME_ARGS` env hook so it runs
  on Linux/root (needs `--no-sandbox`); default behaviour unchanged.
- BROLL-02: `RPT-2026-DEMO-001` PDF rendered + verified; render script promoted
  into the repo at `workspaces/client-jobs/tools/render-pdf.js`.
- BROLL-01: `RPT-2026-DEMO-001` Report & Quotation drafted (see Pipeline above).
- HW: job **DFL-2026-POOL-002** (Homework — Swimming Pool, 5.4×3.2m) opened and
  filed. Combined **Report & Quotation** `RPT-2026-POOL-002` (Contract Sum
  **₦7,567,893**, 7.5% VAT incl.; running header/footer + page numbers) now
  lives in `projects/DFL-2026-POOL-002_Homework_Swimming-Pool/01-Documents/`.
  Registered (Seq 002), added to PROJECT.md. Only client contact/address +
  Reviewed/Client-Acceptance signatures remain to complete before presentation.
- ROAD-10: principal approved final 3-page QTE-2026-001 PDF (2026-07-05).
- Osogbo job created with scope + estimate + report (PR #20, commit 06719e2).

## Open / blocked
- ROAD: blocked on client feedback — pavement alternate choice + quote
  acceptance; then draft INV-2026-ROAD-001 once the principal confirms the
  payment stage (do NOT invoice before acceptance).
- POOL: confirm payment status of INV-001..005 with principal.
- OSG: estimate/report await principal review before any client presentation.
- BROLL: `RPT-2026-DEMO-001` repriced by the principal and rebuilt. Two points
  still open before it goes out — (1) **whether ₦750/m² still carries overheads
  and profit.** The old note claimed ₦1,800/m² was all-inclusive of O&P; at
  ₦750 that claim was removed from the document rather than left unverified, so
  if ₦750 does carry O&P the wording at Section 3.0 should be put back. There is
  no cost build-up in the repo to check this against. (2) Client contact
  name/title still `[ ]`, and Reviewed / Client-Acceptance signature blocks
  unfilled. Also note the capped structure means trips beyond 30 are DOVA's
  cost — exposure is ₦537,500 if the bedding runs to 60 mm rather than the
  43–50 mm assumed.

## Notes for the next run
- Job docs start from `documents/templates/` per `company/document-policy.md`.
- QTE-2026-001 print/PDF layout uses the thead/tfoot spacer pattern
  (fixed header/footer + `.header-space`/`.footer-space` + `.avoid-break`) —
  see ROAD-05..09 in done-log before touching its pagination.
- Report PDFs (POOL-002, DEMO-001) instead use the render-pipeline treatment:
  `workspaces/client-jobs/tools/render-pdf.js`. Read its header comment before
  touching the header/footer templates — it records four Chrome traps that have
  each silently produced a header-less PDF. `gh` is not installed on this
  machine and the shell sandbox blocks Chrome (run the renderer unsandboxed).
- New job codes are appended to `bim-standards/registers/project-register.csv`.
