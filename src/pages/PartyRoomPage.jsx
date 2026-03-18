import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Image, UserPlus, MessageCircle, Users, Radio, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getPartyById } from '../data/mock.js'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'

function PromptCard({ prompt, isActive, onSubmit }) {
  const [response, setResponse] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!response.trim()) return
    onSubmit(prompt.id, response)
    setSubmitted(true)
    setResponse('')
  }

  return (
    <div style={{
      background: isActive ? 'rgba(201, 168, 76, 0.05)' : 'var(--bg-elevated)',
      border: `1px solid ${isActive ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      marginBottom: 12,
    }}>
      {/* Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <Clock size={12} color={isActive ? 'var(--gold)' : 'var(--text-muted)'} />
        <span style={{ fontSize: '0.75rem', color: isActive ? 'var(--gold)' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {prompt.time} · {prompt.slotLabel}
        </span>
        {isActive && <Badge variant="gold" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>Current</Badge>}
      </div>

      {/* Prompt text */}
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
        "{prompt.text}"
      </p>

      {/* Responses */}
      {prompt.responses.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
            {prompt.responses.length} response{prompt.responses.length !== 1 ? 's' : ''}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {prompt.responses.map(r => (
              <div
                key={r.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  borderLeft: '2px solid var(--gold-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500 }}>
                    {r.displayName}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{r.timestamp}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response form for active prompt */}
      {isActive && !submitted && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            placeholder="Share your response…"
            className="input"
            rows={3}
            style={{ resize: 'none' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="button" variant="ghost" size="sm" style={{ color: 'var(--text-muted)' }}>
              <Image size={14} /> Photo
            </Button>
            <Button type="submit" variant="primary" size="sm" style={{ marginLeft: 'auto' }} disabled={!response.trim()}>
              Share <Send size={12} />
            </Button>
          </div>
        </form>
      )}

      {isActive && submitted && (
        <div style={{ padding: '8px 12px', background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.3)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--success)' }}>
          Your response has been shared with the room.
        </div>
      )}
    </div>
  )
}

function ChatMessage({ message, isOwn }) {
  return (
    <div style={{ display: 'flex', flexDirection: isOwn ? 'row-reverse' : 'row', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
      {!isOwn && (
        <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={`https://picsum.photos/seed/${message.username}/56/56`}
            alt={message.username}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      <div style={{ maxWidth: '75%' }}>
        {!isOwn && (
          <span style={{ fontSize: '0.72rem', color: 'var(--gold)', marginBottom: 3, display: 'block', paddingLeft: 4 }}>
            {message.displayName}
          </span>
        )}
        <div className={`message-bubble ${isOwn ? 'sent' : 'received'}`}>
          {message.text}
        </div>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)', display: 'block', marginTop: 3, textAlign: isOwn ? 'right' : 'left', paddingLeft: isOwn ? 0 : 4 }}>
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}

function ParticipantCard({ participant, onAddFriend, onMessage }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden' }}>
          <img
            src={`https://picsum.photos/seed/${participant.username}/88/88`}
            alt={participant.displayName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {participant.isOnline && (
          <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--bg-elevated)' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {participant.displayName}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
          @{participant.username}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => onMessage(participant)}
          style={{
            width: 32, height: 32, borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold-border)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
        >
          <MessageCircle size={14} />
        </button>
        <button
          onClick={() => onAddFriend(participant)}
          style={{
            width: 32, height: 32, borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold-border)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
        >
          <UserPlus size={14} />
        </button>
      </div>
    </div>
  )
}

export default function PartyRoomPage() {
  const { partyId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const messagesEndRef = useRef(null)

  const partyData = getPartyById(partyId)
  const [activeTab, setActiveTab] = useState('feed')
  const [phaseOverride, setPhaseOverride] = useState(null)
  const [messages, setMessages] = useState(partyData?.messages || [])
  const [chatInput, setChatInput] = useState('')
  const [prompts, setPrompts] = useState(partyData?.prompts || [])

  const phase = phaseOverride || partyData?.status || 'pre-party'

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (!partyData) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Party room not found.</p>
          <Button variant="ghost" onClick={() => navigate('/parties')} style={{ marginTop: 12 }}>
            Back
          </Button>
        </div>
      </div>
    )
  }

  function sendMessage(e) {
    e.preventDefault()
    if (!chatInput.trim()) return
    const newMsg = {
      id: `msg${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      displayName: currentUser.displayName,
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }
    setMessages(prev => [...prev, newMsg])
    setChatInput('')
  }

  function handlePromptSubmit(promptId, responseText) {
    setPrompts(prev => prev.map(p => {
      if (p.id !== promptId) return p
      return {
        ...p,
        responses: [...p.responses, {
          id: `r${Date.now()}`,
          userId: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName,
          text: responseText,
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        }],
      }
    }))
  }

  function handleAddFriend(participant) {
    alert(`Friend request sent to ${participant.displayName}`)
  }

  function handleMessage(participant) {
    navigate('/messages')
  }

  return (
    <div style={{ minHeight: '100vh', minHeight: '100dvh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        background: 'rgba(8,8,8,0.95)', borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        padding: '12px 16px',
        paddingTop: 'calc(12px + env(safe-area-inset-top))',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <button
            onClick={() => navigate('/parties')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {partyData.eventTitle}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <Badge variant={phase === 'live' ? 'green' : phase === 'pre-party' ? 'gold' : 'muted'} style={{ fontSize: '0.65rem' }}>
                {phase === 'live' ? '● Live' : phase === 'pre-party' ? 'Pre-Party' : 'Archived'}
              </Badge>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <Users size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                {partyData.participantCount} members
              </span>
            </div>
          </div>

          {/* Demo phase toggle */}
          <select
            value={phaseOverride || phase}
            onChange={e => setPhaseOverride(e.target.value)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)', fontSize: '0.72rem', padding: '4px 8px', cursor: 'pointer',
            }}
          >
            <option value="pre-party">Pre-Party</option>
            <option value="live">Live</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['feed', 'participants'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '7px', borderRadius: 'var(--radius-md)',
                border: `1px solid ${activeTab === tab ? 'var(--gold-border)' : 'transparent'}`,
                background: activeTab === tab ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: activeTab === tab ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'feed' ? (
                phase === 'pre-party' ? 'Prompts' : 'Live Chat'
              ) : (
                <>Participants ({partyData.participants.length})</>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, paddingTop: 'calc(110px + env(safe-area-inset-top))', paddingBottom: phase === 'live' && activeTab === 'feed' ? '80px' : '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {activeTab === 'feed' ? (
          <>
            {/* PRE-PARTY: prompts */}
            {(phase === 'pre-party' || phase === 'archived') && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
                  These guided prompts prepare you for tonight. Respond to each as it unlocks.
                </p>
                {prompts.map((prompt, i) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    isActive={i === 0 && phase === 'pre-party'}
                    onSubmit={handlePromptSubmit}
                  />
                ))}
              </div>
            )}

            {/* LIVE: chat */}
            {phase === 'live' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
                  {messages.map(msg => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isOwn={msg.userId === currentUser?.id}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input */}
                <form
                  onSubmit={sendMessage}
                  style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: 'rgba(17,17,17,0.97)',
                    borderTop: '1px solid var(--border-subtle)',
                    padding: '10px 16px',
                    paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <button
                    type="button"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center' }}
                  >
                    <Image size={18} />
                  </button>
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Say something…"
                    className="input"
                    style={{ flex: 1, padding: '9px 14px' }}
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    style={{
                      width: 38, height: 38, borderRadius: 'var(--radius-full)',
                      background: chatInput.trim() ? 'linear-gradient(135deg, var(--gold), var(--gold-bright))' : 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: chatInput.trim() ? 'pointer' : 'default',
                      transition: 'all 0.15s', flexShrink: 0,
                    }}
                  >
                    <Send size={15} color={chatInput.trim() ? '#0a0806' : 'var(--text-muted)'} />
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          // Participants tab
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 12 }}>
              {partyData.participants.length} members in this room
            </p>
            {partyData.participants.map(participant => (
              <ParticipantCard
                key={participant.userId}
                participant={participant}
                onAddFriend={handleAddFriend}
                onMessage={handleMessage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
