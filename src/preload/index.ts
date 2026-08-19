// ─── Preload Script ─────────────────────────────────────────────────────────
// Secure bridge between renderer (browser) and main (Node.js) processes.
// Only expose specific, safe methods — never the full Node.js API.

import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc-channels'

// The API exposed to the renderer via window.dispatch
const dispatchAPI = {
  // System
  ping: (): Promise<{ pong: boolean; timestamp: number }> =>
    ipcRenderer.invoke(IPC.PING),

  // App
  getVersion: (): Promise<string> =>
    ipcRenderer.invoke(IPC.APP_GET_VERSION),

  // Agent lifecycle (stubs for Phase 2)
  deployAgent: (request: unknown): Promise<unknown> =>
    ipcRenderer.invoke(IPC.AGENT_DEPLOY, request),

  pauseAgent: (agentId: string): Promise<void> =>
    ipcRenderer.invoke(IPC.AGENT_PAUSE, agentId),

  resumeAgent: (agentId: string): Promise<void> =>
    ipcRenderer.invoke(IPC.AGENT_RESUME, agentId),

  cancelAgent: (agentId: string): Promise<void> =>
    ipcRenderer.invoke(IPC.AGENT_CANCEL, agentId),

  deleteAgent: (agentId: string): Promise<void> =>
    ipcRenderer.invoke(IPC.AGENT_DELETE, agentId),

  // Agent queries
  getAllAgents: (): Promise<unknown[]> =>
    ipcRenderer.invoke(IPC.AGENT_GET_ALL),

  getAgentById: (agentId: string): Promise<unknown> =>
    ipcRenderer.invoke(IPC.AGENT_GET_BY_ID, agentId),

  // Event listeners (main → renderer)
  onAgentUpdate: (callback: (data: unknown) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, data: unknown) => callback(data)
    ipcRenderer.on(IPC.AGENT_STATUS_UPDATE, listener)
    return () => ipcRenderer.removeListener(IPC.AGENT_STATUS_UPDATE, listener)
  },
}

// Expose the API to the renderer as window.dispatch
contextBridge.exposeInMainWorld('dispatch', dispatchAPI)

// Type declaration for the renderer
export type DispatchAPI = typeof dispatchAPI
