import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus, ChevronLeft, ChevronRight, Camera, Send } from 'lucide-react'
import { mockStories } from '../data/mock.js'
import AppLayout from '../components/layout/AppLayout.jsx'

const STORY_DURATION = 5000 // 5 seconds per story for demo

function StoryViewer({ stories, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const currentStory = stories[currentIndex]

  useEffect(() => {
    setProgress(0)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goNext()
          return 0
        }
        return prev + (100 / (STORY_DURATION / 100))
      })
    }, 100)
    return () => clearInterval(intervalRef.current)
  }, [currentIndex])

  function goNext() {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      onClose()
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
    }
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr)
    const h = Math.floor(diff / 3600000)
    if (h < 1) return 'Just now'
    if (h < 24) return `${h}h ago`
    return 'Yesterday'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', zIndex: 2000,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Progress bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '12px 8px 0', display: 'flex', gap: 4 }}>
        {stories.map((s, i) => (
          <div key={s.id} style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'white', borderRadius: 2,
              width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
              transition: i === currentIndex ? 'none' : 'width 0.1s',
            }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 10, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.5)' }}>
          <img src={currentStory.userPhoto} alt={currentStory.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, color: 'white', margin: 0, fontSize: '0.9rem' }}>{currentStory.displayName}</p>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{timeAgo(currentStory.postedAt)}</p>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 6 }}>
          <X size={22} />
        </button>
      </div>

      {/* Image */}
      <img
        src={currentStory.image}
        alt="story"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />

      {/* Caption */}
      {currentStory.caption && (
        <div style={{ position: 'absolute', bottom: 80, left: 16, right: 16, zIndex: 10 }}>
          <p style={{ color: 'white', fontSize: '0.9375rem', lineHeight: 1.5, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            {currentStory.caption}
          </p>
        </div>
      )}

      {/* Reply bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '12px 16px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <input
          placeholder={`Reply to ${currentStory.displayName}…`}
          style={{
            flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 'var(--radius-full)', color: 'white', padding: '10px 14px',
            fontSize: '0.875rem',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.6)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
        />
        <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 8 }}>
          <Send size={18} />
        </button>
      </div>

      {/* Tap zones */}
      <div
        style={{ position: 'absolute', left: 0, top: 0, width: '30%', height: '100%', zIndex: 5 }}
        onClick={goPrev}
      />
      <div
        style={{ position: 'absolute', right: 0, top: 0, width: '30%', height: '100%', zIndex: 5 }}
        onClick={goNext}
      />
    </div>
  )
}

function AddStoryModal({ onClose }) {
  const [caption, setCaption] = useState('')

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        width: '100%', maxWidth: 480, padding: 24,
        paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)', margin: 0 }}>
            Add Story
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          height: 200, background: 'var(--bg-card)', border: '2px dashed var(--border-default)',
          borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16,
          cursor: 'pointer', transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
        >
          <Camera size={32} color="var(--text-muted)" />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Tap to select a photo</p>
        </div>

        <div className="input-wrapper" style={{ marginBottom: 16 }}>
          <label className="input-label">Caption (optional)</label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Say something…"
            className="input"
            rows={2}
            style={{ resize: 'none' }}
          />
        </div>

        <button
          className="btn btn-primary w-full btn-lg"
          onClick={onClose}
        >
          Share Story
        </button>
      </div>
    </div>
  )
}

export default function StoriesPage() {
  const navigate = useNavigate()
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerStart, setViewerStart] = useState(0)
  const [addOpen, setAddOpen] = useState(false)

  function openStory(index) {
    setViewerStart(index)
    setViewerOpen(true)
  }

  return (
    <AppLayout>
      <div style={{ animation: 'fadeInUp 0.3s ease' }}>
        <div style={{ padding: '20px 16px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 4 }}>
            Stories
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>
            Glimpses from your circle — gone in 24 hours
          </p>
        </div>

        {/* Add your story */}
        <div style={{ padding: '0 16px 20px' }}>
          <div
            onClick={() => setAddOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '14px 16px',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
          >
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(201,168,76,0.1)', border: '2px dashed var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={22} color="var(--gold)" />
            </div>
            <div>
              <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Add your story</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>Share a moment — visible for 24 hours</p>
            </div>
          </div>
        </div>

        <hr className="gold-divider" style={{ margin: '0 16px 16px' }} />

        {/* Stories grid */}
        <div style={{ padding: '0 16px' }}>
          <h3 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            From Your Circle
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {mockStories.map((story, index) => (
              <div
                key={story.id}
                onClick={() => openStory(index)}
                style={{
                  position: 'relative', aspectRatio: '9/16', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', cursor: 'pointer',
                  border: `2px solid ${story.seen ? 'var(--border-subtle)' : 'var(--gold)'}`,
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={story.image}
                  alt={story.displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }} />

                {/* Avatar */}
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  width: 32, height: 32, borderRadius: '50%',
                  overflow: 'hidden', border: `2px solid ${story.seen ? 'rgba(255,255,255,0.3)' : 'var(--gold)'}`,
                }}>
                  <img src={story.userPhoto} alt={story.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Name */}
                <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                  <p style={{ color: 'white', fontSize: '0.72rem', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {story.isOwn ? 'Your story' : story.displayName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Story viewer */}
      {viewerOpen && (
        <StoryViewer
          stories={mockStories}
          startIndex={viewerStart}
          onClose={() => setViewerOpen(false)}
        />
      )}

      {/* Add story modal */}
      {addOpen && <AddStoryModal onClose={() => setAddOpen(false)} />}

    </AppLayout>
  )
}
