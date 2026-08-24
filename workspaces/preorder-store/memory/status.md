# Status — preorder-store

**Last updated:** 2026-08-24

**Health:** Yellow — migrated; launch and payment assurance remain

The preorder source of truth is now
`https://github.com/Dblackone/Dova-preorder` on `main`. The duplicate
`dova-preorder/` application and Hub-level Render blueprint have been retired
from this Hub branch.

Verification: `npm ci` completed and three tests passed in an isolated audit
clone. Root-level Render configuration was present. One low-severity npm
advisory and a pnpm allow-scripts warning remain in the product repository.
Live secrets, Paystack flow assurance, and persistent storage were not changed.
