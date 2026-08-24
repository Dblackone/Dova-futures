# done-log.md — Completed Work (append-only, client-jobs)

> Format: date — what — outcome — verified by

- 2026-07-04 — `jobs/` folder + DFL-2026-POOL-001 FHS Hotel Swimming Pool structure created (commit f4274a0, PR #13) — six-folder job layout established — verified by review
- 2026-07-04 — INV-2026-POOL-001 generated from payment-invoice template; regenerated at 78% scale to fit one A4 page incl. RC No. 8219604 — PDF + HTML in job 01-Documents/ — verified by visual check
- 2026-07-05 — ROAD-01 — Drafted `QTE-2026-001` Project Quote for Mr. C. K. Musa's access road erosion repair (Afuze, Edo State), from `project/templates/02-Project-Quote.html`; filed under new job folder `jobs/DFL-2026-ROAD-001_C-K-Musa_Access-Road-Afuze/01-Documents/`; scope covers cut-to-fill balancing, imported filling sand, sandcrete blockwork erosion-control head structure, earth drain to the expressway drain, and concrete vs. interlocking paved surface (priced as alternates); quantities/rates left `[TBC]` pending site survey — draft only, not sent to client — verified by manual file review (maker run, no checker)
- 2026-07-05 — ROAD-02 — Priced Items 1–4 of `QTE-2026-001` with client-supplied rates: cutting & levelling ₦200,000 (LS); filling sand 3 trips @ ₦240,000; blockwork-lined drain 50m @ ₦25,000/m; earth drain 50m @ ₦2,500/m — subtotal ₦2,295,000, firm. Added confirmed per-m² rates for the pavement alternates (concrete ₦16,500/m², unreinforced — cracking/settlement risk noted; interlocking ₦13,500/m² — settlement-tolerant, easier maintenance, DOVA recommendation flagged) with area still `[TBC]` pending survey — draft only, not sent to client — verified by manual file review (maker run, no checker)
- 2026-07-05 — ROAD-03 — Client confirmed pavement area at 200m² (proposed). Completed pricing for both alternates in `QTE-2026-001`: Alternate A (concrete) Subtotal ₦5,595,000 / VAT ₦419,625 / Grand Total ₦6,014,625; Alternate B (interlocking, recommended) Subtotal ₦4,995,000 / VAT ₦374,625 / Grand Total ₦5,369,625. Totals box redesigned to show both scenarios side-by-side pending client's final alternate choice — draft only, not sent to client — verified by manual file review (maker run, no checker)
- 2026-07-05 — ROAD-04 — Added a client-facing "Why the Drainage System Is Needed" section to `QTE-2026-001`, explaining the two-stage design: a blockwork-lined cross-road channel with a perforated metal cover intercepting erosion at the head of the works, transitioning to an earth drain tying into the existing roadside drain toward the expressway. Updated Item 3/4 descriptions to match, and strengthened the Alternate B (interlocking) recommendation note with the cost, settlement-tolerance, and maintenance rationale — draft only, not sent to client — verified by manual file review (maker run, no checker)
- 2026-07-05 — ROAD-05 — Fixed print/PDF pagination on `QTE-2026-001` (now 3 pages after content additions): reserved top/bottom space on every printed page via `@page { margin: 108px 0 58px 0; }`, wrapped the DOVA header and RC-No./website/QTE-ref footer in `.doc-header`/`.doc-footer` with `position:fixed` (Chromium's standard repeating-header/footer technique, works for both the template's own `window.print()` button and automated PDF generation), and reset the `.page-shell`'s cream background/padding to white for print so it no longer bleeds through as a border on every page. Verified by rendering the file to PDF with Playwright + the environment's pre-installed Chromium and visually inspecting all 3 pages (no header/footer/content overlap, no border) — draft only, not sent to client — verified by manual render review (maker run, no checker)
- 2026-07-05 — ROAD-06 — User reported a leftover blank gap before the header on every page. Root-caused via isolated test files: the `@page` margin reservation from ROAD-05 anchors `position:fixed` content to the start of the content area (not the physical page edge), producing both the reported gap AND a hidden second bug — the fixed footer could paint over content whenever a table row split across a page break (confirmed: Item 2's Trip/₦240,000/₦720,000 values were invisible behind the footer in one render). Fixed by switching to `@page { margin: 0; }` with `.doc-header`/`.doc-footer` flush at `top:0`/`bottom:0` (verified gap-free via a minimal red/blue test harness), keeping a print-only `padding-top` on the title block so page 1's heading clears the header, and adding `break-inside: avoid` to `.scope-table` and its rows so the pricing table always moves whole to the next page instead of splitting mid-row. Verified by rendering to PDF and checking every page for gaps, overlap, and that all 6 scope-table rows' figures are fully visible — draft only, not sent to client — verified by manual render review (maker run, no checker)
- 2026-07-05 — ROAD-07 — User reported the ROAD-06 approach let the fixed header cover the top of the content on pages 2–3 (the print-only `padding-top` only protected page 1; continuation pages flowed from the physical page top, behind the header). Replaced the padding hack with the thead/tfoot spacer pattern: flowing content is wrapped in a `.layout-table` whose `thead` holds a print-only 152px `.header-space` div and `tfoot` a 66px `.footer-space` div — Chromium repeats thead/tfoot on every printed page, so every page's content starts below the fixed header and ends above the fixed footer with a small clearance margin, exactly as requested. Spacers are `display:none` on screen so the browser view is unchanged. Verified by rendering to PDF and checking all 3 pages: no text behind header or footer anywhere, clearance margins present, all pricing figures fully visible — draft only, not sent to client — verified by manual render review (maker run, no checker)
- 2026-07-05 — ROAD-08 — Increased body font sizes across `QTE-2026-001` for readability at the user's request: project description 13→14px, drainage rationale 12→13.5px, scope table 11.5→13px (column headers 9→10px), table note 10→11.5px, terms 11→12.5px, quotation-details/quoted-for blocks 12→13px, totals-box lines 11→12.5px, box labels 10→11px, Grand Total figures 17→18px, acceptance text and signature names bumped similarly. The larger text caused two new awkward page splits (drainage box orphaned its last line; the Alternate A totals box split its heading from its figures), so added a print-only `.avoid-break` class to the drainage rationale box, the scope section (heading+table+note), each totals box, and the acceptance block — every section now moves whole across page breaks. Document is now 4 pages: description / drainage rationale / pricing table / terms+totals+signatures. Verified by PDF render, all figures intact and nothing overlapped — draft only, not sent to client — verified by manual render review (maker run, no checker)
- 2026-07-05 — ROAD-09 — User asked for the "Why the Drainage System Is Needed" box to fit on page 1 (it was landing whole on page 2 after the ROAD-08 font bump). Recovered ~50px of vertical space without shrinking any fonts: print clearances trimmed (`.header-space` 152→140px, `.footer-space` 66→58px — header/footer still clear by >10px), title block padding 36/20→28/16px, info-grid margin 28→22px, description margin 24→18px, drainage box padding 16→14px and its line-height 1.7→1.6. Document back to 3 pages: page 1 description + full drainage rationale, page 2 scope heading + full pricing table + note + terms start, page 3 remaining terms + both totals boxes + acceptance. Verified by PDF render — box complete on page 1, nothing overlapped anywhere — draft only, not sent to client — verified by manual render review (maker run, no checker)
- 2026-07-05 — ROAD-10 — Principal reviewed the final 3-page rendered PDF of `QTE-2026-001` and confirmed "everything is okay" — the document's content and layout are approved in form. Presenting it to Mr. C. K. Musa is the principal's own action; nothing has been sent by an agent. Next agent action is blocked on client feedback: pavement alternate choice (A concrete ₦6,014,625 / B interlocking ₦5,369,625, recommended) and quote acceptance, after which the invoice (`INV-2026-ROAD-001`) becomes drafteable once the principal confirms the payment stage — approved by principal (chat confirmation)
- 2026-07-08 — OSG-01 — Created job GM-2026-OSG-001 Grail Movement Hall of Worship Osogbo (altar + structure remodification, commit 06719e2; estimate refined via PR #20): Scope-of-Works.md, Cost-Estimate-Working-Notes.md, and RPT-2026-OSG-001 Project Report (html/pdf/docx) in the job folder — verified by review (migrated note; work done pre-hub on main)
- 2026-07-08 — POOL-02 — FHS Pool job additions (commit f0a538f): invoices INV-2026-POOL-002..005, variation quote VQ-2026-POOL-001 (waterfall addition), PROGRESS-REPORT-001 June 2026, and HNM July 2026 correspondence filed in the job folders — verified by review (migrated note; work done pre-hub on main)
- 2026-07-20 — HW-01 — Drafted a construction Report (`RPT-2026-POOL-002`) and Project Quote (`QTE-2026-POOL-002`) for a new prospective client, **Homework**, for a 5.4m × 3.2m swimming pool (graduated depth 1.0–1.6m; ≈17.3m² surface, ≈22.5m³). Priced from the completed FHS Ibafo pool's proven rates (Civil 870k→990k, Mechanical 2.34m→2.67m, Electrical 1.125m→1.285m, Tiling 350k→400k) with a ≈14% location uplift; works subtotal ₦5,345,000, + 3% contingency + 10% OH&P + Site Supervision & PM ₦639,220 = ₦6,679,070 pre-VAT, + 7.5% VAT ₦500,930 = **Grand Total ₦7,180,000** (matches the principal's ₦7.18m target with supervision + tax included). Both files created from the canonical templates (`documents/templates/01-Report.html`, `02-Project-Quote.html`) and saved to `workspaces/client-jobs/drafts/` — **draft only, not filed into projects/ and not sent; pending principal approval**. Client contact/address fields left as `[ ]` placeholders. No new job code issued yet (job opens on acceptance) — verified by manual arithmetic check (maker run, no checker)
- 2026-07-20 — HW-02 — Principal supplied the FHS original "Swimming Pool Report & Quotation" PDF (8-page, DFL/QT/2026/POOL-001). Rebuilt `RPT-2026-POOL-002` to mirror its full structure/detail: Project Overview, Design Description, Key Dimensions, Scope, Section A civil materials (client-supply, quantities only), Section B civil labour itemised (Formwork 114k + Reinforcement 137k + Masonry LS 739k = 990k; optional wall felting 313k priced separately, excluded from sum), Section C mechanical (materials 2,214k + install 456k = 2,670k), Section D electrical (lights 400k + wiring 228k + panel 342k + install 315k = 1,285k), Section E tiling (area computation ≈66.6m² + labour LS 400k), Cost Summary → Works 5,345,000 + 3% cont + 10% OH&P + supervision 639,220 = 6,679,070, + 7.5% VAT = **Contract Sum ₦7,180,000**, Assumptions & Exclusions, Commercial Terms (60/30/10, 6–8wk, 30-day validity, 12-mo waterproofing warranty). All sub-line splits are FHS rates × ~1.14 (location) and reconcile to the section/works/grand totals unchanged from HW-01. Kept the canonical DOVA letterhead/branding (not the FHS PDF's old "Designing Futures…" tagline). Also added the client-supply-materials exclusion and the optional-felting note to `QTE-2026-POOL-002`. Rendered both to A4 PDF/PNG — report multi-page, quote one page, figures intact. **Still drafts in `drafts/`, not sent, pending principal approval.** — verified by manual arithmetic + render review (maker run, no checker)
- 2026-07-20 — HW-03 — Principal signed off, then issued corrections; produced the final client-ready `RPT-2026-POOL-002` (combined Report & Quotation) + rendered PDF. Removed every FHS/comparison/location-increment/basis-of-pricing reference and the optional wall-felting item; Project Overview now standalone. Added a prominent callout box: all civil-works & tiling materials Client-supplied; Client provides water supply and electrical power connection up to the powerhouse. Updated Section A schedule (Cement 100–150 bags, Marine Boards 25 sheets, 2×3 timber 100 pcs, Aquaseal 2 kegs, 12mm rebar ≈2 tons, +1 roll binding wire, 10mm removed). Revised figures: B Civil Labour 1,400,000 (Formwork 200k + Reinf 200k + Masonry&Excavation 1,000k); C Mechanical 2,850,000 (mat 2,300k + labour 550k); D Electrical 1,480,000 (lighting 400k + wiring/powerhouse 350k + control panel 350k + labour 380k); E Tiling labour 500,000. Works 6,230,000 + 3% cont 186,900 + 10% OH&P 623,000 + supervision 750,000 = 7,789,900 pre-VAT, + 7.5% VAT 584,243 = **Contract Sum ₦8,374,143** (amount-in-words updated). Warranty cut 12→6 months. Removed the document border (borderless white, no cream frame/shadow). Rendered 5-page A4 PDF and delivered to principal. Still a draft in `drafts/` pending the move-to-`projects/` filing on the principal's go-ahead — verified by grep (no FHS/14%/felting/10mm) + arithmetic + render review (maker run, no checker)
- 2026-07-20 — HW-04 — Two further principal corrections to `RPT-2026-POOL-002`: (1) added section "11.0 Note — Waterfall Provision" (no waterfall in this quote; waterfall piping can be provided during construction at the Client's discretion after prior discussion; supply/installation of the waterfall itself excluded, considered separately on request); (2) removed the Site Supervision & Project Management line (₦750,000). Recalculated: Works 6,230,000 + 3% cont 186,900 + 10% OH&P 623,000 = 7,039,900 pre-VAT, + 7.5% VAT 527,993 = **Contract Sum ₦7,567,893** (amount-in-words + acceptance clause updated; "inclusive of VAT at 7.5%", supervision wording dropped). Re-rendered 6-page PDF, delivered to principal. Draft in `drafts/`, pending move-to-`projects/` — verified by grep (no stale supervision/8,374,143 refs) + arithmetic + render review (maker run, no checker)
- 2026-07-20 — HW-05 — Added a running header & footer on every page of the `RPT-2026-POOL-002` PDF. Rendered via Chromium `displayHeaderFooter` with header (DOVA FUTURES LIMITED · Swimming Pool — Report & Quotation, orange rule) and footer (RC No. 8219604 · DOVAFUTURES.COM · RPT ref · Page X of Y), with 20mm/16mm top/bottom print margins to seat them. Marked the on-screen end footer `data-no-print` so screen keeps a preview footer while the PDF uses the repeating one. Verified header/footer/RC-no/page-number present on all 6 pages via per-page text extraction. Note: header/footer live in the render pipeline (they show in the delivered PDF and when Chromium generates the PDF), not as on-screen HTML. Draft in `drafts/`, pending move-to-`projects/` — verified by pdfminer per-page check + render (maker run, no checker)
- 2026-07-20 — HW-06 — Principal approved ("File and merge"). Opened job **DFL-2026-POOL-002** (Homework — Swimming Pool): appended it to `bim-standards/registers/project-register.csv` (Seq 002), created `projects/DFL-2026-POOL-002_Homework_Swimming-Pool/` with the six numbered subfolders (.gitkeep in empty ones), and moved the combined Report & Quotation (HTML + PDF, RPT-2026-POOL-002, Contract Sum ₦7,567,893) from `drafts/` into its `01-Documents/`. Fixed the screen-only "← All Templates" nav link to `../../../documents/index.html` (data-no-print, never in the client PDF). Added the job to the client-jobs PROJECT.md Active-jobs table. Drafts folder now back to just `.gitkeep`. Next: open PR and merge to default branch — verified by folder tree + register review (maker run; principal-approved for merge)
- 2026-07-18 — POOL-03 — Fixed a dead "← Back" nav link in PROGRESS-REPORT-001_June-2026.html (job DFL-2026-POOL-001): `../../../project/templates/index.html` (a path that never existed) → `../../../documents/index.html` (the template gallery). Link is inside a data-no-print block, so it never appeared in the printed/client-delivered PDF — cosmetic browser-view fix only. Flagged by @qa/vera during the reorg review — verified target exists; no other stale links remain in projects/*.html
- 2026-07-31 — BROLL-01 — Drafted a combined **Report & Quotation** (`RPT-2026-DEMO-001`, quotation ref `DFL/QT/2026/DEMO-001`) for a new prospective client, **Broll Properties**, covering demolition/removal of existing floor tiles to expose the structural ground slab over ≈5,000 m² at **Ikeja City Mall, Alausa, Ikeja, Lagos**, plus carting away of tiles and rubble. Built from `documents/templates/01-Report.html` and structured on the `RPT-2026-POOL-002` combined Report & Quotation precedent (same letterhead, meta grid, `.sec-h`/`.boq` styling, contract-sum box, signature block). Priced from the principal's supplied rates: Section A demolition 5,000 m² @ ₦1,800/m² = **₦9,000,000** (firm, remeasurable); Section B carting away in 20-ton tippers @ ₦280,000/trip carried as a **provisional 25 trips = ₦7,000,000**. Works subtotal ₦16,000,000 + 7.5% VAT ₦1,200,000 = **Contract Sum ₦17,200,000**. Justified the brief's 20–30 trip band with a debris-volume derivation (removal depth 40/45/50 mm → 200/225/250 m³ solid × 1.4 bulking ÷ ≈12 m³ per 20-ton tipper ≈ 23/26/29 trips) and added a cost-sensitivity table (20 trips ₦15,695,000 / 25 trips ₦17,200,000 / 30 trips ₦18,705,000 incl. VAT) plus a §9.0 provisional-quantities/remeasurement note tied to signed trip tickets. Added a 6-stage method statement (set-up & protection → trial strip → mechanical breaking → manual scraping to slab → loading & haulage → clean-down & inspection) and a §6.0 "Working in an Operating Mall" section (permitted working hours, dust/silica control, vibration to adjoining tenancies, buried services in screed, egress routes, safety). **No margin or contingency added on top** — the supplied rates are treated as all-inclusive selling rates (stated explicitly under Section A); only VAT is added, per the POOL-002 precedent. **No job code issued and nothing written to `projects/` or the project register — job opens on acceptance** (HW-01 precedent). File is `workspaces/client-jobs/drafts/RPT-2026-DEMO-001_Broll-Properties_Ikeja-City-Mall-Tile-Demolition.html` — **draft only, not sent**. Client contact name/title and the Reviewed/Client-Acceptance signature blocks left as `[ ]` placeholders — verified by scripted arithmetic re-computation (all 3 scenarios + trip derivation reconcile) and full rendered-text extraction in the browser pane (no stale figures, brand block intact) (maker run, no checker)
- 2026-07-31 — BROLL-02 — Rendered `RPT-2026-DEMO-001` to its delivered 7-page A4 PDF with the HW-05 running header/footer treatment, and **visually verified it** (the previous run produced the file but never confirmed it). Page 1 keeps the full green letterhead with no running header; pages 2–7 carry the slim header (DOVA FUTURES LIMITED + "Tile Demolition — Report & Quotation", orange rule) and the footer (RC No. 8219604 · DOVAFUTURES.COM · RPT-2026-DEMO-001 · Page X of Y). Promoted the throwaway render script into the repo as `workspaces/client-jobs/tools/render-pdf.js` (+ `package.json`, `README.md`) so no future session re-derives it — parameterised as `--title` / `--ref` / `--out`, and its header comment records the four traps that cost the previous session: Chrome collapses a header/footer template to zero height unless the ROOT element carries an explicit `font-size`; flexbox does not lay out in the margin box (use tables); webfonts do not load in the isolated header/footer context (those strips use Arial); and both PDF passes must share identical margins or the page-1 splice lands on the wrong content. Re-ran the committed tool end-to-end — it reproduces the identical 7-page result. Document content, pricing and `[ ]` placeholders unchanged; **still a draft, still not sent** — verified by rasterising pages 1/2/7 to PNG via `pdfjs-dist` + `@napi-rs/canvas` and inspecting them, plus margin-band text extraction confirming header text at y=801.4 and footer text at y=33.4 on pages 2–7 and neither band populated on page 1 (maker run, no checker)

## 2026-07-31 — BROLL-03: RPT-2026-DEMO-001 repriced and rebuilt

**Goal.** Reprice the Broll Properties (Ikeja City Mall) tile-demolition Report
& Quotation on the principal's revised rates and rebuild it as a single
document.

**Rates settled by the principal over the course of the review** — demolition
walked 1,800 → 950 → 900 → 850 → **750/m²**; carting 280,000 → 110,000 →
**100,000/trip**, quantity 25 → 35 → **30 trips**. A mid-review instruction to
split into two separate quotes (demolition / carting) was superseded by
"build a single quote", so the combined document was kept.

**Result.**
- Section A: 5,000 m² @ ₦750 = ₦3,750,000 (firm, remeasurable)
- Section B: 30 trips @ ₦100,000 = ₦3,000,000 (**capped maximum**)
- Works ₦6,750,000 + VAT 7.5% ₦506,250 = **Contract Sum ₦7,256,250**
- Down 57.8% from ₦17,200,000.

**Structural change — provisional → capped.** Section B was a provisional 25
trips remeasurable in both directions. It is now priced at the top of the
25–30 range so the Contract Sum is a ceiling: every trip not executed is
refunded at ₦107,500 incl. VAT, and trips beyond 30 are to DOVA's account.
Sections 4.1, 5.0, 8.0, 9.0, 2.1, 7.0 and the acceptance block were all rewritten
to match — "provisional/remeasure" language removed throughout.

**Trip-count derivation reconciled.** The principal confirmed a 20-ton tipper.
At ≈1.5 t/m³ loose rubble a 12 m³ body loads ≈18 t, so volume binds before
weight and the existing ≈12 m³/trip figure stands. The stated removal depth was
widened 40–50 mm → **43–50 mm**, which is what actually yields the 25–30 trip
range (43 mm → 25.1 trips; 50 mm → 29.2). The earlier 35-trip figure was
dropped with the rate change; it would have required a 60 mm depth.

**Payment terms** changed 50/40/10 → **60/30/10** (₦4,353,750 / ₦2,176,875 /
₦725,625). The "70% complete" trigger was given an objective test — 3,500 m² of
5,000 m² stripped to exposed slab, confirmed by joint site measurement — and a
refund set-off route against the final 10%.

**Rate note narrowed.** The old Section 3.0 note stated ₦1,800/m² was
all-inclusive of plant, labour, supervision *and the Contractor's overheads and
profit*. At ₦750 that O&P claim is unverified — there is no cost build-up in the
repo — so it was removed rather than carried forward as an unchecked assertion.
Flagged for the principal to restore if ₦750 does carry O&P.

**Verified.** Arithmetic recomputed independently in Node (contract sum, payment
split, refund ladder, depth→trip derivation) — all match the document. PDF
re-rendered at 7 pages; margin-band text extraction confirms running header and
`Page X of 7` footer on pages 2–7 with page 1 letterhead clean. Sections 4.0,
5.0 and 8.0 screenshotted and visually checked.

**Tooling.** `tools/render-pdf.js` hardcoded its Chrome launch args, and Chrome
refuses to run as root without `--no-sandbox`, so the renderer could not run in
this container. Added a `CHROME_ARGS` env hook that appends flags; default
behaviour is unchanged and `--no-sandbox` is not enabled by default.

**Not done.** Still a draft in `drafts/`, not sent, no job code issued. Client
contact and signature blocks remain placeholders.

## 2026-07-31 — BROLL-04: RPT-2026-DEMO-001 lump-sum conversion, VAT 5%, area band

Four changes instructed by the principal, applied to the draft in `drafts/`.

**1. Section A → lump sum ₦3,600,000.** Was 5,000 m² @ ₦750/m² = ₦3,750,000.
Now a single lump-sum item (Qty 1 / Unit "Lump Sum") that is **not remeasured**
within the area band — it does not reduce if the floor measures at the low end.
Effective rate ₦720/m² at 5,000 m², ₦654.55/m² at 5,500 m².

**2. VAT 7.5% → 5%.** Applied throughout: cost summary, refund ladder,
per-trip refund (₦107,500 → ₦105,000), payment schedule, Sections 5.0/9.0 and
the acceptance block. **Flagged to the principal:** Nigeria's standard VAT rate
has been 7.5% since the Finance Act 2019 (effective Feb 2020). Built at 5% as
instructed; the exposure is recorded in status.md under Open/blocked.

**3. Area assumption 5,000 m² → 5,000 – 5,500 m²**, with excess over 5,500 m²
treated as a **variation** priced and agreed in writing before that work
proceeds. Propagated to Sections 1.0, 1.1, 1.2, 2.0, 3.0, 4.0, 5.0, 7.0, 8.0
and 9.0.

Consequence for carting, flagged: the trip derivation is area-dependent, so the
Section 4.0 table was rebuilt as trips-by-depth **at both 5,000 and 5,500 m²**.
The honest range is now **25 – 32 trips** (5,500 m² @ 50 mm → 32.1), against a
cap still set at 30. Up to 2 trips (₦210,000) therefore fall to DOVA at the top
of both bands. Section 9.0 states this explicitly rather than hiding it.

**4. "Reviewed By" removed** from the authorisation block; signature grid
rebalanced 3 columns → 2 (Prepared By, Client Acceptance) with wider gap.

**Result.** Section A ₦3,600,000 (LS) + Section B ₦3,000,000 (30 trips capped)
= works ₦6,600,000 + VAT 5% ₦330,000 = **Contract Sum ₦6,930,000**. Payment
60/30/10 = ₦4,158,000 / ₦2,079,000 / ₦693,000. Refund ladder ₦6,405,000 –
₦6,930,000 on 25–30 trips. 70% milestone restated as 70% of the *measured*
area (3,500 m² at 5,000 m²; 3,850 m² at 5,500 m²) since the area is now a band.

**Verified.** Arithmetic recomputed independently in Node — contract sum,
payment split, refund ladder, trips across both area bounds and the effective
lump-sum rate all match the document. Grep confirms no stale figures, no 7.5%
reference and no "Reviewed By" remain. PDF re-rendered at 7 pages; margin-band
extraction confirms running header and `Page X of 7` footer on pages 2–7 with
page 1 letterhead clean. Sections 3.0, 4.0, 5.0 and the signature block
screenshotted and visually checked.

**Not done.** Still a draft: not sent, no job code, client contact and
acceptance block remain placeholders.

## 2026-07-31 — BROLL-05: payment milestone redefined

The principal redefined the second payment stage. Percentages and amounts are
unchanged (60/30/10 = ₦4,158,000 / ₦2,079,000 / ₦693,000); only the trigger
moved.

- **Was:** 30% when 70% of the measured floor area had been stripped —
  3,500 m² at 5,000 m², 3,850 m² at 5,500 m², by joint site measurement.
- **Now:** 30% on completion of **all tile demolition and scraping back to
  slab** — i.e. the whole of Section A — expressly **independent of whether
  carting away under Section B has finished**. 10% on completion of the whole
  of the works, clean-down and joint sign-off.

Better trigger: it is a binary state jointly inspected rather than a
part-measurement of area, so it cannot be argued over on site, and it no longer
has to be restated for each end of the 5,000 – 5,500 m² band.

Cash position at the milestone: 90% received (₦6,237,000) against Section A
complete and carting partly done. The refund set-off still fits — maximum
refund at 25 trips is ₦525,000 against a final payment of ₦693,000.

Section 8.0 only. PDF re-rendered at 7 pages and the section visually checked;
no other figure in the document changes.

## 2026-07-31 — BROLL-06: 30% milestone wording sharpened

The principal restated the second payment stage, emphasising that the arisings
are **not carted off** at that point — the tiles are broken out and scraped off
the ground, but the debris is still on site. BROLL-05 already carried that
meaning ("whether or not carting away under Section B has finished"), but the
point was stated twice, so the wording was tightened so it cannot be read the
other way:

- Schedule line now reads "30% on completion of the demolition — all tile and
  bedding broken out and **scraped off the ground**".
- Definition now states explicitly: "**Carting away is expressly not a condition
  of this payment** — the arisings may still be stockpiled on site awaiting
  removal under Section B, and the 30% falls due regardless. Removal of the
  arisings and final clean-down are picked up by the closing 10%."

No figures change. Section 8.0 only; PDF re-rendered at 7 pages and checked.

## 2026-07-31 — BROLL-07: drop the 30% milestone note from Commercial Terms

On the principal's instruction, the second bullet in Section 8.0 — the
explanatory note defining the 30% milestone and stating that carting away is
not a condition of that payment — was removed. Section 8.0 now runs: payment
schedule, refunds, programme, validity, measurement, insurance.

The schedule line itself still carries the trigger ("30% on completion of the
demolition — all tile and bedding broken out and scraped off the ground"), so
the milestone remains defined; what is gone is the explicit statement that the
arisings may still be stockpiled on site when the 30% falls due. Flagged to the
principal.

No figures change. PDF re-rendered at 7 pages and checked.

## 2026-07-31 — BROLL-08: shorten, resize, and correct the carting remeasurement

### Commercial correction (the important one)
The principal corrected two statements as **wrong**: trips above 30 were said to
be to the Contractor's account and not chargeable. **The Client is billed for
any trip outside the 30 quoted.** Section B is therefore no longer a capped
ceiling — it is a **remeasurable quantity adjusted in both directions** at
₦105,000 per trip incl. VAT.

Every place the ceiling structure had been written in was reversed:
- 4.0 note, 4.1 (retitled *Refund Schedule* → **Adjustment Schedule**, with
  rows for 31 and 32 trips and a signed Adjustment column), Section B BOQ
  description and subtotal label, 5.0 cost summary + amount-in-words note,
  6.0 assumptions, 7.0 measurement + adjustments bullets, 8.0 note (retitled
  *Capped Carting Quantity & Refund* → **Carting Quantity & Remeasurement**),
  and the acceptance block.
- Final-account range is now **₦6,405,000 – ₦7,140,000** on 25–32 trips
  (was "cannot exceed ₦6,930,000").
- The ₦210,000 exposure previously flagged as DOVA's is now the Client's.

### Removals (shorten)
- Section **1.1 Existing Condition & Extent** deleted.
- Section **6.0 Working in an Operating Mall** deleted.
- **2.1 method table row 2 (Trial strip)** deleted; rows renumbered 1–5.
- **All trial-strip references removed**, including the 8.0 bullet about the
  confirmed trip forecast.
- The 8.0 ceiling sentence deleted as instructed.

Sections renumbered to stay contiguous — 1.2→1.1, 7.0→6.0, 8.0→7.0, 9.0→8.0 —
and every cross-reference retargeted. The 1.0 overview sentence that pointed at
the deleted Section 6.0 was rewritten to carry the operating-mall point inline.

### Font
Body `.p` 12.5px → **16px (12pt)**; all other sizes in the CSS block and the
document body scaled by the same 1.28 factor (headings 15→19, tables 12→15.5,
table headers 9→11.5, notes 10.5→13.5). The letterhead block was left untouched
so page 1 branding does not shift.

**Page count 7 → 8.** The +28% type outweighs the three deletions. Flagged to
the principal: dropping the body to 11pt (14.5px), or cutting further content,
would bring it back to 7.

### Scope note
The principal asked for the font change "across template". `documents/templates/`
belongs to the **document-templates** workspace and is read-only from here
(CLAUDE.md write-scope), so only this document was changed. The template-library
change needs its own run in that workspace — logged to `memory/board.md`.

**Verified.** Adjustment ladder recomputed in Node for 25/26/28/30/31/32 —
matches the table including the two new upward rows. Section headings audited:
1.0, 1.1, 2.0, 2.1, 3.0, 4.0, 4.1, 5.0, 6.0, 7.0, 8.0 — contiguous, no gaps.
No "ceiling", "capped", "Contractor's account" or trial-strip text remains.
PDF re-rendered at 8 pages; footer page numbering confirmed `Page X of 8` on
pages 2–8, page 1 letterhead clean. Sections 1.1, 4.1 and 8.0 screenshotted.

## 2026-07-31 — BROLL-09: further trims to RPT-2026-DEMO-001, plus INV-2026-DEMO-001

### Report edits
- Section A BOQ description simplified; the Section A note cut from four
  sentences to two.
- **"Jack hammer" replaced with "heavy duty floor scraper" throughout** (3
  occurrences: 1.0 overview, 2.0 scope, 2.1 method row). No "jack" text remains.
- **Sections 6.0 (Assumptions & Exclusions) and 7.0 (Commercial Terms) merged**
  into a single **6.0 Commercial Terms & Exclusions**; the note becomes 7.0.
- Bullets removed as instructed: hazardous materials, statutory permits,
  disposal/tipping levies, the floor-area assumption, the tile-thickness
  assumption, the working-hours assumption, the "trip count cannot be fixed"
  bullet and the final-account-range bullet.
- The three surviving exclusions were relabelled (buried services / making good
  / structural & fit-out elements) so they read as exclusions inside the merged
  commercial section rather than as orphaned assumptions.
- All 8.0 cross-references retargeted to 7.0. Headings audited: 1.0, 1.1, 2.0,
  2.1, 3.0, 4.0, 4.1, 5.0, 6.0, 7.0 — contiguous.
- **Back to 7 pages** from 8.

### INV-2026-DEMO-001 (new)
First of the three payments — **60% mobilisation**, drafted in `drafts/`:

| | ₦ |
|---|---|
| Section A (lump sum ₦3,600,000) @ 60% | 2,160,000 |
| Section B (30 trips, ₦3,000,000) @ 60% | 1,800,000 |
| Subtotal | 3,960,000 |
| VAT 5% | 198,000 |
| **Total due** | **4,158,000** |

Carries a Contract Position panel (Contract Sum ₦6,930,000 · this invoice
₦4,158,000 · to follow ₦2,079,000 + ₦693,000) and the Section B remeasurement
caveat. Built in the house invoice style (matches INV-2026-POOL-005) at the new
12pt-body scale.

**Fitting it to one page took work** — at the larger type the content ran 481px
past A4. Resolved by removing the standalone note block (its content duplicated
the Contract Position panel), moving Contract Position into the dead space under
Payment Details in the left column, tightening paddings, and stepping the
metadata label/value rows down to 14px while keeping line items and totals at
full size. Final trap: `@media print` zeroed body *padding* but not *margin*,
and the default 8px body margin alone spilled a second page — now `margin: 0`.

**Verified.** Invoice arithmetic recomputed in Node; all seven key figures
confirmed present in the rendered PDF text; renders at exactly 1 page. Report
re-rendered at 7 pages.

**Not done / flagged.** No job code exists and the quote is not accepted, so
this invoice must not be issued yet — `governance/guardrails.md` and the
workspace rule against invoicing before acceptance both apply. It is a draft.

## 2026-07-31 — BROLL-10: invoice rewritten to the full contract sum

The principal directed that the invoice cover the whole contract cost rather
than the 60% mobilisation stage. `INV-2026-DEMO-001` now bills the **full
Contract Sum ₦6,930,000** (works ₦6,600,000 + VAT 5% ₦330,000).

- Line items carry full Section A (₦3,600,000) and Section B (₦3,000,000)
  values; the two-column Contract/This-Claim layout collapses to a single
  Amount column.
- Header changed *Mobilisation Payment — 60%* → **Contract Invoice**, chip
  *Stage 1 of 3* → **Payable in 3 stages**, Amount Due → ₦6,930,000.
- The Contract Position panel is replaced by a **Payment Schedule** panel
  (60% ₦4,158,000 · 30% ₦2,079,000 · 10% ₦693,000 · Contract Sum ₦6,930,000),
  so the staged terms at Section 6.0 of RPT-2026-DEMO-001 still govern *when*
  each tranche falls due. Invoicing the full sum does not override them.
- Files renamed `..._Mobilisation.*` → `..._Contract-Sum.*` via `git mv`.

**Verified.** Renders at exactly 1 page (39px of headroom). All eight current
figures confirmed present in the extracted PDF text, and the four superseded
figures (₦4,158,000.00 as a total, ₦198,000.00 VAT, ₦2,160,000.00, ₦1,800,000.00)
confirmed absent. Page visually checked.

**Flagged.** A single full-sum invoice is not the same as demanding the whole
amount on presentation — the payment schedule panel is what keeps it consistent
with the quote. If the intent is payment in full up front, Section 6.0 of
RPT-2026-DEMO-001 has to change too, and both documents reissued.

## 2026-07-31 — BROLL-11: bank details changed; contact placeholder removed

- **Remittance account updated** on `INV-2026-DEMO-001`:
  Globus Bank 1000489264 → **Providus Bank 1306839309**, account name
  Dova Futures Limited (unchanged).
- **`[Contact Name & Title]` placeholder removed** from both documents — the
  "Bill To" block on the invoice and the "Prepared For" cell on
  `RPT-2026-DEMO-001`. Both now show "Broll Properties" alone. This clears one
  of the outstanding pre-issue items; only the Client Acceptance signature
  block remains unfilled.

**Not changed — flagged.** The five issued FHS Pool invoices
(`INV-2026-POOL-001..005` in `projects/`) still carry the old Globus account.
They are issued historical records and were deliberately left alone; if the
Globus account is closed rather than merely superseded, any of those still
awaiting payment need reissuing with the new account. That is a POOL question,
not a BROLL one — raised for the principal.

**Verified.** Report re-renders at 7 pages with header/footer intact; invoice
re-renders at 1 page with 59px headroom. Grep confirms no "Contact Name"
placeholder in either document and no Globus/1000489264 reference in the
invoice. Payment panel visually checked.

## 2026-07-31 — BROLL-12: page 1 letterhead now sits flush, like the invoice

**Symptom.** Page 1 of `RPT-2026-DEMO-001` had a white band above the green
letterhead — 33.3 mm from the paper edge to the first letterhead text, against
8.7 mm on the invoice.

**Cause, two parts.**
1. `render-pdf.js` applies `MARGIN.top = 20mm` to *every* page, page 1 included,
   because both render passes must use identical margins or pagination drifts
   and the splice breaks (existing trap #4). So the letterhead was pushed 20 mm
   down the paper.
2. The document's print block zeroed `body { padding }` but not `margin`, so the
   browser's default 8 px body margin added ~2 mm more.

**Fix — in the document, not the renderer.**
- `@page :first { margin-top: 0; }` — seen identically by both passes, so
  pagination and the splice stay valid. Pages 2..N keep the 20 mm band the
  running header lives in.
- `html, body { margin: 0 !important }` added to the print block.

Top gap **33.3 mm → 11.1 mm**. The invoice measures 8.7 mm; the remaining
2.4 mm is the report letterhead's deeper internal padding (28 px vs 20 px), a
design difference, not page margin. The green band itself is flush on both.

Both traps are now recorded in the `render-pdf.js` header comment, next to the
four that were already there — this is the fifth and sixth.

**Verified.** Still 7 pages, so `@page :first` did not repaginate. Margin-band
extraction confirms page 1 carries the letterhead and no running header/footer,
and pages 2–7 each carry the branded header and `Page X of 7`. Pass counts
matched, so the splice guard did not trip.

## 2026-07-31 — BROLL-13: covering email drafted

Composed the covering email for presenting `RPT-2026-DEMO-001` and
`INV-2026-DEMO-001` to Broll Properties. Saved to
`drafts/EMAIL-2026-DEMO-001_Broll-Properties_Covering-Note.md`.

**Draft only — not sent, and not placed in any mail client.** Per
`governance/guardrails.md` and CLAUDE.md §4, no external message goes out
without the principal's explicit approval; presenting is the principal's action.

Written to `company/voice-and-tone.md`: restrained, no exclamation marks,
British spellings, ₦ with separators, formal sign-off. Summarises the lump sum,
the remeasurable carting section, the ₦6,930,000 Contract Sum, the 5–7 week
programme and the 60/30/10 schedule; restates what the Client must provide;
closes on the signed acceptance page as the next step.

**Four notes appended for the principal, one of which is a genuine objection:**

1. **The invoice precedes acceptance.** It is attached as instructed, but the
   quotation is not accepted, no job code exists, and the workspace rule (also
   recorded against ROAD) is not to invoice before acceptance. Sending a
   ₦6,930,000 invoice with the quotation asks the client to pay against an
   unsigned contract. The draft includes the exact edit to make if the principal
   prefers the conventional quotation → acceptance → invoice sequence.
2. **No recipient on file** — no contact name, title or email address for Broll
   anywhere in the repo, hence "Dear Sir/Madam" and an empty To: line.
3. VAT at 5% still unconfirmed, and it now appears in both attachments.
4. The on-acceptance checklist (job code, register Seq 003, job folder, move
   both documents out of `drafts/`).

## 2026-08-11 — ROOF-01: roof repairs working brief extracted

Extracted the latest corrected brief from the referenced **Roof Repairs Brief**
conversation and saved the internal Markdown handoff at
`drafts/ROOF-REPAIRS-BRIEF_Ikeja.md`.

The brief records Measure 1 at **₦1,396,000**, Measure 2 at **₦2,849,200**,
and the combined direct working total at **₦4,245,200**. It carries two drums
of aluminium protective coating and one drum of primer in Measure 1, and removes
aluminium coating from Measure 2. It is draft-only, has no job code, and is not
an approved client quotation.

**Verified by @lead/vector [codex]:** arithmetic recomputed from the line items
(M1 = ₦1,396,000; M2 = ₦2,849,200; combined = ₦4,245,200); file exists in
the client-jobs `drafts/` folder. Independent checker review remains required
before any formal quotation is issued.

**Independent checker result (qa-vera): APPROVE.** The checker recomputed both
measure totals and the combined total, confirmed the latest aluminium-coating
correction, and found the draft-only safeguards and unresolved confirmations
clear. Unrelated pre-existing working-tree edits remain outside this task and
must be isolated before staging.

## 2026-08-11 — ROOF-02: inspection notice clause added

Added an inspection notice to `drafts/ROOF-REPAIRS-BRIEF_Ikeja.md` stating that
the two measures are based only on visible inspection; Measure 1 is the leading
remedial lead, Measure 2 is precautionary, the defective-wall image will be
attached, and the exact leakage cause/path may only be confirmed once opening-up
and investigation begin. The possible deflection-related cracking is described
as an unconfirmed interpretation, not a diagnosis.

**Verified by @lead/vector [codex]:** read the edited brief and checked that the
new clause preserves the draft-only status and does not alter any quantities or
working totals.

**Independent checker result (qa-vera): APPROVE.** The amended notice covers all
requested points, the possible deflection movement is not presented as a
diagnosis, and the three working totals remain unchanged.

## 2026-08-11 — ROOF-03: damage-wall image attached

Copied the principal-supplied `Damage Wall .jpeg` into the draft folder as
`drafts/ROOF-REPAIRS-DAMAGE-WALL.jpeg` and embedded it in the roof-repairs
brief with a figure caption. The caption limits the image to visible-condition
evidence and does not present a definitive leakage or structural diagnosis.

**Verified by @lead/vector [codex]:** source image opened for visual inspection;
copied file exists at 76,365 bytes; Markdown reference uses the workspace-local
filename; cost quantities and totals were not changed.

**Independent checker result (qa-vera): APPROVE.** The JPEG resolves from the
relative Markdown path, the caption is evidence-only, and the notice language
and working totals remain correct.

## 2026-08-11 — ROOF-04: report, quotation and draft invoice prepared

Prepared a three-document draft family from the canonical templates in
`documents/templates/`:

- `RPT-2026-ROOF-001_Ikeja_Roof-Leakage-Remedial-Works.html` and `.pdf`
- `QTE-2026-ROOF-001_Ikeja_Roof-Leakage-Remedial-Works.html` and `.pdf`
- `INV-2026-ROOF-001_Ikeja_Roof-Leakage-Remedial-Works.html` and `.pdf`

The report includes the supplied damage-wall image. The quotation and invoice
reconcile to the direct working subtotal **₦4,245,200**, provisional VAT at
7.5% **₦318,390**, and inclusive total **₦4,563,590**. Payment stages remain
to be confirmed by the principal. The invoice is explicitly
marked draft-only and not payable before quotation acceptance and principal
approval. Client identity, site address, VAT treatment, overhead/profit and
final payment terms remain open.

**Verified by @lead/vector [codex]:** each HTML starts from its canonical
template; filled placeholders were removed; PDFs rendered successfully through
`render-pdf.js` (report 3 pages, quotation 2 pages, invoice 2 pages); arithmetic
recomputed independently. These are drafts only and remain in `drafts/`.

## 2026-08-11 — ROOF-05: pagination footer correction

The first render exposed a template pagination defect: the flowing `Page 1 of
1` footer moved to page 2 on the longer report and quotation. The report and
quotation drafts were corrected with an absolute first-page footer and the
flowing duplicate removed, then all three PDFs were re-rendered. Final output
is **2 pages each**, with exactly one `Page 1 of 2` and one `Page 2 of 2` marker
per PDF.

**Independent checker result (qa-vera): APPROVE.** PyMuPDF coordinate checks
confirmed the first-page footer is physically on page 1 and no duplicate marker
appears on page 2. Canonical lineage, image reference, arithmetic and draft-only
invoice safeguards also passed.
## 2026-08-11 — ROOF-06: Broll client update and detailed quotation breakdown

Updated the roof-repairs report, quotation and invoice for **Broll Properties,
Ikeja City Mall** (Obafemi Awolowo Way, Alausa, Ikeja, Lagos). The quotation
now itemises every material and labour line for Measure 1 and Measure 2,
including the explicit zero-cost aluminium-coating exclusion in Measure 2.
The direct subtotal remains **₦4,245,200**; VAT is shown at **7.5%
provisional (₦318,390)** and the inclusive total is **₦4,563,590**.

**Verified by @qa/quartz [codex]:** all three PDFs re-rendered successfully
at two pages each with one page marker per page; the report image is embedded;
arithmetic, line-item coverage and invoice draft/not-payable safeguards pass.
Client contact details, final site measurements, VAT confirmation, commercial
terms and principal approval remain open. Files remain drafts in `drafts/`.
## 2026-08-11 — ROOF-07: client-facing report wording and PDF layout correction

Reworked `RPT-2026-ROOF-001` for client use: replaced the internal classification,
rewrote the executive summary for clarity, converted recommendations to a
numbered list, and clarified the conclusion that visible findings may not reveal
concealed or secondary water-entry routes. The report now asks that any newly
identified route be recorded, reported to Broll Properties and agreed before the
repair sequence or scope changes. Removed the internal Reviewed By field; the
authorisation block now shows Prepared By and Approved By — Broll Properties,
with a Name / Date line.

Corrected print layout across the family by removing the outer cream canvas from
PDFs, reserving clear running-header/footer bands, separating the quotation into
two pricing tables with a Measure 2 explanation, and re-rendering all PDFs.

**Verified by @qa/quartz [codex]:** report/quotation PDFs are three pages and the
invoice is two pages; page markers occur once on their physical pages, body text
clears headers and footers, corners are white, the report image embeds, arithmetic
and VAT remain correct, and invoice draft/not-payable safeguards pass.
## 2026-08-11 — ROOF-08: unified footers and compact final pagination

Rebuilt the roof-repairs document family after visual inspection of every PDF
page. Removed the separate HTML first-page footers and changed the PDF renderer
so page 1 and all continuation pages use the exact same margin-box footer.
There is now no secondary border or wrapper margin below the first-page footer.

The invoice was compacted without removing content and now fits on one A4 page.
The quotation now fits on two pages, with Measure 1 on page 1 and the Measure 2
explanation/table plus commercial terms and acceptance on page 2. The report
was rebalanced to two pages with the site image, recommendations, conclusion and
authorisation together on page 2.

**Independent checker result (@qa/quartz [codex]): APPROVE.** Footer geometry
is identical on every page; no body/header/footer overlap or outer cream border
remains. Final page counts are invoice 1, quotation 2 and report 2. Arithmetic,
VAT, image embedding and draft/not-payable safeguards remain correct.
- 2026-08-13 — AFUZE-DOCS-01 — Independent QA of `QTE-2026-002` and `INV-2026-ROAD-001` (HTML/PDF): arithmetic, Sections A/B/C, approximately seven-trip allowance note, no Section D, client-facing non-build-up wording, invoice-only A/B/C lines and draft safeguards checked; **REJECTED** because the quotation PDF has a broken three-page layout (A7/footer overlap on page 1, running-header/Section A subtotal overlap and acceptance/footer collision on page 2, orphaned signatures on a mostly blank page 3) and the quotation project-description body is 13px rather than the required 12px. Independent `render-pdf.js` rerender reproduced quote 3 pages and invoice 1 page; no source drafts edited — verified by @qa/vera [claude-code]
- 2026-08-13 — AFUZE-DOCS-02 — Rechecked the revised `QTE-2026-002` and `INV-2026-ROAD-001` HTML/PDF drafts: arithmetic reconciles to ₦5,699,925; visible body blocks are 12px in source and rendered PDF text operators include 12pt body text; quote renders cleanly to 2 pages without overlaps/orphan pages; invoice renders cleanly to 1 page; A/B/C-only invoice and no Section D; approximately seven-trip note and draft/not-payable safeguards pass — verified by @qa/vera [claude-code]. **APPROVE**.
- 2026-08-13 — AFUZE-DOCS-02 — Created draft `QTE-2026-002` and companion draft `INV-2026-ROAD-001` from the canonical document templates for Mr. C. K. Musa's Afuze residence renovation works. Applied a common reduction factor to the original works pricing, rounded line items to the nearest ₦500: Sections A/B/C subtotal ₦4,851,000; VAT at 7.5% ₦363,825; professional fee at 10% ₦485,100; inclusive total ₦5,699,925. Corrected all general body text to 12px/pt, re-rendered the quotation to two pages and invoice to one page, and preserved draft-only/not-payable safeguards. Pending principal review; nothing issued.
- 2026-08-13 — AFUZE-DOCS-03 — Renamed the Afuze residence invoice from `INV-2026-ROAD-001` to `INV-2026-AFUZE-001` at the principal's instruction. Updated the invoice title, filename, PDF reference and project-reference field to remove the road designation; regenerated the one-page PDF. Draft remains pending principal review and is not payable.
- 2026-08-13 — AFUZE-DOCS-04 — Added Section A item A8, “Proposed New Gypsum Board Ceiling,” priced at ₦1,000,000, with the supplied scope wording covering the existing living room, expanded living room area and driver's room, including framing, screeding, finishing and painting. Revised works subtotal to ₦5,851,000; VAT at 7.5% to ₦438,825; professional fee at 10% to ₦585,100; inclusive total to ₦6,874,925. Regenerated the quotation PDF (2 pages) and Afuze invoice PDF (1 page); both remain drafts pending principal review.
- 2026-08-24 — AFUZE-DOCS-05 — Created standalone balance-payment draft `INV-2026-AFUZE-003` for Engineer C. K. Musa: contract lump sum ₦5,300,000.00 less ₦4,000,000.00 received, leaving ₦1,300,000.00 due. No VAT or separate professional fee. Dated 24 August 2026, due 23 September 2026, with Providus Bank remittance details and principal-authorisation safeguard. Rendered to one page. **APPROVE** — independently verified by @qa/vera, including no-clipping/no-overlap review.
