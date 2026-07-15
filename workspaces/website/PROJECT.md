# PROJECT.md — Marketing Website (dovafutures.com)

> All context for the public company website. Absorbed from the former
> `context/01-build-steps.md`, `context/02-architecture.md`, and the
> website-specific traps of `context/04-dont-do-this.md`.

## Identity

- **Workspace slug:** `website`
- **One-line purpose:** Lead-generation + brand-credibility site for DOVA
  Futures Limited — convert visitors into WhatsApp/email project inquiries.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — live, backend items pending

## Why this project exists

Directly serves company goal 1 (qualified inquiries) and goal 2 (premium brand
positioning) — see `company/goals.md`.

## Where the code lives

**The repo root** (historical layout — do not relocate, see Deployment):

| Path | Purpose |
|------|---------|
| `index.html` | The entire frontend SPA (client-side routing via `navigateTo()`) |
| `server.js` | Express backend — only server-side code; hosts `POST /api/contact` |
| `data/projects.js` | Portfolio project list; edit here to add/update projects |
| `public/` | Hero reveal before/after images, favicons, logo |
| `assets/` | Logo lockups, project photos, widget icons, portfolio PDFs |
| `package.json` | Deps: express, nodemailer, dotenv |
| `CNAME` | `dovafutures.com` for GitHub Pages |

Note: `assets/` and `public/` also hold general company imagery reused by other
projects — coordinate via `memory/board.md` before mass-reorganising them.

## Stack

```
Frontend:  Vanilla HTML/CSS/JS — single-page app, no build step
Styling:   Tailwind CSS v3.4.17 (CDN) + inline <style> block
Fonts:     Bebas Neue (display) + Inter (body) via Google Fonts
Backend:   Express.js + Nodemailer (contact form email only)
```

## How to run / build / test

```bash
npm install
cp .env.example .env   # fill SMTP values
npm start              # node server.js → http://localhost:3000
```

No automated test suite. Manual smoke-test of the contact endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"t@t.com","projectType":"Residential","message":"Hello"}'
# expect: {"success":true,"message":"Message sent successfully."}
```

Required env vars (`.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `SMTP_SECURE`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `PORT`.

## Architecture

- **Express server** (`server.js`) — serves static files from the repo root,
  hosts `/api/contact`; `app.get('*')` catch-all returns `index.html`.
- **Contact flow:** form JS POSTs JSON → server validates (required fields +
  email regex + honeypot) → nodemailer sends to `CONTACT_TO_EMAIL` via SMTP →
  JSON response. No database, no sessions, no other external calls.

## Deployment

- **GitHub Pages** — `.github/workflows/deploy.yml` uploads the **entire repo
  root** as the Pages artifact on every push to `main`; `CNAME` maps
  `dovafutures.com`. **This is why website files must stay at the repo root**
  until a deliberate migration rewires the workflow's `path:`.
- The Express backend (contact email) is a separate concern — SMTP env vars are
  not yet configured on a host, so live contact emails don't send yet.

## Project-specific rules & traps

- **Honeypot field** — `server.js` rejects any submission where
  `payload.website` is non-empty. Never rename, remove, or alter this field —
  it is the only bot filter.
- **SMTP credentials** — must come from `.env`. Never hardcode or commit them.
  If SMTP is not configured, the server throws at send time (not start time).
- **Static serving from repo root** — `express.static(__dirname)` serves the
  whole root. Never add files with sensitive content you wouldn't want publicly
  served. (GitHub Pages publishes the whole root too.)
- **Single HTML file** — `index.html` is the whole frontend; the `*` catch-all
  always returns it. New routes must not clash with the `/api/` prefix.
- **No frameworks** — the frontend is intentionally vanilla; don't add React/
  Vue or a build step.

## Read-order for a session working here

1. Root `CLAUDE.md` → 2. `company/` → 3. this file →
4. `workspaces/website/memory/status.md` + `next-up.md`
