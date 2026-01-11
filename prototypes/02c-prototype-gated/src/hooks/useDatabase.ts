/**
 * React hook for database operations.
 * Handles initialisation and provides access to repositories.
 */

import { useState, useCallback, useEffect } from 'react'
import {
  setupDatabase,
  type MigrationResult,
  type UserProfile,
  getDefaultUser,
} from '../db'

interface DatabaseState {
  isInitialised: boolean
  isLoading: boolean
  error: string | null
  migrationResult: MigrationResult | null
  currentUser: UserProfile | null
  favoritesVersion: number
}

interface UseDatabaseReturn extends DatabaseState {
  reinitialise: () => Promise<void>
  setCurrentUser: (user: UserProfile | null) => void
  invalidateFavorites: () => void
}

/**
 * Performs async database initialisation.
 * Extracted to avoid calling setState directly in effect.
 *
 * NOTE: Does NOT auto-create a default user - users are created via registration flow.
 */
async function initialiseDatabaseAsync(): Promise<{
  migrationResult: MigrationResult | null
  user: UserProfile | null
}> {
  const migrationResult = await setupDatabase()
  const user = await getDefaultUser()

  // Don't auto-create user - auth system handles user creation via registration
  return { migrationResult, user }
}

/**
 * Hook for managing database lifecycle.
 * Initialises database on mount and handles migrations.
 * Current user is set via auth system after login/registration.
 */
export function useDatabase(): UseDatabaseReturn {
  const [state, setState] = useState<DatabaseState>({
    isInitialised: false,
    isLoading: true,
    error: null,
    migrationResult: null,
    currentUser: null,
    favoritesVersion: 0,
  })

  useEffect(() => {
    let isMounted = true

    initialiseDatabaseAsync()
      .then(({ migrationResult, user }) => {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isInitialised: true,
            isLoading: false,
            error: null,
            migrationResult,
            currentUser: user,
          }))
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to initialise database'
          setState((prev) => ({
            ...prev,
            isInitialised: false,
            isLoading: false,
            error: errorMessage,
            migrationResult: null,
            currentUser: null,
          }))
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const reinitialise = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isInitialised: false,
      isLoading: true,
      error: null,
      migrationResult: null,
      currentUser: null,
    }))

    try {
      const { migrationResult, user } = await initialiseDatabaseAsync()

      setState((prev) => ({
        ...prev,
        isInitialised: true,
        isLoading: false,
        error: null,
        migrationResult,
        currentUser: user,
      }))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to initialise database'
      setState((prev) => ({
        ...prev,
        isInitialised: false,
        isLoading: false,
        error: errorMessage,
        migrationResult: null,
        currentUser: null,
      }))
    }
  }, [])

  const setCurrentUser = useCallback((user: UserProfile | null) => {
    setState((prev) => ({ ...prev, currentUser: user }))
  }, [])

  const invalidateFavorites = useCallback(() => {
    setState((prev) => ({ ...prev, favoritesVersion: prev.favoritesVersion + 1 }))
  }, [])

  return {
    ...state,
    reinitialise,
    setCurrentUser,
    invalidateFavorites,
  }
}
