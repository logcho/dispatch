import React from 'react'
import { Activity } from 'lucide-react'
import { TopBar } from '../../components/layout'
import './AgentMonitor.css'

export const AgentMonitor: React.FC = () => {
  return (
    <>
      <TopBar title="Live Monitor" subtitle="Watch your agents work in real time" />
      <div className="monitor">
        <div className="monitor__empty animate-fade-in-up">
          <div className="monitor__empty-icon">
            <Activity size={48} />
          </div>
          <h2 className="monitor__empty-title">Live monitoring coming soon</h2>
          <p className="monitor__empty-desc">
            In Phase 2, you'll see real-time step-by-step progress, logs, and timeline
            for every running agent.
          </p>
        </div>
      </div>
    </>
  )
}
