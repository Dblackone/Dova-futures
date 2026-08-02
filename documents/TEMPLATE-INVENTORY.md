# TEMPLATE-INVENTORY.md — Phase 1 Audit of Every Document Template

> **Status: Phase 1 deliverable of the Repository Document Generation Skill.**
> A complete inventory of every document template in this repository, produced
> by reading the template files directly. Phases 2–6 (sample documents →
> standard → skill → Python generator → AI integration) build on this.
>
> Governing rules today: [`company/document-policy.md`](../company/document-policy.md)
> (binding), [`documents/README.md`](README.md) (how-to + numbering),
> [`company/brand.md`](../company/brand.md) (tokens — single source of truth).
>
> *Audit by @docs/quill [claude-code] · 2026-08-02*

---

## Correction before you read on

**There is no `build.py` in this repository.** The Phase 5 brief refers to
reusing "the existing `build.py` workflow"; no such file exists. The only Python
in the repo is the pyRevit/IronPython toolkit under
`bim-standards/pyrevit-plugin/` (unrelated to documents) and one Stitch upload
script under `.agents/skills/`. Document generation today is **manual HTML
editing plus a browser print**, with one Node helper for PDF and one for DOCX.
Phase 5 will therefore be a new Python application, not a refactor of an
existing one — unless `build.py` exists somewhere outside this repository, in
which case point me at it before Phase 5 starts.

---

## 1. How generation works today (all templates)

There is **no generator**. The current pipeline is:

```
documents/templates/NN-Name.html        ← the canonical source
        │  open in a browser (Chrome/Safari)
        │  click each orange [Bracketed Placeholder] and type over it
        │  click PRINT / SAVE PDF   →  window.print()  →  A4 PDF
        ▼
projects/<JOB>/01-Documents/REF.pdf   (after principal approval)
```

For an **AI session**, `documents/README.md` §"How to Use (AI Session)" defines
the same flow: read the template HTML, copy it, substitute the placeholder spans
with real content, save as a new `.html`, and render.

Two Node helpers exist alongside it:

| Helper | Path | What it does |
|--------|------|--------------|
| `render-pdf.js` | `workspaces/client-jobs/tools/render-pdf.js` | Renders a finished document HTML to a **multi-page branded A4 PDF** — page 1 keeps the full green letterhead, pages 2..N get a running header + footer with `Page X of Y`. Two-pass Puppeteer + `pdf-lib` splice. Requires installed Chrome (`CHROME_PATH`), `puppeteer-core`, `pdf-lib`. Its header comment records four Chrome traps that each silently produced a header-less PDF — read it before touching header/footer templates. |
| `gen-letterhead-docx.mjs` | `scripts/gen-letterhead-docx.mjs` | Builds the letterhead `.docx` from brand tokens. Deps `docx` + `sharp` (root `package.json`). |

### Shared technical facts — true of every template below

| Aspect | Value |
|--------|-------|
| Format | Pure HTML + inline CSS. No build step, no JS framework, no external CSS. |
| Editable fields | `<span contenteditable="true">` containing a `[Bracketed Placeholder]`, styled clay `#9E4F30` italic; focus ring mint `#5AA17C` (which also resets the text to `#1A1A1A` non-italic). |
| Fixed, never edit | Letterhead bar (`#1C4636`), inline-SVG logo, terracotta rule (`#B85C38`, 3px), footer contact block, `RC No. 8219604`. |
| Print setup | `@page { size: A4; margin: 0 }`; `[data-no-print]` hides UI chrome; `[data-paper]` is the 794px paper container. |
| Fonts | Bebas Neue (display) + Inter (body), loaded from **Google Fonts CDN** — see Dependencies. |
| Page footer | `DOVA Futures Limited · RC No. 8219604` · `DOVAFUTURES.COM` · `Page N of M` |
| Currency | ₦ (NGN), thousands separators |
| Output | A4 PDF via browser print; `.docx` twin in `documents/docx/`; `.dc.html` design source (**not** production) |

