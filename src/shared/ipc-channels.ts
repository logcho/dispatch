// ─── IPC Channel Constants ──────────────────────────────────────────────────
// Single source of truth for all IPC channel names.
// Both main and renderer import from here to prevent typos.

export const IPC = {
  // System
  PING: 'system:ping',

  // Agent lifecycle
  AGENT_DEPLOY: 'agent:deploy',
  AGENT_PAUSE: 'agent:pause',
  AGENT_RESUME: 'agent:resume',
  AGENT_CANCEL: 'agent:cancel',
  AGENT_DELETE: 'agent:delete',

  // Agent queries
  AGENT_GET_ALL: 'agent:get-all',
  AGENT_GET_BY_ID: 'agent:get-by-id',

  // Agent events (main → renderer)
  AGENT_STATUS_UPDATE: 'agent:status-update',
  AGENT_TASK_UPDATE: 'agent:task-update',
  AGENT_COMPLETED: 'agent:completed',

  // App
  APP_GET_VERSION: 'app:get-version',
} as const

export type IPCChannel = (typeof IPC)[keyof typeof IPC]
