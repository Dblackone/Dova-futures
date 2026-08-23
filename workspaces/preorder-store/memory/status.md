# status.md — Current Snapshot (preorder-store)

**Last updated:** 2026-08-20 — standalone migration branch pushed
**Health:** 🟡 at risk (launch config pending)

## Now
- Full app built in `dova-preorder/`: catalog, cart, Paystack checkout +
  webhook, order tracking, email notifications, admin panel (products, orders,
  calendar, login).
- Migration/readiness report drafted at
  `workspaces/preorder-store/drafts/DOVA-PREORDER-MIGRATION-REPORT.md`.
- Standalone migration branch `migration/vector/preorder-extract-20260820`
  pushed to `Dblackone/Dova-preorder`; application is flattened to the
  repository root with corrected Render configuration.
- Render Blueprint (`render.yaml`) committed for one-click deploy; linked from
  the main site (PR #15).
- Not launched: secret env vars (Paystack keys, admin password, SMTP) not set
  in Render dashboard.

## Recently done (last 3)
- Standalone preorder migration branch pushed (commit `bdb343f`).
- Migration/readiness report drafted with acceptance gates.
- Render Blueprint added for one-click deploy (commit 6d2505b).

## Open / blocked
- Env vars must be set in Render dashboard before go-live.
- Free plan wipes SQLite + uploads on redeploy — decide: accept for first batch
  or upgrade to starter + persistent disk before launch.
- No independent checker run recorded for the payment flow (Paystack webhook
  signature, order state transitions) — needed before real money moves.
- Migration branch requires independent security/QA review and principal merge
  approval; no source files have been removed from the hub.

## Notes for the next run
- App is self-contained in `dova-preorder/` with its own package.json (port 3001).
- Destination pins Node 24 and upgrades `better-sqlite3` to a compatible 12.x
  release because Render now defaults new services to Node 24.
- Webhook raw-body ordering in server.js is load-bearing.
- Consider @sec/warden review before launch (payments + auth touched).
