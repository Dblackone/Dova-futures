import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, Header, Footer,
  ImageRun, convertInchesToTwip, HeightRule, TableLayoutType,
  VerticalAlign
} from 'docx';
import { writeFileSync } from 'fs';

// ── Brand colours (RGB) ──────────────────────────────────────────────────────
const GREEN  = '1C4636';
const RUST   = 'B85C38';
const CREAM  = 'F5EFE8';
const GREY   = '6B7280';
const WHITE  = 'FFFFFF';

// ── Helper: thin border ───────────────────────────────────────────────────────
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const border = (c = GREEN) => ({ style: BorderStyle.SINGLE, size: 4, color: c });

// ── Header (letterhead top band) ─────────────────────────────────────────────
const docHeader = new Header({
  children: [
    // Green band — company name + contact block
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
      rows: [
        new TableRow({
          height: { value: convertInchesToTwip(0.85), rule: HeightRule.EXACT },
          children: [
            // Left cell — Company name
            new TableCell({
              shading: { type: ShadingType.SOLID, fill: GREEN },
              verticalAlign: VerticalAlign.CENTER,
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              width: { size: 60, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 0 },
                  children: [
                    new TextRun({ text: 'DOVA FUTURES LIMITED', bold: true, size: 28, color: WHITE, font: 'Arial', allCaps: true }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 20, after: 0 },
                  children: [
                    new TextRun({ text: 'DESIGNERS · BUILDERS · DEVELOPERS', size: 14, color: 'AABFB6', font: 'Arial', characterSpacing: 60 }),
                  ],
                }),
              ],
            }),
            // Right cell — contact details
            new TableCell({
              shading: { type: ShadingType.SOLID, fill: GREEN },
              verticalAlign: VerticalAlign.CENTER,
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              width: { size: 40, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 20 },
                  children: [ new TextRun({ text: 'info@dovafutures.com', size: 16, color: 'BFDDCC', font: 'Arial' }) ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 20 },
                  children: [ new TextRun({ text: '+234 816 367 5439', size: 16, color: 'BFDDCC', font: 'Arial' }) ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 0 },
                  children: [ new TextRun({ text: 'dovafutures.com', size: 16, color: 'BFDDCC', font: 'Arial' }) ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Rust accent bar
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
      rows: [
        new TableRow({
          height: { value: convertInchesToTwip(0.06), rule: HeightRule.EXACT },
          children: [
            new TableCell({
              shading: { type: ShadingType.SOLID, fill: RUST },
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              children: [ new Paragraph({ children: [] }) ],
            }),
          ],
        }),
      ],
    }),
    // Tagline strip
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: border('D1CBC6'), left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
      rows: [
        new TableRow({
          height: { value: convertInchesToTwip(0.22), rule: HeightRule.EXACT },
          children: [
            new TableCell({
              shading: { type: ShadingType.SOLID, fill: 'F5EFE8' },
              verticalAlign: VerticalAlign.CENTER,
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 0 },
                  children: [ new TextRun({ text: 'Designing Futures. Building Realities.', italics: true, size: 16, color: GREY, font: 'Arial', characterSpacing: 40 }) ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// ── Footer ────────────────────────────────────────────────────────────────────
const docFooter = new Footer({
  children: [
    new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 12, color: GREEN } }, children: [] }),
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              width: { size: 40, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  spacing: { before: 0, after: 20 },
                  children: [ new TextRun({ text: 'DOVA Futures Limited  ·  RC No. 8219604', bold: true, size: 16, color: '1A1A1A', font: 'Arial' }) ],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 0 },
                  children: [ new TextRun({ text: 'TIN: 32745404-0001', size: 15, color: GREY, font: 'Arial' }) ],
                }),
              ],
            }),
            new TableCell({
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 30, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 20 },
                  children: [ new TextRun({ text: 'DOVAFUTURES.COM', bold: true, size: 18, color: GREEN, font: 'Arial', allCaps: true, characterSpacing: 40 }) ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                  children: [ new TextRun({ text: 'DESIGNING FUTURES. BUILDING REALITIES.', size: 13, color: RUST, font: 'Arial', characterSpacing: 30 }) ],
                }),
              ],
            }),
            new TableCell({
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 30, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 20 },
                  children: [ new TextRun({ text: 'info@dovafutures.com', size: 16, color: GREY, font: 'Arial' }) ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 0 },
                  children: [ new TextRun({ text: '+234 816 367 5439', size: 16, color: GREY, font: 'Arial' }) ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

// ── Document ──────────────────────────────────────────────────────────────────
const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(1.6),
          bottom: convertInchesToTwip(1.1),
          left: convertInchesToTwip(0.72),
          right: convertInchesToTwip(0.72),
        },
      },
    },
    headers: { default: docHeader },
    footers: { default: docFooter },
    children: [
      // Blank body — ready for letter content
      new Paragraph({ children: [] }),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync('/home/user/Dova-futures/project/docx/00-Letterhead.docx', buffer);
console.log('DOCX done');
