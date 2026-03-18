import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Plus, Camera, MapPin, Calendar, Users, Award, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    displayName: currentUser?.displayName || '',
    bio: currentUser?.bio || '',
    orientation: currentUser?.orientation || [],
    lookingFor: currentUser?.lookingFor || [],
  })

  const orientationOptions = ['straight', 'gay', 'lesbian', 'bisexual', 'pansexual', 'queer']
  const lookingForOptions = ['connections', 'experiences', 'deep conversation', 'play', 'adventure', 'intimacy', 'networking', 'creative energy', 'exploration']

  function toggleTag(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  function handleSave() {
    if (updateProfile) updateProfile(form)
    setEditMode(false)
  }

  const photos = currentUser?.photos || []
  const photoSlots = Array.from({ length: 6 }, (_, i) => photos[i] || null)

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease', paddingBottom: 24 }}>

        {/* Cover gradient */}
        <div style={{
          height: 160,
          background: 'linear-gradient(135deg, var(--purple-deep) 0%, var(--purple-mid) 50%, var(--gold-muted) 100%)',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        {/* Avatar + actions */}
        <div style={{ padding: '0 16px', marginTop: -48, marginBottom: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%', overflow: 'hidden',
              border: '3px solid var(--bg-base)',
              background: 'var(--bg-card)',
            }}>
              <img
                src={photos[0] || `https://picsum.photos/seed/${currentUser?.username}/180/180`}
                alt={currentUser?.displayName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {editMode && (
              <button style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--gold)', border: '2px solid var(--bg-base)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <Camera size={12} color="#0a0806" />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
            {editMode ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditMode(false)}>
                  <X size={14} /> Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  <Check size={14} /> Save
                </Button>
              </>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => setEditMode(true)}>
                <Edit2 size={14} /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div style={{ padding: '0 16px' }}>

          {/* Name & city */}
          {editMode ? (
            <div style={{ marginBottom: 16 }}>
              <Input
                label="Display Name"
                value={form.displayName}
                onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
              />
            </div>
          ) : (
            <>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--gold)', marginBottom: 4 }}>
                {currentUser?.displayName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>@{currentUser?.username}</span>
                {currentUser?.city && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    · <MapPin size={11} /> {currentUser?.city}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Stats */}
          <div style={{ display: 'flex', gap: 0, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 16 }}>
            {[
              { label: 'Events', value: currentUser?.eventsAttended || 7, icon: Award },
              { label: 'Friends', value: currentUser?.friendsCount || 14, icon: Users },
              { label: 'Member Since', value: currentUser?.joinedDate ? new Date(currentUser.joinedDate).getFullYear() : '2023', icon: Calendar },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1, padding: '14px 8px', textAlign: 'center',
                  borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold)', fontWeight: 400, margin: 0 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '2px 0 0', letterSpacing: '0.04em' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              About
            </h3>
            {editMode ? (
              <Input
                multiline
                rows={4}
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Write something about yourself…"
              />
            ) : (
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                {currentUser?.bio || 'No bio yet.'}
              </p>
            )}
          </div>

          <hr className="gold-divider" />

          {/* Orientation tags */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Orientation
            </h3>
            {editMode ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {orientationOptions.map(o => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleTag('orientation', o)}
                    style={{
                      padding: '4px 12px', borderRadius: 'var(--radius-full)',
                      border: `1px solid ${form.orientation.includes(o) ? 'var(--gold)' : 'var(--border-subtle)'}`,
                      background: form.orientation.includes(o) ? 'rgba(201,168,76,0.15)' : 'transparent',
                      color: form.orientation.includes(o) ? 'var(--gold)' : 'var(--text-muted)',
                      fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(currentUser?.orientation || []).map(o => (
                  <Badge key={o} variant="gold">{o}</Badge>
                ))}
                {(!currentUser?.orientation || currentUser.orientation.length === 0) && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>Not specified</span>
                )}
              </div>
            )}
          </div>

          {/* Looking For */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Looking For
            </h3>
            {editMode ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {lookingForOptions.map(o => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleTag('lookingFor', o)}
                    style={{
                      padding: '4px 12px', borderRadius: 'var(--radius-full)',
                      border: `1px solid ${form.lookingFor.includes(o) ? 'var(--purple-mid)' : 'var(--border-subtle)'}`,
                      background: form.lookingFor.includes(o) ? 'rgba(107,33,168,0.2)' : 'transparent',
                      color: form.lookingFor.includes(o) ? '#b57bee' : 'var(--text-muted)',
                      fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(currentUser?.lookingFor || []).map(tag => (
                  <Badge key={tag} variant="purple">{tag}</Badge>
                ))}
                {(!currentUser?.lookingFor || currentUser.lookingFor.length === 0) && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>Not specified</span>
                )}
              </div>
            )}
          </div>

          <hr className="gold-divider" />

          {/* Photos grid */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Photos
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {photoSlots.map((photo, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: editMode || !photo ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                >
                  {photo ? (
                    <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--text-faint)' }}>
                      <Plus size={20} />
                      <span style={{ fontSize: '0.65rem' }}>Add photo</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}
