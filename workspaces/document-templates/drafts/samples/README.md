# Document System Phase 2 — Sample Documents for Review

> **Draft — @docs/quill [claude-code], 2026-08-02. Not approved.** Ten sample
> documents, one per template in `documents/templates/`, for the principal to
> review on formatting, wording, layout, structure, branding, consistency and
> completeness. **Phase 3 does not start until this review is complete.**
>
> **Everything in these documents is fictional.** The client, the project, the
> site, the consultant, every DOVA signatory and the payroll employee are all
> invented. Nothing here is a company record and nothing may be sent to anyone.
> Per [`company/document-policy.md`](../../../../company/document-policy.md) §5
> these live in `drafts/` and are never filed into `projects/`.

---

## 1. The fictional project

One client and one project run through their whole lifecycle, so the set can be
reviewed as a **document family** rather than ten unrelated pages.

| | |
|---|---|
| **Client** | Aterin Heights Limited — a fictional Lagos property developer |
| **Client contact** | Mrs. Adaeze Nwaobi, Projects Director |
| **Client address** | 27 Ogombo Road, Ajah, Lagos State |
| **Client contact details** | `+234 800 000 0000` · `projects@aterinheights.example` — both deliberately non-routable. `.example` is an IANA-reserved TLD that can never be registered. |
| **Project** | Aterin Heights Clubhouse & Pool Deck — Phase 1 |
| **Site** | Plot 14, Ogombo Road, Ajah, Lagos State |
| **Scope** | Structural completion and fit-out of a two-storey, 620 m² clubhouse plus a 285 m² pool deck and external works |
| **Job code** | `SAMPLE-2026-ATH-001` — prefixed `SAMPLE-` so it cannot collide with the real register. **Nothing was appended to `bim-standards/registers/project-register.csv`.** |
| **Contract no.** | `DOVA-CON-2026-ATH` |

### Fictional people

| Name | Role | Appears in |
|------|------|-----------|
| Mrs. Adaeze Nwaobi | Projects Director, Aterin Heights Limited (client) | 02, 03, 04, 07, 08, 09 |
| Kelechi Umeh | Managing Director, DOVA Futures | 01, 02, 07 |
| Tunde Adebiyi | Project Manager, DOVA Futures | 01, 04, 06, 08, 09 |
| Ifeoma Balogun | Contracts Manager, DOVA Futures | 01, 02, 06 |
| Ngozi Eze | Finance Manager, DOVA Futures | 03, 05 |
| Segun Aluko | Site Supervisor, DOVA Futures | 04, 06, 08 |
| Chidera Okafor | Quantity Surveyor, DOVA Futures — **the payroll subject** | 05, 06, 08 |
| Arc. Bisi Ogunsanya | Consultant architect, Ogunsanya + Partners, ARCON Reg. No. `F/0000/SAMPLE` | 04, 07 |

**Note that the DOVA signatories are fictional too, deliberately.** Signing a
sample as the real principal would produce a document that could be mistaken for
a genuine signed record. If you would rather the samples carry real names and
titles, say so and they will be reissued.

### Timeline

| Date | Event | Document |
|------|-------|----------|
| 12 Jan 2026 | Quotation issued, valid to 11 Feb | **02** `QUO-2026-007` |
| 2 Feb 2026 | Quotation accepted; contract `DOVA-CON-2026-ATH` | — |
| 9 Feb 2026 | Commencement on site | — |
| 20 Apr 2026 | Milestone 1 invoiced | `INV-2026-009` (not in the set) |
| 12 May 2026 | Milestone 1 paid in full | — |
| 15 Jun 2026 | Structural inspection report issued | **01** `RPT-2026-011` |
| 18 Jun 2026 | Milestone 2 certified by the client | — |
| 22 Jun 2026 | Milestone 2 invoiced, due 22 Jul | **03** `INV-2026-014` |
| 26 Jun 2026 | Variation VO-01 approved (stainless balustrade) | — |
| 30 Jun 2026 | **Valuation date** for the June period | — |
| 3 Jul 2026 | June progress report issued | **08** |
| 6 Jul 2026 | Interim application within Milestone 3 | **09** `MPA-003` |
| 8 Jul 2026 | Covering letter transmitting 08, 09 and 01 to the client | **07** `DOVA/LTR/2026/041` |
| 10 Jul 2026 | Recovery-programme memo to the site team | **06** `DOVA/MEMO/2026/018` |
| 28 Jul 2026 | July payroll paid | **05** |
| 18 Sep 2026 | Practical completion and handover | **04** |

