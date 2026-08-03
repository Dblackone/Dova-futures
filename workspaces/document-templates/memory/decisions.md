# decisions.md — Decision Log (document-templates)

> Format: date — decision — alternatives considered — reason

- 2026-06-22 — Templates are pure HTML/CSS with contenteditable + window.print() — considered PDF-generation tooling and docx-only — because zero dependencies work in any browser, print-to-PDF is built in, and non-technical staff can use them unaided.
- 2026-06-22 — Both .html and .docx versions maintained per template — considered HTML-only — because some recipients/workflows require Word compatibility.
- 2026-08-03 — Deterministic document builder isolated at `documents/company-document-builder/`, with the approved quote design converted to Jinja2 and WeasyPrint retained as the primary renderer — considered editing the canonical static template or adding LLM generation first — because the engine must keep content, structure and design separate; Playwright/Chrome is documented as the Windows fallback when GTK/Pango is unavailable.
