import React from 'react'

export default function Input({
  label,
  error,
  className = '',
  type = 'text',
  multiline = false,
  rows = 3,
  ...props
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-label">{label}</label>}
      {multiline ? (
        <textarea
          className={`input ${error ? 'error' : ''}`}
          rows={rows}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`input ${error ? 'error' : ''}`}
          {...props}
        />
      )}
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
