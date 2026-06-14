# 01 — Build Steps

> How to install, run, test, and ship. The loop reads this so it never guesses
> at your toolchain.

## Install
```bash
npm install
```

## Run (dev)
```bash
npm start          # or: node server.js
# visit http://localhost:3000
```

## Test
No automated test suite yet. Verify manually:
```bash
# smoke-test the contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"t@t.com","projectType":"Residential","message":"Hello"}'
# expect: {"success":true,"message":"Message sent successfully."}
```

## Lint / format
None configured yet.

## Environment variables (required to run)
Copy `.env.example` → `.env` and fill in:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `PORT` (defaults to 3000)

## Commit rules
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- One logical change per commit. No "misc fixes."
- Never commit `.env`, secrets, or large binaries.

## Ship
- Push branch → Render auto-deploys from `main` on merge.
- Open a PR into protected `main`. Never push to `main` directly.
- PR must pass a checker-run review before merge.
