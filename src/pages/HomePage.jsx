import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Card from '../components/ui/Card.jsx'
import { mockEvents, mockParties, mockFriends, mockStories, formatEventDate } from '../data/mock.js'

function EventCard({ event, onClick }) {
  const fillPct = Math.round((event.ticketsSold / event.capacity) * 100)
  const lowestPrice = Math.min(...event.tiers.map(t => t.price))
  const availableCount = event.tiers.reduce((sum, t) => sum + t.available, 0)

  return (
    <div
      onClick={onClick}
      style={{
        minWidth: 240,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--gold-border)'
        e.currentTarget.style.boxShadow = 'var(--shadow-gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ position: 'relative', height: 120 }}>
        <img src={event.coverImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(8,8,8,0.85) 100%)' }} />
        <Badge
          variant={event.type === 'online-party' ? 'purple' : 'gold'}
          style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.7rem' }}
        >
          {event.type === 'online-party' ? 'Online' : event.city}
        </Badge>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
          {event.title}
        </h4>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>
          {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {event.time}
        </p>
        <div style={{ marginBottom: 8 }}>
          <div className="capacity-bar">
            <div className="capacity-fill" style={{ width: `${fillPct}%` }} />
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {availableCount} tickets remaining
          </p>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 500 }}>
          From £{lowestPrice}
        </p>
      </div>
    </div>
  )
}

function PartyCard({ party, onClick }) {
  const statusColors = { 'pre-party': 'gold', 'live': 'green', 'archived': 'muted' }
  const statusLabels = { 'pre-party': 'Pre-Party', 'live': '● Live', 'archived': 'Archived' }

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--gold-border)'
        e.currentTarget.style.boxShadow = 'var(--shadow-gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ position: 'relative', height: 90 }}>
        <img src={party.coverImage} alt={party.eventTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.5)' }} />
        <Badge variant={statusColors[party.status]} style={{ position: 'absolute', top: 8, left: 8 }}>
          {statusLabels[party.status]}
        </Badge>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 2 }}>
          {party.eventTitle}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {party.participantCount} members · {new Date(party.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').slice(0, 4)
  const onlineMembers = mockFriends.friends.filter(f => f.isOnline)
  const myParties = mockParties.slice(0, 3)
  const storiesWithOwn = mockStories

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.4s ease', paddingBottom: 16 }}>

        {/* Greeting */}
        <div style={{ padding: '24px 16px 8px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-primary)' }}>
            Welcome back,{' '}
            <span style={{ color: 'var(--gold)' }}>{currentUser?.displayName || currentUser?.username}</span>
          </h1>
        </div>

        <hr className="gold-divider" style={{ margin: '16px 16px' }} />

        {/* Stories strip */}
        <div style={{ padding: '0 16px 0' }}>
          <div className="section-header">
            <span className="section-title">Stories</span>
            <button
              onClick={() => navigate('/stories')}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          <div className="scroll-strip" style={{ paddingBottom: 8 }}>
            {storiesWithOwn.map(story => (
              <div
                key={story.id}
                onClick={() => navigate('/stories')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}
              >
                <Avatar
                  src={story.userPhoto}
                  name={story.displayName}
                  size="lg"
                  storyRing
                  storySeen={story.seen}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: 56, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {story.isOwn ? 'Your story' : story.displayName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '16px 16px' }} />

        {/* Upcoming Events */}
        <div style={{ padding: '0 16px' }}>
          <div className="section-header">
            <span className="section-title">Upcoming Events</span>
            <button
              onClick={() => navigate('/events')}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          <div className="scroll-strip">
            {upcomingEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '16px 16px' }} />

        {/* My Parties */}
        <div style={{ padding: '0 16px' }}>
          <div className="section-header">
            <span className="section-title">My Parties</span>
            <button
              onClick={() => navigate('/parties')}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {myParties.map(party => (
              <PartyCard
                key={party.id}
                party={party}
                onClick={() => navigate(`/parties/${party.id}`)}
              />
            ))}
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '16px 16px' }} />

        {/* Online circle */}
        <div style={{ padding: '0 16px' }}>
          <div className="section-header">
            <span className="section-title">Your Circle</span>
            <button
              onClick={() => navigate('/friends')}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          {onlineMembers.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No one online right now.</p>
          ) : (
            <div className="scroll-strip">
              {onlineMembers.map(member => (
                <div
                  key={member.id}
                  onClick={() => navigate(`/profile/${member.username}`)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}
                >
                  <Avatar
                    src={member.photos?.[0]}
                    name={member.displayName}
                    size="md"
                    isOnline={member.isOnline}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: 52, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {member.displayName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Concierge notification if pending */}
        <div style={{ padding: '16px 16px 0' }}>
          <div
            onClick={() => navigate('/concierge')}
            style={{
              background: 'linear-gradient(135deg, rgba(61,13,78,0.4) 0%, rgba(107,33,168,0.2) 100%)',
              border: '1px solid rgba(107, 33, 168, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107, 33, 168, 0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107, 33, 168, 0.4)'}
          >
            <Sparkles size={20} color="#b57bee" />
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                Your Concierge has a suggestion
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                A new match has been curated for you
              </p>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
