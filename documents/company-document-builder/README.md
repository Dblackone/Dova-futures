# Offline company document builder

This is the first deterministic document engine for DOVA Futures. It accepts structured JSON, validates it, calculates quotation figures with `Decimal`, renders a registered Jinja2 template, and converts the result to a branded A4 PDF.

The project lives under `documents/` because the repository routes document-template code there. The existing canonical templates remain unchanged. The quotation template here is a Jinja2 conversion of the approved `documents/templates/02-Project-Quote.html` design. The boundary is deliberate:

```text
Content: JSON (manual now, local LLM later)
Structure: Python
Design: approved HTML template
Output: HTML then A4 PDF
```

## Setup on Windows

Use Python 3.11 or later from this directory:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

WeasyPrint normally installs its Python dependencies with current wheels, but Windows also needs the GTK/Pango runtime. If installation reports missing GTK/Pango libraries, install the matching 64-bit GTK runtime (or MSYS2 GTK packages) and put its `bin` directory on `PATH`. The renderer keeps WeasyPrint as the primary engine and, when that native runtime is unavailable, uses the documented Playwright/installed-Chrome fallback and prints a warning. The example template uses an inline logo and system font fallbacks.

## Build and render the example

```powershell
python build.py --type quotation --data data/quotation-example.json
python render.py --input output/html/quotation-DOVA-QT-2026-008.html
```

The first command writes `output/html/quotation-DOVA-QT-2026-008.html`; the second writes the matching file under `output/pdf/`. The PDF renderer uses two identical pagination passes: page one comes from the plain pass and retains the full letterhead; pages two onward come from the running-header pass. Every page receives the DOVA footer with live page numbers. Output names can be overridden:

```powershell
python build.py --type quotation --data data/quotation-example.json --output client-quotation
python render.py --input output/html/client-quotation.html --output final-client-quotation
```

Run tests with:

```powershell
pytest
```

The tests cover validation errors, safe names, strict input handling, Decimal totals, generated content, print-layout guarantees, and the renderer's input guard. A PDF smoke test can be run with the commands above; the first automated phase intentionally does not compare PDF pixels visually.

## Adding a document type

1. Add a registry entry in `config/documents.json` with a template path, output prefix, and optional schema/calculator.
2. Add the template under `templates/<type>/template.html`.
3. Add a schema under `data/schemas/` when the input needs validation.
4. Keep the template responsible for layout and use Jinja variables/loops for values and repeated rows.
5. Add focused tests before using the type.

The core builder does not contain invoice, report, or payment-request fields. Those types currently have placeholder directories only; no incomplete template is claimed as working.

## Converting an existing HTML template

Start by copying the approved file from `documents/templates/`. Replace editable text with Jinja expressions, for example:

```html
<p>{{ client.company }}</p>
{% for item in items %}
<tr><td>{{ loop.index }}</td><td>{{ item.description }}</td><td>{{ item.formatted_amount }}</td></tr>
{% endfor %}
```

Use `{% if optional_value %}` for explicitly optional sections. Keep the letterhead, inline SVG logo, footer contact block, colours, and print structure from the approved template. Do not calculate money in HTML or JavaScript.

## JSON and financial rules

Quotation input is validated by `data/schemas/quotation-schema.json`. Python calculates `quantity × rate`, subtotal, optional tax, optional discount, and grand total. Currency symbol and decimal places are configurable. Invalid or missing required values fail clearly; manually supplied line-item amounts are ignored.

## Future local LLM boundary

No LLM integration is included in this phase. A future `llm/` module may call an OpenAI-compatible local endpoint such as LM Studio, configured through environment variables and returning only schema-valid JSON. It must never generate HTML/CSS, alter a template, invent missing facts, or run code. Keep secrets out of source control.

## Common errors

- `Unknown document type`: add the type to `config/documents.json`.
- `failed schema validation`: inspect the field path in the error and correct the JSON.
- `Template not found`: create the registered template path; empty placeholder directories are intentional.
- `Could not render PDF`: verify the WeasyPrint installation and its Windows native dependencies.
- A PDF may run longer than one page. The renderer deliberately uses the established DOVA pattern: full letterhead on page one, compact running header from page two, and a repeated identifiable footer on every page.
