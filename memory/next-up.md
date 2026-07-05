# next-up.md — Prioritised Queue

> What to do next, in order. The loop pulls the top item when no goal is given.
> Keep it ranked. Move finished items to done-log.md.

1. [ ] **Pavement area survey for QTE-2026-001 (C. K. Musa access road, Afuze)** — Items 1–4 are now firm (cutting & levelling ₦200,000; sand 3 trips @ ₦240,000; blockwork drain 50m @ ₦25,000/m; earth drain 50m @ ₦2,500/m — subtotal ₦2,295,000). Only remaining gap: measure the pavement area (m²) over the filled formation, and get client's choice of Item 5 (concrete @ ₦16,500/m²) vs. Item 6 (interlocking @ ₦13,500/m²). Update `jobs/DFL-2026-ROAD-001_C-K-Musa_Access-Road-Afuze/01-Documents/QTE-2026-001.html`: fill the Qty/Amount `[TBC]` cells for the selected alternate, delete the unselected one, compute VAT and Grand Total. _Acceptance: pavement Qty and Amount populated; one of Items 5/6 removed; Grand Total computed; still requires principal approval before it is sent to the client (see `governance/guardrails.md`)._

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
