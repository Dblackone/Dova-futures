# PROJECT.md — DOVA Futures Website

## Identity

- **Workspace slug:** `website`
- **One-line purpose:** Public lead-generation and brand-credibility website for DOVA Futures Limited.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — external source of truth, live deployment.

## Source and deployment

- Repository: https://github.com/Dblackone/Dova-futures-website
- Default Pages deployment: https://dblackone.github.io/Dova-futures-website/
- Intended production domain: https://dovafutures.com (transfer pending)
- Source of truth: the external repository's `main` branch.

This Hub repository stores only planning, status, and historical handoff
records for the website. Do not recreate or edit website application source at
the Hub root. Product changes belong in the external repository and follow its
own tests, deployment workflow, and review process.

## Current verification boundary

On 2026-08-24, the external `main` branch was independently cloned and checked:
dependency installation completed, two Playwright tests passed, and its default
GitHub Pages URL returned HTTP 200. GitHub's Pages API showed no custom domain
on that repository, while `dovafutures.com` remained assigned to the Hub
repository and served the old site. The audit also reported one high-severity
npm advisory for future remediation in the product repository.

## Read order

1. Root `CLAUDE.md`
2. `company/registry.md`
3. This file
4. `memory/status.md` and `memory/next-up.md`
5. The external repository's own instructions before changing product code
