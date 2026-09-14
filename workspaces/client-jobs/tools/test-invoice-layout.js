// Regression checks for the canonical invoice renderer. @lead/vector [codex]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { PDFDocument } = require('pdf-lib');
const root = path.resolve(__dirname, '../../..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dova-invoice-test-'));
function render(src, out) {
  return spawnSync(process.execPath, [path.join(__dirname, 'render-pdf.js'), src,
    '--title', 'Invoice regression', '--ref', 'INV-TEST-001', '--out', out], { encoding: 'utf8' });
}
(async () => {
  const template = path.join(root, 'documents/templates/03-Payment-Invoice.html');
  for (const source of [template, path.join(root, 'workspaces/client-jobs/drafts/INV-2026-DEMO-001_Broll-Properties_Contract-Sum.html')]) {
    const out = path.join(temp, 'valid.pdf');
    const result = render(source, out);
    assert.equal(result.status, 0, result.stderr);
    const pdf = await PDFDocument.load(fs.readFileSync(out));
    assert.equal(pdf.getPageCount(), 1);
    assert.ok(Math.abs(pdf.getPage(0).getWidth() - 595.28) < 1);
    assert.ok(Math.abs(pdf.getPage(0).getHeight() - 841.89) < 1);
  }
  const oversized = path.join(temp, 'oversized.html');
  fs.writeFileSync(oversized, fs.readFileSync(template, 'utf8').replace('<!-- Line Items -->', '<div style="height:3000px">OVERFLOW SENTINEL</div><!-- Line Items -->'));
  const target = path.join(temp, 'protected.pdf');
  fs.writeFileSync(target, 'existing output must survive');
  const rejected = render(oversized, target);
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /one-page capacity/);
  assert.equal(fs.readFileSync(target, 'utf8'), 'existing output must survive');
  console.log('PASS: template and corrected legacy invoice are one A4 page; overflow rejected without overwriting output.');
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => fs.rmSync(temp, { recursive: true, force: true }));
