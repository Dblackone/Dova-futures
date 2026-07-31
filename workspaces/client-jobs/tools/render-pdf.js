#!/usr/bin/env node
/**
 * render-pdf.js — render a client document HTML to a branded A4 PDF.
 *
 * Page 1 keeps the document's own full green letterhead. Pages 2..N get a slim
 * running header (DOVA FUTURES LIMITED + document title, orange rule) and a
 * footer (RC No. · DOVAFUTURES.COM · doc ref · Page X of Y). This is the HW-05
 * treatment first used on RPT-2026-POOL-002.
 *
 * Setup (once, in this folder):   npm install
 * Usage:
 *   node render-pdf.js <input.html> --title "Tile Demolition — Report & Quotation" \
 *                                   --ref RPT-2026-DEMO-001 [--out <output.pdf>]
 *
 * Traps this script exists to encode (each one cost a session to find):
 *  - The header/footer template's ROOT element must carry an explicit font-size,
 *    or Chrome collapses the template to zero height and silently renders nothing.
 *  - Flexbox does not lay out reliably inside Chrome's margin box — use tables.
 *  - Webfonts do not load in the isolated header/footer context, so those strips
 *    use Arial. Page bodies still get the real brand fonts.
 *  - Both passes must use identical margins, or pagination drifts between them
 *    and the splice puts the wrong content on page 1.
 */
const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH
  || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Brand tokens — company/brand.md (green #1C4636, orange #B85C38, grey #6B7280)
const GREEN = '#1C4636', ORANGE = '#B85C38', GREY = '#6B7280', RULE = '#D1CBC6';

// Identical in both passes so pagination is comparable page-for-page.
const MARGIN = { top: '20mm', bottom: '16mm', left: '0mm', right: '0mm' };

function parseArgs(argv) {
  const src = argv[0];
  if (!src || src.startsWith('--')) {
    throw new Error('Usage: node render-pdf.js <input.html> --title "..." --ref <DOC-REF> [--out <file.pdf>]');
  }
  const opts = { src: path.resolve(src) };
  for (let i = 1; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '');
    if (argv[i + 1] === undefined) throw new Error(`Missing value for --${key}`);
    opts[key] = argv[i + 1];
  }
  if (!opts.title) throw new Error('--title is required (shown top-right on pages 2..N)');
  if (!opts.ref) throw new Error('--ref is required (document reference, shown in the footer)');
  opts.out = opts.out ? path.resolve(opts.out) : opts.src.replace(/\.html?$/i, '.pdf');
  if (!fs.existsSync(opts.src)) throw new Error(`Input not found: ${opts.src}`);
  return opts;
}

const headerTemplate = (title) => `
<div style="font-size:8px;font-family:Arial,Helvetica,sans-serif;width:100%;
            padding:7mm 12.7mm 0;box-sizing:border-box;-webkit-print-color-adjust:exact;">
  <table style="width:100%;border-collapse:collapse;font-size:8px;"><tr>
    <td style="text-align:left;font-size:8px;font-weight:bold;color:${GREEN};letter-spacing:0.14em;">DOVA FUTURES LIMITED</td>
    <td style="text-align:right;font-size:7.5px;color:${GREY};letter-spacing:0.05em;">${title}</td>
  </tr></table>
  <div style="height:1.5px;background:${ORANGE};width:100%;margin-top:3px;"></div>
</div>`;

const footerTemplate = (ref) => `
<div style="font-size:7px;font-family:Arial,Helvetica,sans-serif;width:100%;
            padding:0 12.7mm 6mm;box-sizing:border-box;-webkit-print-color-adjust:exact;">
  <div style="height:1px;background:${RULE};width:100%;margin-bottom:3px;"></div>
  <table style="width:100%;border-collapse:collapse;font-size:7px;"><tr>
    <td style="text-align:left;font-size:7px;color:${GREY};">DOVA Futures Limited &middot; RC No. 8219604</td>
    <td style="text-align:center;font-size:7px;color:${GREEN};font-weight:bold;letter-spacing:0.12em;">DOVAFUTURES.COM</td>
    <td style="text-align:right;font-size:7px;color:${GREY};">${ref} &middot; Page <span class="pageNumber"></span> of <span class="totalPages"></span></td>
  </tr></table>
</div>`;

async function renderPasses(opts, tmpDir) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    // CHROME_ARGS appends space-separated launch flags for environments that
    // need them — e.g. a Linux container running as root requires --no-sandbox,
    // which we deliberately do NOT enable by default.
    args: ['--disable-gpu', '--no-first-run', '--no-default-browser-check']
      .concat((process.env.CHROME_ARGS || '').split(' ').filter(Boolean)),
  });
  try {
    const page = await browser.newPage();
    await page.goto('file:///' + opts.src.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 60000 });
    try { await page.evaluate(() => document.fonts.ready); } catch { /* fonts API unavailable — proceed */ }

    const common = { format: 'A4', printBackground: true, margin: MARGIN };
    const withHF = path.join(tmpDir, 'pass-header.pdf');
    const noHF = path.join(tmpDir, 'pass-plain.pdf');

    // Pass A — running header/footer on every page. We keep pages 2..N.
    await page.pdf({
      ...common, path: withHF, displayHeaderFooter: true,
      headerTemplate: headerTemplate(opts.title),
      footerTemplate: footerTemplate(opts.ref),
    });
    // Pass B — no header/footer. We keep page 1, which carries the letterhead.
    await page.pdf({ ...common, path: noHF, displayHeaderFooter: false });

    return { withHF, noHF };
  } finally {
    await browser.close();
  }
}

async function splice({ withHF, noHF }, outPath) {
  const a = await PDFDocument.load(fs.readFileSync(withHF));
  const b = await PDFDocument.load(fs.readFileSync(noHF));
  if (a.getPageCount() !== b.getPageCount()) {
    throw new Error(`Pagination drift: header pass=${a.getPageCount()} plain pass=${b.getPageCount()} — aborting`);
  }
  const total = a.getPageCount();

  const out = await PDFDocument.create();
  const [first] = await out.copyPages(b, [0]);
  out.addPage(first);
  const rest = [...Array(total - 1).keys()].map((i) => i + 1);
  (await out.copyPages(a, rest)).forEach((p) => out.addPage(p));

  fs.writeFileSync(outPath, await out.save());
  return total;
}

(async () => {
  const opts = parseArgs(process.argv.slice(2));
  const tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'dova-pdf-'));
  try {
    const total = await splice(await renderPasses(opts, tmpDir), opts.out);
    console.log(`OK pages=${total} -> ${opts.out}`);
    console.log(`page 1: letterhead, no running header | pages 2-${total}: branded header + footer with page numbers`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
