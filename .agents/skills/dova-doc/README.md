# DOVA Futures Document Generator Skill

Generate any DOVA Futures company document — invoice, quote, letter, report,
certificate, salary slip, or milestone payment request — directly in Claude chat.
No file access, no templates to open manually. Just describe what you need.

## Invoke

```
/dova-doc
```

Or with a type hint:

```
/dova-doc invoice
/dova-doc external letter to client
/dova-doc progress report for Ikotun project
```

## Supported Document Types

| Type | Template |
|------|----------|
| Report / Assessment / Memo | T01 |
| Project Quote / Pricing Proposal | T02 |
| Payment Invoice | T03 |
| Completion Certificate | T04 |
| Salary Slip | T05 |
| Internal Letter / Staff Memo | T06 |
| External Letter (client, contractor, agency) | T07 |
| Project Progress Report | T08 |
| Milestone Payment Request | T09 |

## What You Get

1. **Fill sheet** — a concise reference card listing every field and its value,
   so you can also fill the HTML template manually.
2. **Ready-to-use HTML** — a complete, self-contained HTML file styled with
   the DOVA Futures brand (dark green letterhead, Bebas Neue / Inter fonts,
   terracotta accent bar, DOVA logo). Save it as `.html`, open in any browser,
   and click **PRINT / SAVE PDF**.

## How it Works

The skill contains the full brand spec and field structure for all 9 templates
embedded in `SKILL.md` — so it works without reading any project file.

1. Claude identifies the document type from your request.
2. If details are missing, it asks for them in a single grouped message.
3. It generates a fill sheet and complete HTML in one response.
4. Sensible defaults are auto-applied (today's date, sequential ref numbers,
   7.5% VAT, 30-day payment terms) and clearly noted.

## Tips

- Give as much detail as you have — the more you provide, the less Claude will
  need to ask.
- For invoices and quotes, provide line items as a list:
  `Design fees – 1 lump sum – ₦350,000`
- For letters, mention the recipient's name, organisation, and the outcome you
  need — Claude will draft the body text.
- Reference numbers are auto-generated if you don't specify one.

## Brand Rules (enforced by the skill)

The letterhead, logo, colours, and contact block are fixed and cannot be changed:

- Primary: `#1C4636` (dark forest green)
- Accent: `#B85C38` (terracotta)
- Display font: Bebas Neue · Body font: Inter
- Legal name: DOVA FUTURES LIMITED
- Contact: info@dovafutures.com · +234 816 367 5439 · dovafutures.com

## Skill Structure

```
dova-doc/
├── SKILL.md   — full instructions, brand spec, HTML patterns for all 9 types
└── README.md  — this file
```
