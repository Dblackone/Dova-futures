# Prototype Capability Inventory

Inventory captured from the current `actions/`, `agent/`, and `memory/` modules. Risk is an initial migration classification and must be reviewed with each adapter.

| Capability/module | Primary behavior | Initial risk | Migration note |
|---|---|---:|---|
| `file_controller` | Read, list, find, write, move, copy, delete files | High | Split read-only and mutating capabilities; enforce protected paths |
| `browser_control` | Navigate and interact with a browser | High | Separate navigation/read from click/type/submit |
| `computer_control` | Keyboard, mouse, screenshots, screen finding | High | Requires explicit approval and emergency stop |
| `computer_settings` | Window, display, system, Wi-Fi, power actions | High | Classify each action individually; restart/shutdown are critical |
| `desktop` | Wallpaper, organization, cleanup, desktop listing | Medium/High | Listing is read-only; cleanup and generated actions require approval |
| `open_app` | Launch applications | Medium | Allow-list applications and make launch explicit |
| `code_helper` | Write, edit, explain, and run code | High | Sandbox execution; no implicit package installation |
| `dev_agent` | Generate/edit/run projects and install dependencies | High | Requires repository and execution policy boundaries |
| `file_processor` | Process PDFs, documents, media, data, and code | Medium/High | Separate read processing from output creation |
| `web_search` | Search and compare web information | Read-only | Provider/network adapter; preserve citations |
| `weather_report` | Retrieve weather information | Read-only | Provider/network adapter |
| `flight_finder` | Search flights and save reports | Medium | Search is read-only; saving report is mutating |
| `youtube_video` | Open, summarize, and inspect videos | Medium | Opening URLs is an external side effect |
| `send_message` | Send WhatsApp, Telegram, Instagram, or generic messages | High | Always require confirmation and audit recipient/content |
| `reminder` | Create Windows scheduled reminders | High | External scheduled side effect; require approval |
| `game_updater` | Install/update games and schedule updates | High | External software and scheduling side effects |
| `screen_processor` | Capture and analyze screen/camera | High | Sensitive data boundary; require source disclosure |
| `planner` | Generate multi-step plans | Read-only | Must emit validated `Plan` contracts in a later phase |
| `executor` | Dispatch tools, retry, replan, run generated code | High | Replace hard-coded dispatch with registry and policy |
| `task_queue` | Queue task execution | Medium | Replace with durable workflow state in Phase 7 |
| `memory_manager` | JSON personal memory read/write/extraction | Medium | Compatibility adapter; add scopes, provenance, retention |

## Known gap

`agent/executor.py` and `agent/planner.py` reference `actions.cmd_control`, but that module is absent from the repository. The new registry must not advertise this capability until a reviewed implementation exists.

## Credential and local-data findings

- `config/api_keys.json` exists locally and is ignored by Git.
- `memory/long_term.json` is ignored by Git.
- No commit exists yet, so the public-repository history has not been established.
- Several modules load credentials directly; central configuration is deferred to the stabilization milestone.
