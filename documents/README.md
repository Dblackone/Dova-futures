# DOVA Futures — Document Template Library

> **Rule:** Every company document — quotes, invoices, letters, reports, certificates —
> must start from one of the templates below. No blank documents. No ad-hoc layouts.
> The templates carry the brand, the legal contact block, and the correct structure.
> Deviate only with explicit written approval from the principal.

---

## Template Index

**Offline combined Word collection:**
`docx/DOVA-Futures-Offline-Template-Collection.docx` contains the blank
letterhead and all nine document templates in one editable file. Each template
starts on a new page so it can be duplicated, edited, and saved entirely
offline in Microsoft Word.

| # | File | Docx | Purpose | When to use |
|---|------|------|---------|-------------|
| 01 | `templates/01-Report.html` | `docx/01-Report.docx` | General Report | Any formal internal or external report: site inspection, assessment, summary memo |
| 02 | `templates/02-Project-Quote.html` | `docx/02-Project-Quote.docx` | Project Quote | New client scope and pricing proposals — all cost breakdowns go here |
| 03 | `templates/03-Payment-Invoice.html` | `docx/03-Payment-Invoice.docx` | Payment Invoice | Requesting payment for work completed or materials supplied |
| 04 | `templates/04-Completion-Form.html` | `docx/04-Completion-Certificate.docx` | Completion Certificate | Issuing formal sign-off that a project or phase is complete |
| 05 | `templates/05-Salary-Slip.html` | `docx/05-Salary-Slip.docx` | Salary Slip | Monthly staff payroll documentation |
| 06 | `templates/06-Internal-Letter.html` | `docx/06-Internal-Letter.docx` | Internal Letter | Memos and formal correspondence between staff or departments |
| 07 | `templates/07-External-Letter.html` | `docx/07-External-Letter.docx` | External Letter | All formal letters to clients, contractors, agencies, or third parties |
| 08 | `templates/08-Project-Report.html` | `docx/08-Project-Progress-Report.docx` | Project Progress Report | Periodic status updates tied to a live project |
| 09 | `templates/09-Milestone-Payment-Request.html` | `docx/09-Milestone-Payment-Request.docx` | Milestone Payment Request | Claiming payment at defined project milestones per contract |

---

## Brand Identity (do not alter)

All brand tokens — colours, fonts, legal name, tagline, contact line — are
defined once in **[`company/brand.md`](../company/brand.md)**, the single source
of truth. Never re-declare or override those values here or in any template.

All templates embed the DOVA logo as an inline SVG — do not replace it with a raster image or remove it.

---

## How to Use (Human)

1. Open the `.html` file for your document type in any browser.
2. Click any **orange placeholder field** to type your content.
3. When complete, click **PRINT / SAVE PDF** (top-right of the page).
4. Save as PDF — the browser print dialog will handle A4 formatting.
5. For Word-compatible output: use the `.docx` version in `docx/`.

---

## How to Use (AI Session / Inquiry)

When a session or AI inquiry involves creating or drafting any company document:

1. **Identify the document type** from the table above.
2. **Read the corresponding HTML template** to extract the exact field structure, labels, and layout before generating any content.
3. **Populate only the editable fields** (marked `contenteditable` in the HTML, shown as orange placeholders). Do not alter the letterhead, logo, brand colours, or contact block.
4. **Respect the reference numbering convention**:
   - Reports: `RPT-YYYY-NNN`
   - Quotes: `QTE-YYYY-NNN`
   - Invoices: `INV-YYYY-NNN`
   - Completion Certs: `CC-YYYY-NNN`
   - Salary Slips: `SAL-YYYY-NNN-[STAFF-INITIALS]`
   - Internal Letters: `IL-YYYY-NNN`
   - External Letters: `EL-YYYY-NNN`
   - Progress Reports: `PR-YYYY-NNN`
   - Milestone Requests: `MPR-YYYY-NNN`
5. **Never draft a company document from blank text** — the template HTML is the authoritative source of structure. If you cannot read the template file, stop and report the blocker.
6. **Never send or publish any drafted document** without explicit approval from the principal (see `governance/guardrails.md`).

---

## Adding a New Template

1. Design in the same brand system (colours, fonts, contact block as above).
2. Save the `.html` as `templates/NN-Document-Name.html` where `NN` is the next sequence number.
3. Export a `.docx` version into `docx/`.
4. Add an entry to the table in this README.
5. Log the decision in `memory/decisions.md`.

---

## File Map

```
documents/
├── README.md                          ← this file (template rules)
├── DOVA Futures - Document Templates.html  ← bundled viewer (all templates)
├── index.html                         ← template gallery index
├── templates/
│   ├── 01-Report.html / .dc.html
│   ├── 02-Project-Quote.html / .dc.html
│   ├── 03-Payment-Invoice.html / .dc.html
│   ├── 04-Completion-Form.html / .dc.html
│   ├── 05-Salary-Slip.html / .dc.html
│   ├── 06-Internal-Letter.html / .dc.html
│   ├── 07-External-Letter.html / .dc.html
│   ├── 08-Project-Report.html / .dc.html
│   └── 09-Milestone-Payment-Request.html / .dc.html
└── docx/
    ├── DOVA-Futures-Offline-Template-Collection.docx  ← all templates in one editable Word file
    ├── 01-Report.docx
    ├── 02-Project-Quote.docx
    ├── 03-Payment-Invoice.docx
    ├── 04-Completion-Certificate.docx
    ├── 05-Salary-Slip.docx
    ├── 06-Internal-Letter.docx
    ├── 07-External-Letter.docx
    ├── 08-Project-Progress-Report.docx
    └── 09-Milestone-Payment-Request.docx
```
