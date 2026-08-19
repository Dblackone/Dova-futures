# decisions.md — Decision Log (preorder-store)

> Format: date — decision — alternatives considered — reason

- 2026-06-28 — SQLite (better-sqlite3) as the datastore — considered Postgres — because a single preorder batch has low write volume, zero-ops setup, and the app supports moving the DB file to a persistent disk via `PREORDER_DB_PATH`.
- 2026-07-02 — Deploy via Render Blueprint on the free plan initially — considered paid starter plan from day one — because it allows a full test cycle at zero cost; revisit before a live batch (data wiped on redeploy).
- 2026-08-19 — Keep the preorder app in its own repository with the current `dova-preorder/` contents flattened to repository root — considered leaving a second editable copy in the hub or nesting the app in the new repository — because a single standalone Render root reduces deployment ambiguity and prevents hub/source drift; migration report records the acceptance gates — logged by @lead/vector [codex].
