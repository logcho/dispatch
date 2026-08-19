import { create } from 'zustand'

interface AppState {
  // Navigation
  currentPage: string
  setCurrentPage: (page: string) => void

  // IPC status
  ipcConnected: boolean
  setIpcConnected: (connected: boolean) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  dismissNotification: (id: string) => void
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  timestamp: number
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),

  // IPC status
  ipcConnected: false,
  setIpcConnected: (connected) => set({ ipcConnected: connected }),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
