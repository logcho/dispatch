# Dispatch — AI Agent Desktop App

A consumer-friendly Electron desktop application that lets everyday users deploy, monitor, and manage AI agents for real-world tasks. The app frames agents not as a developer tool, but as a **personal workforce** — think of it as hiring a team of digital assistants from your desktop.

## Product Vision

**"Agents for everyone."** Dispatch is designed for people who have never written a line of code. Users describe what they want done in natural language, and Dispatch handles the rest — spawning agents, breaking down work, showing progress transparently, and delivering results. The UX borrows from familiar paradigms (task managers, messaging apps, dashboards) so there's zero learning curve.

---

## Architecture Overview

```
src/
├── main/                    # Electron Main Process (Node.js)
│   ├── main.ts              # App entry point, window lifecycle
│   ├── modules/
│   │   ├── window/          # Window manager (creation, state persistence)
│   │   ├── ipc/             # IPC handler registry & routing
│   │   ├── agents/          # Agent orchestration engine (core backend)
│   │   │   ├── AgentManager.ts      # Lifecycle: create, run, pause, cancel
│   │   │   ├── AgentRunner.ts       # Execution runtime (worker threads)
│   │   │   ├── TaskDecomposer.ts    # Breaks user intent → sub-tasks
│   │   │   └── types.ts             # Agent/Task data models
│   │   ├── store/           # Persistent storage (agent history, settings)
│   │   └── tray/            # System tray integration
│   └── utils/
├── preload/                 # Secure IPC bridge
│   └── index.ts             # contextBridge exposing dispatch API
├── renderer/                # React Frontend (Browser context)
│   ├── App.tsx
│   ├── assets/              # Fonts, icons, static images
│   ├── components/          # Shared UI components
│   │   ├── ui/              # Primitives (Button, Card, Badge, etc.)
│   │   └── layout/          # Shell, Sidebar, TopBar
│   ├── features/            # Feature-based modules
│   │   ├── dashboard/       # Home dashboard (active agents overview)
│   │   ├── agent-deploy/    # "New Agent" creation flow
│   │   ├── agent-monitor/   # Live agent detail view (logs, steps, status)
│   │   ├── agent-library/   # Pre-built agent templates / marketplace
│   │   ├── history/         # Past agent runs and results
│   │   └── settings/        # App configuration, API keys, preferences
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand state management
│   ├── styles/              # Global CSS, design tokens
│   └── types/               # Frontend TypeScript types
└── shared/                  # Shared between main & renderer
    ├── ipc-channels.ts      # IPC channel name constants
    ├── types.ts             # Shared data models (Agent, Task, etc.)
    └── constants.ts         # App-wide constants
```

---

## Phased Implementation

### Phase 1 — Foundation & App Shell [✅ COMPLETED]
> **Goal**: Working Electron app with a polished, navigable shell. No agent logic yet — just the "stage" everything will live on.

#### Scope
- [x] Scaffold project with `electron-vite` (React + TypeScript template)
- [x] Implement the app shell: sidebar navigation, top bar, content area
- [x] Build the design system: color tokens, typography (Inter/Outfit), glassmorphism cards, micro-animations
- [x] Create the **Dashboard** page (static mockup with placeholder agent cards)
- [x] Create the **Deploy Agent** page (static form UI — natural language input + template picker)
- [x] Create the **Settings** page shell
- [x] Set up Zustand store skeleton
- [x] Wire up IPC bridge (preload) with a basic ping/pong to prove main↔renderer communication
- [x] Dark mode by default with polished, premium aesthetic

#### Key Files
| Action | File | Purpose |
|--------|------|---------|
| [NEW] | `electron.vite.config.ts` | Vite config for all 3 processes |
| [NEW] | `src/main/main.ts` | App entry, window creation |
| [NEW] | `src/main/modules/window/WindowManager.ts` | Window lifecycle |
| [NEW] | `src/preload/index.ts` | contextBridge IPC API |
| [NEW] | `src/renderer/App.tsx` | Root component + routing |
| [NEW] | `src/renderer/styles/index.css` | Design system & global styles |
| [NEW] | `src/renderer/styles/tokens.css` | CSS custom properties |
| [NEW] | `src/renderer/components/layout/*` | Shell, Sidebar, TopBar |
| [NEW] | `src/renderer/components/ui/*` | Button, Card, Badge, Input, etc. |
| [NEW] | `src/renderer/features/dashboard/*` | Dashboard page |
| [NEW] | `src/renderer/features/agent-deploy/*` | Deploy page (form UI) |
| [NEW] | `src/renderer/features/settings/*` | Settings page |
| [NEW] | `src/renderer/stores/appStore.ts` | Zustand store skeleton |
| [NEW] | `src/shared/ipc-channels.ts` | IPC channel constants |
| [NEW] | `src/shared/types.ts` | Agent, Task, Status types |