### Dependencies (shared by all)

1. **Google Fonts CDN** — `fonts.googleapis.com` for Bebas Neue + Inter.
   *This is the one real external dependency.* Offline or firewalled rendering
   silently falls back to a system sans-serif and the document stops looking
   like a DOVA document. A Phase 3/5 decision: self-host the two families.
2. **A browser** for print-to-PDF (Chrome is the reference; Safari also tested).
3. For multi-page branded PDFs: Node + `puppeteer-core` + `pdf-lib` + installed
   Chrome, via `render-pdf.js`.
4. Nothing else. No database, no server, no npm package needed to *edit* a
   template.

### Reference numbering (from `documents/README.md`)

`RPT-` reports · `QTE-` quotes · `INV-` invoices · `CC-` completion certs ·
`SAL-` salary slips (+ staff initials) · `IL-` internal letters ·
`EL-` external letters · `PR-` progress reports · `MPR-` milestone requests
— each followed by `YYYY-NNN`.

> **Live usage diverges from this.** Real documents in `projects/` and
> `workspaces/client-jobs/drafts/` use a **job-scoped** form:
> `INV-2026-POOL-001`, `RPT-2026-DEMO-001`, `QTE-2026-001`, `VQ-2026-POOL-001`
> (variation quote — a type that has **no template**). Reconciling the README
> convention with actual practice is a Phase 3 decision, not a silent fix.

---

## 2. The templates

Nine numbered document types plus the letterhead shell. Every one is listed.

---

### 00 — Letterhead

| | |
|---|---|
| **Purpose** | Blank branded shell. The base every other template is built on; used directly for one-off correspondence that fits no other type. |
| **Location** | `documents/templates/00-Letterhead.html` (5,997 B) |
| **Twins** | `documents/templates/00-Letterhead.pdf` · `documents/docx/00-Letterhead.docx` |
| **Required inputs** | **None.** Zero `contenteditable` fields — it is a shell, not a form. |
| **Optional inputs** | Body content, typed into the empty body area after duplicating the file. |
| **Output** | A4 HTML → PDF; `.docx` for Word workflows |
| **Dependencies** | Shared set. The `.docx` is generated by `scripts/gen-letterhead-docx.mjs` (needs `docx` + `sharp`). |
| **How generated today** | Copy the HTML, type into the body, print. The DOCX is regenerated by running the Node script. |

---

### 01 — Report

| | |
|---|---|
| **Purpose** | Any formal internal or external report: site inspection, assessment, summary memo. |
| **Location** | `documents/templates/01-Report.html` (13,819 B) · fields: **21** |
| **Twins** | `01-Report.dc.html` (design source) · `docx/01-Report.docx` |
| **Required inputs** | Report title · reference (`RPT-YYYY-NNN`) · date · classification (`Internal / Confidential`) · prepared by (name, title) · reviewed by (name, title) · department/unit · findings (≥1 row: statement + supporting evidence) · authorisation block ×3 (name & title + date) |
| **Optional inputs** | Additional finding rows · classification may be omitted for public reports |
| **Output** | A4 PDF (single or multi-page) · DOCX |
| **Dependencies** | Shared set. Multi-page reports use `render-pdf.js` for running headers. |
| **How generated today** | Manual field substitution. **Reference implementations:** `projects/GM-2026-OSG-001.../06-Reports/RPT-2026-OSG-001_Project-Report.html` and `workspaces/client-jobs/drafts/RPT-2026-DEMO-001_...html` (a combined Report **&** Quotation, 7 pages, rendered with `render-pdf.js`). |

---

### 02 — Project Quote

