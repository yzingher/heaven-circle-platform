import React, { useState } from 'react'
import { Lock, Sparkles, ChevronRight, Check, X, Users, Filter } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import Input from '../components/ui/Input.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { mockMatches, mockEvents, mockUsers } from '../data/mock.js'

function CompatibilityMeter({ score }) {
  const color = score >= 85 ? 'var(--gold)' : score >= 70 ? 'var(--warning)' : 'var(--text-muted)'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Compatibility</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color }}>{score}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--bg-card)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${score}%`,
          background: `linear-gradient(90deg, ${color}, ${color === 'var(--gold)' ? 'var(--gold-bright)' : color})`,
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

function MemberMiniCard({ user }) {
  return (
    <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden' }}>
        <img
          src={user.photos?.[0] || `https://picsum.photos/seed/${user.username}/104/104`}
          alt={user.displayName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <p style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontSize: '0.875rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
        {user.displayName}
      </p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
        {user.city} · {user.age}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {user.orientation?.slice(0, 1).map(o => <Badge key={o} variant="gold" style={{ fontSize: '0.6rem' }}>{o}</Badge>)}
      </div>
    </div>
  )
}

function MatchCard({ match, onCreateMatch }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)', padding: '18px', marginBottom: 14,
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
    >
      {/* Two profiles side by side */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <MemberMiniCard user={match.memberA} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.15)', border: '1px solid var(--gold-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={12} color="var(--gold)" />
          </div>
        </div>
        <MemberMiniCard user={match.memberB} />
      </div>

      {/* Compatibility meter */}
      <div style={{ marginBottom: 12 }}>
        <CompatibilityMeter score={match.compatibilityScore} />
      </div>

      {/* Shared tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
        {match.sharedTags.map(tag => (
          <Badge key={tag} variant="purple" style={{ fontSize: '0.65rem' }}>{tag}</Badge>
        ))}
        {match.sharedEvents.map(evt => (
          <Badge key={evt} variant="muted" style={{ fontSize: '0.65rem' }}>{evt}</Badge>
        ))}
      </div>

      {/* Concierge note */}
      <div style={{
        background: 'rgba(201, 168, 76, 0.05)', border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: 14,
      }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>
          "{match.conciergeNote}"
        </p>
      </div>

      <Button variant="primary" size="md" fullWidth onClick={() => onCreateMatch(match)}>
        Create Match <ChevronRight size={14} />
      </Button>
    </div>
  )
}

