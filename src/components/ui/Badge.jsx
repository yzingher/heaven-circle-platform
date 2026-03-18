import React from 'react'

export default function Badge({ children, variant = 'gold', className = '' }) {
  const variantClass = {
    gold: 'tag-gold',
    purple: 'tag-purple',
    green: 'tag-green',
    red: 'tag-red',
    muted: 'tag-muted',
  }[variant] || 'tag-gold'

  return (
    <span className={`tag ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
