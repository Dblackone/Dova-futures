# document-policy.md — Company Document Rules (Binding)

> **Binding rule for every agent run, in every workspace.** Any session or
> inquiry that involves creating, drafting, editing, or referencing a company
> document MUST use the templates in `documents/templates/`. Read
> `documents/README.md` first.
> (Migrated from `context/05-document-templates.md`. Brand tokens now live in
> `company/brand.md` — the single source of truth.)

---

## The single rule

**No company document is ever created from scratch.**
All documents — external, internal, financial, contractual — must start from
the canonical template for that document type. The templates carry the brand
identity, legal contact block, and structural requirements that keep all
DOVA Futures output consistent.

---

## Template selection (quick reference)

| Document needed | Template to load |
|-----------------|-----------------|
| Formal report / assessment / memo | `documents/templates/01-Report.html` |
| Pricing proposal / scope of work | `documents/templates/02-Project-Quote.html` |
| Payment request for work done | `documents/templates/03-Payment-Invoice.html` |
| Project sign-off / handover | `documents/templates/04-Completion-Form.html` |
| Staff payroll record | `documents/templates/05-Salary-Slip.html` |
| Internal memo / staff letter | `documents/templates/06-Internal-Letter.html` |
| Letter to client / contractor / agency | `documents/templates/07-External-Letter.html` |
| Periodic project status update | `documents/templates/08-Project-Report.html` |
| Milestone-linked payment claim | `documents/templates/09-Milestone-Payment-Request.html` |

---

## Mandatory steps for any document task

1. **Read the template first.** Open the `.html` file with the Read tool before
   generating any document content. The template defines which fields exist.
2. **Populate only editable fields.** Fields are marked `contenteditable` in the
   HTML (shown as orange placeholders). The letterhead, logo, colours, and
   contact block are fixed — never modify them.
3. **Apply the correct reference number.** Numbering convention (full detail in
   `documents/README.md`): `RPT-` / `QTE-` / `INV-` / `CC-` / `SAL-` / `IL-` /
   `EL-` / `PR-` / `MPR-` + `YYYY-NNN`.
4. **Do not send or publish.** Draft only. All outbound documents require
   explicit approval from the principal before delivery. See
   `governance/guardrails.md` and `company/ethics.md`.
5. **Draft in `drafts/`, file on approval.** Commit the draft to your
   workspace's `drafts/` folder — explicitly unofficial. Only after the
   principal approves does it move to `projects/<JOB>/01-Documents/` as the
   official record (and the draft copy is removed). Never file an unapproved
   document directly into `projects/`.
6. **Log the document** in the relevant workspace's `memory/done-log.md` when
   the draft is complete (document type, reference number, recipient, date
   drafted).

---

## PDF presentation standards

Every multi-page PDF export must preserve a deliberate page system:

- The page itself is white and prints flush to the PDF canvas. Do not export a
  browser-preview background, outer page border, shadow, or coloured frame.
- Page 1 uses the canonical full DOVA letterhead. Every later page uses a
  compact running header that identifies DOVA Futures and the document.
- Every page has a definite footer inside the safe print area. The footer must
  identify the company, document reference and draft/approval status, and show
  the page number where the renderer supports it.
- Headers and footers are part of the page composition, not accidental content
  at the beginning or end of a continuous browser flow. Check every rendered
  page before issue for clipping, blank spill pages and broken sections.

---

## What this rule covers

- Client-facing deliverables: quotes, invoices, letters, certificates
- Internal documents: memos, salary slips, progress reports
- Any AI-generated document requested in a session or via an inquiry prompt
- Documents generated from data (e.g. auto-populated invoices from project data)

## What this rule does NOT cover

- Code files, config files, README files — `company/engineering-standards.md`
- Website copy or UI text — `company/voice-and-tone.md`
- Raw design assets (Figma, renders) — the design system in `documents/_ds/`

---

## Brand constants

All colours, fonts, legal name, tagline, and contact details are defined once in
**`company/brand.md`** — never override them in any template, and never
re-declare the values elsewhere.

---

## Reference

- Full template documentation: `documents/README.md`
- Brand & design tokens: `company/brand.md` → `documents/_ds/`
- Guardrails: `governance/guardrails.md`
