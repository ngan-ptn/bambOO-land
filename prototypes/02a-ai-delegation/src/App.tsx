/**
 * App - Root component for Calorie Tracker App.
 * Combines QuickAddPage (Dashboard, Favorites, Templates, Timeline, food browsing)
 * with ActionSheet navigation, manual entry, and scan flows.
 * Supports showcase page via URL parameter.
 */

import { useState, useCallback, useRef, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuickAddPage } from '@/components/QuickAdd'
import { ShowcasePage } from '@/components/Showcase'
import { ActionSheet, type ActionSheetAction } from '@/components/Dashboard'
import { ManualEntryPage } from '@/components/ManualEntry/ManualEntryPage'
import { ScanCameraPage } from '@/components/Scan/ScanCameraPage'
import { ScanResultsPage } from '@/components/Scan/ScanResultsPage'
import type { DetectedFood } from '@/lib/scanSim'
import { PortionPicker, type PortionSelection } from '@/components/QuickAdd/PortionPicker'
import { AddPartnerPage, ProfileSwitcher } from '@/components/Partner'
import { Toast } from '@/components/common'
import { useDatabaseStorage, useDatabaseContext, usePartner } from '@/hooks'
import { useAuthContext } from '@/auth/AuthContext'
import { logManualEntry } from '@/services/quick-add-service'
import { cn } from '@/lib/utils'
import { appNavReducer, initialAppNavState } from '@/lib/appNav'
import { trackEvent } from '@/lib/analytics'
import type { FoodItem, PortionSize, ToastState, LogEntry } from '@/types'

// Check URL parameter to show showcase page
const SHOW_SHOWCASE = new URLSearchParams(window.location.search).has('showcase')

// Separate component for showcase to avoid hooks ordering issues
function ShowcaseWrapper() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <ShowcasePage />
    </div>
  )
}

