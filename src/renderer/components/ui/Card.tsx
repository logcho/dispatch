import React from 'react'
import './Card.css'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'interactive' | 'accent'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`card card--${variant} card--pad-${padding} ${onClick ? 'card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}
