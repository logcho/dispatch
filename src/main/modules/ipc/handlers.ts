// ─── IPC Handlers ───────────────────────────────────────────────────────────
// Registers all IPC handlers for the main process.
// Each feature module will add its own handlers here.

import { ipcMain } from 'electron'
import { IPC } from '../../../shared/ipc-channels'
import { APP_VERSION } from '../../../shared/constants'

export function registerIpcHandlers(): void {
  // System: ping/pong — proves the bridge works
  ipcMain.handle(IPC.PING, () => {
    return { pong: true, timestamp: Date.now() }
  })

  // App: get version
  ipcMain.handle(IPC.APP_GET_VERSION, () => {
    return APP_VERSION
  })
}
