# PROJECT.md — Document Templates & Design System

## Identity

- **Workspace slug:** `document-templates`
- **One-line purpose:** The canonical library of branded company document
  templates (quotes, invoices, letters, reports, certificates) + the
  programmatic design system behind all DOVA visual output.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — templates done; Express integration pending

## Why this project exists

Enforces company goal 3 (operational consistency): every document any person or
agent produces looks like it came from the same firm. The binding usage rule
lives in `company/document-policy.md` — **this workspace maintains the library;
that policy governs everyone who uses it.**

## Where the files live

**`documents/`** — the document-template library (renamed from `project/` in the
2026-07 reorg):

| Path | Purpose |
|------|---------|
| `documents/README.md` | Full template documentation: index, numbering, how-to (human + AI) |
| `documents/index.html` | Template gallery — card grid linking all 9 templates |
| `documents/templates/NN-*.html` | The production templates (pure HTML/CSS, print-ready): 00-Letterhead + the 9 document types |
| `scripts/gen-letterhead-docx.mjs` | Generator for the letterhead `.docx` (deps `docx` + `sharp` live in the root package.json) |
| `documents/templates/*.dc.html` + `documents/index.dc.html` | Claude Design source files — need the CD runtime; do NOT open in a browser |
| `documents/docx/*.docx` | Word-compatible versions |
| `documents/_ds/dova-futures-design-system-*/` | Design system: token CSS files, bundle, manifest |
| `memory/archive/chats/chat1.md`, `chat2.md` | Design session transcripts (rationale) |

Note: generated documents for a specific client job live in that job's folder
under `projects/<JOB>/01-Documents/` (see `workspaces/client-jobs/`), or in the
workspace's `drafts/` until approved — never loose in the template library.

## How templates work (tech)

- Pure HTML/CSS, zero dependencies, zero build step.
- Editable fields: `<span contenteditable>` with orange-clay placeholders.
- Print: `window.print()` button; `@page { size: A4; margin: 0 }`;
  `[data-no-print]` hides UI chrome; paper container `max-width: 794px`.
- Brand tokens per `company/brand.md` — letterhead, logo (inline SVG), colours,
  and contact block are fixed; never modify them.

## Verification

Open a template in a browser → edit fields → PRINT/SAVE PDF → confirm a clean
single-page A4 PDF with no UI chrome. Test in Chrome and Safari.

## Project-specific rules & traps

- **Adding a template:** design in the brand system, save as
  `documents/templates/NN-Name.html` (next sequence number), export a `.docx`,
  add a row to `documents/README.md`, log the decision in this workspace's
  `memory/decisions.md`.
- Reference-number conventions are documented in `documents/README.md` and
  summarised in `company/document-policy.md`.
- The `.dc.html` files are design sources, not production files.

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` (especially `document-policy.md` +
   `brand.md`) → 3. this file + `documents/README.md` →
4. `workspaces/document-templates/memory/status.md` + `next-up.md`
