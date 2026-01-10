/**
 * usePartner - Hook for managing partner profile (multi-user support)
 * Handles partner creation, switching, and "log for both" functionality.
 */

import { useState, useCallback, useEffect } from 'react'
import { useDatabaseContext } from '@/contexts'
import { createUser, getUserById, updateUser as updateUserDB } from '@/db'
import type { UserProfile } from '@/db/types'

const PARTNER_STORAGE_KEY = 'calo-partner-link'

interface PartnerLink {
  primaryUserId: string
  partnerUserId: string
}

export interface UsePartnerReturn {
  partner: UserProfile | null
  hasPartner: boolean
  isLoadingPartner: boolean
  addPartner: (name: string, dailyKcalGoal: number) => Promise<boolean>
  removePartner: () => void
  switchToPartner: () => void
  switchToSelf: () => void
  isViewingPartner: boolean
}

export function usePartner(): UsePartnerReturn {
  const { currentUser, setCurrentUser } = useDatabaseContext()

  const [partner, setPartner] = useState<UserProfile | null>(null)
  const [isLoadingPartner, setIsLoadingPartner] = useState(true)
  const [isViewingPartner, setIsViewingPartner] = useState(false)
  const [primaryUser, setPrimaryUser] = useState<UserProfile | null>(null)

  // Load partner link from localStorage on init
  useEffect(() => {
    async function loadPartner() {
      if (!currentUser) {
        setIsLoadingPartner(false)
        return
      }

      setIsLoadingPartner(true)

      try {
        const stored = localStorage.getItem(PARTNER_STORAGE_KEY)
        if (!stored) {
          setIsLoadingPartner(false)
          return
        }

        const link: PartnerLink = JSON.parse(stored)

        // Determine if we're the primary or the partner
        if (link.primaryUserId === currentUser.id) {
          // We're the primary user, load partner
          const partnerUser = await getUserById(link.partnerUserId)
          setPartner(partnerUser)
          setPrimaryUser(currentUser)
          setIsViewingPartner(false)
        } else if (link.partnerUserId === currentUser.id) {
          // We're viewing as partner, load primary
          const primaryUserProfile = await getUserById(link.primaryUserId)
          setPrimaryUser(primaryUserProfile)
          setPartner(currentUser)
          setIsViewingPartner(true)
        }
      } catch (error) {
        console.error('Failed to load partner:', error)
        localStorage.removeItem(PARTNER_STORAGE_KEY)
      } finally {
        setIsLoadingPartner(false)
      }
    }

    loadPartner()
  }, [currentUser])

  const addPartner = useCallback(async (name: string, dailyKcalGoal: number): Promise<boolean> => {
    if (!currentUser) return false

    try {
      // Create partner user with no email (local profile)
      const partnerUser = await createUser(name, { dailyKcalGoal })
      if (!partnerUser) return false

      // Store the link
      const link: PartnerLink = {
        primaryUserId: currentUser.id,
        partnerUserId: partnerUser.id,
      }
      localStorage.setItem(PARTNER_STORAGE_KEY, JSON.stringify(link))

      setPartner(partnerUser)
      setPrimaryUser(currentUser)
      return true
    } catch (error) {
      console.error('Failed to add partner:', error)
      return false
    }
  }, [currentUser])

  const removePartner = useCallback(() => {
    localStorage.removeItem(PARTNER_STORAGE_KEY)
    setPartner(null)
    // If viewing as partner, switch back to primary
    if (isViewingPartner && primaryUser) {
      setCurrentUser(primaryUser)
      setIsViewingPartner(false)
    }
  }, [isViewingPartner, primaryUser, setCurrentUser])

  const switchToPartner = useCallback(() => {
    if (partner && !isViewingPartner) {
      setPrimaryUser(currentUser)
      setCurrentUser(partner)
      setIsViewingPartner(true)
    }
  }, [partner, isViewingPartner, currentUser, setCurrentUser])

  const switchToSelf = useCallback(() => {
    if (isViewingPartner && primaryUser) {
      setCurrentUser(primaryUser)
      setIsViewingPartner(false)
    }
  }, [isViewingPartner, primaryUser, setCurrentUser])

  return {
    partner,
    hasPartner: !!partner,
    isLoadingPartner,
    addPartner,
    removePartner,
    switchToPartner,
    switchToSelf,
    isViewingPartner,
  }
}