export default function ConciergePage() {
  const { currentUser } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [createMatchModal, setCreateMatchModal] = useState(null)
  const [introText, setIntroText] = useState('')
  const [sentMatches, setSentMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [cityFilter, setCityFilter] = useState('All')

  const isAccessDenied = currentUser?.role !== 'concierge'

  async function sendMatch() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSentMatches(prev => [...prev, createMatchModal.id])
    setLoading(false)
    setCreateMatchModal(null)
    setIntroText('')
  }

  if (isAccessDenied) {
    return (
      <AppLayout>
        <div style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 20px', textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.1)', border: '1px solid var(--gold-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }}>
            <Lock size={28} color="var(--gold)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8 }}>
            Concierge Access Only
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 300 }}>
            The Concierge dashboard is restricted to Heaven Circle staff. Log in as <code style={{ color: 'var(--gold)' }}>midnight_roman</code> to access.
          </p>
        </div>
      </AppLayout>
    )
  }

  const pendingMatches = mockMatches.suggestions.filter(m => !sentMatches.includes(m.id))
  const completedMatches = [...mockMatches.completed, ...mockMatches.suggestions.filter(m => sentMatches.includes(m.id))]

  const filteredAttendees = mockUsers.filter(u => {
    if (cityFilter !== 'All' && u.city !== cityFilter) return false
    return true
  })

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease', paddingBottom: 24 }}>

        {/* Header */}
        <div style={{ padding: '20px 16px 0', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Sparkles size={20} color="var(--gold)" />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-primary)', margin: 0 }}>
            Concierge
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '0 16px 20px' }}>
          Curate connections across the Circle
        </p>

        {/* Event selector */}
        <div style={{ padding: '0 16px 20px' }}>
          <div className="input-wrapper">
            <label className="input-label">Event Context</label>
            <select
              value={selectedEvent}
              onChange={e => setSelectedEvent(e.target.value)}
              className="input"
              style={{ background: 'var(--bg-elevated)', cursor: 'pointer' }}
            >
              <option value="all">All Events</option>
              {mockEvents.map(evt => (
                <option key={evt.id} value={evt.id}>{evt.title}</option>
              ))}
            </select>
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '0 16px 20px' }} />

        {/* Attendee Roster */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
              Attendee Roster
            </h2>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: '6px 10px',
                fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer',
              }}
            >
              <Filter size={12} /> Filter
            </button>
          </div>

          {filterOpen && (
            <div style={{ marginBottom: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['All', 'London', 'New York', 'Los Angeles', 'Paris'].map(city => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  style={{
                    padding: '4px 10px', borderRadius: 'var(--radius-full)',
                    border: `1px solid ${cityFilter === city ? 'var(--gold)' : 'var(--border-subtle)'}`,
                    background: cityFilter === city ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: cityFilter === city ? 'var(--gold)' : 'var(--text-muted)',
                    fontSize: '0.75rem', cursor: 'pointer',
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 20 }}>
            {filteredAttendees.slice(0, 6).map((user, i) => (
              <div
                key={user.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  borderBottom: i < 5 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={user.photos?.[0]} alt={user.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.displayName}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{user.city} · {user.age}</p>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {user.orientation?.slice(0, 1).map(o => (
                    <Badge key={o} variant="muted" style={{ fontSize: '0.6rem' }}>{o}</Badge>
                  ))}
                  {user.isOnline && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', alignSelf: 'center' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '0 16px 20px' }} />

        {/* Match Suggestions */}
        <div style={{ padding: '0 16px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
            Suggested Matches
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            {pendingMatches.length} suggestions awaiting review
          </p>

          {pendingMatches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              <Check size={28} color="var(--success)" style={{ marginBottom: 8 }} />
              <p>All suggestions have been actioned.</p>
            </div>
          ) : (
            pendingMatches.map(match => (
              <MatchCard key={match.id} match={match} onCreateMatch={m => setCreateMatchModal(m)} />
            ))
          )}
        </div>

        {/* Match History */}
        {completedMatches.length > 0 && (
          <>
            <hr className="gold-divider" style={{ margin: '4px 16px 20px' }} />
            <div style={{ padding: '0 16px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 14 }}>
                Match History
              </h2>
              <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                {completedMatches.map((match, i) => (
                  <div
                    key={match.id}
                    style={{ padding: '12px 14px', borderBottom: i < completedMatches.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {match.memberA.displayName}
                      </span>
                      <Sparkles size={11} color="var(--gold)" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {match.memberB.displayName}
                      </span>
                      <Badge variant="green" style={{ marginLeft: 'auto', fontSize: '0.6rem' }}>Sent</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ height: 3, flex: 1, background: 'var(--bg-card)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${match.compatibilityScore}%`, background: 'var(--gold)', borderRadius: 'var(--radius-full)' }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold)', flexShrink: 0 }}>{match.compatibilityScore}%</span>
                      {match.matchedDate && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)', flexShrink: 0 }}>
                          {new Date(match.matchedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Create Match Modal */}
      {createMatchModal && (
        <Modal
          isOpen={Boolean(createMatchModal)}
          onClose={() => setCreateMatchModal(null)}
          title="Create Match"
        >
          <div>
            {/* Member profiles */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <MemberMiniCard user={createMatchModal.memberA} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Sparkles size={18} color="var(--gold)" />
              </div>
              <MemberMiniCard user={createMatchModal.memberB} />
            </div>

            <CompatibilityMeter score={createMatchModal.compatibilityScore} />

            <div style={{ marginTop: 16, marginBottom: 16 }}>
              <div className="input-wrapper">
                <label className="input-label">Personal Introduction</label>
                <textarea
                  value={introText}
                  onChange={e => setIntroText(e.target.value)}
                  placeholder="Write a personal note to introduce them to each other…"
                  className="input"
                  rows={4}
                  style={{ resize: 'none' }}
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>
                This message will be sent to both members along with their match notification.
              </p>
            </div>

            {/* Concierge note preview */}
            <div style={{
              background: 'rgba(201,168,76,0.05)', border: '1px solid var(--gold-border)',
              borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: 16,
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>System note:</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{createMatchModal.conciergeNote}"
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={!introText.trim()}
              onClick={sendMatch}
            >
              Send Match Notification
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setCreateMatchModal(null)}
              style={{ marginTop: 8 }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}

    </AppLayout>
  )
}
