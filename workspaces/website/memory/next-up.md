# next-up.md — Prioritised Queue (website)

0. [ ] **Review website migration branch** — review and merge
   `migration/vector/website-extract-20260819` in the supplied website
   repository, then verify Pages/custom-domain behaviour before removing the
   duplicate root website from the hub.

1. [ ] **Deploy contact form backend** — Configure SMTP env vars on a host
   (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`).
   Send a test form submission and confirm email arrives at
   info@dovafutures.com. _Note: GitHub Pages serves only the static frontend —
   the Express backend needs its own host (e.g. Render)._
2. [ ] **Supply real project photography** — Collect ≥8 high-quality project
   photos from client, drop into `assets/projects/`, update `data/projects.js`.
3. [ ] **Social links + OG image** — Get Instagram/TikTok handles; update
   `href`s in nav + footers in `index.html`. Create 1200×630 OG image and
   reference it in `<meta property="og:image">`.
4. [ ] **Mobile sticky CTA bar** — Persistent bottom bar on mobile with
   WhatsApp + Email shortcuts (currently only the floating circular button).
5. [ ] **Verify CNAME / domain + SSL** — confirm dovafutures.com resolves and
   SSL is active.

## Someday / backlog
- Real before/after image pairs for the hero reveal (Revit shots + renders).
- Rate limiting on `/api/contact` (`express-rate-limit`).
- `sitemap.xml` + `robots.txt`.
- Privacy-friendly analytics (Plausible/Fathom).
- UI/UX redesign phase (separate engagement — Figma designs approved first).
