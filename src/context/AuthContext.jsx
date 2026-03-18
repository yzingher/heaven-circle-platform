import React, { createContext, useContext, useState, useEffect } from 'react'

const mockUserCredentials = [
  {
    id: '1',
    username: 'celestial_jade',
    password: 'heaven2024',
    displayName: 'Jade',
    role: 'member',
    city: 'London',
    bio: 'Adventurous spirit drawn to authentic connections and extraordinary experiences. Art collector by day, seeker of hidden beauty by night.',
    photos: [
      'https://picsum.photos/seed/jade1/400/400',
      'https://picsum.photos/seed/jade2/400/400',
      'https://picsum.photos/seed/jade3/400/400',
    ],
    orientation: ['bisexual'],
    lookingFor: ['connections', 'experiences', 'conversation'],
    age: 28,
    joinedDate: '2023-06-15',
    eventsAttended: 7,
    friendsCount: 14,
  },
  {
    id: '2',
    username: 'midnight_roman',
    password: 'password',
    displayName: 'Roman',
    role: 'concierge',
    city: 'New York',
    bio: 'Curator of extraordinary moments.',
    photos: ['https://picsum.photos/seed/roman1/400/400'],
    orientation: ['straight'],
    lookingFor: ['events', 'networking'],
    age: 35,
    joinedDate: '2022-11-01',
    eventsAttended: 22,
    friendsCount: 48,
  },
]

const MOCK_INVITE_CODES = ['HEAVEN2024', 'CIRCLE001', 'NOCTURNE']

const STORAGE_KEY = 'heaven_circle_user'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch {}
    // Default logged-in user
    return mockUserCredentials[0]
  })

  const isAuthenticated = Boolean(currentUser)

  function login(username, password) {
    const user = mockUserCredentials.find(
      u => u.username === username && u.password === password
    )
    if (!user) {
      throw new Error('Invalid credentials. Please check your username and password.')
    }
    const { password: _, ...safeUser } = user
    setCurrentUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateProfile(updates) {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  function validateInviteCode(code) {
    return MOCK_INVITE_CODES.includes(code.toUpperCase().trim())
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        validateInviteCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
