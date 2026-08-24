# PROJECT.md — DOVA Preorder

## Identity

- **Workspace slug:** `preorder-store`
- **One-line purpose:** Preorder and e-commerce platform for catalog, cart, Paystack checkout, order tracking, and administration.
- **Owner:** Principal (Vollmann Akarakiri)
- **Status:** active — external source of truth; launch configuration pending.

## Source and deployment

- Repository: https://github.com/Dblackone/Dova-preorder
- Hosting: Render configuration in the external repository.
- Source of truth: the external repository's `main` branch.

This Hub repository stores only planning, status, migration reports, and
historical records for the preorder product. Do not recreate product source in
this repository. Payment, authentication, data persistence, and deployment
changes belong in the external repository and require its security/review
gates.

## Current verification boundary

On 2026-08-24, the external `main` branch was independently cloned and checked:
dependency installation completed, three tests passed, and root-level Render
configuration was present without the obsolete Hub `rootDir`. The audit
reported one low-severity npm advisory and a pnpm allow-scripts warning.

## Read order

1. Root `CLAUDE.md`
2. `company/registry.md`
3. This file
4. `memory/status.md` and `memory/next-up.md`
5. The external repository's own instructions before changing product code
