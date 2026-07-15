# PROJECT.md — Preorder Store

## Identity

- **Workspace slug:** `preorder-store`
- **One-line purpose:** Preorder/e-commerce sale platform for DOVA Futures —
  catalog, cart, Paystack checkout, order tracking, admin panel.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — built; launch config pending

## Why this project exists

Company goal 3-adjacent revenue: sell products/preorder batches directly,
extending the brand beyond construction services (`company/goals.md`).

## Where the code lives

**`dova-preorder/`** — a self-contained Express app (own `package.json`, own
`.env.example`):

| Path | Purpose |
|------|---------|
| `dova-preorder/server.js` | App entry — static, API routes, HTML page routes (port 3001 default) |
| `dova-preorder/db.js` + `schema.sql` | better-sqlite3 database init + migrations |
| `dova-preorder/routes/` | `catalog` `orders` `checkout` (Paystack + webhook) `track` `admin` |
| `dova-preorder/lib/` | `paystack.js`, `notify.js` (email), `order-ref.js`, `calendar.js` |
| `dova-preorder/middleware/` | `auth.js` (admin), `validate.js` |
| `dova-preorder/public/` | Pages: landing, catalog, cart, checkout, track, terms + `admin/` pages and JS |

## How to run / build / test

```bash
cd dova-preorder
npm install
cp .env.example .env    # fill values
npm start               # → http://localhost:3001
```

No automated test suite yet — verify by browsing the pages and exercising the
API routes. The Paystack webhook (`/api/checkout/webhook`) consumes a **raw**
body — it is registered before `express.json()`; keep it that way.

Env vars: `ADMIN_PASSWORD`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`,
`APP_URL`, `SMTP_*`, `SMTP_FROM`, optional `PREORDER_DB_PATH` / `UPLOAD_DIR`.

## Deployment

- **Render Blueprint** — root-level `render.yaml` with `rootDir: dova-preorder`,
  `plan: free`, auto-deploy on push to `main`. **Do not move or rename
  `dova-preorder/` or `render.yaml`** without rewiring the blueprint.
- **Free-plan trap:** no persistent disk — SQLite DB and uploaded images are
  wiped on every redeploy. Don't push new code while orders are live. To add
  persistence: upgrade plan to `starter`, uncomment the `disk` block +
  `PREORDER_DB_PATH`/`UPLOAD_DIR` env vars in `render.yaml` (app already
  supports both).

## Project-specific rules & traps

- **Webhook raw body** — `express.raw()` for `/api/checkout/webhook` must stay
  registered before `express.json()` or Paystack signature verification breaks.
- **Secrets** — Paystack keys and `ADMIN_PASSWORD` only via env (`sync: false`
  in render.yaml). Never commit them.
- **Money integrity** — pricing, order references (`lib/order-ref.js`), and
  payment states follow `company/ethics.md` financial-integrity rules.
- Store UI follows `company/brand.md` tokens and `company/voice-and-tone.md`.

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` → 3. this file →
4. `workspaces/preorder-store/memory/status.md` + `next-up.md`
