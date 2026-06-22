# next-up.md — Prioritised Queue

> What to do next, in order. The loop pulls the top item when no goal is given.
> Keep it ranked. Move finished items to done-log.md.

1. [ ] **Wire templates into Express** — Decide with client: public static route, password-gated route, or nav link from main site. Implement chosen option in `server.js`. Test full browse → edit → print-to-PDF workflow in Chrome and Safari. _Acceptance: templates accessible from the live site URL; no broken links; print produces clean PDF with UI chrome hidden._

2. [ ] **Deploy contact form backend** — Set SMTP env vars on Render dashboard (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`). Send a test form submission and confirm email arrives at `info@dovafutures.com`.

3. [ ] **Supply real project photography** — Collect from client: minimum 8 high-quality project photos. Drop into `assets/projects/`, update `data/projects.js` with correct paths. Test hero image rotation and About section preview.

4. [ ] **Social links + OG image** — Get Instagram and TikTok handles from client. Update `href` attributes in nav and all footers in `index.html`. Create a 1200×630px landscape photo for OG image, reference it in `<meta property="og:image">`.

5. [ ] **Mobile sticky CTA bar** — Add persistent `position: fixed; bottom: 0` bar on mobile with WhatsApp + Email shortcut buttons. Currently only the floating circular button exists.

## Someday / backlog
- Add password protection (`express-basic-auth`) to the `/templates` route if client wants staff-only access.
- Add real before/after image pairs (Revit screenshots + final renders) for the hero reveal.
- Rate limiting on `/api/contact` (`express-rate-limit`).
- `sitemap.xml` and `robots.txt`.
- Google Analytics or privacy-friendly alternative (Plausible, Fathom).
- UI/UX Redesign phase (separate engagement — Figma designs must be approved first).
