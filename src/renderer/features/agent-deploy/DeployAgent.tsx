import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Rocket,
  Search,
  PenTool,
  FolderOpen,
  Mail,
  BarChart3,
  Palette,
  Zap,
  Bot,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { TopBar } from '../../components/layout'
import { Card, Button, TextArea } from '../../components/ui'
import type { AgentTemplate } from '../../../shared/types'
import './DeployAgent.css'

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={24} />,
  PenTool: <PenTool size={24} />,
  FolderOpen: <FolderOpen size={24} />,
  Mail: <Mail size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Palette: <Palette size={24} />,
  Zap: <Zap size={24} />,
  Bot: <Bot size={24} />,
}

const templates: AgentTemplate[] = [
  {
    id: 'research',
    name: 'Research',
    description: 'Deep-dive into any topic with structured findings',
    icon: 'Search',
    category: 'research',
    placeholder: 'Research the latest advancements in quantum computing...',
    popular: true,
  },
  {
    id: 'write',
    name: 'Writer',
    description: 'Draft emails, articles, reports, and more',
    icon: 'PenTool',
    category: 'writing',
    placeholder: 'Write a professional follow-up email to the client...',
    popular: true,
  },
  {
    id: 'organize',
    name: 'Organizer',
    description: 'Sort, categorize, and structure your files and data',
    icon: 'FolderOpen',
    category: 'organization',
    placeholder: 'Organize my downloads folder by file type and date...',
    popular: true,
  },
  {
    id: 'email',
    name: 'Email Assistant',
    description: 'Manage, draft, and prioritize your communications',
    icon: 'Mail',
    category: 'communication',
    placeholder: 'Draft responses to the 5 most urgent emails in my inbox...',
    popular: false,
  },
  {
    id: 'analyze',
    name: 'Analyst',
    description: 'Analyze data, spot patterns, and generate insights',
    icon: 'BarChart3',
    category: 'analysis',
    placeholder: 'Analyze this quarter\'s sales data and identify trends...',
    popular: false,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Generate ideas, brainstorm concepts, and design',
    icon: 'Palette',
    category: 'creative',
    placeholder: 'Brainstorm 10 unique marketing campaign ideas for...',
    popular: false,
  },
  {
    id: 'automate',
    name: 'Automator',
    description: 'Set up workflows and automate repetitive tasks',
    icon: 'Zap',
    category: 'automation',
    placeholder: 'Create a daily report summarizing key metrics from...',
    popular: true,
  },
  {
    id: 'general',
    name: 'General',
    description: 'A versatile agent for any task you can describe',
    icon: 'Bot',
    category: 'general',
    placeholder: 'Help me plan a weekend trip to...',
    popular: false,
  },
]

export const DeployAgent: React.FC = () => {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null)
  const [taskInput, setTaskInput] = useState('')

  const handleSelectTemplate = (template: AgentTemplate) => {
    setSelectedTemplate(template)
    setTaskInput('')
  }

  const handleDeploy = () => {
    if (!taskInput.trim()) return
    // Phase 2: Actually deploy via IPC
    console.log('Deploying agent:', {
      template: selectedTemplate?.id,
      input: taskInput,
    })
    navigate('/')
  }

  return (
    <>
      <TopBar
        title="Deploy Agent"
        subtitle="What would you like done?"
      />

      <div className="deploy">
        {/* Main Input Section */}
        <section className="deploy__input-section animate-fade-in-up">
          <Card variant="accent" padding="lg">
            <div className="deploy__input-header">
              <Sparkles size={20} className="deploy__input-sparkle" />
              <h2 className="deploy__input-title">Describe your task</h2>
              <p className="deploy__input-desc">
                Tell your agent what to do in plain English. Be as specific or general as you like.
              </p>
            </div>
            <TextArea
              placeholder={
                selectedTemplate
                  ? selectedTemplate.placeholder
                  : 'What would you like your agent to work on?'
              }
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              rows={4}
            />
            <div className="deploy__input-actions">
              {selectedTemplate && (
                <div className="deploy__selected-template">
                  <span className="deploy__selected-icon">
                    {iconMap[selectedTemplate.icon]}
                  </span>
                  <span className="deploy__selected-label">
                    {selectedTemplate.name} Agent
                  </span>
                  <button
                    className="deploy__selected-clear"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              <Button
                variant="primary"
                size="lg"
                icon={<Rocket size={18} />}
                disabled={!taskInput.trim()}
                onClick={handleDeploy}
              >
                Deploy Agent
              </Button>
            </div>
          </Card>
        </section>

        {/* Template Grid */}
        <section className="deploy__templates animate-fade-in-up stagger-2">
          <h3 className="deploy__section-title">
            Choose a specialist — or go general
          </h3>
          <div className="deploy__template-grid">
            {templates.map((template, i) => (
              <Card
                key={template.id}
                variant={selectedTemplate?.id === template.id ? 'accent' : 'interactive'}
                padding="md"
                className={`deploy__template-card animate-fade-in-up stagger-${i + 1}`}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="deploy__template">
                  <div className="deploy__template-icon">
                    {iconMap[template.icon]}
                  </div>
                  <div className="deploy__template-info">
                    <div className="deploy__template-name-row">
                      <span className="deploy__template-name">{template.name}</span>
                      {template.popular && (
                        <span className="deploy__template-popular">Popular</span>
                      )}
                    </div>
                    <span className="deploy__template-desc">{template.description}</span>
                  </div>
                  <ArrowRight size={16} className="deploy__template-arrow" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
