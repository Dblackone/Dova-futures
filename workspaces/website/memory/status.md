# status.md — Current Snapshot (website)

**Last updated:** 2026-07-09 — Session 5 (hub reorganization; split from global memory)
**Health:** 🟢 on track

## Now
- 2026-08-11 handover extraction drafted at
  `workspaces/website/drafts/DOVA-WEBSITE-HANDOVER.md`; archive boundary created
  at `workspaces/website/archive/`.
- Site is live on GitHub Pages at dovafutures.com (workflow ships the repo root
  on push to `main`).
- Hero before/after reveal component shipped (Session 2); preorder store linked
  from the main site with a mobile optimisation pass (PR #15).
- Contact form backend NOT live — SMTP env vars not configured on a host, so
  emails don't send yet.

## Recently done (last 3)
- Preorder Store added to main site + mobile optimisation pass (commit 4f0d767).
- Hero before/after reveal built and QA-approved (HERO-01, 2026-06-14).
- Loop scaffold added alongside the site (Session 2, 2026-06-14).

## Open / blocked
- Current HTML and `data/projects.js` contain separate project inventories and
  need reconciliation during the new-repo build.
- SMTP deployment — needs host + env vars, then a live test submission to
  info@dovafutures.com.
- Real project photography and Instagram/TikTok handles not yet supplied by
  client.
- OG image (1200×630) missing.

## Notes for the next run
- No runtime files were moved during handover extraction; the archive index
  records the deploy-safety boundary.
- Frontend is one big `index.html`; no build step; Tailwind via CDN.
- Honeypot field in `server.js` is the only bot filter — never touch it.
- Website files must stay at the repo root (GitHub Pages ships the root).