---

## 2. The ten samples

| File | Template | What it exercises |
|------|----------|-------------------|
| `SAMPLE-00-Letterhead.html` | `00-Letterhead` | **Byte-identical copy of the template.** The letterhead has zero editable fields — it is a shell, not a form, so a "filled" version would not exist. Included so you can compare the blank sheet's proportions against the nine filled documents. |
| `SAMPLE-01-Report.html` | `01-Report` | Five-section report with **5 findings** (template ships 3) and full three-way authorisation. Real technical prose: cube results, cover survey, tolerances. |
| `SAMPLE-02-Project-Quote.html` | `02-Project-Quote` | **8 priced line items** (template ships 4) across m², LS and lump-sum units; **7 terms** (template ships 5); the full subtotal → VAT → grand total chain. |
| `SAMPLE-03-Payment-Invoice.html` | `03-Payment-Invoice` | **5 line items** (template ships 3), one of them a negative retention line; PO number; Providus remittance details. |
| `SAMPLE-04-Completion-Form.html` | `04-Completion-Form` | Full 8-item completion checklist reworded to the actual scope, four-way sign-off, and a certification statement carrying the defects-liability period and the retention release. **This template has never been used before — this is its first realistic exercise.** |
| `SAMPLE-05-Salary-Slip.html` | `05-Salary-Slip` | Fictional employee. Earnings/deductions arithmetic with Nigerian statutory bases (pension 8% of basic + housing + transport per PRA 2014; NHIS 1.75% of basic). |
| `SAMPLE-06-Internal-Letter.html` | `06-Internal-Letter` | Memo with **3 action items** (template ships 2), each with a named owner and a deadline. |
| `SAMPLE-07-External-Letter.html` | `07-External-Letter` | Formal Nigerian business English to a named client officer, with CC and enclosures, cross-referencing four other documents in the set. |
| `SAMPLE-08-Project-Report.html` | `08-Project-Report` | The heaviest document: **9 progress rows** (template ships 4), **3 issues** (ships 2), **4 next-period activities** (ships 3), and the full six-tile financial panel. |
| `SAMPLE-09-Milestone-Payment-Request.html` | `09-Milestone-Payment-Request` | Interim application inside a milestone: **4 verified work items** (template ships 3) and the gross → retention → net calculation. |

---

## 3. The figures, and how they reconcile

Every number in the set derives from the quotation. **All amounts are exact —
no rounding anywhere.**

### The contract sum (quotation `QUO-2026-007`, sample 02)

| # | Work package | Amount (₦) |
|---|---|---:|
| 1 | Preliminaries | 8,210,000 |
| 2 | Substructure | 11,470,000 |
| 3 | Reinforced concrete frame | 20,160,000 |
| 4 | Roof structure & covering | 9,360,000 |
| 5 | Blockwork & external rendering | 11,270,000 |
| 6 | Mechanical & electrical first fix | 14,750,000 |
| 7 | Internal finishes | 13,268,000 |
| 8 | Pool deck & external works | 9,291,000 |
| | **Subtotal (ex VAT)** | **97,779,000** |
| | VAT @ 7.5% | 7,333,425 |
| | **GRAND TOTAL** | **105,112,425** |

### Milestones (each maps exactly onto whole work packages)

| Milestone | Packages | Ex VAT (₦) | VAT (₦) | Incl. VAT (₦) |
|---|---|---:|---:|---:|
| M1 — Mobilisation & substructure | 1, 2 | 19,680,000 | 1,476,000 | 21,156,000 |
| M2 — Frame & roof | 3, 4 | 29,520,000 | 2,214,000 | 31,734,000 |
| M3 — Envelope & first fix | 5, 6, 7 | 39,288,000 | 2,946,600 | 42,234,600 |
| M4 — Pool deck & handover | 8 | 9,291,000 | 696,825 | 9,987,825 |
| **Total** | | **97,779,000** | **7,333,425** | **105,112,425** |

