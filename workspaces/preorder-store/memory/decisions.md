# decisions.md — Decision Log (preorder-store)

> Format: date — decision — alternatives considered — reason

- 2026-06-28 — SQLite (better-sqlite3) as the datastore — considered Postgres — because a single preorder batch has low write volume, zero-ops setup, and the app supports moving the DB file to a persistent disk via `PREORDER_DB_PATH`.
- 2026-07-02 — Deploy via Render Blueprint on the free plan initially — considered paid starter plan from day one — because it allows a full test cycle at zero cost; revisit before a live batch (data wiped on redeploy).
