# next-up.md — Prioritised Queue

> What to do next, in order. The loop pulls the top item when no goal is given.
> Keep it ranked. Move finished items to done-log.md.

1. [ ] **Client sign-off on pavement alternate for QTE-2026-001 (C. K. Musa access road, Afuze)** — All items are now fully priced: Items 1–4 firm (subtotal ₦2,295,000); pavement area confirmed at 200m² (proposed — verify by site measurement before mobilisation); both alternates computed — Alternate A (concrete) Grand Total ₦6,014,625, Alternate B (interlocking, recommended) Grand Total ₦5,369,625. Get the client's final choice, then edit `jobs/DFL-2026-ROAD-001_C-K-Musa_Access-Road-Afuze/01-Documents/QTE-2026-001.html` to remove the unselected alternate row and totals block, leaving a single Grand Total. _Acceptance: one alternate selected and the other's row/totals removed; still requires principal approval before it is sent to the client (see `governance/guardrails.md`)._

2. [ ] **Verify BIM standards with a checker run** — Have a separate run (e.g. `@qa/vera`) load `bim-standards/pyRevit-extension/` in an actual Revit + pyRevit environment, run each of the 5 tools against a test model, and confirm the naming regexes in `Naming QA Audit` actually match the examples in files 02–06. _Acceptance: all 5 tools run without error on a real model; at least one intentional naming violation per category is correctly flagged._

3. [ ] **Wire templates into Express** — Decide with client: public static route, password-gated route, or nav link from main site. Implement chosen option in `server.js`. Test full browse → edit → print-to-PDF workflow in Chrome and Safari. _Acceptance: templates accessible from the live site URL; no broken links; print produces clean PDF with UI chrome hidden._

4. [ ] **Deploy contact form backend** — Set SMTP env vars on Render dashboard (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`). Send a test form submission and confirm email arrives at `info@dovafutures.com`.

5. [ ] **Supply real project photography** — Collect from client: minimum 8 high-quality project photos. Drop into `assets/projects/`, update `data/projects.js` with correct paths. Test hero image rotation and About section preview.

6. [ ] **Social links + OG image** — Get Instagram and TikTok handles from client. Update `href` attributes in nav and all footers in `index.html`. Create a 1200×630px landscape photo for OG image, reference it in `<meta property="og:image">`.

7. [ ] **Mobile sticky CTA bar** — Add persistent `position: fixed; bottom: 0` bar on mobile with WhatsApp + Email shortcut buttons. Currently only the floating circular button exists.

## Someday / backlog
- Add password protection (`express-basic-auth`) to the `/templates` route if client wants staff-only access.
- Add real before/after image pairs (Revit screenshots + final renders) for the hero reveal.
- Rate limiting on `/api/contact` (`express-rate-limit`).
- `sitemap.xml` and `robots.txt`.
- Google Analytics or privacy-friendly alternative (Plausible, Fathom).
- UI/UX Redesign phase (separate engagement — Figma designs must be approved first).
