# document-policy.md — Company Document Rules (Binding)

> **Binding rule for every agent run, in every workspace.** Any session or
> inquiry that involves creating, drafting, editing, or referencing a company
> document MUST use the templates in `templates/templates/`. Read
> `templates/README.md` first.
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
| Formal report / assessment / memo | `templates/templates/01-Report.html` |
| Pricing proposal / scope of work | `templates/templates/02-Project-Quote.html` |
| Payment request for work done | `templates/templates/03-Payment-Invoice.html` |
| Project sign-off / handover | `templates/templates/04-Completion-Form.html` |
| Staff payroll record | `templates/templates/05-Salary-Slip.html` |
| Internal memo / staff letter | `templates/templates/06-Internal-Letter.html` |
| Letter to client / contractor / agency | `templates/templates/07-External-Letter.html` |
| Periodic project status update | `templates/templates/08-Project-Report.html` |
| Milestone-linked payment claim | `templates/templates/09-Milestone-Payment-Request.html` |

---

## Mandatory steps for any document task

1. **Read the template first.** Open the `.html` file with the Read tool before
   generating any document content. The template defines which fields exist.
2. **Populate only editable fields.** Fields are marked `contenteditable` in the
   HTML (shown as orange placeholders). The letterhead, logo, colours, and
   contact block are fixed — never modify them.
3. **Apply the correct reference number.** Numbering convention (full detail in
   `templates/README.md`): `RPT-` / `QTE-` / `INV-` / `CC-` / `SAL-` / `IL-` /
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

## What this rule covers

- Client-facing deliverables: quotes, invoices, letters, certificates
- Internal documents: memos, salary slips, progress reports
- Any AI-generated document requested in a session or via an inquiry prompt
- Documents generated from data (e.g. auto-populated invoices from project data)

## What this rule does NOT cover

- Code files, config files, README files — `company/engineering-standards.md`
- Website copy or UI text — `company/voice-and-tone.md`
- Raw design assets (Figma, renders) — the design system in `templates/_ds/`

---

## Brand constants

All colours, fonts, legal name, tagline, and contact details are defined once in
**`company/brand.md`** — never override them in any template, and never
re-declare the values elsewhere.

---

## Reference

- Full template documentation: `templates/README.md`
- Brand & design tokens: `company/brand.md` → `templates/_ds/`
- Guardrails: `governance/guardrails.md`
