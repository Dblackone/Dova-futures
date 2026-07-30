# DOVA Futures — Document Template System

> **What this is:** a portable, offline reference for the 10 branded document
> templates DOVA FUTURES LIMITED uses to generate every report, quote, invoice,
> certificate, letter, and payroll record. Written for a second brain — it
> states the field structure of each template, the numbering conventions, and
> the rules that govern their use, without needing the repo open.
>
> **Source of truth:** `Dova-futures/documents/templates/*.html`
> **Governing policy:** `company/document-policy.md`
> **Captured:** 2026-07-30 · reflects the templates as built 2026-06-22 (+ letterhead 2026-07-10)

---

## 1. The one rule

**No company document is ever created from scratch.**

Every document — external, internal, financial, contractual — starts from the
canonical template for its type. The templates carry the brand identity, the
legal contact block, and the structure that makes all DOVA output look like it
came from one firm. Deviating requires explicit written approval from the
principal.

This applies equally to a person opening the file in a browser and to an AI
session drafting a document. An AI must **read the template file first** to
extract the real field structure before generating any content; if it cannot
read the file, it stops and reports the blocker rather than inventing a layout.

---

## 2. The library at a glance

| # | Template file | Document | Use it for |
|---|---|---|---|
| 00 | `00-Letterhead.html` | Letterhead | Blank branded sheet — base for anything with no dedicated template |
| 01 | `01-Report.html` | General Report | Site inspection, assessment, formal summary memo |
| 02 | `02-Project-Quote.html` | Project Quotation | New client scope + pricing. **All cost breakdowns go here** |
| 03 | `03-Payment-Invoice.html` | Payment Invoice | Requesting payment for work done or materials supplied |
| 04 | `04-Completion-Form.html` | Completion Certificate | Formal sign-off that a project or phase is complete |
| 05 | `05-Salary-Slip.html` | Salary Slip | Monthly staff payroll record |
| 06 | `06-Internal-Letter.html` | Internal Memorandum | Memos and formal correspondence between staff/departments |
| 07 | `07-External-Letter.html` | External Letter | Formal letters to clients, contractors, agencies, third parties |
| 08 | `08-Project-Report.html` | Project Progress Report | Periodic status update tied to a live project |
| 09 | `09-Milestone-Payment-Request.html` | Milestone Payment Request | Payment claim at a contract-defined milestone |

Each also exists as a Word version in `documents/docx/` (note: 04 is filed as
`04-Completion-Certificate.docx`, 08 as `08-Project-Progress-Report.docx`).

**Choosing between the two payment documents:** use **03 Invoice** for a plain
request for payment (work done, materials supplied). Use **09 Milestone Payment
Request** when the claim is tied to a milestone in a signed contract schedule —
it carries the completion-verification table, retention, and previous-payments
arithmetic that a bare invoice does not.

**Choosing between the two reports:** **01 Report** is a standalone formal
document (findings + recommendations). **08 Project Progress Report** is a
recurring status update against a live contract, with progress percentages and a
financial position.

---

## 3. Reference numbering

### Documented convention

```
RPT-YYYY-NNN     Reports
QTE-YYYY-NNN     Quotes
INV-YYYY-NNN     Invoices
CC-YYYY-NNN      Completion Certificates
SAL-YYYY-NNN-XX  Salary Slips (XX = staff initials)
IL-YYYY-NNN      Internal Letters
EL-YYYY-NNN      External Letters
PR-YYYY-NNN      Progress Reports
MPR-YYYY-NNN     Milestone Payment Requests
```

### ⚠️ Known drift — the HTML does not always match

Three templates ship with a prefix that contradicts the documented convention.
Worth knowing before you file something:

| Template | Documented | Actually hardcoded in the HTML |
|---|---|---|
| 02 Project Quote | `QTE-` | `QUO-` |
| 09 Milestone Payment Request | `MPR-` | `MPA-` |
| 06 Internal Letter | `IL-YYYY-NNN` | `DOVA/MEMO/2025/XXX` |
| 07 External Letter | `EL-YYYY-NNN` | `DOVA/LTR/2025/XXX` |

Also note the templates ship with `2025` baked into the sample refs — always
overwrite the year.

### Job-scoped variant (in practice)

Real documents issued against a client job have used a job-scoped form rather
than a flat sequence — e.g. the first Pool invoice was **`INV-2026-POOL-001`**,
not `INV-2026-001`. Pattern: `PREFIX-YYYY-<JOBCODE>-NNN`.

### Job folder codes

