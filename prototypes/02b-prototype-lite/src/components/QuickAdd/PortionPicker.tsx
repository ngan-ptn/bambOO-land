/**
 * PortionPicker - Bottom sheet overlay for selecting portion size.
 * Shows S/M/L pill buttons with calorie info for the selected food.
 * Closes on backdrop tap or portion selection.
 * Includes heart icon button to toggle favorite status.
 * CR05: Includes "Who's eating?" step for multi-user support.
 *
 * Refactored to use BottomSheet primitive for consistent modal behavior,
 * accessibility (focus trap, ARIA), and responsive design (mobile drawer vs desktop modal).
 */

import { useCallback, useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BottomSheet } from '@/components/common'
import { useHousehold } from '@/contexts/HouseholdContext'
import type { FoodItem, PortionSize, MealSplitType } from '@/types'

interface PortionPickerProps {
  food: FoodItem | null
  isOpen: boolean
  onSelect: (portion: PortionSize, eaters?: string[], splitType?: MealSplitType) => void
  onClose: () => void
  /** Whether the current food is in user's favorites */
  isFavorite?: boolean
  /** Callback when user taps the heart icon to toggle favorite */
  onToggleFavorite?: (food: FoodItem) => void
}

// Portion size labels and multiplier descriptions
const PORTION_OPTIONS: { size: PortionSize; label: string; description: string }[] = [
  { size: 'S', label: 'S', description: 'Small' },
  { size: 'M', label: 'M', description: 'Medium' },
  { size: 'L', label: 'L', description: 'Large' },
]

export function PortionPicker({
  food,
  isOpen,
  onSelect,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}: PortionPickerProps) {
  const { members, activeMember } = useHousehold()

  // CR05: Track selected eaters (defaults to active member)
  const [selectedEaters, setSelectedEaters] = useState<string[]>([])
  const [selectedPortion, setSelectedPortion] = useState<PortionSize | null>(null)
  const [splitType, setSplitType] = useState<MealSplitType>('full')

  // Reset state when sheet opens/closes
  const resetState = useCallback(() => {
    setSelectedEaters(activeMember ? [activeMember.id] : [])
    setSelectedPortion(null)
    setSplitType('full')
  }, [activeMember])

  // Handle portion selection: show "Who's eating?" step
  const handlePortionSelect = useCallback(
    (portion: PortionSize) => {
      setSelectedPortion(portion)
      // Initialize with active member selected
      if (activeMember && selectedEaters.length === 0) {
        setSelectedEaters([activeMember.id])
      }
    },
    [activeMember, selectedEaters.length]
  )

  // Handle final confirmation
  const handleConfirm = useCallback(() => {
    if (selectedPortion) {
      onSelect(selectedPortion, selectedEaters, splitType)
      resetState()
      onClose()
    }
  }, [selectedPortion, selectedEaters, splitType, onSelect, onClose, resetState])

  // Toggle eater selection
  const toggleEater = useCallback((memberId: string) => {
    setSelectedEaters(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }, [])

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(() => {
    if (food && onToggleFavorite) {
      onToggleFavorite(food)
    }
  }, [food, onToggleFavorite])

  // Handle close: reset state
  const handleClose = useCallback(() => {
    resetState()
    onClose()
  }, [resetState, onClose])

  // Don't render if closed or no food selected
  if (!isOpen || !food) return null

  // Calculate calories based on split type
  const baseCalories = selectedPortion ? food.portions[selectedPortion].kcal : 0
  const caloriesPerPerson = splitType === 'equal' && selectedEaters.length > 1
    ? Math.round(baseCalories / selectedEaters.length)
    : baseCalories

  // Custom title with heart icon
  const titleWithHeart = (
    <span className="inline-flex items-center justify-center gap-2">
      {food.name_vi}
      {onToggleFavorite && (
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'inline-flex items-center justify-center',
            'w-8 h-8 rounded-md',
            'transition-all duration-200',
            'hover:bg-gray-100 active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          )}
        >
          <Heart
            size={20}
            className={cn(
              'transition-all duration-200',
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'fill-none text-gray-500'
            )}
          />
        </button>
      )}
    </span>
  )

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title={titleWithHeart}
      description={selectedPortion ? "Who's eating?" : `Select portion size for ${food.name_vi}`}
      size="auto"
      showDragHandle={true}
    >
      {/* Step 1: Portion size pills */}
      {!selectedPortion && (
        <>
          <div className="flex gap-3 justify-center p-1">
            {PORTION_OPTIONS.map(({ size, label }) => {
              const nutrition = food.portions[size]

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handlePortionSelect(size)}
                  className={cn(
                    'flex-1 max-w-[140px] py-4 px-4',
                    'rounded-card bg-primary text-white',
                    'transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'hover:bg-primary-dark hover:scale-105 active:scale-95',
                    'min-h-[72px] tap-highlight-none'
                  )}
                >
                  <span className="block text-xl font-bold mb-1">
                    {label}
                  </span>
                  <span className="block text-caption opacity-90">
                    {nutrition.kcal} kcal
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-caption text-foreground-muted text-center mt-4">
            {food.serving}
          </p>
        </>
      )}

      {/* Step 2: Who's eating? (CR05) */}
      {selectedPortion && (
        <div className="space-y-4">
          {/* Selected portion indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-foreground-muted">
            <span>Portion:</span>
            <span className="px-3 py-1 rounded-full bg-primary text-white font-medium">
              {selectedPortion} · {food.portions[selectedPortion].kcal} kcal
            </span>
            <button
              onClick={() => setSelectedPortion(null)}
              className="text-primary underline text-xs"
            >
              Change
            </button>
          </div>

          {/* Member selection chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {members.map((member) => {
              const isSelected = selectedEaters.includes(member.id)
              return (
                <button
                  key={member.id}
                  onClick={() => toggleEater(member.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
                    'border-2',
                    isSelected
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-brown-30 bg-background-card text-foreground-muted'
                  )}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: member.avatarColor }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">{member.name}</span>
                  {isSelected && <span className="text-primary">✓</span>}
                </button>
              )
            })}
          </div>

          {/* Split options (show when multiple people selected) */}
          {selectedEaters.length > 1 && (
            <div className="space-y-2 pt-2 border-t border-brown-20">
              <p className="text-sm text-foreground-muted text-center">
                How to split?
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setSplitType('equal')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    splitType === 'equal'
                      ? 'bg-primary text-white'
                      : 'bg-brown-20 text-foreground-muted'
                  )}
                >
                  Split equally ({caloriesPerPerson} ea)
                </button>
                <button
                  onClick={() => setSplitType('full')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    splitType === 'full'
                      ? 'bg-primary text-white'
                      : 'bg-brown-20 text-foreground-muted'
                  )}
                >
                  Full portion each
                </button>
              </div>
            </div>
          )}

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={selectedEaters.length === 0}
            className={cn(
              'w-full py-3 rounded-card font-semibold text-white transition-all',
              selectedEaters.length > 0
                ? 'bg-primary hover:bg-primary-dark'
                : 'bg-brown-30 cursor-not-allowed'
            )}
          >
            {selectedEaters.length > 1
              ? `Add to Today (${selectedEaters.length} people)`
              : 'Add to Today'
            }
          </button>
        </div>
      )}
    </BottomSheet>
  )
}
