# 05 — Document Template Guidelines

> **Binding rule for every agent run.** Any session or inquiry that involves
> creating, drafting, editing, or referencing a company document MUST use the
> templates in `project/templates/`. Read `project/README.md` first.

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
| Formal report / assessment / memo | `project/templates/01-Report.html` |
| Pricing proposal / scope of work | `project/templates/02-Project-Quote.html` |
| Payment request for work done | `project/templates/03-Payment-Invoice.html` |
| Project sign-off / handover | `project/templates/04-Completion-Form.html` |
| Staff payroll record | `project/templates/05-Salary-Slip.html` |
| Internal memo / staff letter | `project/templates/06-Internal-Letter.html` |
| Letter to client / contractor / agency | `project/templates/07-External-Letter.html` |
| Periodic project status update | `project/templates/08-Project-Report.html` |
| Milestone-linked payment claim | `project/templates/09-Milestone-Payment-Request.html` |

---

## Mandatory steps for any document task

1. **Read the template first.** Open the `.html` file with the Read tool before
   generating any document content. The template defines which fields exist.
2. **Populate only editable fields.** Fields are marked `contenteditable` in the
   HTML (shown as orange placeholders). The letterhead, logo, colours, and
   contact block are fixed — never modify them.
3. **Apply the correct reference number.** See `project/README.md` for the
   numbering convention (e.g. `INV-2025-001`, `EL-2025-003`).
4. **Do not send or publish.** Draft only. All outbound documents require
   explicit approval from the principal before delivery. See `governance/guardrails.md`.
5. **Log the document** in `memory/done-log.md` when the draft is complete
   (document type, reference number, recipient, date drafted).

---

## What this rule covers

- Client-facing deliverables: quotes, invoices, letters, certificates
- Internal documents: memos, salary slips, progress reports
- Any AI-generated document requested in a session or via an inquiry prompt
- Documents generated from data (e.g. auto-populated invoices from project data)

## What this rule does NOT cover

- Code files, config files, README files — use normal code conventions
- Website copy or UI text — governed by `context/03-team-rules.md`
- Raw design assets (Figma, renders) — governed by the design system in
  `project/_ds/`

---

## Brand constants (never override these in any template)

```
Primary colour:  #1C4636  (dark forest green — headers, letterhead)
Accent colour:   #B85C38  (terracotta — dividers, document type label)
Surface:         #F5EFE8  (warm cream — meta blocks, highlights)
Display font:    Bebas Neue
Body font:       Inter
Legal name:      DOVA FUTURES LIMITED
Tagline:         DESIGNERS · BUILDERS · DEVELOPERS
Phone:           +234 816 367 5439
Email:           info@dovafutures.com
Website:         dovafutures.com
```

---

## Reference

Full template documentation: `project/README.md`
Brand & design tokens: `project/_ds/dova-futures-design-system-*/`
Guardrails: `governance/guardrails.md`