Client jobs are foldered as `<CLIENT>-<YEAR>-<TYPE>-<NNN>_<Client>_<Description>`:

```
DFL-2026-POOL-001_FHS-Hotel_Swimming-Pool-Ibafo
DFL-2026-POOL-002_Homework_Swimming-Pool
DFL-2026-ROAD-001_C-K-Musa_Access-Road-Afuze
GM-2026-OSG-001_Grail-Movement_Hall-of-Worship-Osogbo
```

Each job folder has a fixed six-subfolder skeleton:
`01-Documents/ 02-Drawings/ 03-Models/ 04-Photos/ 05-Correspondence/ 06-Reports/`

Contract references inside templates use a separate form: `DOVA-CON-XXXX`.

---

## 4. Field structure by template

Field names below are the actual editable placeholders in the HTML. Everything
not listed — letterhead, logo, colours, contact block, footer — is fixed and
must never be edited.

### 01 — General Report → `RPT-YYYY-NNN`

**Header meta:** Report Title · Report Reference · Date · Classification
(Internal / Confidential) · Prepared By (Name, Title) · Reviewed By (Name,
Title) · Department / Unit · Approved By

**Body sections (fixed, numbered):**
1. **Executive Summary** — standalone overview for senior stakeholders who won't
   read the full report. Target 3–5 sentences.
2. **Background** — context, project details, parties, timeline, prior decisions
3. **Findings** — a numbered list; each finding states clearly what was observed
   or determined, with supporting data where available. Rows are extensible.
4. **Recommendations** — numbered, each with responsible party and timeline
5. **Conclusion** — key takeaways, recommended course of action, plus any
   limitations or assumptions

**Authorisation block:** three signature slots (Name & Title + Date each).

---

### 02 — Project Quotation → `QUO-YYYY-NNN` *(docs say `QTE-`)*

**Header:** Project / Works Description (large title) · quote number

**Quotation Details:** Date · Valid Until · Prepared By (Name, Title) ·
Project Ref (internal reference)

**Quoted For:** Client / Company Name · Contact Person · Address Line 1, City,
State · Phone · Email

**Project Description:** scope of works, site location, key project parameters,
site address, brief description of works.

**Pricing table** — columns: `# | Description of Works | Unit | Qty | Rate (₦) |
Amount (₦)`. Ships with four sample rows demonstrating the unit types in use:
**m²**, **LS** (lump sum), **No.** (count), **m** (linear).

**Totals block:** Subtotal → VAT (7.5%) → **Grand Total** (₦, Bebas display).

**Standard terms** (editable, but these are the defaults the firm quotes on):
- Payment: 50% advance mobilisation, 50% on practical completion
- Validity: quotation valid 30 days from date of issue
- Exclusions: supply of client-furnished materials unless stated
- Variations priced separately and approved in writing before execution
- All prices in Nigerian Naira (₦), inclusive of VAT where stated

**Acceptance block:** For DOVA Futures Limited (Authorised Signatory) ·
Client Acceptance (Client Name & Title).

---

### 03 — Payment Invoice → `INV-YYYY-NNN`

**Invoice Details:** Invoice Date · Due Date · Reference · PO number
(`PO-XXXXX`)

**Bill To:** Client / Company Name · Attention: Contact Person · Address Line 1 ·
City, State, Zip · Email · Phone

**Line-item table** — columns: `# | Description | Qty | Unit Price (₦) |
Amount (₦)`. Three sample rows.

**Payment Details:** Bank Name · Account Number · Sort Code · free-text
additional payment notes / instructions to client.

**Total Due** — reversed-out block (cream on green).

**Signature block:** Issued By (Name & Title, DOVA Futures Limited) ·
Received By (Client) (Name, Date).

---

### 04 — Project Completion Certificate → `CC-YYYY-NNN`

**Project Details:** Full Project Name · Contract Ref (`DOVA-CON-XXXX`) ·
Site Address (Address, City, State) · Client Name · Commencement Date ·
Completion Date · Project Manager

**Four-party sign-off** — each is Name & Title + Date:
1. DOVA Futures signatory
2. **Client Representative**
3. **Site Supervisor**
4. **Consultant / Architect** (Name, Firm & Registration No.)

The consultant slot expects a professional registration number — this is the
document that carries formal handover weight, so don't leave it blank on a
project with a consultant of record.

---

### 05 — Salary Slip → `SAL-YYYY-NNN-[INITIALS]`

**Pay period:** Month YYYY

