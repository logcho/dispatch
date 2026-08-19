// ─── Agent & Task Data Models ───────────────────────────────────────────────
// Shared between main process and renderer via IPC

export type AgentStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled'

export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'skipped'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  progress: number // 0–100
  startedAt?: number
  completedAt?: number
  output?: string
}

export interface Agent {
  id: string
  name: string
  description: string
  status: AgentStatus
  icon: string // lucide icon name
  category: AgentCategory
  tasks: Task[]
  progress: number // 0–100 overall
  createdAt: number
  startedAt?: number
  completedAt?: number
  input: string // user's original request
  output?: string // final result summary
}

export type AgentCategory =
  | 'research'
  | 'writing'
  | 'organization'
  | 'communication'
  | 'analysis'
  | 'creative'
  | 'automation'
  | 'general'

export interface AgentTemplate {
  id: string
  name: string
  description: string
  icon: string
  category: AgentCategory
  placeholder: string // example input text
  popular: boolean
}

export interface DeployAgentRequest {
  templateId?: string
  input: string
  name?: string
}

export interface AgentUpdate {
  agentId: string
  agent: Partial<Agent>
}
