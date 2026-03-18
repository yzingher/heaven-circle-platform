import React from 'react'

export default function Card({
  children,
  className = '',
  glow = false,
  onClick,
  padding = true,
  style,
}) {
  return (
    <div
      className={`card ${glow ? 'card-glow' : ''} ${className}`}
      style={{
        padding: padding ? 'var(--space-4)' : 0,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
