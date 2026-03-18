import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus, MessageCircle, ShieldAlert, MapPin, Award, Users, Calendar, Check } from 'lucide-react'
import { mockUsers } from '../data/mock.js'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'

export default function MemberProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const user = mockUsers.find(u => u.username === username)

  const [friendStatus, setFriendStatus] = useState(user?.friendStatus || 'none')
  const [blockModal, setBlockModal] = useState(false)
  const [blocked, setBlocked] = useState(false)

  if (!user || blocked) {
    return (
      <AppLayout>
        <div style={{ padding: '60px 16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
            {blocked ? 'You have blocked this member.' : 'Member not found.'}
          </p>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Go back
          </Button>
        </div>
      </AppLayout>
    )
  }

  const photoSlots = Array.from({ length: 6 }, (_, i) => user.photos[i] || null)

  function handleFriendAction() {
    if (friendStatus === 'none') setFriendStatus('pending-sent')
    else if (friendStatus === 'pending-sent') setFriendStatus('none')
    else if (friendStatus === 'pending-received') setFriendStatus('friend')
    else if (friendStatus === 'friend') setFriendStatus('none')
  }

  const friendButtonConfig = {
    none: { label: 'Add to Circle', icon: UserPlus, variant: 'secondary' },
    'pending-sent': { label: 'Request Sent', icon: Check, variant: 'ghost' },
    'pending-received': { label: 'Accept Request', icon: Check, variant: 'primary' },
    friend: { label: 'In Your Circle', icon: Check, variant: 'ghost' },
  }[friendStatus] || { label: 'Add', icon: UserPlus, variant: 'secondary' }

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease', paddingBottom: 24 }}>

        {/* Cover gradient */}
        <div style={{ height: 160, background: 'linear-gradient(135deg, #2a0a35 0%, #3d0d4e 50%, #1a1a0a 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
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
        </div>

        {/* Avatar */}
        <div style={{ padding: '0 16px', marginTop: -48, marginBottom: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--bg-base)' }}>
            <img
              src={user.photos[0] || `https://picsum.photos/seed/${user.username}/180/180`}
              alt={user.displayName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {user.isOnline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Online now</span>
            </div>
          )}
        </div>

        <div style={{ padding: '0 16px' }}>

          {/* Name */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--gold)', marginBottom: 4 }}>
            {user.displayName}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>@{user.username}</span>
            {user.city && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                · <MapPin size={11} /> {user.city}
              </span>
            )}
            {user.age && (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>· {user.age}</span>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <Button
              variant={friendButtonConfig.variant}
              size="md"
              onClick={handleFriendAction}
              style={{ flex: 1 }}
            >
              <friendButtonConfig.icon size={14} /> {friendButtonConfig.label}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/messages')}
              style={{ flex: 1 }}
            >
              <MessageCircle size={14} /> Message
            </Button>
            <button
              onClick={() => setBlockModal(true)}
              style={{
                width: 42, height: 42, background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--error)'; e.currentTarget.style.borderColor = 'rgba(224,92,92,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              <ShieldAlert size={16} />
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 20 }}>
            {[
              { label: 'Events', value: user.eventsAttended || '—' },
              { label: 'Circle', value: user.friendsCount || '—' },
              { label: 'Joined', value: user.joinedDate ? new Date(user.joinedDate).getFullYear() : '—' },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          {user.bio && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>About</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{user.bio}</p>
            </div>
          )}

          <hr className="gold-divider" />

          {/* Tags */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Orientation</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {user.orientation?.map(o => <Badge key={o} variant="gold">{o}</Badge>)}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Looking For</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {user.lookingFor?.map(t => <Badge key={t} variant="purple">{t}</Badge>)}
            </div>
          </div>

          <hr className="gold-divider" />

          {/* Photos */}
          <div>
            <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Photos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {photoSlots.map((photo, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  {photo ? (
                    <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>Private</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Block modal */}
      <Modal isOpen={blockModal} onClose={() => setBlockModal(false)} title={`Block ${user.displayName}?`}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
          They will no longer be able to see your profile or message you. You can unblock at any time from settings.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="btn btn-danger w-full" onClick={() => { setBlocked(true); setBlockModal(false) }}>
            Block {user.displayName}
          </button>
          <button className="btn btn-ghost w-full" onClick={() => setBlockModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>

    </AppLayout>
  )
}
