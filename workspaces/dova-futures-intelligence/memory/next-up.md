# Next Up

1. Independently QA `drafts/DOVA_AI_WORKSTATION_PHASE1_EXECUTION.md` and the six agent-profile edits: inspect the diff, validate the four local configuration files and rollback manifest, and rerun relevant tests without editing source. Confirm that Bionic's pending restart is documented rather than treated as evidence of live reload.
2. Complete independent review and merge of the live GitHub/read-only OneDrive integration (PR #35); PR #34 is already merged.
2. Verify the private Hub deployment, DNS and SSL status before applying any still-needed DNS changes.
3. Register the Microsoft Entra SPA, add the Hub redirect origins and configure `MICROSOFT_CLIENT_ID`, `MICROSOFT_TENANT_ID` and the approved `ONEDRIVE_ROOT_PATH`.
4. Review the first read-only OneDrive metadata view and approve the output folder and canonical template workflow before enabling document writes or moving files.
5. Principal review of `drafts/DOVA_OPENCLAW_AI_PRODUCT_BRIEF.md`: confirm runtime boundary, document factory workflow, LM Studio versus Ollama, privacy policy, MCP/n8n terminology and PWA versus packaged shell.
6. After approval, recover the OpenClaw Gateway and verify its Control UI, one local completion and one read-only tool call. Build a sanitised evaluation suite comparing the installed Gemma and Qwen models.
7. Reconcile the provider-neutral core and Hub with supported OpenClaw plugin/dashboard/MCP boundaries before implementing further orchestration. The intelligence workspace is already registered.
8. Preserve reviewed CLI/HTTP/MCP boundaries for the external tool suite. Optional Voicebox, Realtime voice and workstation bridges require separate implementation; keep microphone use user-initiated and local voice/model data outside git.
