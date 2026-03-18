import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, CalendarDays, Star, MessageCircle, User } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/parties', label: 'Parties', icon: Star, accent: true },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(64px + env(safe-area-inset-bottom))',
        background: 'rgba(17, 17, 17, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 500,
      }}
    >
      {navItems.map(({ to, label, icon: Icon, accent }) => {
        const isActive = to === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(to)
        return (
          <NavLink
            key={to}
            to={to}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '4px 12px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'all 150ms ease',
              flex: 1,
            }}
          >
            {accent ? (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%)'
                    : 'rgba(201, 168, 76, 0.15)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 0 16px rgba(201, 168, 76, 0.4)' : 'none',
                  marginTop: -16,
                  transition: 'all 200ms ease',
                }}
              >
                <Icon
                  size={20}
                  color={isActive ? '#0a0806' : 'var(--gold)'}
                />
              </div>
            ) : (
              <>
                <Icon
                  size={22}
                  color={isActive ? 'var(--gold)' : 'var(--text-muted)'}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                    transition: 'color 150ms ease',
                  }}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