---

### Phase 2 — Agent Engine & Live Monitoring
> **Goal**: Wire up the actual agent orchestration backend. Users can deploy a simulated agent and watch it execute steps in real time.

#### Scope
- Implement `AgentManager` in the main process (create, start, pause, cancel agents)
- Implement `AgentRunner` using worker threads for non-blocking execution
- Implement `TaskDecomposer` — breaks a natural-language goal into discrete sub-tasks
- Build the **Agent Monitor** view — live step-by-step progress, logs, status badges, timeline
- Wire IPC: deploy requests from renderer → main, live status updates main → renderer
- Implement Zustand `agentStore` for real-time state sync
- Add system tray with active agent count badge
- Persistent storage with `electron-store` for agent history

#### Key Files
| Action | File | Purpose |
|--------|------|---------|
| [NEW] | `src/main/modules/agents/AgentManager.ts` | Agent lifecycle orchestration |
| [NEW] | `src/main/modules/agents/AgentRunner.ts` | Worker-thread execution |
| [NEW] | `src/main/modules/agents/TaskDecomposer.ts` | Goal → sub-task breakdown |
| [NEW] | `src/main/modules/agents/types.ts` | Backend agent data models |
| [NEW] | `src/main/modules/ipc/agentHandlers.ts` | IPC handlers for agent ops |
| [NEW] | `src/main/modules/store/StoreManager.ts` | electron-store wrapper |
| [NEW] | `src/main/modules/tray/TrayManager.ts` | System tray integration |
| [MODIFY] | `src/preload/index.ts` | Expose agent IPC methods |
| [NEW] | `src/renderer/features/agent-monitor/*` | Live monitoring UI |
| [NEW] | `src/renderer/stores/agentStore.ts` | Real-time agent state |
| [MODIFY] | `src/renderer/features/agent-deploy/*` | Wire form to IPC |

---

### Phase 3 — Agent Library, History & Polish
> **Goal**: Pre-built agent templates, run history, and the UX polish that makes it feel like a shipped product.

#### Scope
- **Agent Library** — curated templates (e.g., "Research a topic", "Organize my files", "Draft an email", "Summarize a document")
- **History** view — searchable/filterable table of past agent runs with results
- Human-in-the-loop: agents can pause and ask the user for approval at key decision points
- Confidence indicators on agent actions
- Notification system (toast + system notifications for agent completion)
- Onboarding flow for first-time users
- Keyboard shortcuts and accessibility
- Auto-update integration

---

### Phase 4 — Real AI Integration & Extensibility *(Future)*
> **Goal**: Plug in real LLM backends and allow community agent templates.

#### Scope
- LLM provider integration (OpenAI, Anthropic, Gemini — user brings their own key)
- Tool/plugin system so agents can take real actions (file system, web browsing, APIs)
- Agent marketplace / community sharing
- Multi-agent collaboration (agents that delegate to sub-agents)

---

## User Review Required

> [!IMPORTANT]
> **Phasing strategy**: I'll implement **Phase 1** first and get it running. This gives us a working, beautiful app shell that we can iterate the backend into. Does this phasing feel right, or would you prefer a different slice?

> [!IMPORTANT]
> **UI framework**: The plan uses **vanilla CSS** with a custom design system (CSS custom properties, glassmorphism, gradients). If you'd prefer Tailwind or a component library like shadcn/ui, let me know.

> [!IMPORTANT]
> **State management**: I'm proposing **Zustand** for its simplicity and small footprint. Alternatives: Redux Toolkit, Jotai, or React Context. Preference?

## Open Questions

1. **App name**: The workspace is called `dispatch` — should the app be branded as **Dispatch**? Or do you have a different name in mind?
2. **Target audience detail**: When you say "general public", are we talking about knowledge workers (email, docs, scheduling) or truly anyone (including non-technical home users)? This affects the template library and onboarding depth.
3. **LLM provider strategy**: For Phase 2's simulated agents, I'll mock the AI responses so the app works without API keys. In Phase 4, should it be BYOK (bring your own key) or are you planning to proxy through a hosted backend?

## Verification Plan

### Automated Tests
- `npm run dev` — verify the Electron app launches with HMR
- `npm run build` — verify production bundle compiles
- IPC ping/pong test to confirm main↔renderer bridge works

### Manual Verification
- Visual review of the app shell (sidebar, dashboard, deploy page)
- Navigate between all pages
- Verify dark mode aesthetics, animations, and responsiveness
- Confirm window state persistence (size, position)
