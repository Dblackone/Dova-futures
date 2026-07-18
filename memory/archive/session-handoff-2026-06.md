# SESSION HANDOFF — Dova Futures Website
**Repository:** https://github.com/Dblackone/Dova-futures.git
**Branch:** `main`

> **⚠️ Historical log — superseded on 2026-07-09 (Session 5).** The repo is now
> a multi-project hub: sessions onboard via `CLAUDE.md` (router) →
> `company/registry.md` → their `workspaces/<project>/`. Brand tokens listed
> below now live canonically in `company/brand.md`. The sections below are
> preserved as history; per-project state lives in each workspace's `memory/`.

---

## SESSION 3 — Document Templates (2026-06-22)

**What was built:** 9 standalone print-ready HTML document templates + an index gallery page, all branded to DOVA Futures Limited. Files live at `project/index.html` and `project/templates/`.

**Commits added this session:**
- `ff64f00` — Claude Design handoff: Business document templates (source `.dc.html` files + `.docx` originals)
- `20af29a` — Add DOVA Futures document templates — 9 standalone HTML templates + index

---

### Templates delivered

| File | Document type |
|------|--------------|
| `project/index.html` | Gallery index — card grid linking to all 9 templates |
| `project/templates/01-Report.html` | Project Report (5 sections, 3-party sign-off) |
| `project/templates/02-Project-Quote.html` | Project Quotation (scope-of-works table, VAT, terms, client acceptance) |
| `project/templates/03-Payment-Invoice.html` | Payment Invoice (line items, payment details, total-due highlight) |
| `project/templates/04-Completion-Form.html` | Completion Certificate (8-item checklist, 4-party sign-off grid) |
| `project/templates/05-Salary-Slip.html` | Salary Slip (earnings/deductions tables, net pay box) |
| `project/templates/06-Internal-Letter.html` | Internal Memo (TO/FROM/DATE/SUBJECT/REF grid, action box, dual sign-off) |
| `project/templates/07-External-Letter.html` | External Letter (ref/date row, recipient address, RE: bar, CC/ENC) |
| `project/templates/08-Project-Report.html` | Progress Report (overview grid, works table with status badges, financial summary, issues/risks) |
| `project/templates/09-Milestone-Payment-Request.html` | Milestone Payment Request (payment application, completion verification, net claim box) |

---

### How the templates work (read this before touching them)

**Tech stack:** Pure HTML/CSS — zero dependencies, zero build step, works in any browser.

**Print flow:**
1. User opens a template in any browser
2. Clicks any orange-italic field to edit it (those are `contenteditable` spans)
3. Clicks the "PRINT / SAVE PDF" button (`onclick="window.print()"`)
4. Browser print dialog appears — save as PDF or send to printer

**Key implementation details:**

| Concern | How it's handled |
|---------|-----------------|
| Print layout | `@page { size: A4; margin: 0; }` + `max-width: 794px` paper container |
| Hide UI chrome on print | `[data-no-print]` + `@media print { [data-no-print] { display:none } }` |
| Editable fields | `<span contenteditable="true">` — italic orange-clay placeholder text (`color:#9E4F30`), turns solid black on focus/edit |
| Focus ring | `[contenteditable]:focus { outline: 2px solid #5AA17C; }` |
| Back navigation | Every template has `← All Templates` link pointing to `../index.html` |
| Paper shadow | `box-shadow: 0 4px 40px rgba(26,26,26,.16)` — removed on print |

**Brand tokens used across all templates:**

| Token | Value | Usage |
|-------|-------|-------|
| Dark green | `#1C4636` | Primary headers, buttons, accents |
| Terracotta | `#B85C38` | Secondary accents, header bar backgrounds |
| Cream | `#F5EFE8` | Text on dark backgrounds |
| Tan background | `#E8E1D5` | Page body background |
| Clay / placeholder | `#9E4F30` | Editable field placeholder text |
| Very dark green | `#102A20` | Deep contrast areas |
| Mint focus | `#5AA17C` | contenteditable focus ring |
| Display font | Bebas Neue | All caps headers, template names |
| Body font | Inter | All body text, tables, labels |

---

### Integration tasks for the next session

The templates are standalone files. They do not yet integrate with the main Express site. Decide with the client which integration path to take:

**Option A — Serve as static files (simplest)**
- The `project/` directory is already in the repo root
- Add an Express route in `server.js`:
  ```js
  app.use('/templates', express.static(path.join(__dirname, 'project')));
  ```
- Users access `/templates/` to browse the gallery and open individual docs
- No authentication — entirely public

**Option B — Protected staff portal (recommended for internal documents)**
- Add a simple password gate (session cookie or HTTP Basic Auth via `express-basic-auth`) on the `/templates` route
- Credentials stored as environment variables
- Staff access the gallery at `https://dovafutures.com/templates/`

**Option C — Admin panel link**
- Add a "Document Templates" card or nav link inside the main `index.html` website
- Link to `/templates/index.html`
- Keeps templates discoverable without a separate portal

**Whichever option is chosen:**
1. Confirm with client whether templates should be public or staff-only
2. Add the route/auth logic to `server.js`
3. Add a link to templates from the main site navigation or admin area
4. Test the full print-to-PDF workflow in Chrome and Safari

---

### Source files in the repo (for reference, do not need editing)

