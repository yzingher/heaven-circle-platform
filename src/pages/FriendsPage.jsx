import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, UserCheck, UserX, UserPlus, Lightbulb } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { mockFriends } from '../data/mock.js'

export default function FriendsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('friends')
  const [friends, setFriends] = useState(mockFriends.friends)
  const [pendingReceived, setPendingReceived] = useState(mockFriends.pendingReceived)
  const [pendingSent, setPendingSent] = useState(mockFriends.pendingSent)

  function acceptRequest(userId) {
    const user = pendingReceived.find(u => u.id === userId)
    setPendingReceived(prev => prev.filter(u => u.id !== userId))
    if (user) setFriends(prev => [...prev, { ...user, friendSince: new Date().toISOString() }])
  }

  function declineRequest(userId) {
    setPendingReceived(prev => prev.filter(u => u.id !== userId))
  }

  function cancelRequest(userId) {
    setPendingSent(prev => prev.filter(u => u.id !== userId))
  }

  const tabs = [
    { id: 'friends', label: `Circle (${friends.length})` },
    {
      id: 'requests',
      label: `Requests${pendingReceived.length > 0 ? ` (${pendingReceived.length})` : ''}`,
      badge: pendingReceived.length,
    },
    { id: 'suggestions', label: 'Suggestions' },
  ]

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease' }}>

        {/* Header */}
        <div style={{ padding: '20px 16px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 4 }}>
            Your Circle
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 16 }}>
            Connections made within Heaven Circle
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 0 }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '8px 4px', background: 'transparent',
                  border: 'none', borderBottom: `2px solid ${tab === t.id ? 'var(--gold)' : 'transparent'}`,
                  color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                  position: 'relative',
                }}
              >
                {t.label}
                {t.badge > 0 && tab !== t.id && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 16, height: 16, background: 'var(--gold)', borderRadius: '50%',
                    fontSize: '0.6rem', fontWeight: 700, color: '#0a0806',
                    marginLeft: 4, verticalAlign: 'middle',
                  }}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Friends tab */}
        {tab === 'friends' && (
          <div>
            {friends.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <p>Your circle is empty. Connect with members at events.</p>
              </div>
            ) : (
              friends.map(friend => (
                <div
                  key={friend.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div onClick={() => navigate(`/profile/${friend.username}`)}>
                    <Avatar
                      src={friend.photos?.[0]}
                      name={friend.displayName}
                      size="md"
                      isOnline={friend.isOnline}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }} onClick={() => navigate(`/profile/${friend.username}`)}>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0, fontSize: '0.9375rem' }}>
                      {friend.displayName}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: friend.isOnline ? 'var(--success)' : 'var(--text-muted)', margin: '2px 0 0' }}>
                      {friend.isOnline ? 'Online now' : `Last seen ${friend.lastSeen}`}
                    </p>
                    {friend.city && (
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', margin: '1px 0 0' }}>{friend.city}</p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate('/messages')}
                    style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s', flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold-border)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                  >
                    <MessageCircle size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Requests tab */}
        {tab === 'requests' && (
          <div style={{ padding: '16px' }}>
            {pendingReceived.length > 0 && (
              <>
                <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Incoming Requests
                </h3>
                {pendingReceived.map(user => (
                  <div
                    key={user.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <Avatar src={user.photos?.[0]} name={user.displayName} size="md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{user.displayName}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{user.city}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={() => acceptRequest(user.id)}
                        style={{
                          width: 34, height: 34, borderRadius: 'var(--radius-md)',
                          background: 'rgba(76,175,125,0.15)', border: '1px solid rgba(76,175,125,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: 'var(--success)',
                        }}
                      >
                        <UserCheck size={15} />
                      </button>
                      <button
                        onClick={() => declineRequest(user.id)}
                        style={{
                          width: 34, height: 34, borderRadius: 'var(--radius-md)',
                          background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.25)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: 'var(--error)',
                        }}
                      >
                        <UserX size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {pendingSent.length > 0 && (
              <>
                <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 20, marginBottom: 12 }}>
                  Sent Requests
                </h3>
                {pendingSent.map(user => (
                  <div
                    key={user.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <Avatar src={user.photos?.[0]} name={user.displayName} size="md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{user.displayName}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{user.city}</p>
                    </div>
                    <button
                      onClick={() => cancelRequest(user.id)}
                      style={{
                        padding: '6px 12px', borderRadius: 'var(--radius-md)',
                        background: 'transparent', border: '1px solid var(--border-subtle)',
                        fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </>
            )}

            {pendingReceived.length === 0 && pendingSent.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <p>No pending requests.</p>
              </div>
            )}
          </div>
        )}

        {/* Suggestions tab */}
        {tab === 'suggestions' && (
          <div style={{ padding: '16px' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              Members you may know from events you've attended.
            </p>
            {mockFriends.suggestions.map(user => (
              <div
                key={user.id}
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '14px', marginBottom: 10 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <Avatar src={user.photos?.[0]} name={user.displayName} size="md" onClick={() => navigate(`/profile/${user.username}`)} />
                  <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => navigate(`/profile/${user.username}`)}>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{user.displayName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      {user.city} · {user.age}
                    </p>
                  </div>
                </div>
                {user.sharedEvents?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <Lightbulb size={12} color="var(--gold)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Both attended {user.sharedEvents[0]}
                    </span>
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  <UserPlus size={13} /> Add to Circle
                </Button>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  )
}
