/**
 * QuickAddPage - Main container for food logging flow.
 * Orchestrates: food search, favorites grid, timeline, tile selection -> portion picker -> toast.
 * Manages debouncing, undo state, and database integration.
 */

import { useState, useCallback, useRef } from 'react'
import { FoodTileGrid } from './FoodTileGrid'
import { FavoritesGrid } from './FavoritesGrid'
import { TimelineSection } from './TimelineSection'
import { FoodSearchBar } from './FoodSearchBar'
import { FoodSearchResults } from './FoodSearchResults'
import { PortionPicker } from './PortionPicker'
import { Toast } from '@/components/common/Toast'
import { Dashboard } from '@/components/Dashboard'
import { ManualEntryModal } from '@/components/ManualEntry/ManualEntryModal'
import { useDatabaseStorage, useFoodSearch } from '@/hooks'
import { useDatabaseContext } from '@/contexts/useDatabaseContext'
import { recordFavoriteUse, getSystemFoodById } from '@/db'
import { logManualEntry } from '@/services/quick-add-service'
import { trackEvent, calculateDaysAgo } from '@/lib/analytics'
import type { FoodItem, PortionSize, ToastState, LogEntry, FoodCategory } from '@/types'
import type { ManualEntryInput } from '@/components/ManualEntry/ManualEntryForm'

// Debounce delay for tile taps to prevent accidental double-taps
const TAP_DEBOUNCE_MS = 200

interface QuickAddPageProps {
  // Props currently empty, kept for future extensibility
}

