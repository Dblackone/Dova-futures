# status.md — Current Snapshot (preorder-store)

**Last updated:** 2026-07-09 — Session 5 (hub reorganization; workspace created)
**Health:** 🟡 at risk (launch config pending)

## Now
- Full app built in `dova-preorder/`: catalog, cart, Paystack checkout +
  webhook, order tracking, email notifications, admin panel (products, orders,
  calendar, login).
- Render Blueprint (`render.yaml`) committed for one-click deploy; linked from
  the main site (PR #15).
- Not launched: secret env vars (Paystack keys, admin password, SMTP) not set
  in Render dashboard.

## Recently done (last 3)
- Render Blueprint added for one-click deploy (commit 6d2505b).
- Store linked from main site + mobile optimisation (PR #15).
- Initial platform build (catalog/cart/checkout/track/admin).

## Open / blocked
- Env vars must be set in Render dashboard before go-live.
- Free plan wipes SQLite + uploads on redeploy — decide: accept for first batch
  or upgrade to starter + persistent disk before launch.
- No independent checker run recorded for the payment flow (Paystack webhook
  signature, order state transitions) — needed before real money moves.

## Notes for the next run
- App is self-contained in `dova-preorder/` with its own package.json (port 3001).
- Webhook raw-body ordering in server.js is load-bearing.
- Consider @sec/warden review before launch (payments + auth touched).
