# DOVA Futures Hub dashboard

This folder is the deployable artifact for the current read-only repository
overview. The Pages workflow uploads this folder only; the rest of the private
repository is not included in the artifact.

Deployment is temporarily manual because `dovafutures.com` is still assigned
to this repository in GitHub Pages settings. Transfer that domain to the
external website repository and configure `hub.dovafutures.com` here before
enabling automatic Hub deployment.

## Refresh the snapshot

From the repository root, run:

```powershell
python hub/build_snapshot.py
```

Then open `hub/index.html` locally or use the deployed GitHub Pages URL. The
snapshot includes workspace names, status summaries, declared code locations,
and first next actions. It contains no client documents and performs no writes.

The fuller dashboard UX is preserved as a design reference under
`workspaces/dova-futures-intelligence/design/hub-ux-prototype/`. It is not the
production application and does not implement DOVA Intelligence.
