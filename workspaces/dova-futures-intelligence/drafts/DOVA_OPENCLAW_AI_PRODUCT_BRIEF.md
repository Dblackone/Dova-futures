# DOVA Intelligence for OpenClaw — Product Brief

**Status:** Draft for principal review  
**Date:** 1 September 2026  
**Owner:** Vollmann Akarakiri  
**Prepared by:** @lead/vector [codex]

## 1. Recommendation

Do not build a new AI model or replace OpenClaw. Build **DOVA Intelligence** as a local-first, Windows-first operating layer on top of OpenClaw, with LM Studio or Ollama providing local inference and optional remote providers handling only tasks that exceed the local model.

OpenClaw already supplies the agent runtime, browser Control UI/PWA, sessions, approvals, files, tasks, plugins, MCP connectors, automations, channel integrations and model routing. DOVA Intelligence should supply the DOVA-specific experience: project context, document workflows, construction/BIM tools, coding workflows, memory, templates, safety policies and a calmer branded interface.

## 2. Corrections and current system state

- The installed product is **OpenClaw**, not OpenClaude.
- OpenClaw is not terminal-only. Its Gateway serves a browser Control UI, normally at `http://127.0.0.1:18789/`, and the UI can be installed as a PWA.
- The local OpenClaw installation is version `2026.7.1-2`. Its configuration validates successfully, but the registered Gateway is not currently listening; the connectivity probe returns `ECONNREFUSED`.
- OpenClaw already defaults to `lmstudio/google/gemma-4-e4b`, a local vision- and tool-capable model.
- LM Studio currently has Gemma 4 E4B Q4_K_M, Gemma 4 E2B Q4_K_M, Nemotron 3 Nano 4B Q4_K_M and Nomic Embed Text v1.5 installed. Gemma 4 E4B is loaded.
- Ollama is installed, but only the older `llama2:latest` model is currently present in its catalogue.
- No outbound MCP servers are configured in OpenClaw yet.
- The computer is an Acer Predator PHN16-72 with an Intel i9-14900HX, 32 GB RAM, an RTX 4060 Laptop GPU with 8 GB VRAM and about 270 GB free disk space.

## 3. Product promise

> One private DOVA workspace for asking, researching, building, reviewing and delivering work, with local AI by default and visible approval before consequential actions.

The product should feel like a combination of Codex's project/task execution and review workflow, Claude's conversational clarity and artefact-oriented work, and OpenClaw's provider-independent runtime and channels.

It should not promise Claude- or frontier-Codex-level reasoning from an 8–9B local model. The advantage is continuity, privacy, predictable availability and tool-assisted completion. For difficult work, a remote model can be selected explicitly or used as an approved fallback.

## 4. Priority users and jobs

The first release has one user: the principal. Its priority jobs are derived from recent DOVA work and task history.

1. **Project resume and control:** open a DOVA project and immediately see status, next action, files, decisions, risks and approvals.
2. **Document factory:** create quotations, invoices, reports, letters, salary slips and milestone requests from the canonical DOVA templates; calculate totals deterministically; render PDF/DOCX; keep drafts unissued until approval.
3. **Construction and BIM assistance:** cost breakdowns, material quantities, project reports, naming standards, Revit/IFC context and site evidence review.
4. **Coding workspace:** repository-aware chat, file edits, terminal runs, diffs, tests, branch/worktree awareness and independent review gates.
5. **Research:** web research with source links, comparison tables, saved briefs and explicit uncertainty.
6. **Communications:** rewrite WhatsApp/email messages, draft replies and prepare follow-up actions without sending automatically.
7. **Personal and company operations:** reminders, job-search workflows, file organisation, system health checks and recurring automations.
8. **Voice and attachments:** voice input, PDFs, Word documents, spreadsheets and images, while preserving source provenance.

## 5. Product surfaces

### Home

Conversation plus visible plans, progress, tool calls, approvals and results. The user should never need a terminal for normal work.

### Projects

Workspace selector, project memory, status, next action, decisions, source files, task timeline and resumable sessions.

### Documents

Template picker, field collection, deterministic calculation, preview, PDF/DOCX export, reference numbering and approval state.

### Build

Files, terminal, browser, diffs, tests, branches, background tasks and maker/checker hand-off.

### Skills and connectors

