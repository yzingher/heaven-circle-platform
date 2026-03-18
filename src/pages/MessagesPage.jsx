import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Edit, MessageCircle } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import { mockMessageThreads, formatTimeAgo } from '../data/mock.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function MessagesPage() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [search, setSearch] = useState('')

  const filtered = mockMessageThreads.filter(t => {
    const name = t.otherUser?.displayName || ''
    const username = t.otherUser?.username || ''
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      username.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease' }}>

        {/* Header */}
        <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>
            Messages
          </h1>
          <button
            style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold-border)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
          >
            <Edit size={16} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search messages…"
              className="input"
              style={{ paddingLeft: 36 }}
            />
          </div>
        </div>

        {/* Thread list */}
        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <MessageCircle size={40} color="var(--text-faint)" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 8 }}>
                No conversations yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Connect with members at events to start messaging.
              </p>
            </div>
          ) : (
            filtered.map(thread => {
              const other = thread.otherUser
              const isFromMe = thread.lastMessage.senderId === currentUser?.id
              return (
                <div
                  key={thread.id}
                  onClick={() => navigate(`/messages/${thread.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: thread.unread > 0 ? 'rgba(201, 168, 76, 0.02)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201, 168, 76, 0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = thread.unread > 0 ? 'rgba(201, 168, 76, 0.02)' : 'transparent'}
                >
                  <Avatar
                    src={other?.photos?.[0]}
                    name={other?.displayName || '?'}
                    size="md"
                    isOnline={other?.isOnline}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{
                        fontWeight: thread.unread > 0 ? 600 : 400,
                        color: thread.unread > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%',
                      }}>
                        {other?.displayName}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', flexShrink: 0 }}>
                        {formatTimeAgo(thread.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{
                        fontSize: '0.82rem',
                        color: thread.unread > 0 ? 'var(--text-secondary)' : 'var(--text-muted)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        maxWidth: '85%', margin: 0,
                      }}>
                        {isFromMe && <span style={{ color: 'var(--text-faint)' }}>You: </span>}
                        {thread.lastMessage.text}
                      </p>
                      {thread.unread > 0 && (
                        <div style={{
                          minWidth: 18, height: 18, borderRadius: 'var(--radius-full)',
                          background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.65rem', fontWeight: 700, color: '#0a0806', flexShrink: 0,
                        }}>
                          {thread.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </AppLayout>
  )
}
