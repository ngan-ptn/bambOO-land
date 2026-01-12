/**
 * PortionPicker - Bottom sheet overlay for selecting portion size.
 * Shows S/M/L pill buttons with calorie info for the selected food.
 * Closes on backdrop tap or portion selection.
 * Includes heart icon button to toggle favorite status.
 * Supports "Log for Partner" toggle for multi-user households.
 *
 * Refactored to use BottomSheet primitive for consistent modal behavior,
 * accessibility (focus trap, ARIA), and responsive design (mobile drawer vs desktop modal).
 */

import { useCallback, useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BottomSheet } from '@/components/common'
import type { FoodItem, PortionSize } from '@/types'

export interface PortionSelection {
  portion: PortionSize
  logForPartner: boolean
  partnerPortion: PortionSize
}

interface PortionPickerProps {
  food: FoodItem | null
  isOpen: boolean
  onSelect: (selection: PortionSelection) => void
  onClose: () => void
  /** Whether the current food is in user's favorites */
  isFavorite?: boolean
  /** Callback when user taps the heart icon to toggle favorite */
  onToggleFavorite?: (food: FoodItem) => void
  /** Partner's display name (shows toggle if provided) */
  partnerName?: string | null
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
  partnerName,
}: PortionPickerProps) {
  // State for selected portion
  const [selectedPortion, setSelectedPortion] = useState<PortionSize>('M')
  // State for "Log for partner" toggle
  const [logForPartner, setLogForPartner] = useState(false)
  // Partner's portion (defaults to same as user's)
  const [partnerPortion, setPartnerPortion] = useState<PortionSize>('M')

  // Reset state when sheet opens with new food
  useEffect(() => {
    if (isOpen) {
      setSelectedPortion('M')
      setLogForPartner(false)
      setPartnerPortion('M')
    }
  }, [isOpen, food?.id])

  // Sync partner portion when user portion changes (if toggle is on)
  useEffect(() => {
    if (logForPartner) {
      setPartnerPortion(selectedPortion)
    }
  }, [selectedPortion, logForPartner])

  // Handle final submission
  const handleSubmit = useCallback(() => {
    onSelect({
      portion: selectedPortion,
      logForPartner,
      partnerPortion,
    })
    onClose()
  }, [selectedPortion, logForPartner, partnerPortion, onSelect, onClose])

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(() => {
    if (food && onToggleFavorite) {
      onToggleFavorite(food)
    }
  }, [food, onToggleFavorite])

  // Don't render if closed or no food selected
  if (!isOpen || !food) return null

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
            'w-8 h-8 rounded-full',
            // DLS: Scale on hover, snappy transition
            'transition-all duration-200',
            'hover:bg-gray-100 hover:scale-110 active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          <Heart
            size={20}
            className={cn(
              'transition-colors duration-200',
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'fill-none text-gray-400'
            )}
          />
        </button>
      )}
    </span>
  )

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={titleWithHeart}
      description={`Select portion size for ${food.name_vi}`}
      size="auto"
      showDragHandle={true}
    >
      {/* Your portion size pills */}
      <div className="flex gap-3 justify-center p-1">
        {PORTION_OPTIONS.map(({ size, label }) => {
          const nutrition = food.portions[size]
          const isSelected = selectedPortion === size

          return (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedPortion(size)}
              className={cn(
                // DLS: Flat button, rounded-lg, generous padding
                'flex-1 max-w-[140px] py-4 px-4',
                'rounded-lg',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                // Touch target compliance
                'min-h-[72px] tap-highlight-none',
                // DLS: Scale on hover, selected vs unselected states
                isSelected
                  ? 'bg-primary text-white hover:scale-105'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105'
              )}
            >
              {/* Size label - large and prominent */}
              <span className="block text-xl font-bold mb-1">
                {label}
              </span>
              {/* Calorie info - smaller caption */}
              <span className={cn(
                'block text-caption',
                isSelected ? 'opacity-90' : 'text-gray-500'
              )}>
                {nutrition.kcal} kcal
              </span>
            </button>
          )
        })}
      </div>

      {/* Serving size hint */}
      <p className="text-caption text-gray-500 text-center mt-4">
        {food.serving}
      </p>

      {/* Log for Partner toggle (only if partner exists) */}
      {partnerName && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          {/* Toggle row */}
          <button
            type="button"
            onClick={() => setLogForPartner(!logForPartner)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="text-body text-gray-900">
              Also log for {partnerName}
            </span>
            {/* DLS: Toggle switch - flat design */}
            <span
              className={cn(
                'w-11 h-6 rounded-full transition-colors duration-200 relative',
                logForPartner ? 'bg-primary' : 'bg-gray-300'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200',
                  logForPartner ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </span>
          </button>

          {/* Partner portion selection (shown when toggle ON) */}
          {logForPartner && (
            <div className="mt-3 space-y-2">
              <p className="text-caption text-gray-500">
                {partnerName}'s portion
              </p>
              <div className="flex gap-2">
                {PORTION_OPTIONS.map(({ size, label }) => {
                  const nutrition = food.portions[size]
                  const isSelected = partnerPortion === size

                  return (
                    <button
                      key={`partner-${size}`}
                      type="button"
                      onClick={() => setPartnerPortion(size)}
                      className={cn(
                        // DLS: Flat buttons with scale on hover
                        'flex-1 py-2 px-3 rounded-lg text-caption font-medium',
                        'transition-all duration-200 hover:scale-105',
                        isSelected
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      )}
                    >
                      {label} · {nutrition.kcal}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* DLS: Primary button - solid bg, scale on hover */}
      <button
        type="button"
        onClick={handleSubmit}
        className={cn(
          'w-full py-4 rounded-lg mt-6',
          'bg-primary text-white',
          'text-body font-semibold',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'hover:bg-primary-dark hover:scale-105 active:scale-[0.98] transition-all duration-200'
        )}
      >
        {logForPartner
          ? `Log for both (${food.portions[selectedPortion].kcal + food.portions[partnerPortion].kcal} kcal)`
          : `Log Meal (${food.portions[selectedPortion].kcal} kcal)`}
      </button>
    </BottomSheet>
  )
}
