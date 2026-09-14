# Canonical invoice generation

Established at the principal's instruction on 13 September 2026 by @lead/vector [codex].

Use `documents/templates/03-Payment-Invoice.html` and `workspaces/client-jobs/tools/render-pdf.js` for every invoice. Do not use ad-hoc browser scale settings or patch a PDF after generation.

History checked: POOL invoice commits `5a853ca` and `07c2f57` repeatedly corrected PDF-only scale (65%, then 78%). Corrected DEMO-001 and AFUZE-004 HTML reset html/body margins and the data-wrap screen mat; the original POOL-006 and canonical template omitted those resets. Commit `6730cb7` documents the default body-margin trap; `fc943c7` fixes report pagination/footer consistency. These report behaviours remain in the non-invoice renderer branch.

The invoice template now owns the print CSS: A4, 10mm margins on every side, no screen-wrapper padding/min-height/shadow, compact spacing and normal filled-field typography. The renderer loads that exact CSS for legacy and new invoices (INV reference or invoice marker). It uses one in-document footer, verifies geometry, permits bounded fitting down to 85%, and checks the actual PDF has exactly one page before replacing output. Oversized content fails explicitly rather than clipping, shrinking indefinitely or silently making page two.

```powershell
node workspaces/client-jobs/tools/render-pdf.js <invoice.html> --title "Invoice" --ref INV-YYYY-XXX --out <invoice.pdf> --html-out <portable-invoice.html>
node workspaces/client-jobs/tools/test-invoice-layout.js
```

`--html-out` exports the effective canonical print CSS and fit setting with the invoice. Use the renderer again after edits; browser print settings can override HTML margins and are not the verified generation method. Inspect rendered PDF text and raster appearance before filing. File in the existing client/project folder under `Documents/DOVA Futures Limited/01_Projects`, not only the development checkout. Do not create a new client folder or send to the client without instruction.
