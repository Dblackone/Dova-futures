# tools — client-jobs

## `render-pdf.js`

Renders a client document's HTML to the branded A4 PDF we deliver: page 1 keeps
its full green letterhead, pages 2..N get a slim running header and a footer
with `Page X of Y`. This is the HW-05 treatment (first used on
`RPT-2026-POOL-002`, then `RPT-2026-DEMO-001`).

```bash
cd workspaces/client-jobs/tools
npm install
node render-pdf.js ../drafts/RPT-2026-DEMO-001_Broll-Properties_Ikeja-City-Mall-Tile-Demolition.html \
  --title "Tile Demolition — Report & Quotation" \
  --ref RPT-2026-DEMO-001
```

Output lands next to the input as `<same-name>.pdf` unless you pass `--out`.

### Environment notes

- It drives the **installed Chrome** (`puppeteer-core`, no Chromium download).
  Override the path with `CHROME_PATH` if Chrome lives elsewhere.
- The shell sandbox silently blocks Chrome — it exits with an empty status and
  writes no file. Run this with the sandbox disabled.
- The script encodes several Chrome header/footer traps in its header comment;
  read them before editing the templates.

### Verifying a render

There is no `pdftoppm` on this machine, so the Read tool cannot rasterise a PDF
directly. Use `pdfjs-dist` + `@napi-rs/canvas` to write pages out as PNG (and to
dump margin-band text with y-coordinates, which proves the header/footer really
landed in the margin box rather than in the body).

> This tool is generic to any DOVA document, not just client jobs. It sits here
> because `client-jobs` is the workspace that needed it; promoting it to a
> shared location is a `documents/`-layer change and needs a principal-reviewed
> PR.
