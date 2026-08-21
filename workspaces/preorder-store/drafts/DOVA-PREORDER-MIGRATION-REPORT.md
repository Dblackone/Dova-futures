# DOVA Preorder Store — Migration and Readiness Report

> **Draft — @lead/vector [codex], 2026-08-19.** Internal migration handoff;
> not approved for live payment collection or production deployment.

**Prepared:** 19 August 2026  
**Prepared by:** @lead/vector [codex]  
**Source:** `dova-preorder/` in the `Dova-futures` hub  
**Destination:** `https://github.com/Dblackone/Dova-preorder.git`

> Draft internal handoff. This report is for repository migration and technical
> review. It does not approve a live launch, payment collection, client issue,
> or production deployment.

## 1. Purpose

The preorder store is a self-contained Express application for DOVA Futures
product batches. It provides a public catalogue and checkout flow, Paystack
payments, order tracking, staged post-order payments, email/WhatsApp
notifications, and an authenticated admin panel.

The application should move into its own repository. The separate repository
should make `server.js`, `public/`, `routes/`, `lib/`, `middleware/`, `db.js`
and `schema.sql` root-level application files. The current hub-level
`render.yaml` can move with it after its `rootDir` is changed from
`dova-preorder` to `.`.

## 2. Source map

| Source path | Role | Migration treatment |
|---|---|---|
| `dova-preorder/server.js` | Express entry point and route mounting | Keep at destination root |
| `dova-preorder/public/` | Public pages, admin pages, CSS and browser JavaScript | Keep at destination root |
| `dova-preorder/routes/` | Catalogue, orders, checkout, tracking and admin APIs | Keep at destination root |
| `dova-preorder/lib/` | Paystack, notification, calendar and order-reference logic | Keep at destination root |
| `dova-preorder/middleware/` | Admin authentication and checkout validation | Keep at destination root |
| `dova-preorder/db.js` | SQLite connection and schema initialisation | Keep at destination root |
| `dova-preorder/schema.sql` | Database tables and indexes | Keep at destination root |
| `dova-preorder/package.json` | Node runtime and dependencies | Keep; add test/lint scripts before launch |
| `dova-preorder/.env.example` | Names and examples of runtime settings | Keep; never copy `.env` |
| `render.yaml` | Render Blueprint | Move to destination root and set `rootDir: .` |

## 3. Runtime contract

### Public pages

- `/` — preorder landing page
- `/catalog` — product catalogue
- `/cart` — cart review
- `/checkout` — checkout form and payment start
- `/track` — order tracking
- `/terms` — terms and conditions

### Admin pages

- `/admin`
- `/admin/login`
- `/admin/products`
- `/admin/orders`
- `/admin/orders/:id`
- `/admin/calendar`

### API surface

- `GET /api/active`
- `GET /api/products`
- `POST /api/orders`
- `POST /api/checkout/init`
- `POST /api/checkout/webhook`
- `GET /api/track/:ref`
- Authenticated admin routes under `/api/admin/*` for preorders, products,
  orders, status changes, staged invoices, reminders, calendar and CSV export.

The Paystack webhook is load-bearing: the raw request body must remain
available for HMAC verification before JSON parsing. The current server mounts
the raw-body handler before `express.json()`; preserve this ordering during
migration.

## 4. Environment contract

Only variable names belong in source control:

- `PORT`
- `PREORDER_DB_PATH`
- `UPLOAD_DIR`
- `APP_URL`
- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_PUBLIC_KEY`
- `ADMIN_PASSWORD`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

The existing local `.env` was not inspected for values and must not be copied
to the new repository. Render secrets must be entered separately in the
dashboard. Test Paystack keys must be used for verification before any live
key is authorised.

## 5. Deployment and data risks

1. **Render root directory:** A standalone repository must use `rootDir: .` or
   omit `rootDir`. Leaving `rootDir: dova-preorder` will make deployment fail.
2. **SQLite persistence:** The current free-plan Blueprint has no persistent
   disk. Redeployment can wipe the database and uploaded product images. A
   live batch needs either a persistent disk on the starter plan or an
   explicitly accepted operational limitation.
3. **Payment integrity:** Checkout amounts are stored as integer kobo values,
   although several field names contain `naira`. The migration must preserve
   the current conversion rule: admin inputs are converted from naira to kobo,
   and Paystack receives kobo. Add tests that prove the displayed price,
   stored amount, Paystack amount and notification amount agree.
4. **Webhook replay/idempotency:** Signature checking and the existing verified
   payment guard must remain intact. The new repository needs a focused test
   for duplicate `charge.success` events.
5. **Admin security:** Admin sessions are database-backed and cookie-based.
   Review cookie flags, password handling, session expiry, CSRF exposure and
   rate limiting before production use.
6. **Notification safety:** Email and WhatsApp messages interpolate order data.
   Re-check HTML escaping and user-controlled values before live use.
7. **Uploaded media:** `UPLOAD_DIR` may point outside `public/` on a persistent
   disk. Confirm the mounted path and file-type/size restrictions before
   accepting production uploads.

## 6. Migration acceptance criteria

The preorder repository is ready for independent review when all of the
following are true:

- [ ] The destination repository contains only preorder application code and
      its required documentation/configuration.
- [ ] No `.env`, database, uploaded media, credentials or runtime cache is
      committed.
- [ ] `npm ci` succeeds from the destination root.
- [ ] `npm start` serves the landing page from the destination root.
- [ ] All public routes return the expected HTML pages.
- [ ] Catalogue and product APIs return valid JSON with prices in the agreed
      kobo convention.
- [ ] Checkout validation rejects invalid phone, state, address, empty cart and
      missing terms acceptance.
- [ ] A test order cannot select an inactive product or exceed stock.
- [ ] Paystack initialisation uses the expected reference, amount and callback.
- [ ] Invalid webhook signatures are rejected.
- [ ] Duplicate valid webhook events do not double-credit an order.
- [ ] Admin routes reject unauthenticated requests.
- [ ] Admin product/order/status/calendar/export flows work after login.
- [ ] Render Blueprint points to the correct root and has no embedded secrets.
- [ ] Persistence behaviour is documented and accepted before live orders.
- [ ] An independent security/QA checker approves the payment and admin flows.

## 7. Recommended destination layout

```text
dova-futures-preorder/
├── public/
│   ├── admin/
│   └── js/
├── routes/
├── lib/
├── middleware/
├── db.js
├── schema.sql
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── render.yaml
└── README.md
```

The hub should retain only this report, workspace memory and a link to the
separate repository after migration. The production app should not remain as a
second editable copy in the hub.

## 8. Migration sequence

1. Create the destination GitHub repository and provide its URL.
2. Copy the app into a migration branch, flattening `dova-preorder/` to the
   destination root.
3. Move and correct `render.yaml` to use the new root layout.
4. Add README instructions, security notes and a test command.
5. Run local smoke tests and the payment/admin checker against test keys only.
6. Push the migration branch and obtain independent review.
7. Configure a new Render Blueprint/service without changing live secrets.
8. Verify public pages, test checkout, webhook handling, tracking and admin
   operations.
9. Only after the new service is verified, remove the old app from this hub and
   update the hub registry and dashboard links.

## 9. Current decision

The preorder app has been prepared on destination branch
`migration/vector/preorder-extract-20260820` at commit `bdb343f`. It has not
been merged or deployed. The hub source remains intact until independent
review, principal approval and destination deployment verification are
complete. No live payment keys or Render service settings were changed.
