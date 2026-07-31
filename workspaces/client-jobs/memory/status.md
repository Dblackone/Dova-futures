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
  to expose the structural ground slab (5,000 – 5,500 m²) + carting away.
  `RPT-2026-DEMO-001` combined Report & Quotation drafted in `drafts/`.
  **Repriced by the principal 2026-07-31** (BROLL-03, revised BROLL-04/08):
  Section A demolition is a **lump sum of ₦3,600,000** covering a floor area of
  **5,000 – 5,500 m²** (not remeasured within that range; area beyond 5,500 m²
  is a variation). Section B carting away **30 trips @ ₦100,000** = ₦3,000,000.
  Works ₦6,600,000 + **VAT at 5%** ₦330,000 = **Contract Sum ₦6,930,000** —
  down 59.7% from the original ₦17,200,000.
  Section B is a **remeasurable quantity**: priced on 30 trips and adjusted in
  **both directions** at ₦105,000/trip incl. VAT — refunded below 30, **charged
  above 30** (principal's correction, BROLL-08). Final account band
  **₦6,405,000–₦7,140,000** on 25–32 trips. Payment **60/30/10** (₦4,158,000 / ₦2,079,000 / ₦693,000),
  second milestone = completion of all tile demolition and scraping back to slab (Section A complete), independent of carting progress. **INV-2026-DEMO-001** drafted for the **full Contract Sum ₦6,930,000**, payable in the three stages. "Reviewed By" removed from the
  authorisation block — Prepared By + Client Acceptance only.
  Shortened (1.1, 6.0 and the trial-strip stage removed; sections renumbered)
  and body type raised to 12pt. 8-page A4 PDF re-rendered; header/footer + page
  numbering verified on pages 2–8, page 1 letterhead clean.
  **Draft only, not sent.** Job code opens on acceptance.

## Recently done (last 3)
- BROLL-04: Section A converted from a ₦750/m² rate to a **lump sum
  ₦3,600,000** over a **5,000 – 5,500 m²** area band (excess = variation);
  **VAT 7.5% → 5%**; "Reviewed By" removed from the authorisation block.
  Contract Sum ₦7,256,250 → **₦6,930,000**. PDF re-rendered.
- BROLL-03: `RPT-2026-DEMO-001` repriced and rebuilt on the principal's rates,
  converted from provisional-quantity to capped-ceiling-with-refund, payment
  terms changed to 60/30/10. `tools/render-pdf.js` gained a `CHROME_ARGS` env
  hook so it runs on Linux/root (needs `--no-sandbox`); default unchanged.
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
- BROLL: `RPT-2026-DEMO-001` repriced by the principal and rebuilt. Open points
  before it goes out:
  1. **VAT is stated at 5%, but Nigeria's standard rate has been 7.5% since
     the Finance Act 2019 (effective Feb 2020).** Raised with the principal
     2026-07-31 and built as instructed. If FIRS assesses at 7.5%, DOVA absorbs
     the ~₦165,000 difference, since the contract states 5% and the Client will
     have accepted at that rate. Needs the principal's confirmation (or a
     specific exemption/scheme) before this goes to the client.
  2. **Page count is now 8, not 7.** Body type went to 12pt on the principal's
     instruction, which outweighed the three section deletions. Dropping to
     11pt (14.5px) or cutting more content would bring it back to 7.
  3. **Whether ₦3,600,000 lump sum carries overheads and profit.** The old note
     claimed ₦1,800/m² was all-inclusive of O&P; that claim was dropped rather
     than carried forward unverified. No cost build-up exists in the repo.
  4. Client contact name/title still `[ ]`, and the Client Acceptance block is
     unfilled. ("Reviewed By" was removed on the principal's instruction.)

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
