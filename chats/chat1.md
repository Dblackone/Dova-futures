# Business document templates

_Started 2026-06-19 00:56 UTC_

---

## User

word document templates for report, project quote, payment invoice, completion form, salary slip, internal letter, external letter, project report, milestone payment request.

## Assistant

_[tool: list_files]_

_[tool: update_todos]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Got it — building all 9 now. Let me write them in parallel batches.

_[tool: update_todos]_

## Assistant

Let me read the design system first, then build all templates in parallel.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: list_files]_

_[tool: list_files]_

Logo files aren't present in the DS. I'll use an inline SVG logo mark instead, fix all 5 existing templates, then write the remaining 4 + index.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

All 9 templates are done and loading cleanly. Here's a summary:

**Templates built** (all open from the index, click any clay-italic field to edit, then print):

| # | Template | Key sections |
|---|---|---|
| 01 | **Report** | Meta grid, 5 sections, 3-party sign-off |
| 02 | **Project Quote** | Scope table, VAT calc, terms, client acceptance |
| 03 | **Payment Invoice** | Line items, bank details, total-due highlight |
| 04 | **Completion Form** | Scope checklist, certification, 4-party sign-off |
| 05 | **Salary Slip** | Earnings/deductions tables, net pay highlight |
| 06 | **Internal Letter** | Memo header (To/From/Date/Subject), action box |
| 07 | **External Letter** | Full formal letter, CC/Enc block |
| 08 | **Project Report** | Progress table, financials, issues & risks |
| 09 | **Milestone Payment** | Verification table, retention calc, approval block |

**Notes:**
- The actual DOVA logo PNG wasn't stored in the design system assets folder — an inline SVG skyline mark was used instead. If you upload the real logo, I can swap it in across all templates in one go.
- All currency is in **₦ Naira** with 7.5% VAT and 5% retention as Nigerian construction norms.
- Print/Save PDF is handled natively by the browser — no plugins needed.

## User

can i get them in a .docx document output. That is in an editable word document

