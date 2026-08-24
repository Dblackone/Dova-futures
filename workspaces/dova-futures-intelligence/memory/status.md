# Status

**Project:** DOVA Futures Intelligence  
**Status:** Active — private Hub and cloud intelligence operational; live GitHub and read-only OneDrive views implemented in draft PR #35; Microsoft registration, merge and deployment pending.
**Last verified:** 2026-08-24 — @lead/vector [codex]

The workspace retains the provider-neutral local gateway and repository-scoped
integration suite for Agent Reach, Hallmark, Career Ops, HyperFrames, World
Monitor, and the optional Voicebox localhost boundary. Credentials, voice data,
model files, cookies, CVs, and generated media remain outside git.

The repository-level `hub/` is a dependency-free non-sensitive snapshot. The
responsive private application in `hub-app/` provides the approved desktop and
mobile Hub journeys and a server-side OpenAI Responses API adapter using a
dedicated secret key and `gpt-5.4-mini`. The complete design reference remains
in `design/hub-ux-prototype/`.

Microsoft Graph sign-in, project-folder listing, file search and OneDrive web
opening are implemented with delegated `User.Read` + `Files.Read` only. They
remain honestly disconnected until the owner registers the Entra application,
adds the deployment settings and approves the root path. Document writes and
the workstation bridge remain disabled.

Verification includes 23 local intelligence tests, integration health checks,
the Hub production build, five Hub server/authentication tests, ESLint, clean
npm audits, and live retrieval of all three GitHub repository records.
