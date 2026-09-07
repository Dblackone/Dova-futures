# decisions.md — Decision Log (website)

> Format: date — decision — alternatives considered — reason

- 2026-06-07 — Frontend stays vanilla HTML/CSS/JS in a single `index.html` — considered React/Vue with a build step — because the site is content-first, a build step adds failure modes, and Tailwind CDN + inline styles cover the need.
- 2026-06-14 — Hero uses a before/after reveal slider — considered static hero image rotation — because it demonstrates the design-build transformation story directly.
- 2026-08-11 — Website handover is kept in `drafts/` and only an archive index is added — considered moving root runtime/assets into an archive — because GitHub Pages ships the repo root and no isolated obsolete Dora/DOVA feature package was found; moving live paths would risk broken deployment and URLs.
- 2026-08-19 — Use the supplied website repository's newer refactored implementation as the migration source, and move only cross-project boundaries/configuration on a branch — considered overwriting it with the older hub root — because preserving the destination's current implementation reduces regression risk while removing the stale preorder Blueprint and committed dependency tree — logged by @lead/vector [codex].
- 2026-09-06 — Publish the principal's digital card as a standalone `/vollmann/` route in the website repository — considered another static business-card image and embedding it inside the company SPA — because a direct route is easy to share, supports portfolio/contact/vCard/QR actions, and keeps the personal identity distinct from the company card while reusing verified Dova assets — logged by @lead/vector [codex].
