import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Shell } from './components/layout'
import { Dashboard } from './features/dashboard'
import { DeployAgent } from './features/agent-deploy'
import { AgentMonitor } from './features/agent-monitor'
import { AgentLibrary } from './features/agent-library'
import { History } from './features/history'
import { Settings } from './features/settings'

const App: React.FC = () => {
  return (
    <HashRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deploy" element={<DeployAgent />} />
          <Route path="/monitor" element={<AgentMonitor />} />
          <Route path="/library" element={<AgentLibrary />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Shell>
    </HashRouter>
  )
}

export default App
