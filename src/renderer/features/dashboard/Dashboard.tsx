import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Rocket,
  Activity,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  ArrowRight,
  Bot,
  Sparkles,
} from 'lucide-react'
import { TopBar } from '../../components/layout'
import { Card, Badge, Button } from '../../components/ui'
import './Dashboard.css'

// Mock data for Phase 1 — will be replaced by real agent state in Phase 2
const mockActiveAgents = [
  {
    id: '1',
    name: 'Research Assistant',
    description: 'Researching latest trends in renewable energy',
    status: 'running' as const,
    progress: 67,
    icon: 'Search',
  },
  {
    id: '2',
    name: 'Email Drafter',
    description: 'Writing follow-up emails for client meetings',
    status: 'running' as const,
    progress: 34,
    icon: 'Mail',
  },
  {
    id: '3',
    name: 'File Organizer',
    description: 'Sorting and categorizing downloaded documents',
    status: 'paused' as const,
    progress: 82,
    icon: 'FolderOpen',
  },
]

const stats = [
  { label: 'Active Agents', value: '3', icon: <Activity size={18} />, color: 'accent' },
  { label: 'Completed Today', value: '12', icon: <CheckCircle2 size={18} />, color: 'success' },
  { label: 'Tasks Processed', value: '47', icon: <TrendingUp size={18} />, color: 'info' },
  { label: 'Avg. Duration', value: '4m', icon: <Clock size={18} />, color: 'warning' },
]

const statusConfig = {
  running: { label: 'Running', variant: 'success' as const, pulse: true },
  paused: { label: 'Paused', variant: 'warning' as const, pulse: false },
  completed: { label: 'Completed', variant: 'default' as const, pulse: false },
  failed: { label: 'Failed', variant: 'error' as const, pulse: false },
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Your command center"
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Rocket size={16} />}
            onClick={() => navigate('/deploy')}
          >
            New Agent
          </Button>
        }
      />

      <div className="dashboard">
        {/* Hero Section */}
        <section className="dashboard__hero animate-fade-in-up">
          <Card variant="accent" padding="lg">
            <div className="dashboard__hero-content">
              <div className="dashboard__hero-text">
                <div className="dashboard__hero-badge">
                  <Sparkles size={14} />
                  <span>Getting Started</span>
                </div>
                <h2 className="dashboard__hero-title">
                  Your AI workforce is ready
                </h2>
                <p className="dashboard__hero-desc">
                  Deploy agents to handle research, writing, organization, and more.
                  Just describe what you need — Dispatch handles the rest.
                </p>
                <Button
                  variant="primary"
                  icon={<Rocket size={16} />}
                  onClick={() => navigate('/deploy')}
                >
                  Deploy Your First Agent
                </Button>
              </div>
              <div className="dashboard__hero-graphic">
                <div className="dashboard__hero-orb dashboard__hero-orb--1" />
                <div className="dashboard__hero-orb dashboard__hero-orb--2" />
                <div className="dashboard__hero-orb dashboard__hero-orb--3" />
                <Bot size={48} className="dashboard__hero-bot" />
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="dashboard__stats animate-fade-in-up stagger-1">
          {stats.map((stat, i) => (
            <Card key={stat.label} variant="default" padding="md" className={`stagger-${i + 1}`}>
              <div className="dashboard__stat">
                <div className={`dashboard__stat-icon dashboard__stat-icon--${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="dashboard__stat-info">
                  <span className="dashboard__stat-value">{stat.value}</span>
                  <span className="dashboard__stat-label">{stat.label}</span>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Active Agents */}
        <section className="dashboard__section animate-fade-in-up stagger-3">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">
              <Activity size={18} />
              Active Agents
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/monitor')}>
              View All <ArrowRight size={14} />
            </Button>
          </div>

          <div className="dashboard__agents">
            {mockActiveAgents.map((agent, i) => {
              const config = statusConfig[agent.status]
              return (
                <Card
                  key={agent.id}
                  variant="interactive"
                  padding="md"
                  className={`animate-fade-in-up stagger-${i + 2}`}
                  onClick={() => navigate('/monitor')}
                >
                  <div className="dashboard__agent">
                    <div className="dashboard__agent-header">
                      <div className="dashboard__agent-icon">
                        <Bot size={20} />
                      </div>
                      <div className="dashboard__agent-info">
                        <span className="dashboard__agent-name">{agent.name}</span>
                        <span className="dashboard__agent-desc">{agent.description}</span>
                      </div>
                      <Badge variant={config.variant} dot pulse={config.pulse}>
                        {config.label}
                      </Badge>
                    </div>
                    <div className="dashboard__agent-progress">
                      <div className="dashboard__progress-bar">
                        <div
                          className="dashboard__progress-fill"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                      <span className="dashboard__progress-text">{agent.progress}%</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard__section animate-fade-in-up stagger-5">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">
              <Zap size={18} />
              Quick Actions
            </h2>
          </div>
          <div className="dashboard__quick-actions">
            {[
              { label: 'Research a topic', emoji: '🔍' },
              { label: 'Draft an email', emoji: '✉️' },
              { label: 'Summarize a document', emoji: '📄' },
              { label: 'Organize my files', emoji: '📁' },
            ].map((action) => (
              <Card
                key={action.label}
                variant="interactive"
                padding="md"
                onClick={() => navigate('/deploy')}
              >
                <div className="dashboard__quick-action">
                  <span className="dashboard__quick-action-emoji">{action.emoji}</span>
                  <span className="dashboard__quick-action-label">{action.label}</span>
                  <ArrowRight size={14} className="dashboard__quick-action-arrow" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
