# Status

**Project:** DOVA Futures Intelligence

**Status:** Design preserved; read-only Hub deployed boundary prepared; intelligence implementation deferred.

**Last verified:** 2026-08-24

The repository-level `hub/` is a dependency-free, read-only snapshot of
workspace status and routing. The complete desktop/mobile Hub UX is stored in
`design/hub-ux-prototype/` as a design reference and mirrored in Canva.

No OpenAI/cloud provider, local model, Microsoft Graph/OneDrive connection,
authentication, database, document-writing workflow, or DOVA Intelligence
runtime was added during the repository reorganization. The existing
provider-neutral prototype/core remains isolated in this workspace.

The website and preorder sources of truth are now external repositories. The
Hub snapshot is isolated to `hub/`, but its automatic Pages deployment remains
gated until `dovafutures.com` is transferred to the website repository and a
separate Hub domain is configured.