The milestone columns sum exactly to the quotation totals. That is the first
consistency check to run.

### Invoices

| Invoice | Milestone | Gross (₦) | Retention 5% (₦) | Net certified (₦) | VAT 7.5% (₦) | **Total due (₦)** |
|---|---|---:|---:|---:|---:|---:|
| `INV-2026-009` (not in set) | M1 | 19,680,000 | 984,000 | 18,696,000 | 1,402,200 | 20,098,200 |
| **`INV-2026-014`** (sample 03) | M2 | 29,520,000 | 1,476,000 | 28,044,000 | 2,103,300 | **30,147,300** |

Sample 03's five line items sum to the net figure:
12,480,000 + 7,680,000 + 5,760,000 + 3,600,000 − 1,476,000 = **28,044,000**.

### Progress at 30 June 2026 (sample 08)

Value-weighted against the ₦97,779,000 contract sum:

| Package | Planned % | Planned value (₦) | Actual % | Earned value (₦) |
|---|---:|---:|---:|---:|
| Preliminaries | 100 | 8,210,000 | 100 | 8,210,000 |
| Substructure | 100 | 11,470,000 | 100 | 11,470,000 |
| RC frame | 100 | 20,160,000 | 100 | 20,160,000 |
| Roof | 100 | 9,360,000 | 100 | 9,360,000 |
| Blockwork & rendering | 90 | 10,143,000 | 82 | 9,241,400 |
| Electrical first fix (₦7,500,000) | 65 | 4,875,000 | 62 | 4,650,000 |
| Mechanical first fix (₦7,250,000) | 50 | 3,625,000 | 48 | 3,480,000 |
| Internal finishes | 20 | 2,653,600 | 12 | 1,592,160 |
| Pool deck & external | 0 | 0 | 0 | 0 |
| **Total** | | **70,496,600** | | **68,163,560** |

- Planned overall = 70,496,600 ÷ 97,779,000 = **72.1%**
- Actual overall = 68,163,560 ÷ 97,779,000 = **69.7%**
- Variance = **−2.4 percentage points**

Those two percentages appear in samples 06, 07 and 08 and are identical in all
three.

### Milestone application `MPA-003` (sample 09)

Milestone 3's three packages, valued at 30 June 2026:

9,241,400 + 4,650,000 + 3,480,000 + 1,592,160 = **₦18,963,560** gross
less retention @ 5% = ₦948,178 → **net claim ₦18,015,382** (ex VAT).

Those same three figures are quoted in sample 07's second paragraph.

### The 08 financial panel

| Tile | Value (₦) | Where it comes from |
|---|---:|---|
| Contract Value | 105,112,425 | Quotation grand total, incl. VAT |
| Invoiced to Date | 50,245,500 | `INV-2026-009` 20,098,200 + `INV-2026-014` 30,147,300 |
| Payments Received | 20,098,200 | M1 only; M2 not due until 22 July |
| Variations Approved | 1,978,000 | VO-01, ₦1,840,000 ex VAT + ₦138,000 VAT |
| Amount Outstanding | 30,147,300 | 50,245,500 − 20,098,200 |
| Retention Held (5%) | 2,460,000 | 984,000 (M1) + 1,476,000 (M2) |

### Variation VO-01 and the two "contract values"

VO-01 (approved 26 June 2026) upgrades the pool-deck balustrade from mild steel
to 316 stainless: **₦1,840,000 ex VAT / ₦1,978,000 incl. VAT**. It brings the
revised contract value to **₦107,090,425 incl. VAT**, and final retention to
₦4,980,950 (5% of the revised ex-VAT sum of ₦99,619,000).

**This is deliberate, and it is one of the things to look at hardest.** The
three templates that carry a "Contract Value" field mean different things by it:

- **08** shows the *original* ₦105,112,425 with variations in a separate tile —
  because the panel's structure forces that split. A footnote states the
  revised figure.
- **04** and **09** show the *revised* ₦107,090,425, annotated "(incl. VAT and
  VO-01)".

