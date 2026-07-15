# Dova-futures — DOVA Futures Limited Company Hub

This repository is the **hub for all company undertakings** — every task,
project, and side project run by DOVA Futures Limited lives here, each isolated
in its own workspace.

## Orientation (humans and agents)

| Start here | What it is |
|------------|-----------|
| `CLAUDE.md` | The router + master loop — how every session must operate |
| `company/registry.md` | Index of every project: what it is, where its code lives, status |
| `company/` | Shared control point: brand, voice, goals, ethics, standards |
| `workspaces/<project>/` | Per-project context (`PROJECT.md`) + memory — read only yours |

**Projects:** marketing website (repo root, GitHub Pages), preorder store
(`dova-preorder/`, Render), document templates (`project/`), BIM standards
(`bim-standards/`), client jobs (`jobs/`), and internal ops.

> Deploy note: website files intentionally live at the repo root (GitHub Pages
> ships the root; `CNAME` → dovafutures.com), and the store deploys from
> `dova-preorder/` via `render.yaml`. Do not relocate either without an
> approved migration plan.

---

## The website (this repo's root code)

Production single-page website with an Express contact-form backend.

### Features
- Contact form with backend email delivery to `info@dovafutures.com`
- Frontend + backend validation, honeypot spam protection
- Dual submit options: **Send Email** and **Send via WhatsApp**
- Active social links (Instagram, TikTok, WhatsApp)
- Structured asset paths under `/assets`

### Run locally
1. `npm install`
2. `cp .env.example .env` and fill SMTP values
3. `npm start`
4. Open `http://localhost:3000`

Full website context: `workspaces/website/PROJECT.md`.
