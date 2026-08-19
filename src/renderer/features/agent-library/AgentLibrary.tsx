import React from 'react'
import { BookOpen } from 'lucide-react'
import { TopBar } from '../../components/layout'
import './AgentLibrary.css'

export const AgentLibrary: React.FC = () => {
  return (
    <>
      <TopBar title="Agent Library" subtitle="Pre-built agents ready to deploy" />
      <div className="library">
        <div className="library__empty animate-fade-in-up">
          <div className="library__empty-icon">
            <BookOpen size={48} />
          </div>
          <h2 className="library__empty-title">Agent Library coming soon</h2>
          <p className="library__empty-desc">
            In Phase 3, you'll browse and deploy curated agent templates for common
            tasks — from research to email management.
          </p>
        </div>
      </div>
    </>
  )
}
