import React from 'react'
import './TopBar.css'

interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="topbar">
      <div className="topbar__drag-region drag-region" />
      <div className="topbar__content no-drag">
        <div className="topbar__title-group">
          <h1 className="topbar__title">{title}</h1>
          {subtitle && <span className="topbar__subtitle">{subtitle}</span>}
        </div>
        {actions && <div className="topbar__actions">{actions}</div>}
      </div>
    </header>
  )
}