| | |
|---|---|
| **Purpose** | New-client scope and pricing proposals. **All cost breakdowns go here.** |
| **Location** | `documents/templates/02-Project-Quote.html` (18,426 B) · fields: **42** — the second-largest form |
| **Twins** | `02-Project-Quote.dc.html` · `docx/02-Project-Quote.docx` |
| **Required inputs** | Project/works description · quote date · valid-until date · prepared by · internal reference · client name · contact person · client address · client phone + email · line items (description, qty, unit, rate, amount) · **Subtotal** · **VAT** · **GRAND TOTAL** · authorised signatory · client acceptance (name & title) |
| **Optional inputs** | Extra line-item rows · alternates/options (used live: `QTE-2026-001` prices two pavement alternates A/B) · notes, exclusions, assumptions |
| **Computed** | Subtotal = Σ line amounts; VAT; Grand Total. **The template hardcodes `VAT (7.5%)`** — live documents have used both 7.5% and 5%, so the rate must be an *input*, not a constant, in Phase 5. |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **Reference:** `projects/DFL-2026-ROAD-001_.../01-Documents/QTE-2026-001.html` — note it uses a `thead`/`tfoot` spacer pagination pattern (`.header-space`/`.footer-space`/`.avoid-break`), *not* `render-pdf.js`. Two incompatible pagination strategies exist in the wild; Phase 3 must pick one. |

---

### 03 — Payment Invoice

| | |
|---|---|
| **Purpose** | Requesting payment for work completed or materials supplied. |
| **Location** | `documents/templates/03-Payment-Invoice.html` (16,159 B) · fields: **36** |
| **Twins** | `03-Payment-Invoice.dc.html` · `docx/03-Payment-Invoice.docx` |
| **Required inputs** | Invoice date · due date · invoice reference · client name · attention/contact · address (2 lines) · client email + phone · line items (service/work description, qty, rate, amount) · **AMOUNT DUE** · **Subtotal** · **VAT** · **TOTAL DUE** · bank name · account number · sort code · authorised by (name & title) · received by (name, date) |
| **Optional inputs** | Client PO number (`[PO-XXXXX]`) · `Less: Advance Paid` · additional payment notes/instructions |
| **Computed** | Subtotal → VAT → less advance → Total Due |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **References:** `projects/DFL-2026-POOL-001_.../01-Documents/INV-2026-POOL-001..005` and `drafts/INV-2026-DEMO-001_...`. ⚠ The remittance account moved to **Providus 1306839309**; the five POOL invoices still show the old Globus account (open item in the client-jobs status). Bank details must be a single sourced value in Phase 5, not typed per invoice. |

---

### 04 — Completion Certificate

| | |
|---|---|
| **Purpose** | Formal sign-off that a project or phase is complete; handover record. |
| **Location** | `documents/templates/04-Completion-Form.html` (15,522 B) · fields: **26** |
| **Twins** | `04-Completion-Form.dc.html` · `docx/04-Completion-Certificate.docx` (⚠ filename mismatch between HTML and DOCX — flag for Phase 3) |
| **Required inputs** | Full project name · contract reference (`DOVA-CON-XXXX`) · site address · client name · commencement date · completion date · issued-to name · contract ref (repeated) · sign-off ×3 (name & title + date) · certifying professional (name, firm & registration no. + date) |
| **Optional inputs** | Defects-liability notes · outstanding-items schedule |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **No live instance exists in the repository** — this template has never been used. Phase 2's sample will be its first realistic exercise. |

---

### 05 — Salary Slip

| | |
|---|---|
| **Purpose** | Monthly staff payroll record. |
| **Location** | `documents/templates/05-Salary-Slip.html` (14,495 B) · fields: **25** |
| **Twins** | `05-Salary-Slip.dc.html` · `docx/05-Salary-Slip.docx` |
| **Required inputs** | Pay period (`Month YYYY`) · employee full name · employee ID (`EMP-XXX`) · department · job title · bank account number · payment date · earnings rows → **GROSS EARNINGS** · deductions rows → **TOTAL DEDUCTIONS** · net pay · bank name · authorised by (name & title) |
| **Optional inputs** | Overtime, allowances, loan deductions, union dues, and similar rows |
| **Computed** | Gross Earnings − Total Deductions = Net Pay |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **No instance in the repository, by design** — payroll carries staff personal data and `workspaces/company-ops/PROJECT.md` forbids committing it. Only the blank template lives in git. **Phase 2's sample must use obviously fictional staff data, and must not be committed to `projects/`.** |

