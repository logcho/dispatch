import React from 'react'
import { Clock } from 'lucide-react'
import { TopBar } from '../../components/layout'
import './History.css'

export const History: React.FC = () => {
  return (
    <>
      <TopBar title="History" subtitle="Past agent runs and results" />
      <div className="history">
        <div className="history__empty animate-fade-in-up">
          <div className="history__empty-icon">
            <Clock size={48} />
          </div>
          <h2 className="history__empty-title">No history yet</h2>
          <p className="history__empty-desc">
            Completed agent runs will appear here. Deploy your first agent
            to get started!
          </p>
        </div>
      </div>
    </>
  )
}
