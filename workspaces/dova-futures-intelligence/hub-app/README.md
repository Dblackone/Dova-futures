# DOVA Hub application

Private, responsive operating dashboard for DOVA Futures products, repository workspaces, attention items, and DOVA Intelligence.

## Current capabilities

- Responsive desktop and mobile Hub navigation.
- Honest product, workspace, integration, and storage-boundary views.
- Server-side OpenAI Responses API adapter for DOVA Intelligence.
- OneDrive and workstation placeholders that remain disconnected until their credentials and access scopes are approved.
- OpenAI Sites hosting configuration for private deployment.

## Local development

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Create an ignored `.env.local` with `OPENAI_API_KEY` to enable DOVA Intelligence. The default model is `gpt-5.4-mini`; override it with `OPENAI_MODEL` if required.

## Storage policy

Confidential client and construction documents remain in OneDrive. This application and GitHub repository store code, safe operational metadata, and secure references only.

---
*Drafted by @lead/vector [codex] · 2026-08-24 · see memory/decisions.md for rationale*
