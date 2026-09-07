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

Create a Microsoft Entra app registration for a single-page application, then register each Hub origin followed by `/auth/redirect` as a redirect URI. Register the private Sites URL with that path now and `https://hub.dovafutures.com/auth/redirect` after DNS verification. For local development, register the actual local origin and port followed by `/auth/redirect`. Protocol, host, port and path must match exactly, with no trailing slash. Grant delegated `User.Read` and `Files.Read`; do not create a client secret for this browser PKCE flow.

MSAL v5 uses the bundled `/auth/redirect` page to return popup and silent authentication responses to the Hub. Keep this route free of Hub sign-in gates, MSAL providers and application navigation. Hosting must serve it without `Cross-Origin-Opener-Policy` headers. See [Microsoft's redirect bridge setup](https://learn.microsoft.com/en-us/entra/msal/javascript/browser/redirect-bridge). Deployment and the corresponding Entra registration update are both required before testing real Microsoft sign-in.

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
