import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Rocket,
  Activity,
  BookOpen,
  Clock,
  Settings,
  Zap,
} from 'lucide-react'
import './Sidebar.css'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  badge?: number
}

const mainNav: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/deploy', label: 'New Agent', icon: <Rocket size={20} /> },
  { path: '/monitor', label: 'Live Monitor', icon: <Activity size={20} /> },
  { path: '/library', label: 'Agent Library', icon: <BookOpen size={20} /> },
  { path: '/history', label: 'History', icon: <Clock size={20} /> },
]

const bottomNav: NavItem[] = [
  { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* Drag region for macOS title bar */}
      <div className="sidebar__drag-region drag-region" />

      {/* Brand */}
      <div className="sidebar__brand no-drag">
        <div className="sidebar__brand-icon">
          <Zap size={22} />
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">Dispatch</span>
          <span className="sidebar__brand-tag">AI Agents</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="sidebar__nav">
        <div className="sidebar__section">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              <span className="sidebar__link-label">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="sidebar__link-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="sidebar__bottom">
        {bottomNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}

        {/* Status indicator */}
        <div className="sidebar__status">
          <div className="sidebar__status-dot" />
          <span className="sidebar__status-text">System Online</span>
        </div>
      </div>
    </aside>
  )
}
