import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MapPin, Clock, Users } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { mockEvents } from '../data/mock.js'

const CITIES = ['All', 'London', 'New York', 'Los Angeles', 'Global']
const TYPES = ['All', 'In-Person', 'Online Party']

function EventListCard({ event, onClick }) {
  const fillPct = Math.round((event.ticketsSold / event.capacity) * 100)
  const lowestPrice = Math.min(...event.tiers.map(t => t.price))
  const availableTotal = event.tiers.reduce((sum, t) => sum + t.available, 0)

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
        marginBottom: 12,
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
      {/* Cover */}
      <div style={{ position: 'relative', height: 160 }}>
        <img src={event.coverImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.9) 100%)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <Badge variant={event.type === 'online-party' ? 'purple' : 'gold'}>
            {event.type === 'online-party' ? 'Online Party' : 'In-Person'}
          </Badge>
          {event.status === 'upcoming' && fillPct >= 80 && (
            <Badge variant="red">Selling Fast</Badge>
          )}
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
            {event.title}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Clock size={13} />
            {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {event.time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <MapPin size={13} />
            {event.city}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Users size={13} />
            {availableTotal > 0 ? `${availableTotal} remaining` : 'Sold out'}
          </div>
        </div>

        {/* Capacity bar */}
        <div style={{ marginBottom: 12 }}>
          <div className="capacity-bar">
            <div className="capacity-fill" style={{ width: `${fillPct}%` }} />
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {event.ticketsSold} of {event.capacity} tickets sold
          </p>
        </div>

        {/* Tiers preview */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {event.tiers.map(tier => (
            <div
              key={tier.name}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 10px',
              }}
            >
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{tier.name}</p>
              <p style={{ fontSize: '0.85rem', color: tier.available > 0 ? 'var(--gold)' : 'var(--text-faint)', fontWeight: 600, margin: 0 }}>
                {tier.available > 0 ? `£${tier.price}` : 'Sold out'}
              </p>
            </div>
          ))}
        </div>

        <Button variant="secondary" size="sm" fullWidth>
          View Details
        </Button>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const navigate = useNavigate()
  const [cityFilter, setCityFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showPast, setShowPast] = useState(false)

  const upcoming = mockEvents.filter(e => {
    if (e.status !== 'upcoming') return false
    if (cityFilter !== 'All' && e.city !== cityFilter) return false
    if (typeFilter === 'In-Person' && e.type !== 'in-person') return false
    if (typeFilter === 'Online Party' && e.type !== 'online-party') return false
    return true
  })

  const past = mockEvents.filter(e => e.status === 'past')

  return (
    <AppLayout>
      <div style={{ padding: '20px 0 16px', animation: 'fadeInUp 0.3s ease' }}>

        {/* Header */}
        <div style={{ padding: '0 16px 16px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 4 }}>
            Events
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Curated experiences, worldwide
          </p>
        </div>

        {/* City filters */}
        <div style={{ padding: '0 16px 12px' }}>
          <div className="scroll-strip" style={{ gap: 8 }}>
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${cityFilter === city ? 'var(--gold)' : 'var(--border-subtle)'}`,
                  background: cityFilter === city ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                  color: cityFilter === city ? 'var(--gold)' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 150ms ease',
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Type filters */}
        <div style={{ padding: '0 16px 20px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${typeFilter === type ? 'rgba(107,33,168,0.6)' : 'var(--border-subtle)'}`,
                  background: typeFilter === type ? 'rgba(107, 33, 168, 0.2)' : 'transparent',
                  color: typeFilter === type ? '#b57bee' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Events list */}
        <div style={{ padding: '0 16px' }}>
          {upcoming.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <p>No events match your filters.</p>
            </div>
          ) : (
            upcoming.map(event => (
              <EventListCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))
          )}
        </div>

        {/* Past events */}
        <div style={{ padding: '8px 16px' }}>
          <button
            onClick={() => setShowPast(!showPast)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              padding: '8px 0',
              width: '100%',
            }}
          >
            <ChevronDown size={16} style={{ transform: showPast ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            View Archive ({past.length} past events)
          </button>

          {showPast && (
            <div style={{ animation: 'fadeIn 0.3s ease', marginTop: 12, opacity: 0.7 }}>
              {past.map(event => (
                <EventListCard
                  key={event.id}
                  event={event}
                  onClick={() => navigate(`/events/${event.id}`)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  )
}
