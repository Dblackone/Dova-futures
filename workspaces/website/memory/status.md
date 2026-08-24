# Status — website

**Last updated:** 2026-08-24

**Health:** Green — source and custom domain migrated

The website source of truth is now
`https://github.com/Dblackone/Dova-futures-website` on `main`, and its default
Pages URL returns HTTP 200. The `dovafutures.com` and `www.dovafutures.com`
custom-domain handoff is complete, and the Hub repository no longer claims the
marketing domain. Duplicate website source and website-specific media are
retired from this branch; approved shared assets remain under `company/assets/`.

Verification: `npm ci` completed and two Playwright tests passed in an isolated
audit clone. Live URL checks confirmed HTTP 200 after the domain handoff.
