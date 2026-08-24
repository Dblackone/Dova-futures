# DOVA Futures Hub dashboard

This folder is the deployable artifact for the legacy public product overview.
The Pages workflow uploads this folder only. Its snapshot is a deliberately
curated product allowlist and never scans workspace memory or client jobs.

Deployment remains manual because the functional Hub is owner-only on OpenAI
Sites. Do not enable this public GitHub Pages fallback without a separate
approval; `hub.dovafutures.com` is reserved for the authenticated application.

## Refresh the snapshot

From the repository root, run:

```powershell
python hub/build_snapshot.py
```

Then open `hub/index.html` locally or use the deployed GitHub Pages URL. The
snapshot contains public-safe product pointers only. Current operational
status, client work and connected files belong in the authenticated Hub.

The fuller dashboard UX is preserved as a design reference under
`workspaces/dova-futures-intelligence/design/hub-ux-prototype/`. It is not the
production application and does not implement DOVA Intelligence.
