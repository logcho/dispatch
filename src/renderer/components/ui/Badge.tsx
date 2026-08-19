import React from 'react'
import './Badge.css'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'
  size?: 'sm' | 'md'
  dot?: boolean
  pulse?: boolean
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  pulse = false,
  className = '',
}) => {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`}>
      {dot && (
        <span className={`badge__dot ${pulse ? 'badge__dot--pulse' : ''}`} />
      )}
      {children}
    </span>
  )
}
