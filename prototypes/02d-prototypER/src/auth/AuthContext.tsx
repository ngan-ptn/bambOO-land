/**
 * AuthContext - Global authentication state provider
 * Wraps the app to provide auth state to all components
 */

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { UseAuthReturn } from '@/hooks/useAuth'

const AuthContext = createContext<UseAuthReturn | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