---

### 06 — Internal Letter / Memorandum

| | |
|---|---|
| **Purpose** | Memos and formal correspondence between staff or departments. |
| **Location** | `documents/templates/06-Internal-Letter.html` (10,885 B) · fields: **17** |
| **Twins** | `06-Internal-Letter.dc.html` · `docx/06-Internal-Letter.docx` |
| **Required inputs** | To (recipient / department / All Staff) · From (sender name, title) · date · subject · reference (`DOVA/MEMO/YYYY/XXX`) · body · action items (action + owner + deadline) · issued by (name, title + date) · acknowledged by (name + date) |
| **Optional inputs** | Additional action-item rows · CC list |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. No live instance. Note the reference format here is `DOVA/MEMO/YYYY/XXX`, which **contradicts** the README's `IL-YYYY-NNN`. Phase 3 decision. |

---

### 07 — External Letter

| | |
|---|---|
| **Purpose** | All formal letters to clients, contractors, agencies, or third parties. |
| **Location** | `documents/templates/07-External-Letter.html` (8,797 B) · fields: **17** — the simplest template |
| **Twins** | `07-External-Letter.dc.html` · `docx/07-External-Letter.docx` |
| **Required inputs** | Our reference (`DOVA/LTR/YYYY/XXX`) · date · recipient name · title/designation · organisation · street address, city · state · subject (`RE:`) · salutation · body ×3 paragraphs (opening / core / closing) · complimentary close · signatory name · signatory title |
| **Optional inputs** | `CC:` list · `ENC:` enclosures list |
| **Output** | A4 PDF (single page — footer is hardcoded `Page 1 of 1`) · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **Closest live artefact:** `workspaces/client-jobs/drafts/EMAIL-2026-DEMO-001_Broll-Properties_Covering-Note.md` — a covering note drafted as **Markdown, not from this template**. That is a policy gap worth naming: email bodies currently bypass the template system. |
| **Note** | Reference format `DOVA/LTR/YYYY/XXX` contradicts the README's `EL-YYYY-NNN`. Same Phase 3 decision as 06. |

---

### 08 — Project Progress Report

| | |
|---|---|
| **Purpose** | Periodic status updates tied to a live project. |
| **Location** | `documents/templates/08-Project-Report.html` (19,773 B) · fields: **38** — the largest template |
| **Twins** | `08-Project-Report.dc.html` · `docx/08-Project-Progress-Report.docx` |
| **Required inputs** | Project name · client name · location (city, state) · prepared by · date · reporting period (`Month YYYY`) · work-package progress rows (package name + % + status) · issues/risks rows (issue + mitigation + owner) · next-period activities (activity + responsible party + target date) · sign-off ×2 (name · date) |
| **Optional inputs** | Additional package / issue / activity rows · photographs · programme commentary |
| **Output** | A4 PDF (multi-page typical) · DOCX |
| **Dependencies** | Shared set + `render-pdf.js` for running headers on multi-page output |
| **How generated today** | Manual. **Reference:** `projects/DFL-2026-POOL-001_.../06-Reports/PROGRESS-REPORT-001_June-2026.html` — note its filename follows neither the README (`PR-YYYY-NNN`) nor the job-scoped pattern. Third naming variant in the wild. |

---

### 09 — Milestone Payment Request

