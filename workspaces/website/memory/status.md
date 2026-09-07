# Status — website

**Last updated:** 2026-09-06 — @lead/vector [codex]

**Health:** Green — source and custom domain migrated

The website source of truth is now
`https://github.com/Dblackone/Dova-futures-website` on `main`, and its default
Pages URL returns HTTP 200. The `dovafutures.com` and `www.dovafutures.com`
custom-domain handoff is complete, and the Hub repository no longer claims the
marketing domain. Duplicate website source and website-specific media are
retired from this branch; approved shared assets remain under `company/assets/`.

Verification: `npm ci` completed and two Playwright tests passed in an isolated
audit clone. Live URL checks confirmed HTTP 200 after the domain handoff.

The personal digital card is ready for principal review in external website
PR #2 (`feat/vector/personal-digital-card`, commit `9011324`). It adds the
`/vollmann/` page, portfolio links, direct contact actions, sharing fallbacks, a
downloadable vCard, a verified QR code and a dedicated social-preview image.
The branch is pushed but is not merged or deployed.

Verification: all three Playwright tests pass across 320, 375, 768 and 1280px;
portfolio/card assets are checked by MIME type and signature; the QR decodes to
`https://dovafutures.com/vollmann/`; independent technical review approved.
