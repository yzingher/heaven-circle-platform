import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, ArrowRight, Star } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { mockParties } from '../data/mock.js'

const statusConfig = {
  'pre-party': { label: 'Pre-Party', variant: 'gold', description: 'Rituals & prompts — preparing for the main event' },
  'live': { label: '● Live Now', variant: 'green', description: 'The experience is live — join the room' },
  'archived': { label: 'Archived', variant: 'muted', description: 'This event has concluded' },
}

function PartyCard({ party, onEnter }) {
  const status = statusConfig[party.status] || statusConfig.archived

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginBottom: 16,
        transition: 'all 0.2s',
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', height: 180 }}>
        <img src={party.coverImage} alt={party.eventTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.85) 100%)' }} />

        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {party.status === 'live' && (
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>{party.participantCount} online</span>
          </div>
        )}

        <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
            {party.eventTitle}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            {new Date(party.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <Users size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {party.participantCount} members attending
          </span>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          {status.description}
        </p>

        {/* Participant avatars */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          {party.participants.slice(0, 5).map((p, i) => (
            <div
              key={p.userId}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '2px solid var(--bg-elevated)',
                marginLeft: i > 0 ? -8 : 0,
                overflow: 'hidden',
                zIndex: 5 - i,
                position: 'relative',
              }}
            >
              <img
                src={`https://picsum.photos/seed/${p.username}/60/60`}
                alt={p.displayName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = 'var(--gold-muted)'
                  e.target.parentNode.style.display = 'flex'
                  e.target.parentNode.style.alignItems = 'center'
                  e.target.parentNode.style.justifyContent = 'center'
                  e.target.parentNode.innerHTML = `<span style="font-size:10px;color:#0a0806;font-weight:700">${p.displayName[0]}</span>`
                }}
              />
            </div>
          ))}
          {party.participants.length > 5 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 10 }}>
              +{party.participants.length - 5} more
            </span>
          )}
        </div>

        {party.status !== 'archived' ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onEnter(party.id)}
          >
            Enter Party Room <ArrowRight size={16} />
          </Button>
        ) : (
          <Button variant="ghost" size="md" fullWidth onClick={() => onEnter(party.id)}>
            View Archive
          </Button>
        )}
      </div>
    </div>
  )
}

export default function PartiesPage() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <div style={{ padding: '20px 0', animation: 'fadeInUp 0.3s ease' }}>

        <div style={{ padding: '0 16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Star size={20} color="var(--gold)" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', margin: 0 }}>
              My Parties
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Party rooms for events you're attending
          </p>
        </div>

        <div style={{ padding: '0 16px' }}>
          {mockParties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Star size={40} color="var(--text-faint)" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 8 }}>
                No party rooms yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>
                Purchase a ticket to an online party to unlock its party room.
              </p>
              <Button variant="secondary" onClick={() => navigate('/events')}>
                Browse Events
              </Button>
            </div>
          ) : (
            mockParties.map(party => (
              <PartyCard
                key={party.id}
                party={party}
                onEnter={id => navigate(`/parties/${id}`)}
              />
            ))
          )}
        </div>

      </div>
    </AppLayout>
  )
}