| | |
|---|---|
| **Purpose** | Claiming payment at defined contract milestones. |
| **Location** | `documents/templates/09-Milestone-Payment-Request.html` (19,159 B) · fields: **34** |
| **Twins** | `09-Milestone-Payment-Request.dc.html` · `docx/09-Milestone-Payment-Request.docx` |
| **Required inputs** | Project name · client name · contract reference (`DOVA-CON-XXXX`) · milestone number (`[# of #]`) · date · milestone name per contract schedule · completed-works items (item + description + value) ×3+ · **Gross Claim this Period** · **Less: Retention (5%)** · net claim · submitted by (name, title + date) · client certification (authorised representative + date) |
| **Optional inputs** | Additional work items · supporting documents list (`[Other supporting document]`) · photographic evidence |
| **Computed** | Gross Claim − Retention = Net Claim. **Retention is hardcoded 5%** — must become an input in Phase 5 (contracts vary). |
| **Output** | A4 PDF · DOCX |
| **Dependencies** | Shared set |
| **How generated today** | Manual. **No live instance** — the closest is the 60/30/10 staged payment panel inside `INV-2026-DEMO-001`, which achieved milestone billing *through the invoice template* rather than this one. |

---

## 3. Related files that are not templates

| File | What it is | Treat as |
|------|-----------|----------|
| `documents/index.html` | Template gallery — card grid linking all templates | Navigation. Update when a template is added. |
| `documents/DOVA Futures - Document Templates.html` (391 KB) | Bundled single-file viewer containing all templates | Distribution artefact. Regenerate, never hand-edit. |
| `documents/templates/*.dc.html` · `documents/index.dc.html` · `index-print-cqrb8t.dc.html` | Claude Design **source** files — need the CD runtime | **Never open in a browser, never ship.** Design sources only. |
| `documents/support.js` · `documents/templates/support.js` | Viewer support script | Runtime, not a template. |
| `documents/_ds/dova-futures-design-system-*/` | Tokenised design system: `tokens/{colors,typography,spacing,effects,fonts}.css`, `styles.css`, `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` | **The token source Phase 5 should read from.** Currently every template hardcodes hex values inline instead — the single biggest consistency risk in the library. |
| `documents/docx/*.docx` | Word-compatible twins of each template | Parallel output. **Currently drift silently** — nothing regenerates them when the HTML changes. |

---

## 4. Findings that Phase 3 must resolve

Recorded here so they are not rediscovered later. None is fixed in this pass.

1. **Three competing reference-numbering schemes.** README (`EL-2026-001`),
   template placeholders (`DOVA/LTR/2025/XXX`), and live job-scoped practice
   (`INV-2026-POOL-001`). Pick one; document the migration.
2. **VAT rate is hardcoded 7.5%** in the quote and invoice templates, but live
   documents have shipped at both 7.5% and 5% (the 5% case is an open item
   flagged to the principal in the client-jobs status). Must be an input.
3. **Retention hardcoded at 5%** in template 09.
4. **Bank details are typed per document.** The account changed to Providus and
   five issued invoices still carry the old one. Must be single-sourced.
5. **Two incompatible pagination strategies** — `thead`/`tfoot` spacers
   (`QTE-2026-001`) vs. the two-pass `render-pdf.js` splice (`RPT-2026-POOL-002`,
   `RPT-2026-DEMO-001`). One must become standard.
6. **Templates hardcode hex values** rather than consuming `documents/_ds/`
   tokens, so `company/brand.md` and the templates can drift apart.
7. **Google Fonts is an external runtime dependency** — offline renders lose the
   brand typography silently.
8. **DOCX twins have no regeneration path** except the letterhead.
9. **Document types used in practice with no template:** variation quote
   (`VQ-2026-POOL-001`), combined Report & Quotation (`RPT-2026-DEMO-001`,
   `RPT-2026-POOL-002`), and email covering notes (drafted as raw Markdown).
10. **Template 04 filename mismatch** — `04-Completion-Form.html` vs
    `04-Completion-Certificate.docx`.
11. **Body type size.** The principal asked for 12pt body across the library
    (board, 2026-07-31); applied to one draft only. The library is unchanged and
    the change added a page to that document.

---

## Next: Phase 2

One realistic sample document per template (10 in total), for the principal to
review on formatting, wording, layout, structure, branding, consistency, and
completeness. Samples will be written to a review folder — **not** to
`projects/`, per `company/document-policy.md` §5 — and must use fictional
clients and staff. Phase 3 begins only after that review.