A reader comparing the three documents will see two different contract values
and has to read the annotations to reconcile them. **Phase 3 should decide
whether "Contract Value" means original or revised, and whether it is stated
inclusive or exclusive of VAT, and enforce one answer across the library.**

---

## 4. Verified

Measured in headless Chrome, print media emulated, at the 794 px A4 width the
templates are built to. A4 at 96 dpi = 794 × **1123 px**.

| Sample | Blank template | Filled sample | Fits one A4? |
|--------|---------------:|--------------:|--------------|
| 00 Letterhead | 1123 px | 1123 px | ✅ exactly |
| 01 Report | 1297 px | **1728 px** | ❌ 1.54 pages |
| 02 Project Quote | 1182 px | **1462 px** | ❌ 1.30 pages |
| 03 Payment Invoice | 1022 px | 1105 px | ✅ 18 px headroom |
| 04 Completion Form | 1238 px | **1280 px** | ❌ 1.14 pages |
| 05 Salary Slip | 925 px | 925 px | ✅ 198 px headroom |
| 06 Internal Letter | 989 px | 1121 px | ✅ 2 px headroom |
| 07 External Letter | 1072 px | **1144 px** | ❌ over by 21 px |
| 08 Project Report | 1348 px | **1712 px** | ❌ 1.52 pages |
| 09 Milestone Request | 1273 px | **1369 px** | ❌ 1.22 pages |

Also verified: **Bebas Neue and Inter both loaded** in every sample
(`document.fonts.check` returned true for both on all ten files), so the Google
Fonts CDN was reachable during this check. Samples 02 and 08 were additionally
inspected visually in a browser — letterhead, logo, terracotta rule, table
headers, totals panel and footer all render as intended.

**Not verified:** no PDFs were produced. `render-pdf.js` applies a 20 mm top
margin to every page including page 1, so a document with a full-bleed
letterhead needs `@page :first { margin-top: 0 }` added to it before it will
render correctly — a change none of the ten templates carries. Adding it to the
samples would have meant introducing a pagination strategy the templates do not
have, so it was left alone and reported instead. See defect 1 below.

---

## 5. Template defects found (logged, not fixed)

Per the brief, the templates themselves were **not modified**. These are also
recorded in [`memory/triage.md`](../../../../memory/triage.md).

1. **Five templates overflow A4 while completely empty, and all nine print
   "Page 1 of 1".** 01, 02, 04, 08 and 09 exceed 1123 px with nothing but
   placeholders in them; 07 has only 51 px of headroom. The footer is hardcoded
   `Page 1 of 1` in every template, so any document that runs to two pages
   prints that footer *mid-document* and nothing at all on page 2. This is the
   single biggest finding in this pass, and it makes template inventory
   finding 5 (two competing pagination strategies) urgent rather than tidy-up.
2. **No template can render correctly through `render-pdf.js` as shipped** —
   none carries `@page :first { margin-top: 0 }`, so page 1's letterhead
   renders 20 mm down the paper with a white gap above it.
3. **Templates 04, 05 and 08 have no reference-number field at all.**
   `documents/README.md` defines `CC-`, `SAL-` and `PR-` prefixes for exactly
   these three, but there is nowhere in the HTML to put one. The completion
   certificate in particular is a legal record that should be uniquely
   identifiable.
4. **The invoice has no retention row.** Template 09 deducts retention; template
   03 cannot. Sample 03 works around it with a negative line item, which reads
   correctly but is a workaround.
5. **Template 09 has no VAT line**, while 02 and 03 both do. A milestone
   application therefore cannot state a VAT-inclusive claim.
6. **Template 03's Sort Code field does not apply to Nigerian banking.** NUBAN
   accounts have no sort code. `INV-2026-DEMO-001` already dropped the row;
   sample 03 does the same. The template still ships it.
7. **In template 08, the Variance and Status cells are not `contenteditable`.**
   Planned % and Actual % can be edited in the browser but the variance and the
   status pill cannot, so a user editing in the browser produces a table whose
   variance column contradicts its own percentages. Same problem with the
   Impact badges in the Issues table. These were set directly in the HTML for
   the sample — which a browser-only user cannot do.