Searchable skills with enable/disable controls, prerequisites, trust level and scope. MCP connectors should expose tools without silently granting permission.

### Models

Simple profiles rather than a technical model list:

- **Fast Local** — classification, rewriting, summaries and routing.
- **Deep Local** — document drafting, research synthesis and moderate coding.
- **Remote Expert** — difficult coding, long-context review or high-stakes synthesis, used only with explicit cost/privacy notice.
- **Private Only** — prevents any remote fallback.

### Review and approvals

A single queue for file writes, shell actions, document issue, messages, publication, deletion and external network actions. Every approval card must show exactly what will happen and what data leaves the machine.

## 6. Recommended model strategy

### Daily local primary

Use **Qwen 3.5 9B Q4_K_M** as the first candidate. The published Ollama build is about 6.6 GB and advertises text, image, tool use, thinking and a 256K maximum context. On this 8 GB GPU, configure only a **16K context initially**; test 32K after measuring speed and VRAM. The advertised maximum context is not a sensible daily setting on this laptop.

### Baseline challenger

Keep the already installed **Gemma 4 E4B Q4_K_M** as the baseline. It is already loaded, supports vision and tool use, and may prove faster or more reliable than Qwen for some DOVA workflows. Do not choose a model by reputation alone; run a DOVA-specific evaluation.

### Fast utility

Use Gemma 4 E2B or Nemotron 3 Nano 4B for titles, classification, memory extraction, brief summaries and other cheap background work.

### Retrieval

Retain Nomic Embed Text v1.5 for the first retrieval prototype. Replace it only if evaluation shows poor recall on DOVA documents.

### Not recommended as the daily model

- Qwen 3.5 27B Q4 is about 17 GB. It will require substantial RAM/CPU offload and is likely too slow for an interactive daily assistant on an 8 GB GPU.
- Very large coding MoE models may activate few parameters but still require large weight storage and memory; they are not automatically suitable for this laptop.
- The old Ollama Llama 2 model should not be the product default.

### Evaluation before selection

Run both Gemma 4 E4B and Qwen 3.5 9B through a fixed suite of real, sanitised tasks:

- rewrite a client WhatsApp message;
- extract fields from a project brief;
- calculate and verify a quotation;
- populate a DOVA document draft;
- answer a source-grounded project question;
- propose and apply a small code change;
- use three tools in sequence without malformed calls;
- refuse an unapproved send/delete action;
- summarise a long task and resume it after restart.

Score accuracy, tool-call validity, instruction following, hallucination rate, latency, tokens per second, peak RAM/VRAM and recovery from errors. Select the winner per task profile rather than forcing one model to do everything.

## 7. Local, remote and subscription boundaries

- **Local mode:** LM Studio or Ollama runs the model on the laptop. No model subscription is required after the weights are downloaded.
- **Remote API mode:** providers such as OpenRouter, Ollama Cloud, Gemini or OpenAI are separate services. They may use pay-as-you-go billing, free allowances or OAuth, but they are not guaranteed to remain free when a chat subscription ends.
- **Hybrid mode:** local is primary; remote is an explicit fallback for difficult work. Show estimated cost and the data category before sending a request remotely.
- Never route client-confidential files to a remote model unless the principal has selected a policy that permits it.

## 8. MCPs and other integrations

The term heard as “Emis” most likely means **MCPs** (Model Context Protocol servers). MCP is the correct expansion layer for tools and data. If the intended tool was **n8n**, it can sit behind MCP or authenticated webhooks for workflow automation.

Initial connectors should be deliberately small:

1. Local DOVA filesystem and repository context — read first, controlled writes.
2. Document rendering and spreadsheet calculation.
3. Browser/web research with citations.
4. Git/GitHub for repository status, diffs and pull-request workflows.
5. Calendar and reminders.
6. Google Drive/OneDrive document discovery, read-only first.
7. WhatsApp/email drafting; sending remains approval-gated.
8. Revit/pyRevit or IFC metadata only after the core is stable.

OpenClaw can act both as an MCP client and an MCP server. Keep every connector scoped, visible and revocable. A large installed skill library is not the same as a safe, useful toolset; expose only the skills relevant to the active task.

## 9. Architecture