The Claude Design handoff bundle was committed alongside the templates:
- `project/index-print-cqrb8t.dc.html` — Original Claude Design file (the source of truth)
- `project/templates/*.dc.html` — Original design prototypes for each template
- `project/docx/*.docx` — Original Word documents
- `chats/chat1.md`, `chats/chat2.md` — Design session transcripts (explain design decisions)

The `.dc.html` files require the Claude Design runtime — **do not try to open them directly in a browser**. The `.html` files in `project/templates/` are the production versions.

---

---

## SESSION 2 — Loop Engineering Scaffold (2026-06-14)

**What was built:** Agent loop infrastructure: CLAUDE.md, TEAM.md, context/, memory/, agents/, prompts/, governance/. Hero before/after reveal feature added to `index.html`.

**Commits added this session:**
- `87c9ead` — Loop engineering scaffold + hero reveal

---

## SESSION 1 — Website Build (2026-06-07)

**Repository:** https://github.com/Dblackone/Dova-futures.git
**Last Commits:**
- `6720849` — feat: removed all decorative SVG illustrations
- `5c6fb3a` — feat: branding fixes, hero image, WhatsApp button, project data structure

---

### PROJECT GOALS

Dova Futures Limited is a premium Nigerian design-build construction firm. The website serves as a lead generation and brand credibility tool with two objectives:

1. **Short-term** — Generate qualified project inquiries via WhatsApp and email contact form
2. **Long-term** — Establish premium brand positioning that supports future digital revenue streams (consulting, digital products, training/academy)

**Business context:**
- Company: Dova Futures Limited, Victoria Island, Lagos
- WhatsApp: +234 816 367 5439
- Email: info@dovafutures.com
- Social: Instagram + TikTok (icons present; actual handles TBD)
- Target: HNI developers, corporate clients, aspirational homeowners across Lagos, Port Harcourt, Abuja

---

### CURRENT ARCHITECTURE

#### Stack Overview
```
Frontend:  Vanilla HTML/CSS/JS — Single Page Application (SPA)
Routing:   Client-side via navigateTo() function in index.html
Styling:   Tailwind CSS v3.4.17 (CDN) + inline <style> block
Fonts:     Bebas Neue (display) + Inter (body) via Google Fonts
Backend:   Express.js + Nodemailer (contact form email delivery)
Deploy:    Render (auto-deploy from main branch)
```

#### File Structure
```
Dova-futures/
├── index.html                      ← Entire frontend SPA
├── server.js                       ← Express backend (contact form only)
├── package.json                    ← Node deps: express, nodemailer, dotenv
├── data/projects.js                ← Project data config
├── project/                        ← Document templates (NEW — Session 3)
│   ├── index.html                  ← Template gallery
│   └── templates/
│       ├── 01-Report.html
│       ├── 02-Project-Quote.html
│       ├── 03-Payment-Invoice.html
│       ├── 04-Completion-Form.html
│       ├── 05-Salary-Slip.html
│       ├── 06-Internal-Letter.html
│       ├── 07-External-Letter.html
│       ├── 08-Project-Report.html
│       └── 09-Milestone-Payment-Request.html
├── assets/
│   ├── logo/DOVA Logo - W.png      ← PRIMARY logo (28KB, white on transparent)
│   ├── projects/                   ← Project cover photos
│   └── widgets/icons/              ← instagram.svg, tiktok.svg, whatsapp.svg
├── public/images/                  ← Hero reveal before/after images
├── .env.example                    ← SMTP config template
└── .github/workflows/deploy.yml   ← Auto-deploys to Render on push to main
```

---

### REMAINING TASKS (all sessions combined)

#### Critical (blocking launch)
- [ ] **Integrate templates into Express site** — decide on Option A/B/C above; implement route in `server.js`
- [ ] **Deploy backend** — Configure SMTP env vars on Render. Contact form emails not yet arriving live.
- [ ] **Supply real project photography** — Replace placeholder JPGs in `assets/projects/`. Update `data/projects.js`.

#### High Priority
- [ ] **Wire social media links** — Get actual Instagram and TikTok handles. Update `href` in nav and footers.
- [ ] **Verify CNAME / domain** — Confirm `dovafutures.com` resolves to Render and SSL is active.
- [ ] **OG image** — 1200×630px landscape photo at `/assets/logo/og-image.jpg`. Update meta tag in `index.html`.
- [ ] **Mobile sticky CTA bar** — Persistent bottom bar on mobile with WhatsApp + Email shortcuts.

#### UI/UX Redesign (separate phase)
- [ ] Complete Figma design phase using the UI/UX Discovery & Design Strategy as creative brief
- [ ] Implement full redesign — new design system, scroll animations, Three.js hero, editorial portfolio grid

---

### IMPORTANT COMMANDS

```bash
# Clone repo
git clone https://github.com/Dblackone/Dova-futures.git
cd Dova-futures

# Install dependencies
npm install

# Create local environment file
cp .env.example .env
# Edit .env — fill in real SMTP credentials

# Start local server
npm start
# Opens: http://localhost:3000
# Templates available at: http://localhost:3000/project/index.html (static)
```

### Environment Variables Required for Backend
```
PORT=3000
CONTACT_TO_EMAIL=info@dovafutures.com
CONTACT_FROM_EMAIL=no-reply@dovafutures.com
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

---

*Last updated: 2026-06-22*
*Repository: https://github.com/Dblackone/Dova-futures.git*
