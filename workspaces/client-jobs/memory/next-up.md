# next-up.md — Prioritised Queue (client-jobs)

1. [ ] **ROAD: client decision on QTE-2026-001** — quote is approved by the
   principal and ready; once Mr. C. K. Musa picks a pavement alternate
   (A concrete ₦6,014,625 / B interlocking ₦5,369,625, recommended) and accepts:
   edit the file to remove the unselected alternate's row/totals, then draft
   `INV-2026-ROAD-001` for the agreed payment stage. _Do not invoice before
   acceptance; confirm the payment split (mobilisation/completion/full) with
   the principal first._
2. [ ] **POOL: confirm invoice status** — with principal: which of
   INV-2026-POOL-001..005 are delivered/paid? Log outcomes.
3. [ ] **OSG: principal review** — RPT-2026-OSG-001 + cost estimate need the
   principal's review/approval before anything is presented to the Grail
   Movement.
4. [ ] **Populate FHS Pool job folders** — remaining drawings and site photos
   into `02-Drawings/`, `04-Photos/`.

5. [ ] **HW: complete the client-specific fields before presentation** — job
   DFL-2026-POOL-002 is opened, filed (`01-Documents/`) and merged. Before it
   goes to the client, fill the "Prepared For" contact person/address and the
   Reviewed/Client-Acceptance signature blocks in `RPT-2026-POOL-002`. _Nothing
   sent to the client by an agent — presenting is the principal's action._

6. [ ] **BROLL: principal review of `RPT-2026-DEMO-001`** — the Ikeja City Mall
   tile-demolition Report & Quotation is drafted in `drafts/`, repriced
   2026-07-31 (Contract Sum **₦6,930,000** incl. VAT at 5% — Section A lump sum
   ₦3,600,000 over 5,000–5,500 m², plus 30 trips @ ₦100,000 capped).
   Before anything is presented to Broll Properties, the principal must confirm:
   (a) **VAT at 5%** — Nigeria's standard rate has been 7.5% since the Finance
   Act 2019; if FIRS assesses at 7.5% the ~₦165,000 difference falls to DOVA,
   because the Contract Sum is a ceiling and cannot be adjusted upward;
   (b) the **carting cap of 30 trips** against a derived range of 25–32 — at
   5,500 m² and 50 mm the requirement is ~32 trips, so up to ₦210,000 is to
   DOVA's account; raising the cap to 32 closes it for ₦200,000 + VAT;
   (c) whether the **₦3,600,000 lump sum carries overheads and profit** — the
   all-inclusive-of-O&P wording was dropped because no cost build-up exists in
   the repo to verify it; restore it at Section 3.0 if it holds;
   (d) the 60/30/10 payment split with the 70% milestone set at 70% of the
   measured area, and the 5–7 week programme, which assumes confirmed permitted
   working hours at the mall.
   Then fill the client contact name/title and the Client Acceptance block
   ("Reviewed By" was removed on the principal's instruction).
   _On acceptance:_ issue job code
   `DFL-2026-DEMO-001`, append Seq 003 to
   `bim-standards/registers/project-register.csv`, create
   `projects/DFL-2026-DEMO-001_Broll-Properties_Ikeja-City-Mall-Tile-Demolition/`
   with the six numbered subfolders, and move both the HTML and the rendered
   PDF from `drafts/` into its `01-Documents/`. The PDF is rendered and
   verified; re-render it with
   `workspaces/client-jobs/tools/render-pdf.js` after any content edit.
   _Nothing sent to the client by an agent — presenting is the principal's
   action._

## Someday / backlog
- Backfill older completed projects (see `assets/Project Pictures/`) as
  archived job folders if useful for records.