**Employee block:** Full Name · Employee ID (`EMP-XXX`) · Department ·
Job Title · Bank Account No. · Payment Date

**Earnings column:** Basic Salary · Housing Allowance · Transport Allowance ·
(further allowance rows) · **Gross**

**Deductions column:** PAYE Income Tax · Pension (Employee contribution) ·
NHIS Contribution · Loan Repayment · **Total**

**Net Pay This Period** — reversed-out total, labelled *Take-Home Pay*.

**Payment confirmation:** account number · Bank Name · payment date.
**Signed:** HR / Finance Manager (Name & Title).

> Payroll is confidential. A salary slip is a single-recipient document — never
> batch it into a shared folder or attach it to a group thread.

---

### 06 — Internal Memorandum → `DOVA/MEMO/YYYY/XXX` *(docs say `IL-`)*

Green header bar with five labelled rows:

- **TO** — Recipient Name / Department / All Staff
- **FROM** — Sender Name, Title
- **DATE** — DD Month YYYY
- **SUBJECT** — subject of the memorandum
- **REF** — `DOVA/MEMO/YYYY/XXX`

**Body:** free-form memo text.

**Action Required** — a distinct terracotta-labelled block of action items. Each
item states the action clearly **and assigns ownership**. This is the section
that makes the memo actionable; if there's nothing to assign, question whether
this should be a memo at all.

**Sign-off:** sender (Name, Title + Date) and acknowledgement (Name + Date).

---

### 07 — External Letter → `DOVA/LTR/YYYY/XXX` *(docs say `EL-`)*

The most conventional of the set — a formal business letter on the letterhead.

- **Our Ref** · **Date**
- **Recipient block:** Recipient Full Name · Title / Designation ·
  Organisation / Company Name · Street Address, City · State, Nigeria
- **Subject** — state clearly and specifically
- **Salutation** — `Mr. / Mrs. / Dr. Surname`
- **Body** — letter text
- **Signature** — Full Name · Title / Designation
- **cc:** — Name, Title · Name, Title
- **Enclosures:** — Document 1 · Document 2

> This template goes to people outside the company. Nothing drafted here is sent
> without explicit approval from the principal.

---

### 08 — Project Progress Report → `PR-YYYY-NNN`

**Project meta:** Project Name · Client · Location (City, State) ·
Project Manager · Start Date · Report Period (Month YYYY)

**Sections:**

1. **Executive Summary** — narrative status of the period
2. **Works Progress** — table: `Work Item / Activity | Planned % | Actual % |
   Variance | Status`. Sample rows follow the construction sequence:
   Substructure Works → Superstructure / Frame → MEP Rough-in Works →
   Interior Finishes. Status values include `NOT STARTED`.
3. **Financial Summary** — six figures: Contract Value · Invoiced to Date ·
   Payments Received · Variations Approved · **Retention Held (5%)** ·
   **Amount Outstanding**
4. **Issues & Risks** — table: `Issue / Risk | Impact | Mitigation | Owner`
5. **Next Period Activities** — list of planned activities

**Sign-off:** Project Manager (Name · Date) · Client Acknowledged (Name · Date).

Note the **5% retention** default — it's baked into the template and matches how
DOVA structures its contracts. Variance (Actual − Planned) is what a client will
read first; fill it honestly rather than restating Planned.

---

### 09 — Milestone Payment Request → `MPA-YYYY-NNN` *(docs say `MPR-`)*

**Header meta:** Project Name · Client Name · Contract Ref (`DOVA-CON-XXXX`) ·
Application No. (`# of #`) · Date

**Sections:**

1. **Milestone Description** — the milestone name **as written in the contract
   schedule**. Don't paraphrase it; a mismatch here is what stalls a claim.
2. **Work Completion Verification** — table: `Work Item | Description | % Done |
   Value (₦) | Verified`
3. **Payment Calculation** → **Net Claim This Period** (reversed-out total)
4. **Supporting Documents** — checklist of attachments

**Certification:** DOVA signatory (Name, Title + Date).
**Client Approval:** Authorised Representative + Date.

---

## 5. Brand constants (never edited in a template)

| Field | Value |
|---|---|
| Legal name | **DOVA FUTURES LIMITED** |
| Tagline | DESIGNERS · BUILDERS · DEVELOPERS |
| Business | Premium Nigerian design-build construction firm |
| Location | Victoria Island, Lagos |
| Phone / WhatsApp | +234 816 367 5439 |
| Email | info@dovafutures.com |
| Website | dovafutures.com |

**Colours**

