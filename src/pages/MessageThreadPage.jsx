import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Image, Send, MoreVertical, Phone, ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getThreadById, formatTimeAgo } from '../data/mock.js'
import Avatar from '../components/ui/Avatar.jsx'
import Modal from '../components/ui/Modal.jsx'

function MessageBubble({ message, isOwn }) {
  const timeStr = new Date(message.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 8,
        marginBottom: 10,
      }}
    >
      <div style={{ maxWidth: '78%' }}>
        <div
          className={`message-bubble ${isOwn ? 'sent' : 'received'}`}
          style={{ fontSize: '0.9375rem' }}
        >
          {message.type === 'image' ? (
            <img src={message.imageUrl} alt="shared" style={{ width: '100%', borderRadius: 8, display: 'block' }} />
          ) : (
            message.text
          )}
        </div>
        <span
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-faint)',
            display: 'block',
            marginTop: 3,
            textAlign: isOwn ? 'right' : 'left',
          }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  )
}

export default function MessageThreadPage() {
  const { threadId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const thread = getThreadById(threadId)
  const [messages, setMessages] = useState(thread?.messages || [])
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [blockModal, setBlockModal] = useState(false)

  const otherUser = thread?.otherUser

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: currentUser?.id || '1',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    inputRef.current?.focus()
  }

  if (!thread) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'var(--text-muted)' }}>Thread not found.</p>
        <button onClick={() => navigate('/messages')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
          Back to messages
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', minHeight: '100dvh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        background: 'rgba(8,8,8,0.97)',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '10px 12px',
        paddingTop: 'calc(10px + env(safe-area-inset-top))',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <button
          onClick={() => navigate('/messages')}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6, display: 'flex' }}
        >
          <ArrowLeft size={20} />
        </button>

        <Avatar
          src={otherUser?.photos?.[0]}
          name={otherUser?.displayName || '?'}
          size="sm"
          isOnline={otherUser?.isOnline}
          onClick={() => navigate(`/profile/${otherUser?.username}`)}
          style={{ cursor: 'pointer' }}
        />

        <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => navigate(`/profile/${otherUser?.username}`)}>
          <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0, fontSize: '0.9375rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {otherUser?.displayName}
          </p>
          <p style={{ fontSize: '0.72rem', color: otherUser?.isOnline ? 'var(--success)' : 'var(--text-muted)', margin: 0 }}>
            {otherUser?.isOnline ? 'Online' : `Last seen ${otherUser?.lastSeen}`}
          </p>
        </div>

        {/* Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6, display: 'flex' }}
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 4,
              background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden', minWidth: 160, zIndex: 500,
              boxShadow: 'var(--shadow-lg)',
            }}>
              <button
                onClick={() => { setBlockModal(true); setMenuOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '12px 16px', background: 'transparent',
                  border: 'none', cursor: 'pointer', color: 'var(--error)',
                  fontSize: '0.875rem', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,92,92,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <ShieldAlert size={14} /> Block user
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click-away for menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 399 }} onClick={() => setMenuOpen(false)} />
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: 'calc(68px + env(safe-area-inset-top))',
          paddingBottom: 80,
          padding: 'calc(68px + env(safe-area-inset-top)) 16px 80px',
        }}
      >
        {/* Date grouping visual */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            display: 'inline-block', fontSize: '0.72rem', color: 'var(--text-muted)',
            background: 'var(--bg-elevated)', padding: '4px 12px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}>
            {new Date(messages[0]?.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
          </span>
        </div>

        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === (currentUser?.id || '1')}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={sendMessage}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(17,17,17,0.97)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '10px 12px',
          paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          backdropFilter: 'blur(20px)',
        }}
      >
        <button
          type="button"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6, display: 'flex', flexShrink: 0 }}
        >
          <Image size={20} />
        </button>

        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Message ${otherUser?.displayName}…`}
          className="input"
          style={{ flex: 1, padding: '10px 14px' }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { sendMessage(e) } }}
        />

        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            width: 40, height: 40, borderRadius: 'var(--radius-full)',
            background: input.trim()
              ? 'linear-gradient(135deg, var(--gold), var(--gold-bright))'
              : 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default',
            transition: 'all 0.15s', flexShrink: 0,
          }}
        >
          <Send size={16} color={input.trim() ? '#0a0806' : 'var(--text-muted)'} />
        </button>
      </form>

      {/* Block modal */}
      <Modal isOpen={blockModal} onClose={() => setBlockModal(false)} title={`Block ${otherUser?.displayName}?`}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
          Blocking this member means they will no longer be able to message you. They will not be notified. This action can be reversed.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => { setBlockModal(false); navigate('/messages') }}
            className="btn btn-danger w-full"
          >
            Block {otherUser?.displayName}
          </button>
          <button
            onClick={() => setBlockModal(false)}
            className="btn btn-ghost w-full"
          >
            Cancel
          </button>
        </div>
      </Modal>

    </div>
  )
}
