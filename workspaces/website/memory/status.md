# Status — website

**Last updated:** 2026-08-24

**Health:** Yellow — source migrated; custom-domain handoff pending

The website source of truth is now
`https://github.com/Dblackone/Dova-futures-website` on `main`, and its default
Pages URL returns HTTP 200. However, GitHub still assigns `dovafutures.com` to
this Hub repository; the domain serves the old Hub-repository site rather than
the external Pages deployment. Automatic Hub deployment is therefore disabled
until the custom-domain handoff is completed. Duplicate website source and
website-specific media are retired from this branch; approved shared assets
remain under `company/assets/`.

Verification: `npm ci` completed and two Playwright tests passed in an isolated
audit clone. GitHub Pages API and live URL checks confirmed the domain mismatch.
One high-severity npm advisory remains in the website repository.
