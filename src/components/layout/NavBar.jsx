import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Gem } from 'lucide-react'
import Avatar from '../ui/Avatar.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function NavBar() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = React.useState(false)

  const notifications = [
    { id: 1, text: 'Roman sent you a message', time: '2m ago', unread: true },
    { id: 2, text: 'Marco sent you a friend request', time: '1h ago', unread: true },
    { id: 3, text: 'Nocturne Masquerade — tickets selling fast', time: '3h ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        background: 'rgba(8, 8, 8, 0.9)',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-4)',
        zIndex: 400,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
        }}
      >
        <Gem size={18} color="var(--gold)" />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 400,
            color: 'var(--gold)',
            letterSpacing: '0.08em',
          }}
        >
          Heaven Circle
        </span>
      </Link>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: notifOpen ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 150ms ease',
            }}
          >
            <Bell size={20} strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  background: 'var(--gold)',
                  borderRadius: '50%',
                  border: '1.5px solid var(--bg-base)',
                }}
              />
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                width: 280,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
                animation: 'slideDown 0.2s ease',
                zIndex: 600,
              }}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Notifications
                </span>
              </div>
              {notifications.map(n => (
                <div
                  key={n.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: n.unread ? 'rgba(201, 168, 76, 0.04)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <p style={{ fontSize: '0.875rem', color: n.unread ? 'var(--text-primary)' : 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {n.text}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <Avatar
          src={currentUser?.photos?.[0]}
          name={currentUser?.displayName || currentUser?.username}
          size="sm"
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Click away */}
      {notifOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 399 }}
          onClick={() => setNotifOpen(false)}
        />
      )}
    </header>
  )
}