```text
DOVA desktop/PWA interface
        |
OpenClaw Gateway and session runtime
        |
DOVA policy, project context, skills and workflows
        |
Provider router ── Local: LM Studio/Ollama
        |          Remote: explicit expert fallback
        |
MCP/tools ── files, documents, browser, git, calendar, communications, BIM
        |
SQLite audit/task index + filesystem source documents
```

Avoid a long-lived fork of OpenClaw. Prefer OpenClaw plugins, session dashboards, skills, MCPs and its supported custom Control UI boundary. Keep DOVA-specific policy and workflows in the existing `dova-futures-intelligence` workspace so OpenClaw can be updated independently.

The existing provider-neutral core and read-only hub are useful foundations. They should be reconciled with OpenClaw rather than expanded into a competing orchestration runtime.

## 10. Delivery plan

### Phase 0 — Recovery and baseline

- Repair/restart the OpenClaw Gateway and open the Control UI.
- Confirm the current local Gemma completion and tool-call path.
- Back up the sanitised OpenClaw configuration and record the rollback procedure.
- Register the intelligence workspace in the company registry.

**Exit:** Control UI opens reliably after restart; one local chat and one read-only tool call succeed.

### Phase 1 — Model laboratory

- Finish or restart the intended Qwen download using one runtime, not duplicate copies in both LM Studio and Ollama.
- Run the DOVA evaluation suite against Gemma and Qwen.
- Set fast, deep, remote and private-only profiles.

**Exit:** evidence-backed model choice, measured on this laptop.

### Phase 2 — DOVA interface shell

- Implement the agreed desktop/PWA layout using the visual concept as direction.
- Add project switching, source context, model/privacy indicator, plan progress, files, memory and approval queue.
- Preserve access to OpenClaw's native Control UI for diagnostics.

**Exit:** the principal can complete ordinary chat and project-resume work without a terminal.

### Phase 3 — First complete workflow

Build **quotation/report/invoice drafting** first. It exercises project context, templates, deterministic arithmetic, file creation, preview, PDF output and approval policy.

**Exit:** one sanitised project brief produces correct draft documents from canonical templates, passes arithmetic/layout checks and cannot be issued without approval.

### Phase 4 — Coding and research

- Add repository-aware editing, diffs, terminal/test results and reviewer hand-off.
- Add source-grounded research with saved citations.

**Exit:** one bounded code change and one research brief complete end-to-end with audit trails.

### Phase 5 — Integrations and automation

- Add MCP connectors one by one.
- Add reminders, recurring checks and draft communications.
- Add remote access through a secure supported path such as HTTPS/Tailscale, not an exposed unauthenticated port.

**Exit:** each connector has least privilege, a revoke path, an approval policy and a passing test.

## 11. First-release exclusions

- No autonomous sending, publishing, payments or deletions.
- No unrestricted mouse/keyboard control.
- No custom model training.
- No simultaneous hierarchy of many local agents; use role profiles and sequential delegation until resources and reliability justify more.
- No claim that a 9B local model equals frontier Claude or Codex.
- No migration of live website/store paths as part of this product.

## 12. Decisions for principal review

1. Approve OpenClaw as the runtime and DOVA Intelligence as the custom product layer.
2. Approve the document factory as the first complete workflow.
3. Choose whether Qwen testing should use LM Studio or Ollama; the recommendation is one primary runtime to avoid duplicated model storage.
4. Choose the default privacy policy: local-only, local-first with ask-before-remote, or hybrid automatic for non-confidential tasks.
5. Confirm whether “Emis” meant MCPs, n8n, or another named tool.
6. Confirm whether the first UI should be a browser-installed PWA or a packaged Windows desktop shell. PWA is recommended first because OpenClaw already supports it.

## 13. Primary references

- OpenClaw overview and Control UI: https://docs.openclaw.ai/ and https://docs.openclaw.ai/control-ui
- OpenClaw dashboard command: https://docs.openclaw.ai/cli/dashboard
- OpenClaw MCP: https://docs.openclaw.ai/cli/mcp
- OpenClaw Ollama provider: https://docs.openclaw.ai/providers/ollama
- OpenClaw local-model guidance: https://docs.openclaw.ai/gateway/local-models
- LM Studio developer API and MCP: https://lmstudio.ai/docs/developer and https://lmstudio.ai/docs/developer/core/mcp
- Qwen 3.5 9B catalogue entry: https://ollama.com/library/qwen3.5/tags

