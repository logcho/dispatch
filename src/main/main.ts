// ─── Dispatch — Main Process Entry ──────────────────────────────────────────
// This is the Electron main process. It manages the app lifecycle,
// creates windows, and registers IPC handlers.

import { app, BrowserWindow } from 'electron'
import { createMainWindow } from './modules/window/WindowManager'
import { registerIpcHandlers } from './modules/ipc/handlers'

app.whenReady().then(() => {
  // Register all IPC handlers before creating windows
  registerIpcHandlers()

  // Create the main window
  createMainWindow()

  // macOS: re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
