// ─── App-wide Constants ─────────────────────────────────────────────────────

export const APP_NAME = 'Dispatch'
export const APP_VERSION = '0.1.0'

export const WINDOW_CONFIG = {
  DEFAULT_WIDTH: 1280,
  DEFAULT_HEIGHT: 820,
  MIN_WIDTH: 900,
  MIN_HEIGHT: 600,
} as const

export const AGENT_CATEGORIES = [
  { id: 'research', label: 'Research', icon: 'Search' },
  { id: 'writing', label: 'Writing', icon: 'PenTool' },
  { id: 'organization', label: 'Organization', icon: 'FolderOpen' },
  { id: 'communication', label: 'Communication', icon: 'Mail' },
  { id: 'analysis', label: 'Analysis', icon: 'BarChart3' },
  { id: 'creative', label: 'Creative', icon: 'Palette' },
  { id: 'automation', label: 'Automation', icon: 'Zap' },
  { id: 'general', label: 'General', icon: 'Bot' },
] as const
