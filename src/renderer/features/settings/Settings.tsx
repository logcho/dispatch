import React, { useState, useEffect } from 'react'
import { Info, Key, Bell, Shield, Zap } from 'lucide-react'
import { TopBar } from '../../components/layout'
import { Card, Input, Button } from '../../components/ui'
import './Settings.css'

export const Settings: React.FC = () => {
  const [appVersion, setAppVersion] = useState('...')
  const [ipcStatus, setIpcStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  useEffect(() => {
    // Test IPC bridge
    const testIpc = async () => {
      try {
        const result = await (window as any).dispatch.ping()
        if (result?.pong) {
          setIpcStatus('connected')
        }
      } catch {
        setIpcStatus('error')
      }

      try {
        const version = await (window as any).dispatch.getVersion()
        setAppVersion(version)
      } catch {
        setAppVersion('unknown')
      }
    }
    testIpc()
  }, [])

  return (
    <>
      <TopBar title="Settings" subtitle="Configure your experience" />
      <div className="settings">
        {/* System Status */}
        <section className="settings__section animate-fade-in-up">
          <h3 className="settings__section-title">
            <Zap size={18} />
            System Status
          </h3>
          <Card variant="default" padding="md">
            <div className="settings__status-grid">
              <div className="settings__status-item">
                <span className="settings__status-label">App Version</span>
                <span className="settings__status-value">{appVersion}</span>
              </div>
              <div className="settings__status-item">
                <span className="settings__status-label">IPC Bridge</span>
                <span className={`settings__status-value settings__status-value--${ipcStatus}`}>
                  <span className={`settings__status-dot settings__status-dot--${ipcStatus}`} />
                  {ipcStatus === 'checking' && 'Checking...'}
                  {ipcStatus === 'connected' && 'Connected'}
                  {ipcStatus === 'error' && 'Error'}
                </span>
              </div>
              <div className="settings__status-item">
                <span className="settings__status-label">Agent Engine</span>
                <span className="settings__status-value settings__status-value--checking">
                  <span className="settings__status-dot settings__status-dot--checking" />
                  Phase 2
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* API Configuration */}
        <section className="settings__section animate-fade-in-up stagger-1">
          <h3 className="settings__section-title">
            <Key size={18} />
            API Configuration
          </h3>
          <Card variant="default" padding="md">
            <div className="settings__form">
              <Input
                label="OpenAI API Key"
                type="password"
                placeholder="sk-..."
                hint="Required for AI-powered agents. Your key stays local."
                icon={<Key size={14} />}
              />
              <Input
                label="Anthropic API Key"
                type="password"
                placeholder="sk-ant-..."
                hint="Optional. Enables Claude-based agents."
                icon={<Key size={14} />}
              />
              <div className="settings__form-actions">
                <Button variant="primary" size="sm">Save Keys</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Notifications */}
        <section className="settings__section animate-fade-in-up stagger-2">
          <h3 className="settings__section-title">
            <Bell size={18} />
            Notifications
          </h3>
          <Card variant="default" padding="md">
            <div className="settings__options">
              <label className="settings__option">
                <div className="settings__option-info">
                  <span className="settings__option-name">Agent Completion</span>
                  <span className="settings__option-desc">Notify when an agent finishes its task</span>
                </div>
                <input type="checkbox" className="settings__toggle" defaultChecked />
              </label>
              <label className="settings__option">
                <div className="settings__option-info">
                  <span className="settings__option-name">Error Alerts</span>
                  <span className="settings__option-desc">Notify when an agent encounters an error</span>
                </div>
                <input type="checkbox" className="settings__toggle" defaultChecked />
              </label>
              <label className="settings__option">
                <div className="settings__option-info">
                  <span className="settings__option-name">Approval Requests</span>
                  <span className="settings__option-desc">Notify when an agent needs your input</span>
                </div>
                <input type="checkbox" className="settings__toggle" defaultChecked />
              </label>
            </div>
          </Card>
        </section>

        {/* About */}
        <section className="settings__section animate-fade-in-up stagger-3">
          <h3 className="settings__section-title">
            <Info size={18} />
            About
          </h3>
          <Card variant="default" padding="md">
            <div className="settings__about">
              <p className="settings__about-text">
                <strong>Dispatch</strong> — AI agents for everyone.
              </p>
              <p className="settings__about-text">
                Deploy intelligent agents to handle research, writing, organization,
                and more. Built for the general public, designed for simplicity.
              </p>
              <p className="settings__about-version">Version {appVersion}</p>
            </div>
          </Card>
        </section>
      </div>
    </>
  )
}
