import React from 'react'
import { Sidebar } from './Sidebar'
import './Shell.css'

interface ShellProps {
  children: React.ReactNode
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="shell">
      <Sidebar />
      <main className="shell__content">
        {children}
      </main>
    </div>
  )
}