function App() {
  // Show showcase page if URL parameter is set
  // Using early return with separate component to satisfy React hooks rules
  if (SHOW_SHOWCASE) {
    return <ShowcaseWrapper />
  }

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { currentUser } = useDatabaseContext()
  const { addFood, addFoodForUser, removeLog, isLoading } = useDatabaseStorage()
  const { partner, hasPartner, isLoadingPartner, addPartner, switchToPartner, switchToSelf, isViewingPartner } = usePartner()
  const [nav, dispatchNav] = useReducer(appNavReducer, undefined, initialAppNavState)

  // Portion picker state for scan results flow (QuickAddPage manages its own)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  // Toast notification state for scan/manual entry flows (QuickAddPage manages its own)
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    variant: 'success',
  })

  // Refs for undo/edit tracking for scan/manual entry flows
  const lastEntryRef = useRef<LogEntry | null>(null)
  const lastFoodRef = useRef<FoodItem | null>(null)
  const lastPortionRef = useRef<PortionSize | null>(null)
  const lastUndoModeRef = useRef<'add' | 'edit' | null>(null)
  const editUndoRef = useRef<{ food: FoodItem; previousPortion: PortionSize } | null>(null)
  const pendingEditRef = useRef<{ entryId: string; food: FoodItem; previousPortion: PortionSize } | null>(null)

  /**
   * Handle portion selection from scan results flow - logs the food and shows toast.
   * Supports both add and edit modes (edit when pendingEditRef is set).
   * Now also supports logging for partner when toggle is ON.
   */
  const handleSelectPortion = useCallback(
    async (selection: PortionSelection) => {
      const { portion, logForPartner, partnerPortion } = selection
      if (!selectedFood) return

      const pending = pendingEditRef.current
      if (pending) {
        pendingEditRef.current = null

        await removeLog(pending.entryId)

        const entry = await addFood(pending.food, portion)
        if (entry) {
          lastEntryRef.current = entry
          lastFoodRef.current = pending.food
          lastPortionRef.current = portion
          lastUndoModeRef.current = 'edit'
          editUndoRef.current = { food: pending.food, previousPortion: pending.previousPortion }

          setToast({
            visible: true,
            message: `Updated ${pending.food.name_vi} (${portion})`,
            variant: 'success',
            showUndo: true,
            showEdit: true,
          })
        }
      } else {
        // Log for current user
        const entry = await addFood(selectedFood, portion)

        // Also log for partner if toggle is ON
        let partnerLogFailed = false
        if (logForPartner && partner?.id) {
          const partnerEntry = await addFoodForUser(partner.id, selectedFood, partnerPortion)
          if (!partnerEntry) {
            partnerLogFailed = true
            console.warn('Failed to log for partner:', partner.id)
          }
        } else if (logForPartner && !partner?.id) {
          partnerLogFailed = true
          console.warn('Partner toggle ON but partner not loaded')
        }

        if (entry) {
          lastEntryRef.current = entry
          lastFoodRef.current = selectedFood
          lastPortionRef.current = portion
          lastUndoModeRef.current = 'add'
          editUndoRef.current = null

          let message: string
          if (logForPartner && partnerLogFailed) {
            message = `Added ${selectedFood.name_vi} (partner log failed)`
          } else if (logForPartner && partner) {
            message = `Added for you + ${partner.displayName || 'Partner'}`
          } else {
            message = `Added ${selectedFood.name_vi} (${portion})`
          }

          setToast({
            visible: true,
            message,
            variant: 'success',
            showUndo: !logForPartner || partnerLogFailed, // Show undo if partner log failed
            showEdit: !logForPartner || partnerLogFailed,
          })
        }
      }

      setSelectedFood(null)
      dispatchNav({ type: 'CLOSE_PORTION_PICKER' })

      // Navigate home after logging from scan results
      if (nav.portionPickerOrigin === 'scanResults') {
        dispatchNav({ type: 'GO_HOME' })
      }
    },
    [selectedFood, addFood, addFoodForUser, removeLog, nav.portionPickerOrigin, partner]
  )

  /**
   * Handle portion picker close without selection.
   */
  const handleClosePicker = useCallback(() => {
    setSelectedFood(null)
    pendingEditRef.current = null
    dispatchNav({ type: 'CLOSE_PORTION_PICKER' })
  }, [])

  /**
   * Handle toast dismissal.
   */
  const handleCloseToast = useCallback(() => {
    setToast((prev: ToastState) => ({ ...prev, visible: false }))
  }, [])

  /**
   * Handle undo action - removes the last logged entry and restores previous state if editing.
   */
  const handleUndo = useCallback(async () => {
    if (lastEntryRef.current) {
      await removeLog(lastEntryRef.current.id)

      // Restore previous portion if this was an edit
      if (lastUndoModeRef.current === 'edit' && editUndoRef.current) {
        await addFood(editUndoRef.current.food, editUndoRef.current.previousPortion)
      }

      lastEntryRef.current = null
      lastUndoModeRef.current = null
      editUndoRef.current = null
    }

    dispatchNav({ type: 'OPEN_ACTION_SHEET' })
  }, [removeLog, addFood])

  /**
   * Handle edit action from toast - reopens portion picker with last logged food.
   */
  const handleEdit = useCallback(() => {
    if (!lastEntryRef.current) return
    if (!lastFoodRef.current) return
    if (!lastPortionRef.current) return

    pendingEditRef.current = {
      entryId: lastEntryRef.current.id,
      food: lastFoodRef.current,
      previousPortion: lastPortionRef.current,
    }

    setSelectedFood(lastFoodRef.current)
    dispatchNav({ type: 'OPEN_PORTION_PICKER', origin: 'home' })
  }, [])

  /**
   * Handle manual entry save - logs custom food entry.
   */
  const handleManualSave = useCallback(
    async (input: {
      name_vi: string
      kcal: number
      protein?: number
      carbs?: number
      fat?: number
    }) => {
      if (!currentUser) return

      const result = await logManualEntry({
        userId: currentUser.id,
        name: input.name_vi,
        kcal: input.kcal,
        protein: input.protein,
        carbs: input.carbs,
        fat: input.fat,
      })

      if (result.log) {
        // Convert FoodLog to LogEntry for compatibility
        const entry: LogEntry = {
          id: result.log.id,
          foodId: result.log.foodId,
          name_vi: result.log.nameSnapshot,
          portion: result.log.portion as PortionSize,
          kcal: result.log.kcal,
          protein: result.log.protein,
          carbs: result.log.carbs,
          fat: result.log.fat,
          timestamp: result.log.loggedAt,
        }

        lastEntryRef.current = entry
        lastFoodRef.current = null
        lastPortionRef.current = null
        lastUndoModeRef.current = 'add'

        setToast({
          visible: true,
          message: `Added ${input.name_vi} (manual)`,
          variant: 'success',
          showUndo: true,
        })
      }

      dispatchNav({ type: 'GO_HOME' })
    },
    [currentUser]
  )

  /**
   * Handle ActionSheet action selection - routes to appropriate screen.
   */
  const handleSelectAction = useCallback(
    (action: ActionSheetAction) => {
      switch (action) {
        case 'search':
          dispatchNav({ type: 'CLOSE_ACTION_SHEET' })
          return
        case 'manual':
          dispatchNav({ type: 'GO_MANUAL' })
          return
        case 'scan':
          trackEvent('scan_initiated', { source: 'action_sheet' })
          dispatchNav({ type: 'GO_SCAN_CAMERA' })
          return
        default:
          return
      }
    },
    []
  )

  // Manual entry screen
  if (nav.screen === 'manual') {
    return (
      <ManualEntryPage
        onBack={() => dispatchNav({ type: 'BACK' })}
        onSave={handleManualSave}
      />
    )
  }

  // Add partner screen
  if (nav.screen === 'addPartner') {
    return (
      <AddPartnerPage
        onCancel={() => dispatchNav({ type: 'CANCEL_ADD_PARTNER' })}
        onSubmit={async (name, dailyKcalGoal) => {
          const success = await addPartner(name, dailyKcalGoal)
          if (success) {
            setToast({
              visible: true,
              message: `${name} added as partner!`,
              variant: 'success',
            })
            dispatchNav({ type: 'GO_HOME' })
          }
        }}
      />
    )
  }

  // Scan camera screen
  if (nav.screen === 'scanCamera') {
    return (
      <ScanCameraPage
        onCancel={() => dispatchNav({ type: 'CANCEL_SCAN' })}
        onCapture={(photo) => {
          dispatchNav({ type: 'CAPTURE_SCAN_PHOTO', photoId: photo.id })
        }}
      />
    )
  }

  // Scan results screen
  if (nav.screen === 'scanResults') {
    return (
      <>
        <ScanResultsPage
          key={nav.scanPhotoId ?? 'sim-photo:none'}
          photoId={nav.scanPhotoId ?? 'sim-photo:none'}
          onCancel={() => dispatchNav({ type: 'CANCEL_SCAN' })}
          onManual={() => dispatchNav({ type: 'GO_MANUAL' })}
          onEditItem={(item: DetectedFood, _index: number) => {
            setSelectedFood(item.food)
            dispatchNav({ type: 'OPEN_PORTION_PICKER', origin: 'scanResults' })
          }}
          onConfirmMultiple={async (items) => {
            let addedCount = 0
            let totalKcal = 0

            for (const { food, portion } of items) {
              const entry = await addFood(food, portion)
              if (entry) {
                addedCount++
                totalKcal += entry.kcal
                // Keep track of the last entry for potential undo
                lastEntryRef.current = entry
                lastFoodRef.current = food
                lastPortionRef.current = portion
              }
            }

            if (addedCount > 0) {
              lastUndoModeRef.current = 'add'
              editUndoRef.current = null

              setToast({
                visible: true,
                message: `Added ${addedCount} item${addedCount !== 1 ? 's' : ''} (${totalKcal} kcal)`,
                variant: 'success',
                showUndo: addedCount === 1, // Only show undo for single items
                showEdit: addedCount === 1,
              })
            }

            dispatchNav({ type: 'GO_HOME' })
          }}
        />

        <PortionPicker
          food={selectedFood}
          isOpen={nav.isPortionPickerOpen && selectedFood !== null}
          onSelect={handleSelectPortion}
          onClose={handleClosePicker}
          partnerName={hasPartner && !isLoadingPartner ? (partner?.displayName || 'Partner') : null}
        />
      </>
    )
  }

  // Show loading state while database initialises
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Main home screen with QuickAddPage
  // QuickAddPage manages its own portion picker and toast for its internal flows.
  // ActionSheet provides additional navigation to manual entry and scan flows.
  return (
    // Shell container keeps the main Quick Add UI pinned to 1000px width,
    // so opening bottom sheets cannot visually shrink the dashboard behind.
    <div className="max-w-[1000px] mx-auto">
      {/* User header with profile switcher */}
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Chào, {currentUser?.displayName || user?.name || 'Bạn'}! 👋
          </h2>
          <p className="text-sm text-foreground-muted">
            {isViewingPartner ? `Viewing as ${partner?.displayName || 'Partner'}` : 'Hôm nay bạn ăn gì?'}
          </p>
        </div>
        <ProfileSwitcher
          currentUser={currentUser}
          partner={partner}
          isViewingPartner={isViewingPartner}
          onSwitchToSelf={switchToSelf}
          onSwitchToPartner={switchToPartner}
          onAddPartner={() => dispatchNav({ type: 'GO_ADD_PARTNER' })}
          onGoToSettings={() => navigate('/profile')}
        />
      </header>

      <QuickAddPage />

      {/* Floating action button for ActionSheet */}
      <button
        type="button"
        onClick={() => dispatchNav({ type: 'OPEN_ACTION_SHEET' })}
        aria-label="Add food"
        className={cn(
          'fixed bottom-6 right-6 z-30',
          'w-14 h-14 rounded-full shadow-card',
          'bg-primary text-primary-foreground',
          'text-2xl leading-none',
          'flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'tap-highlight-none'
        )}
      >
        +
      </button>

      {/* ActionSheet for navigation to manual entry and scan */}
      <ActionSheet
        isOpen={nav.screen === 'actionSheet'}
        onClose={() => dispatchNav({ type: 'CLOSE_ACTION_SHEET' })}
        onSelect={handleSelectAction}
      />

      {/* Portion picker for scan results flow (QuickAddPage has its own for tile selection) */}
      <PortionPicker
        food={selectedFood}
        isOpen={nav.isPortionPickerOpen && selectedFood !== null}
        onSelect={handleSelectPortion}
        onClose={handleClosePicker}
        partnerName={hasPartner && !isLoadingPartner ? (partner?.displayName || 'Partner') : null}
      />

      {/* Toast for scan/manual entry flows (QuickAddPage has its own for tile selection) */}
      <Toast
        toast={toast}
        onClose={handleCloseToast}
        onUndo={handleUndo}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default App
