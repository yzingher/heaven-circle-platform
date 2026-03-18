import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Gem, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

const CITIES = ['London', 'New York', 'Los Angeles', 'Paris', 'Berlin', 'Milan', 'Other']
const ORIENTATIONS = ['straight', 'gay', 'lesbian', 'bisexual', 'pansexual', 'queer', 'prefer not to say']
const LOOKING_FOR_OPTIONS = [
  'connections', 'experiences', 'deep conversation', 'play',
  'adventure', 'intimacy', 'networking', 'creative energy', 'exploration',
]

export default function RegisterPage() {
  const { validateInviteCode } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    inviteCode: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    // Step 2
    displayName: '',
    bio: '',
    orientation: [],
    lookingFor: [],
    age: '',
  })

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function toggleArray(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  function validateStep1() {
    const e = {}
    if (!form.inviteCode.trim()) e.inviteCode = 'Invite code required'
    else if (!validateInviteCode(form.inviteCode)) e.inviteCode = 'Invalid invite code. Contact us for access.'
    if (!form.username.trim()) e.username = 'Username required'
    else if (form.username.length < 3) e.username = 'At least 3 characters'
    if (!form.password) e.password = 'Password required'
    else if (form.password.length < 8) e.password = 'At least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.city) e.city = 'Please select your city'
    return e
  }

  function validateStep2() {
    const e = {}
    if (!form.displayName.trim()) e.displayName = 'Display name required'
    if (!form.age || Number(form.age) < 18 || Number(form.age) > 99) e.age = 'Must be 18 or older'
    return e
  }

  async function handleNext() {
    const e = validateStep1()
    if (Object.keys(e).length) { setErrors(e); return }
    setStep(2)
    setErrors({})
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateStep2()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    navigate('/login')
  }

  return (
    <div className="login-bg" style={{ minHeight: '100vh', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '32px 20px 48px' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <Gem size={20} color="var(--gold)" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>
          Heaven Circle
        </span>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        {[1, 2].map(s => (
          <React.Fragment key={s}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: s <= step ? 'var(--gold)' : 'var(--bg-card)',
              border: '1px solid ' + (s <= step ? 'var(--gold)' : 'var(--border-subtle)'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 600,
              color: s <= step ? '#0a0806' : 'var(--text-muted)',
            }}>
              {s < step ? <Check size={14} /> : s}
            </div>
            {s < 2 && (
              <div style={{ width: 40, height: 1, background: step > 1 ? 'var(--gold)' : 'var(--border-subtle)', transition: 'background 0.3s' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{
          background: 'rgba(17, 17, 17, 0.85)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)', padding: '28px 24px',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          {step === 1 ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
                Join the Circle
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                Step 1 — Credentials
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Input
                  label="Invitation Code"
                  value={form.inviteCode}
                  onChange={e => set('inviteCode', e.target.value)}
                  placeholder="HEAVEN2024"
                  error={errors.inviteCode}
                  autoCapitalize="characters"
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: -8 }}>
                  Try: <code style={{ color: 'var(--gold)' }}>HEAVEN2024</code>, <code style={{ color: 'var(--gold)' }}>CIRCLE001</code>, or <code style={{ color: 'var(--gold)' }}>NOCTURNE</code>
                </p>

                <Input
                  label="Username"
                  value={form.username}
                  onChange={e => set('username', e.target.value)}
                  placeholder="your_alias"
                  error={errors.username}
                  autoCapitalize="none"
                />

                <Input
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Min. 8 characters"
                  error={errors.password}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  error={errors.confirmPassword}
                />

                <div className="input-wrapper">
                  <label className="input-label">City</label>
                  <select
                    value={form.city}
                    onChange={e => set('city', e.target.value)}
                    className={`input ${errors.city ? 'error' : ''}`}
                    style={{ background: 'var(--bg-elevated)', cursor: 'pointer' }}
                  >
                    <option value="">Select city…</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <span className="input-error">{errors.city}</span>}
                </div>

                <Button variant="primary" size="lg" fullWidth onClick={handleNext} style={{ marginTop: 8 }}>
                  Continue <ChevronRight size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 6 }}>
                Your Profile
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                Step 2 — Tell us about you
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Input
                  label="Display Name"
                  value={form.displayName}
                  onChange={e => set('displayName', e.target.value)}
                  placeholder="How shall we know you?"
                  error={errors.displayName}
                />

                <Input
                  label="Age"
                  type="number"
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                  placeholder="18+"
                  error={errors.age}
                  min={18}
                  max={99}
                />

                <Input
                  label="Bio"
                  multiline
                  rows={3}
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="A few words about yourself…"
                />

                <div className="input-wrapper">
                  <label className="input-label">Orientation</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ORIENTATIONS.map(o => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => toggleArray('orientation', o)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-full)',
                          border: `1px solid ${form.orientation.includes(o) ? 'var(--gold)' : 'var(--border-subtle)'}`,
                          background: form.orientation.includes(o) ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                          color: form.orientation.includes(o) ? 'var(--gold)' : 'var(--text-muted)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Looking for</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {LOOKING_FOR_OPTIONS.map(o => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => toggleArray('lookingFor', o)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-full)',
                          border: `1px solid ${form.lookingFor.includes(o) ? 'var(--purple-mid)' : 'var(--border-subtle)'}`,
                          background: form.lookingFor.includes(o) ? 'rgba(107, 33, 168, 0.2)' : 'transparent',
                          color: form.lookingFor.includes(o) ? '#b57bee' : 'var(--text-muted)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    style={{ flex: 1 }}
                  >
                    <ChevronLeft size={16} /> Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    style={{ flex: 2 }}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-faint)', fontSize: '0.875rem' }}>
          Already a member?{' '}
          <Link to="/login" style={{ color: 'var(--gold)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
