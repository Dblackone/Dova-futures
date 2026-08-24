# DOVA Hub application

Private, responsive operating dashboard for DOVA Futures products, repository workspaces, attention items, and DOVA Intelligence.

## Current capabilities

- Responsive desktop and mobile Hub navigation.
- Live GitHub repository status for the Hub, website and pre-order products.
- Server-side OpenAI Responses API adapter for DOVA Intelligence.
- Owner-delegated Microsoft sign-in with read-only OneDrive project and file browsing.
- Honest workspace, integration, and storage-boundary views.
- OpenAI Sites hosting configuration for private deployment.

## Local development

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Create an ignored `.env.local` with `OPENAI_API_KEY` to enable DOVA Intelligence. The default model is `gpt-5.4-mini`; override it with `OPENAI_MODEL` if required.

## Microsoft OneDrive registration

Create a Microsoft Entra app registration for a single-page application, then add the exact Hub origins as redirect URIs (the private Sites origin now and `https://hub.dovafutures.com` after DNS verification). Grant delegated `User.Read` and `Files.Read`; do not create a client secret for this browser PKCE flow.

Configure these server settings in the Hub deployment:

```text
MICROSOFT_CLIENT_ID=<application client ID>
MICROSOFT_TENANT_ID=<directory tenant ID>
ONEDRIVE_ROOT_PATH=<approved DOVA folder path>
```

The application requests read-only access and lists only the configured root. `Files.ReadWrite` and document output remain deferred until the output folder and canonical template workflow are approved.

## Storage policy

Confidential client and construction documents remain in OneDrive. This application and GitHub repository store code, safe operational metadata, and secure references only.

---
*Drafted by @lead/vector [codex] · 2026-08-24 · see memory/decisions.md for rationale*
