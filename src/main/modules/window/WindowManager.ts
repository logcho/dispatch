// ─── Window Manager ─────────────────────────────────────────────────────────
// Handles BrowserWindow creation, lifecycle, and state persistence.

import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { WINDOW_CONFIG } from '../../../shared/constants'

let mainWindow: BrowserWindow | null = null

export function createMainWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    width: WINDOW_CONFIG.DEFAULT_WIDTH,
    height: WINDOW_CONFIG.DEFAULT_HEIGHT,
    minWidth: WINDOW_CONFIG.MIN_WIDTH,
    minHeight: WINDOW_CONFIG.MIN_HEIGHT,
    show: false,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 18 },
    backgroundColor: '#09090b',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  // Graceful show after ready
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  // Open external links in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // Load the renderer
  const rendererUrl = process.env['ELECTRON_RENDERER_URL']
  if (rendererUrl) {
    mainWindow.loadURL(rendererUrl)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow
}
