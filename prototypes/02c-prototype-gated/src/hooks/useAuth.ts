/**
 * useAuth - Hook for managing authentication state with database
 */

import { useState, useCallback, useEffect } from 'react'
import { AUTH_STORAGE_KEYS } from '@/auth/constants'
import { getUserByEmail, createUser, updatePassword, updateUser as updateUserDB } from '@/db'
import { useDatabaseContext } from '@/contexts'
import type { User, Session, UserProfile as OnboardingProfile } from '@/types'

export interface UseAuthReturn {
  user: User | null
  session: Session | null
  profile: OnboardingProfile | null
  isAuthenticated: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => Promise<void>
  updateProfile: (updates: Partial<OnboardingProfile>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  resetPassword: (email: string, newPassword: string) => Promise<boolean>
}

export function useAuth(): UseAuthReturn {
  const { currentUser, setCurrentUser } = useDatabaseContext()

  // Session stored in localStorage for quick auth check (contains user ID)
  const [session, setSession] = useState<Session | null>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.SESSION)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse session from localStorage:', error)
      localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION)
      return null
    }
  })

  // Simplified user object (for auth screens that need email/avatar)
  const [user, setUser] = useState<User | null>(null)

  // Simplified profile (for onboarding flow compatibility)
  const [profile, setProfile] = useState<OnboardingProfile | null>(null)

  // Sync user state when currentUser changes from database
  useEffect(() => {
    if (currentUser) {
      setUser({
        email: currentUser.email || '',
        password: '', // Don't expose password
        name: currentUser.displayName || '',
        avatar: currentUser.email?.[0].toUpperCase() || '👤',
      })

      // Only set profile if user has completed onboarding (displayName is set)
      // This prevents skipping onboarding for new users
      if (currentUser.displayName) {
        setProfile({
          dailyCalories: currentUser.dailyKcalGoal,
          goal: 'maintain', // Default, will be enhanced later
          goalIcon: '⚖️',
          goalText: 'Maintain weight',
        })
      } else {
        // New user, hasn't completed onboarding yet
        setProfile(null)
      }
    } else {
      setUser(null)
      setProfile(null)
    }
  }, [currentUser])

  const isAuthenticated = !!(session?.isLoggedIn && currentUser)

  const register = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if email already exists
      const existing = await getUserByEmail(email)
      if (existing) {
        return false // Email already registered
      }

      // Create user in database
      const newUser = await createUser(undefined, undefined, { email, password })
      if (!newUser) {
        return false // User limit reached
      }

      // Set current user in database context
      setCurrentUser(newUser)

      // Create session
      const newSession: Session = {
        isLoggedIn: true,
        lastActive: Date.now(),
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(newSession))
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, newUser.id)
      setSession(newSession)

      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }, [setCurrentUser])

  const login = useCallback(async (email: string, password: string, _rememberMe: boolean): Promise<boolean> => {
    try {
      // Query database for user
      const dbUser = await getUserByEmail(email)
      if (!dbUser || dbUser.password !== password) {
        return false // Invalid credentials
      }

      // Set current user in database context
      setCurrentUser(dbUser)

      // Create session
      const newSession: Session = {
        isLoggedIn: true,
        lastActive: Date.now(),
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(newSession))
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, dbUser.id)
      setSession(newSession)

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }, [setCurrentUser])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION)
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_ID)
    setSession(null)
    setCurrentUser(null)
  }, [setCurrentUser])

  const updateUser = useCallback(async (updates: Partial<User>) => {
    // This updates the simplified user object
    setUser((prev) => {
      if (!prev) return null
      return { ...prev, ...updates }
    })

    // Sync display name to database if provided
    if (currentUser && updates.name !== undefined) {
      const updatedUser = await updateUserDB(currentUser.id, { displayName: updates.name })
      if (updatedUser) {
        setCurrentUser(updatedUser)
      }
    }
  }, [currentUser, setCurrentUser])

  const updateProfile = useCallback(async (updates: Partial<OnboardingProfile>) => {
    // This updates the simplified profile object
    setProfile((prev) => {
      if (!prev) return null
      return { ...prev, ...updates } as OnboardingProfile
    })

    // Sync calories goal to database
    if (currentUser && updates.dailyCalories !== undefined) {
      const updatedUser = await updateUserDB(currentUser.id, { dailyKcalGoal: updates.dailyCalories })
      if (updatedUser) {
        setCurrentUser(updatedUser)

        // After updating goals, mark profile as complete
        setProfile({
          dailyCalories: updates.dailyCalories,
          goal: updates.goal || 'maintain',
          goalIcon: updates.goalIcon || '⚖️',
          goalText: updates.goalText || 'Maintain weight',
        })
      }
    }
  }, [currentUser, setCurrentUser])

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      if (!currentUser || currentUser.password !== currentPassword) {
        return false
      }

      await updatePassword(currentUser.id, newPassword)
      return true
    } catch (error) {
      console.error('Change password failed:', error)
      return false
    }
  }, [currentUser])

  const resetPassword = useCallback(async (email: string, newPassword: string): Promise<boolean> => {
    try {
      const dbUser = await getUserByEmail(email)
      if (!dbUser) {
        return false
      }

      await updatePassword(dbUser.id, newPassword)
      return true
    } catch (error) {
      console.error('Reset password failed:', error)
      return false
    }
  }, [])

  return {
    user,
    session,
    profile,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    changePassword,
    resetPassword,
  }
}