8. **Confirms inventory findings 2 and 3:** VAT is hardcoded at 7.5% in 02 and
   03; retention is hardcoded at 5% in 09 and in 08's panel label. The samples
   use 7.5% and 5% throughout, per the brief. Live documents have shipped at
   both 7.5% and 5% VAT, so the rate must become an input.
9. **Confirms inventory finding 10:** `04-Completion-Form.html` vs
   `04-Completion-Certificate.docx` — the filename mismatch is still there.
10. **Long titles wrap awkwardly in 02.** "Aterin Heights Clubhouse & Pool Deck
    — Phase 1" wraps to two lines and drags the `QUO-` reference block down with
    it, leaving the reference visually detached from the terracotta label above.
11. **The quote's description column is narrow.** With the fixed-width Unit,
    Qty, Rate and Amount columns, realistic item descriptions run to 3–4 lines
    each, which is what drives 02 onto a second page.

---

## 6. Decisions taken in filling these in — please confirm or overrule

| # | Decision | Why | Alternative |
|---|----------|-----|-------------|
| A | **`contenteditable` was kept** on every filled field | You can click any figure or sentence and correct it directly in the browser while reviewing | `INV-2026-DEMO-001` drops it, treating a finished document as static |
| B | **Clay `#9E4F30` kept on the reference-number segment only** (`QUO-`, `INV-`, `MPA-`) | Matches live house style in `INV-2026-DEMO-001`, where the clay reads as an accent rather than an unfilled placeholder | Strip it everywhere, so clay always and only means "not filled in" |
| C | **The mint `#BFDDCC` on headline amounts was changed to `#F5EFE8`** | In the template the AMOUNT DUE / TOTAL DUE / NET PAY figure renders a different colour from its own label, which reads as placeholder styling | Keep the mint tint as a deliberate emphasis |
| D | **Retention is deducted at certification, and the invoice bills the net** | Standard construction practice: application → certificate → invoice | Invoice gross and deduct retention separately |
| E | **VAT is charged on the net-of-retention amount** | Keeps invoice arithmetic simple and self-consistent | Charge VAT on the gross works value and deduct retention after VAT — **this is a real tax question and your call, not mine** |
| F | **The `data-wrap` print fix from `INV-2026-DEMO-001` was added** to all nine filled samples | Without it the screen wrapper's padding pushes the sheet onto a spurious second page | Leave the templates' weaker print block as-is |
| G | **Client-completed fields were left blank, not filled** | "Received By (Client)" on 03, "Client Acknowledged" on 08 and the approval date on 09 are signed by the client on receipt | Fill them with a fictional counter-signature |

---

## 7. What to look at hardest

1. **The page-count table in §4.** Five templates do not fit on one A4 page even
   when empty, and every one of them claims "Page 1 of 1". Decide whether
   templates should be redesigned to fit one page, or whether the library adopts
   one of the two existing multi-page strategies. Nothing else in Phase 3 can be
   settled until this is.
2. **The two contract values in §3.** Samples 04, 08 and 09 state the contract
   value differently and both are defensible. Rule on what the field means.
3. **Decision E — VAT on gross or on net of retention.** A tax decision, and the
   only one in this set with a wrong answer.
4. **The wording throughout.** Every sentence was written fresh against
   `company/voice-and-tone.md`. Sample 07 (the client letter) and sample 01
   §01/§05 are where the voice is most exposed — if the register is wrong there,
   it is wrong everywhere.
5. **Whether DOVA signatories should be fictional or real** in future samples.
6. **The reference-number formats used.** These follow the *template* HTML, not
   `documents/README.md`: `QUO-2026-007`, `INV-2026-014`, `MPA-003`,
   `DOVA/MEMO/2026/018`, `DOVA/LTR/2026/041`. The README says `QTE-`, `MPR-`,
   `IL-` and `EL-` instead, and live jobs use a third, job-scoped form
   (`INV-2026-POOL-001`). Three conventions, and only you can pick.

---

*Drafted by @docs/quill [claude-code] · 2026-08-02 · maker output, not verified
by a checker. See [`governance/agents/REPORT-LOG.md`](../../../../governance/agents/REPORT-LOG.md) §2.*
