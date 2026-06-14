# 02 — Architecture

> System overview so the agent acts with the whole picture, not one file.

## Overview
Dova Futures is a company website for an architecture/construction firm. It is a
Node.js/Express app that serves a static HTML/CSS/JS frontend and exposes one API
endpoint to handle the contact form — which sends an email via SMTP (nodemailer).
Deployed on Render (auto-deploy from `main`).

## Components / services
- **Express server** (`server.js`) — serves static files, hosts `/api/contact`
- **Static frontend** (`index.html` + `assets/`) — single-page site, no build step
- **Contact form API** (`POST /api/contact`) — validates input, sends email via SMTP
- **Project data** (`data/projects.js`) — JS config file; drives the portfolio gallery

## Service boundaries
- Frontend → `POST /api/contact` is the only API call; everything else is static.
- Server → external SMTP relay only (no database, no other external calls).
- No external auth, no user sessions, no persistent storage.

## Data flow
User fills contact form → JS POSTs JSON to `/api/contact` → server validates
(required fields + email regex + honeypot) → nodemailer sends email to
`CONTACT_TO_EMAIL` via SMTP → 200/400/500 JSON response back to browser.

## Key files & folders
| Path | Purpose |
|------|---------|
| `server.js` | Express app — only server-side code |
| `index.html` | Main (and only) HTML page |
| `assets/` | Images (logo, projects, UI widgets) |
| `data/projects.js` | Portfolio project list; edit here to add/update projects |
| `context/` | Agent context — read every run, keep lean |
| `memory/` | Durable agent memory (board, status, logs) |

## External dependencies
- **SMTP relay** — any compatible SMTP server (configured via env vars); used only
  for contact form emails. No emails are ever sent without explicit approval in prod.
- **Render** — hosting platform; deploys automatically on push to `main`.