| Token | Hex | Used for |
|---|---|---|
| Primary — dark forest green | `#1C4636` | Headers, letterhead, section titles |
| Deep green | `#102A20` | Deep-contrast areas |
| Accent — terracotta | `#B85C38` | Dividers, document-type labels |
| Clay / placeholder | `#9E4F30` | Editable placeholder text |
| Surface — warm cream | `#F5EFE8` | Meta blocks, text on dark |
| Background — tan | `#E8E1D5` | Page body background |
| Body text | `#1A1A1A` | Default text |
| Mint focus | `#5AA17C` | Focus ring on editable fields |

**Type:** *Bebas Neue* for all-caps display headers and titles; *Inter* for body,
tables, and labels.

**Logo:** embedded as **inline SVG** in every template — never swap it for a
raster image and never remove it.

Tokenised CSS lives in `documents/_ds/dova-futures-design-system-*/`
(`tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`,
`fonts.css`). Pull from those rather than hardcoding hex values.

---

## 6. How the templates work (technical)

- **Pure HTML/CSS.** Zero dependencies, zero build step. Open in any browser.
- **Editable fields** are `<span contenteditable="true">` rendered in clay
  `#9E4F30`, italic. Click and type. Focus shows a mint `#5AA17C` ring and the
  text switches to normal black.
- **Print:** a PRINT / SAVE PDF button (top-right) calls `window.print()`.
  `@page { size: A4; margin: 0 }`; elements marked `[data-no-print]` hide on
  print; the paper container is `max-width: 794px` (A4 at 96 dpi).
- **`.dc.html` files are design sources**, not production. They require the
  Claude Design runtime and will not render correctly in a plain browser. The
  production file is always the plain `.html`.
- **`.docx` versions** in `documents/docx/` are for Word-compatible output.
  `00-Letterhead.docx` is generated by `scripts/gen-letterhead-docx.mjs`
  (deps `docx` + `sharp` from the root `package.json`).
- **Gallery:** `documents/index.html` is a card-grid index linking all templates.

---

## 7. Workflow — draft to filed record

```
1. Identify document type          → pick template from §2
2. Read the template HTML          → extract real field structure (never guess)
3. Populate editable fields only   → letterhead / logo / colours / contacts stay fixed
4. Apply the reference number      → §3 convention; job-scoped if tied to a job
5. Save to  drafts/                → explicitly unofficial
6. Principal reviews and approves  → nothing is sent or published before this
7. Move to  projects/<JOB>/01-Documents/   → the official record; delete the draft
8. Log it in  memory/done-log.md   → type, ref number, recipient, date drafted
```

Two rules that don't bend:

- **Never file an unapproved document directly into `projects/`.** The drafts
  folder is the difference between a proposal and a company record.
- **Never send or publish** — no email, no client delivery, no upload — without
  explicit approval from the principal.

---

## 8. Adding a new template

1. Design within the existing brand system (colours, fonts, contact block).
2. Save as `documents/templates/NN-Document-Name.html`, next sequence number.
3. Export a `.docx` into `documents/docx/`.
4. Add a row to the table in `documents/README.md`.
5. Add the reference prefix to the numbering convention.
6. Log the decision in `workspaces/document-templates/memory/decisions.md`.

**Verification before it counts as done:** open in a browser → edit fields →
PRINT / SAVE PDF → confirm a clean single-page A4 PDF with no UI chrome. Test in
Chrome and Safari.

---

## 9. Open items on this system

- Templates are **not yet reachable from the live site** — no Express route or
  nav link decided. Pending choice: public / password-gated / admin-linked.
- Full print-to-PDF workflow **not yet verified in Safari** (Chrome is verified).
- The prefix drift in §3 is unresolved — the HTML and the README disagree on
  four templates.

---

## 10. Where things live

```
documents/
├── README.md                  ← template rules + index
├── index.html                 ← gallery
├── templates/
│   ├── 00-Letterhead.html + .pdf
│   ├── 01-Report.html … 09-Milestone-Payment-Request.html
│   └── *.dc.html              ← design sources (need CD runtime — don't open)
├── docx/                      ← Word versions
└── _ds/dova-futures-design-system-*/   ← token CSS, bundle, manifest

company/
├── document-policy.md         ← the binding usage rule
├── brand.md                   ← brand tokens, single source of truth
└── voice-and-tone.md          ← how company output reads

projects/<JOB>/01-Documents/   ← where approved documents are filed
workspaces/document-templates/ ← this workspace (PROJECT.md, memory/, drafts/)
```
