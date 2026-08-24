# Status — preorder-store

**Last updated:** 2026-08-24  
**Health:** Yellow — migrated; launch and payment assurance remain

The preorder source of truth is `https://github.com/Dblackone/Dova-preorder`
on `main`. The duplicate `dova-preorder/` application and Hub-level Render
blueprint are retired by the Product Hub reorganization.

The external repository contains the catalog, cart, Paystack checkout and
webhook handling, order tracking, notifications, admin tools, and root-level
Render configuration. Isolated verification completed successfully with three
tests. One low-severity npm advisory and a pnpm allow-scripts warning remain.

Live secrets, real-money payment assurance, and persistent storage have not
been configured. An independent security/QA review remains required before
accepting live orders.
