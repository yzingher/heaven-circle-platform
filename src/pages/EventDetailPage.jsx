import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Users, ShirtIcon, Check, ExternalLink } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import { getEventById, formatEventDate } from '../data/mock.js'

export default function EventDetailPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const event = getEventById(eventId)

  const [selectedTier, setSelectedTier] = useState(null)
  const [purchaseModal, setPurchaseModal] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!event) {
    return (
      <AppLayout>
        <div style={{ padding: '40px 16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Event not found.</p>
          <Button variant="ghost" onClick={() => navigate('/events')} style={{ marginTop: 16 }}>
            <ArrowLeft size={16} /> Back to Events
          </Button>
        </div>
      </AppLayout>
    )
  }

  const fillPct = Math.round((event.ticketsSold / event.capacity) * 100)
  const remaining = event.capacity - event.ticketsSold

  async function handlePurchase() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setPurchased(true)
    setPurchaseModal(false)
  }

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease' }}>

        {/* Hero */}
        <div style={{ position: 'relative', height: 280 }}>
          <img src={event.coverImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.9) 100%)' }} />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute', top: 16, left: 16,
              background: 'rgba(8,8,8,0.6)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)', width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-primary)', backdropFilter: 'blur(8px)',
            }}
          >
            <ArrowLeft size={16} />
          </button>

          {/* Status badges */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 6 }}>
            <Badge variant={event.type === 'online-party' ? 'purple' : 'gold'}>
              {event.type === 'online-party' ? 'Online Party' : 'In-Person'}
            </Badge>
            {event.status === 'past' && <Badge variant="muted">Past Event</Badge>}
          </div>

          {/* Title overlay */}
          <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 6 }}>
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 16px' }}>

          {/* Meta info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={15} color="var(--gold)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {formatEventDate(event.date)} at {event.time}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={15} color="var(--gold)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {event.venue} · {event.city}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={15} color="var(--gold)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {remaining > 0 ? `${remaining} of ${event.capacity} tickets remaining` : 'Sold out'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShirtIcon size={15} color="var(--gold)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{event.dressCode}</span>
            </div>
          </div>

          {/* Capacity bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Capacity</span>
              <span style={{ fontSize: '0.78rem', color: fillPct >= 80 ? 'var(--error)' : 'var(--text-muted)' }}>
                {fillPct}% sold
              </span>
            </div>
            <div className="capacity-bar" style={{ height: 6 }}>
              <div className="capacity-fill" style={{ width: `${fillPct}%` }} />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 10 }}>
              About This Event
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
              {event.description}
            </p>
          </div>

          <hr className="gold-divider" />

          {/* Tags */}
          {event.tags && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
              {event.tags.map(tag => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>
          )}

          {/* Online party teaser */}
          {event.type === 'online-party' && event.status === 'upcoming' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(61,13,78,0.3) 0%, rgba(107,33,168,0.15) 100%)',
              border: '1px solid rgba(107, 33, 168, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              marginBottom: 24,
            }}>
              <p style={{ fontSize: '0.8rem', color: '#b57bee', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                Party Room Preview
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Ticket holders gain access to our private party room — guided pre-party rituals, live chat, and real-time connection with fellow members worldwide.
              </p>
            </div>
          )}

          {/* Ticket tiers */}
          {event.status !== 'past' && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 14 }}>
                {purchased ? 'Your Ticket' : 'Ticket Tiers'}
              </h2>

              {purchased ? (
                <div style={{
                  background: 'rgba(76, 175, 125, 0.1)',
                  border: '1px solid rgba(76, 175, 125, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(76, 175, 125, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={18} color="var(--success)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>You're attending</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      Tier: {selectedTier?.name} · Confirmation sent
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {event.tiers.map(tier => (
                    <div
                      key={tier.name}
                      onClick={() => tier.available > 0 && setSelectedTier(tier)}
                      style={{
                        background: selectedTier?.name === tier.name ? 'rgba(201, 168, 76, 0.08)' : 'var(--bg-elevated)',
                        border: `1px solid ${selectedTier?.name === tier.name ? 'var(--gold)' : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '14px 16px',
                        cursor: tier.available > 0 ? 'pointer' : 'default',
                        opacity: tier.available > 0 ? 1 : 0.5,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <div style={{ display: 'flex', align: 'center', gap: 8 }}>
                          {selectedTier?.name === tier.name && (
                            <Check size={14} color="var(--gold)" style={{ marginTop: 2 }} />
                          )}
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
                            {tier.name}
                          </h4>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: tier.available > 0 ? 'var(--gold)' : 'var(--text-faint)', fontWeight: 500 }}>
                          {tier.available > 0 ? `£${tier.price}` : 'Sold Out'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{tier.description}</p>
                      {tier.available > 0 && tier.available <= 5 && (
                        <p style={{ fontSize: '0.72rem', color: 'var(--error)', marginTop: 6 }}>
                          Only {tier.available} remaining
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!selectedTier}
                    onClick={() => setPurchaseModal(true)}
                    style={{ marginTop: 6 }}
                  >
                    {selectedTier ? `Purchase — ${selectedTier.name} (£${selectedTier.price})` : 'Select a Tier'}
                  </Button>
                </div>
              )}
            </>
          )}

          {event.type === 'online-party' && purchased && (
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => navigate('/parties')}
            >
              <ExternalLink size={16} /> Enter Party Room
            </Button>
          )}

        </div>
      </div>

      {/* Purchase confirmation modal */}
      <Modal
        isOpen={purchaseModal}
        onClose={() => setPurchaseModal(false)}
        title="Confirm Purchase"
      >
        <div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Event</p>
            <p style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 0 }}>{event.title}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tier</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>{selectedTier?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total</span>
            <span style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>£{selectedTier?.price}</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            By completing this purchase you agree to our discretion policy and event terms. All sales are final.
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handlePurchase}
          >
            Complete Purchase
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setPurchaseModal(false)}
            style={{ marginTop: 8 }}
          >
            Cancel
          </Button>
        </div>
      </Modal>

    </AppLayout>
  )
}
