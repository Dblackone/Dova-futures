# Next Up

## AI workstation optimisation — final independent QA handoff — 2026-09-15

1. **Astra final independent QA:** inspect
   workspaces/dova-futures-intelligence/drafts/DOVA_AI_WORKSTATION_PHASE0_BASELINE.md
   and the planning-ledger diff against the approved Phase 0 scope. Do not edit
   any file.
2. Confirm the report correctly separates confirmed facts from proposals,
   distinguishes configured from active MCPs, preserves the DOVA architecture,
   names the six stale handoffs accurately, and keeps Phase 1 through Phase 5
   behind their required gates. Confirm the BAS-00 through BAS-06 commands,
   directories, capture rules and values are reproducible.
3. Confirm Bionic and LM Studio paths, keys and proposed values; verify that
   skills-plugin command execution is not conflated with filesystem MCP access,
   and that LM Studio app-launch HTTP-server behaviour is not described as
   Windows startup. Check the scoped diff, rerun the necessary validation, and
   return only APPROVE or REJECT with a numbered defect list. If approved, the
   work goes to Vollmann for review and explicit Phase 1 authority.
4. Do not install RTK or Headroom, start any local AI service, alter global
   configuration, or perform LinkedIn activity during QA.

## Existing delivery sequence

1. Complete independent review and merge of the live GitHub/read-only OneDrive integration (PR #35); PR #34 is already merged.
2. Verify the private Hub deployment, DNS and SSL status before applying any still-needed DNS changes.
3. Register the Microsoft Entra SPA, add the Hub redirect origins and configure `MICROSOFT_CLIENT_ID`, `MICROSOFT_TENANT_ID` and the approved `ONEDRIVE_ROOT_PATH`.
4. Review the first read-only OneDrive metadata view and approve the output folder and canonical template workflow before enabling document writes or moving files.
5. Principal review of `drafts/DOVA_OPENCLAW_AI_PRODUCT_BRIEF.md`: confirm runtime boundary, document factory workflow, LM Studio versus Ollama, privacy policy, MCP/n8n terminology and PWA versus packaged shell.
6. After approval, recover the OpenClaw Gateway and verify its Control UI, one local completion and one read-only tool call. Build a sanitised evaluation suite comparing the installed Gemma and Qwen models.
7. Reconcile the provider-neutral core and Hub with supported OpenClaw plugin/dashboard/MCP boundaries before implementing further orchestration. The intelligence workspace is already registered.
8. Preserve reviewed CLI/HTTP/MCP boundaries for the external tool suite. Optional Voicebox, Realtime voice and workstation bridges require separate implementation; keep microphone use user-initiated and local voice/model data outside git.
