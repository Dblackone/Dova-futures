# next-up.md — Prioritised Queue (preorder-store)

1. [ ] **Security/QA check of the payment flow** — dispatch @sec/warden +
   @qa/vera over `routes/checkout.js`, `lib/paystack.js`, `middleware/auth.js`.
   _Acceptance: webhook signature verified correctly; no order state can be
   forged; admin auth can't be bypassed._
2. [ ] **Set Render env vars & deploy** — Paystack keys, `ADMIN_PASSWORD`,
   `APP_URL`, SMTP. Deploy via Blueprint, run a test order end-to-end with a
   Paystack test key. _Requires principal (secrets + spend approval)._
3. [ ] **Persistence decision** — free plan (data wiped on redeploy) vs starter
   plan + disk. Log in `memory/decisions.md`.
4. [ ] **Seed real products** — add actual preorder products + images via admin.

## Someday / backlog
- Automated tests for order-ref generation and webhook handling.
- Order-confirmation email template aligned with `company/document-policy.md` look.