export function QuickAddPage({}: QuickAddPageProps) {
  // Database storage hook provides logs, recent items, and mutation functions
  const { recentItems, removeLog, dailySummary, goals, addFood, todayLogs } = useDatabaseStorage()
  const { currentUser, invalidateFavorites } = useDatabaseContext()

  // Food search state (query, grouped results, and favourite toggling)
  const {
    query,
    setQuery,
    results,
    isSearching,
    toggleFavoriteForFood,
  } = useFoodSearch()
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Selected food for portion picker (null when picker is closed)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  // Toast notification state
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    variant: 'success',
  })

  // Track last added entry for undo functionality
  const lastEntryRef = useRef<LogEntry | null>(null)

  // Debounce ref to prevent rapid-fire tile taps
  const lastTapTimeRef = useRef<number>(0)

  // Track which food is currently being processed (for disabled state)
  const [processingFoodId, setProcessingFoodId] = useState<string | null>(null)

  // Manual entry modal state
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false)
  const [manualEntryInitialName, setManualEntryInitialName] = useState('')

  /**
   * Handle food tile selection - opens portion picker with debouncing.
   */
  const handleSelectFood = useCallback((food: FoodItem) => {
    const now = Date.now()
    
    // Debounce: ignore taps within 200ms of the last tap
    if (now - lastTapTimeRef.current < TAP_DEBOUNCE_MS) {
      return
    }
    lastTapTimeRef.current = now

    setSelectedFood(food)
    setProcessingFoodId(food.id)

    // Track analytics for search selection if search is active
    if (isSearchActive && query) {
      trackEvent('search_food_selected', {
        food_id: food.id,
        query,
      })
    }
  }, [isSearchActive, query])

  /**
   * Handle search query change - activates/deactivates search mode based on query.
   */
  const handleSearchChange = useCallback((value: string) => {
    setQuery(value)
    // Activate search mode when typing, deactivate when cleared
    setIsSearchActive(value.length > 0)
  }, [setQuery])

  /**
   * Handle portion selection - logs the food and shows toast.
   * Uses addFood from useDatabaseStorage to update local state immediately.
   */
  const handleSelectPortion = useCallback(
    async (portion: PortionSize) => {
      if (!selectedFood) return
      if (!currentUser) return

      // Log via addFood which updates both DB and local state
      const entry = await addFood(selectedFood, portion)

      if (!entry) {
        // Daily limit reached or other error
        setToast({
          visible: true,
          message: 'Daily entry limit reached for this day.',
          variant: 'error',
        })
        return
      }

      // Store for undo and show success toast
      lastEntryRef.current = entry
      setToast({
        visible: true,
        message: `Added ${selectedFood.name_vi} (${portion})`,
        variant: 'success',
      })

      // Record favorite use if food is favorited, then refresh favorites UI
      recordFavoriteUse(currentUser.id, 'system', selectedFood.id, portion)
        .then(() => invalidateFavorites())
        .catch((err) => console.error('Failed to record favorite use:', err))

      // Track analytics: food logged via tile tap
      trackEvent('favorite_logged', {
        food_id: selectedFood.id,
        portion,
        method: 'tap',
      })

      // Close picker and clear processing state
      setSelectedFood(null)
      setProcessingFoodId(null)
    },
    [selectedFood, currentUser, addFood, invalidateFavorites]
  )
  /**
   * Handle "Log Again" action from timeline - opens portion picker with same portion.
   * Fetches full food details from database to ensure accurate portion data.
   */
  const handleLogAgain = useCallback(
    async (log: LogEntry) => {
      // Fetch full food details from database
      const systemFood = await getSystemFoodById(log.foodId)
      if (!systemFood) {
        console.error('Food not found for log:', log.foodId)
        return
      }

      // Convert SystemFood to FoodItem format
      const food: FoodItem = {
        id: systemFood.id,
        name_vi: systemFood.nameVi,
        name_en: systemFood.nameEn,
        category: systemFood.category as FoodCategory,
        serving: systemFood.servingDescription ?? '',
        confidence: systemFood.confidence,
        portions: {
          S: {
            kcal: systemFood.kcalS,
            protein: systemFood.proteinS,
            fat: systemFood.fatS,
            carbs: systemFood.carbsS,
          },
          M: {
            kcal: systemFood.kcalM,
            protein: systemFood.proteinM,
            fat: systemFood.fatM,
            carbs: systemFood.carbsM,
          },
          L: {
            kcal: systemFood.kcalL,
            protein: systemFood.proteinL,
            fat: systemFood.fatL,
            carbs: systemFood.carbsL,
          },
        },
      }

      // Track analytics: timeline log again
      const daysAgo = calculateDaysAgo(log.timestamp)
      trackEvent('timeline_log_again', {
        food_id: log.foodId,
        days_ago: daysAgo,
      })

      setSelectedFood(food)
      setProcessingFoodId(food.id)
    },
    []
  )

  /**
   * Handle portion picker close without selection.
   */
  const handleClosePicker = useCallback(() => {
    setSelectedFood(null)
    setProcessingFoodId(null)
  }, [])

  /**
   * Handle toast dismissal.
   */
  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  /**
   * Handle undo action - removes the last logged entry.
   */
  const handleUndo = useCallback(() => {
    if (lastEntryRef.current) {
      removeLog(lastEntryRef.current.id)
      lastEntryRef.current = null
    }
  }, [removeLog])

  /**
   * Handle "Add custom food" from no-results state - opens manual entry modal.
   */
  const handleAddCustomFood = useCallback((searchQuery: string) => {
    setManualEntryInitialName(searchQuery)
    setIsManualEntryOpen(true)
  }, [])

  /**
   * Handle manual entry modal close.
   */
  const handleCloseManualEntry = useCallback(() => {
    setIsManualEntryOpen(false)
    setManualEntryInitialName('')
  }, [])

  /**
   * Handle manual entry save - logs custom food and updates UI.
   */
  const handleManualEntrySave = useCallback(
    async (input: ManualEntryInput) => {
      if (!currentUser) return

      const result = await logManualEntry({
        userId: currentUser.id,
        name: input.name_vi,
        kcal: input.kcal,
        protein: input.protein,
        carbs: input.carbs,
        fat: input.fat,
      })

      if (result.status === 'error') {
        setToast({
          visible: true,
          message: 'Daily entry limit reached.',
          variant: 'error',
        })
        return
      }

      // Close modal and clear search
      setIsManualEntryOpen(false)
      setManualEntryInitialName('')
      setQuery('')
      setIsSearchActive(false)

      // Show success toast
      setToast({
        visible: true,
        message: `Added ${input.name_vi}`,
        variant: 'success',
      })
    },
    [currentUser, setQuery]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Main content - scrollable sections */}
      <main className="px-4 py-6 space-y-8">
        {/* Dashboard: progress ring + today's meals */}
        <Dashboard
          dailySummary={dailySummary}
          goals={goals}
          onDeleteLog={removeLog}
        />

        {/* Quick Add section: header + search bar on same row, search aligned right */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-title text-foreground shrink-0">Quick Add</h2>
          <FoodSearchBar
            value={query}
            onChange={handleSearchChange}
            autoFocus={true}
            className="max-w-[50%]"
          />
        </div>

        {/* Conditional content: search results OR normal browse mode */}
        {isSearchActive || query ? (
          // Search mode: show search results
          <FoodSearchResults
            results={results}
            query={query}
            onSelectFood={handleSelectFood}
            isSearching={isSearching}
            onToggleFavorite={toggleFavoriteForFood}
            onAddCustomFood={handleAddCustomFood}
          />
        ) : (
          // Browse mode: show favorites, timeline, and recent items
          <>
            {/* Favorites grid - top section.
                Quick-log for favorites is currently handled elsewhere, so we only pass tile tap handling here. */}
            <FavoritesGrid
              onSelectFood={handleSelectFood}
            />

            {/* Timeline section - recent meals with tab navigation */}
            <TimelineSection onLogAgain={handleLogAgain} todayLogs={todayLogs} />

            {/* Recent items grid - fallback for browsing */}
            <FoodTileGrid
              allFoods={[]}
              recentItems={recentItems}
              onSelectFood={handleSelectFood}
              disabledFoodId={processingFoodId}
            />
          </>
        )}
      </main>

      {/* Portion picker bottom sheet */}
      <PortionPicker
        food={selectedFood}
        isOpen={selectedFood !== null}
        onSelect={handleSelectPortion}
        onClose={handleClosePicker}
      />

      {/* Toast notification */}
      <Toast
        toast={toast}
        onClose={handleCloseToast}
        onUndo={handleUndo}
      />

      {/* Manual entry modal for custom food from search */}
      <ManualEntryModal
        isOpen={isManualEntryOpen}
        onClose={handleCloseManualEntry}
        initialName={manualEntryInitialName}
        onSave={handleManualEntrySave}
      />
    </div>
  )
}
