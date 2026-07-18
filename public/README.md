# public/ — Website App-Shell Files

Static files the website's app shell consumes: favicons and app icons
(`favicon.png`, `apple-touch-icon.png`, `icon-512.png`), hero before/after
imagery (`images/`), and logo PNG variants (`logo/`).

**Boundary with `assets/`:** the split is historical, not architectural —
everything at the repo root is publicly served by GitHub Pages either way.
Working rule until the Wave-2 migration merges them: `public/` = app-shell
files (icons, hero imagery); `assets/` = content media (portfolio, logos,
PDFs). Don't agonize over edge cases; do keep referenced paths stable.

**Deploy note:** referenced by `index.html`; shipped by GitHub Pages. Do not
move or rename outside an approved migration.
