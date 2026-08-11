# decisions.md — Decision Log (website)

> Format: date — decision — alternatives considered — reason

- 2026-06-07 — Frontend stays vanilla HTML/CSS/JS in a single `index.html` — considered React/Vue with a build step — because the site is content-first, a build step adds failure modes, and Tailwind CDN + inline styles cover the need.
- 2026-06-14 — Hero uses a before/after reveal slider — considered static hero image rotation — because it demonstrates the design-build transformation story directly.
- 2026-08-11 — Website handover is kept in `drafts/` and only an archive index is added — considered moving root runtime/assets into an archive — because GitHub Pages ships the repo root and no isolated obsolete Dora/DOVA feature package was found; moving live paths would risk broken deployment and URLs.
