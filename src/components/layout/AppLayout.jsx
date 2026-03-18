import React from 'react'
import NavBar from './NavBar.jsx'
import BottomNav from './BottomNav.jsx'

export default function AppLayout({ children }) {
  return (
    <div
      className="luxury-bg"
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar />

      <main
        style={{
          flex: 1,
          paddingTop: 'var(--nav-height)',
          paddingBottom: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom))',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
