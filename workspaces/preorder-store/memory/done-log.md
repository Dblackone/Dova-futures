# done-log.md — Completed Work (append-only, preorder-store)

> Format: date — what — outcome — verified by

- 2026-06-28 — Preorder platform built (catalog, cart, Paystack checkout, tracking, admin) and linked from main site — merged via PR #15 — verified by review
- 2026-07-02 — Render Blueprint added for one-click deploy (commit 6d2505b) — free-plan persistence caveat documented in render.yaml — verified by manual review
- 2026-08-19 — Preorder migration/readiness report drafted — documented source map, public/admin/API surface, environment contract, deployment/data risks, acceptance criteria and standalone layout; source app remains in the hub pending destination repository — verified by direct source inspection, by @lead/vector [codex]
- 2026-08-20 — Standalone preorder migration branch — pushed `migration/vector/preorder-extract-20260820` (`bdb343f`) to `Dblackone/Dova-preorder`; flattened the app, corrected Render paths, pinned Node 24, updated native SQLite compatibility and added checkout validation tests — locally verified by clean install, 3 tests, public/API/admin/signature smoke checks and duplicate valid-webhook replay; independent checker pending — by @lead/vector [codex]
