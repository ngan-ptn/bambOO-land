/**
 * Household Context - Multi-user support (CR05)
 * Manages household members, active profile switching, and member stats.
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { HouseholdMember, HouseholdContextValue } from '@/types'

// Sample household members for demo
const SAMPLE_MEMBERS: HouseholdMember[] = [
  {
    id: 'member-1',
    name: 'Minh',
    avatarColor: '#10B981', // green
    goals: { kcal: 2000, protein: 80, carbs: 250, fat: 65 },
    isActive: true,
    todayKcal: 1240,
    todayProgress: 62,
  },
  {
    id: 'member-2',
    name: 'Lan',
    avatarColor: '#8B5CF6', // purple
    goals: { kcal: 1800, protein: 70, carbs: 220, fat: 55 },
    isActive: false,
    todayKcal: 810,
    todayProgress: 45,
  },
  {
    id: 'member-3',
    name: 'Bé Na',
    avatarColor: '#F59E0B', // amber
    goals: { kcal: 1200, protein: 45, carbs: 150, fat: 40 },
    isActive: false,
    todayKcal: 648,
    todayProgress: 54,
  },
]

const STORAGE_KEY = 'household_members'

const HouseholdContext = createContext<HouseholdContextValue | null>(null)

export function useHousehold(): HouseholdContextValue {
  const context = useContext(HouseholdContext)
  if (!context) {
    throw new Error('useHousehold must be used within a HouseholdProvider')
  }
  return context
}

interface HouseholdProviderProps {
  children: ReactNode
}

export function HouseholdProvider({ children }: HouseholdProviderProps) {
  const [members, setMembers] = useState<HouseholdMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load members from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setMembers(parsed)
      } catch {
        // If parsing fails, use sample data
        setMembers(SAMPLE_MEMBERS)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MEMBERS))
      }
    } else {
      // First time: use sample data
      setMembers(SAMPLE_MEMBERS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MEMBERS))
    }
    setIsLoading(false)
  }, [])

  // Persist members to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && members.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members))
    }
  }, [members, isLoading])

  const activeMember = members.find((m) => m.isActive) || null

  const addMember = useCallback((member: Omit<HouseholdMember, 'id' | 'isActive' | 'todayKcal' | 'todayProgress'>) => {
    const newMember: HouseholdMember = {
      ...member,
      id: `member-${Date.now()}`,
      isActive: false,
      todayKcal: 0,
      todayProgress: 0,
    }
    setMembers((prev) => [...prev, newMember])
  }, [])

  const updateMember = useCallback((id: string, updates: Partial<HouseholdMember>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }, [])

  const removeMember = useCallback((id: string) => {
    setMembers((prev) => {
      const filtered = prev.filter((m) => m.id !== id)
      // If we removed the active member, activate the first remaining one
      const hasActive = filtered.some((m) => m.isActive)
      if (!hasActive && filtered.length > 0) {
        filtered[0].isActive = true
      }
      return filtered
    })
  }, [])

  const switchToMember = useCallback((id: string) => {
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        isActive: m.id === id,
      }))
    )
  }, [])

  const refreshMemberStats = useCallback(() => {
    // In a real app, this would query the database for each member's today stats
    // For now, we'll simulate random progress updates
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        todayKcal: m.todayKcal || 0,
        todayProgress: m.todayKcal ? Math.round((m.todayKcal / m.goals.kcal) * 100) : 0,
      }))
    )
  }, [])

  const value: HouseholdContextValue = {
    members,
    activeMember,
    isLoading,
    addMember,
    updateMember,
    removeMember,
    switchToMember,
    refreshMemberStats,
  }

  return (
    <HouseholdContext.Provider value={value}>
      {children}
    </HouseholdContext.Provider>
  )
}
