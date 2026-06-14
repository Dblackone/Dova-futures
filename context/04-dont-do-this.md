# 04 — Don't Do This

> Anti-patterns, blocked choices, and known traps. The cheapest mistakes to
> prevent are the ones you write down once.

## Never
- Don't push directly to `main`.
- Don't send emails / client documents without explicit approval.
- Don't refactor unrelated code "while you're in there."
- Don't add a new dependency without a one-line justification logged in `decisions.md`.
- Don't invent file paths, APIs, or config — read first, then act.
- Don't mark your own work approved (maker ≠ checker).

## Blocked / discouraged libraries
- Heavy frameworks (React, Vue, etc.) — the frontend is intentional vanilla HTML/JS; don't add a build step.
- Any new `npm` dependency without a one-line justification in `memory/decisions.md`.

## Known traps in this codebase
- **Honeypot field** — `server.js` rejects any submission where `payload.website` is non-empty. Never rename, remove, or alter this field — it is the only bot filter.
- **SMTP credentials** — `SMTP_HOST/USER/PASS` must come from `.env`. Never hardcode or commit them. If SMTP is not configured, the server throws at send time (not at start time).
- **Static file serving** — `express.static` serves from the repo root (`__dirname`). Don't add files with sensitive content to the root you wouldn't want publicly served.
- **Single HTML file** — `index.html` is the whole frontend. The `app.get('*')` catch-all always returns it. Adding new routes requires care to not clash with the API prefix `/api/`.

## Scope discipline
If the change is growing beyond the stated goal, STOP, write what you found in
`memory/triage.md`, and report back. Don't keep going.
