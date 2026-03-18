import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Gem, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }

    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      login(form.username.trim(), form.password)
      navigate('/')
    } catch (err) {
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-bg" style={{ minHeight: '100vh', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }}>

      {/* Logo & tagline */}
      <div className="text-center animate-fadeInUp" style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <Gem size={28} color="var(--gold)" />
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              fontWeight: 300,
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              margin: 0,
            }}
          >
            Heaven Circle
          </h1>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}
        >
          Luxury &nbsp;·&nbsp; Liberation &nbsp;·&nbsp; Discretion
        </p>
      </div>

      {/* Form card */}
      <div
        className="animate-fadeInUp delay-1"
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'rgba(17, 17, 17, 0.8)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px 28px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--text-primary)',
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          Welcome back
        </h2>

        {errors.general && (
          <div
            style={{
              background: 'rgba(224, 92, 92, 0.1)',
              border: '1px solid rgba(224, 92, 92, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              marginBottom: 20,
              fontSize: '0.875rem',
              color: 'var(--error)',
            }}
          >
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="your_username"
            error={errors.username}
            autoComplete="username"
            autoCapitalize="none"
          />

          <div className="input-wrapper">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`input ${errors.password ? 'error' : ''}`}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            fullWidth
            style={{ marginTop: 8 }}
          >
            Sign In
          </Button>
        </form>

        {/* Demo hint */}
        <div
          style={{
            marginTop: 20,
            padding: '10px 14px',
            background: 'rgba(201, 168, 76, 0.06)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--gold-border)',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>Demo:</strong>{' '}
            Use <code style={{ color: 'var(--gold)' }}>celestial_jade</code> / <code style={{ color: 'var(--gold)' }}>heaven2024</code>
            {' '}or <code style={{ color: 'var(--gold)' }}>midnight_roman</code> / <code style={{ color: 'var(--gold)' }}>password</code> (concierge)
          </p>
        </div>
      </div>

      {/* Footer link */}
      <p className="animate-fadeInUp delay-2" style={{ marginTop: 32, color: 'var(--text-faint)', fontSize: '0.875rem' }}>
        Not yet a member?{' '}
        <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
          Request an Invitation
        </Link>
      </p>
    </div>
  )
}
