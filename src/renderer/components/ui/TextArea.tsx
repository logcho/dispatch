import React from 'react'
import './TextArea.css'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  hint,
  error,
  className = '',
  id,
  ...props
}) => {
  const textAreaId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`textarea-group ${error ? 'textarea-group--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={textAreaId} className="textarea-group__label">
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className="textarea-group__textarea"
        {...props}
      />
      {hint && !error && (
        <span className="textarea-group__hint">{hint}</span>
      )}
      {error && (
        <span className="textarea-group__error">{error}</span>
      )}
    </div>
  )
}
