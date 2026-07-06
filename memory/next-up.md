# next-up.md — Prioritised Queue

> What to do next, in order. The loop pulls the top item when no goal is given.
> Keep it ranked. Move finished items to done-log.md.

1. [x] **Verify BIM standards with a checker run** — Done 2026-07-06: ran the 5 tools' core logic live against an open Revit 2026 document via `Revit_Connector`, inside rolled-back transactions. Confirmed collectors/Transaction/BuiltInParameter usage all work against the real API, and confirmed the audit correctly flags every non-compliant view/material on an unmigrated stock template. Found + fixed 2 bugs (material-name regex missing hyphenated categories; `ProjectBrowser` view-type false positive) — see `memory/done-log.md` 2026-07-06 BIM-02. Follow-up still open, see below.

1a. [ ] **`@qa/vera` pass on a real firm project** — This session's live test used Revit's stock out-of-box template (no real project content, no `DF_ProjectCode` shared parameter bound). Run the 5 tools again against an actual firm `.rte`/project once one exists, to catch anything specific to real project structure that the stock template couldn't surface.

2. [ ] **Wire templates into Express** — Decide with client: public static route, password-gated route, or nav link from main site. Implement chosen option in `server.js`. Test full browse → edit → print-to-PDF workflow in Chrome and Safari. _Acceptance: templates accessible from the live site URL; no broken links; print produces clean PDF with UI chrome hidden._

3. [ ] **Deploy contact form backend** — Set SMTP env vars on Render dashboard (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`). Send a test form submission and confirm email arrives at `info@dovafutures.com`.

4. [ ] **Supply real project photography** — Collect from client: minimum 8 high-quality project photos. Drop into `assets/projects/`, update `data/projects.js` with correct paths. Test hero image rotation and About section preview.

5. [ ] **Social links + OG image** — Get Instagram and TikTok handles from client. Update `href` attributes in nav and all footers in `index.html`. Create a 1200×630px landscape photo for OG image, reference it in `<meta property="og:image">`.

6. [ ] **Mobile sticky CTA bar** — Add persistent `position: fixed; bottom: 0` bar on mobile with WhatsApp + Email shortcut buttons. Currently only the floating circular button exists.

## Someday / backlog
- Add password protection (`express-basic-auth`) to the `/templates` route if client wants staff-only access.
- Add real before/after image pairs (Revit screenshots + final renders) for the hero reveal.
- Rate limiting on `/api/contact` (`express-rate-limit`).
- `sitemap.xml` and `robots.txt`.
- Google Analytics or privacy-friendly alternative (Plausible, Fathom).
- UI/UX Redesign phase (separate engagement — Figma designs must be approved first).
