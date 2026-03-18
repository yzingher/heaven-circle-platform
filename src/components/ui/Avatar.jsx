import React from 'react'

const sizeMap = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
  '2xl': 128,
}

function getInitials(name = '') {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getColorFromName(name = '') {
  const colors = [
    '#8a4fff', '#c9a84c', '#4caf7d', '#e05c5c',
    '#4c9dcf', '#cf4c9d', '#9dcf4c', '#cf7a4c',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export default function Avatar({
  src,
  name = '',
  size = 'md',
  isOnline,
  className = '',
  onClick,
  storyRing = false,
  storySeen = false,
}) {
  const px = sizeMap[size] || 48
  const fontSize = px * 0.35

  return (
    <div
      className={`relative ${className}`}
      style={{ width: px, height: px, flexShrink: 0 }}
      onClick={onClick}
    >
      {storyRing ? (
        <div
          className={storySeen ? 'story-ring seen' : 'story-ring'}
          style={{ width: px, height: px, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onClick ? 'pointer' : 'default' }}
        >
          <AvatarInner src={src} name={name} px={px - 6} fontSize={fontSize * 0.9} />
        </div>
      ) : (
        <AvatarInner
          src={src}
          name={name}
          px={px}
          fontSize={fontSize}
          onClick={onClick}
        />
      )}

      {isOnline !== undefined && (
        <span
          className={`online-dot ${isOnline ? '' : 'offline'}`}
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: Math.max(8, px * 0.22),
            height: Math.max(8, px * 0.22),
          }}
        />
      )}
    </div>
  )
}

function AvatarInner({ src, name, px, fontSize, onClick }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        overflow: 'hidden',
        background: getColorFromName(name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 600,
        color: '#0a0806',
        fontFamily: 'var(--font-display)',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        flexShrink: 0,
      }}
      onClick={onClick}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={() => setImgError(true)}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}
