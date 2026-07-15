# archive-2026-07.md — Pre-Hub Global Memory (frozen)

> On 2026-07-09 the repo was reorganized into a multi-project hub. The old
> global `memory/status.md`, `next-up.md`, and `done-log.md` mixed website,
> template, and BIM items in one stream; their content was **split into the
> matching `workspaces/*/memory/` files** and the originals retired. This file
> preserves the pre-split record verbatim for history. Do not update it.

---

## status.md (as of 2026-07-05, Session 4)

**Health:** 🟢 on track

- New `bim-standards/` folder: firm-wide Revit naming system, project-template
  build manifest, loadable shared-parameter file, working pyRevit extension
  (5 tools) — not yet independently verified by a checker run (maker-only;
  `py_compile` only, never run inside Revit).
- 9 print-ready HTML document templates + gallery index deployed to `project/`,
  not yet wired into Express routes.
- Contact form backend not deployed — SMTP env vars not configured.
- Real project photography and social handles not supplied by client.

## next-up.md (as of 2026-07-05)

1. Verify BIM standards with a checker run (all 5 pyRevit tools on a real model)
2. Wire templates into Express (client decision: public / gated / nav link)
3. Deploy contact form backend (SMTP env vars, live test)
4. Supply real project photography (≥8 photos → assets/projects/ + data/projects.js)
5. Social links + OG image
6. Mobile sticky CTA bar

Backlog: express-basic-auth on /templates; real hero before/after pairs; rate
limiting on /api/contact; sitemap/robots; analytics; UI/UX redesign phase.

## done-log.md (complete pre-split record)

- 2026-06-14 — HERO-01 hero reveal built — before/after slider with hover/touch support, hero text intact, no new npm deps — sanity checked via server + grep
- 2026-06-14 — HERO-01 QA verification — all 10 acceptance criteria passed; no anti-patterns, no new deps, no debug logging, setRandomHeroImage absent, assets confirmed present — verified by @qa/vera
- 2026-06-22 — TEMPLATES-01 — 9 standalone print-ready HTML document templates + gallery index created from Claude Design export; committed and pushed to main (commits ff64f00, 20af29a); all templates use contenteditable fields, window.print(), A4 @page CSS, DOVA brand tokens — verified by manual file review
- 2026-07-05 — BIM-01 — Created `bim-standards/` firm-wide Revit standard: naming conventions (files 01–06), project-template build manifest (07), loadable shared-parameter file, project register CSV, and working pyRevit extension (DovaBIM.extension, 5 tools) — all `.py` scripts pass `py_compile` — verified by manual review + syntax check (maker run, not yet independently checked)

## Where these items live now

| Topic | New home |
|-------|----------|
| Website items | `workspaces/website/memory/` |
| Template items | `workspaces/document-templates/memory/` |
| BIM items | `workspaces/bim-standards/memory/` |
| Store items | `workspaces/preorder-store/memory/` |
| Client-job items | `workspaces/client-jobs/memory/` |
