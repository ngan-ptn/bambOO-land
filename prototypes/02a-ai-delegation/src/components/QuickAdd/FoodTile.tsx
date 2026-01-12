/**
 * FoodTile - Tappable card for selecting a food item.
 * Displays category emoji in a soft container, Vietnamese name, and M-portion calories with add icon.
 * Used in both Recent Items and full food grid sections.
 */

import { useState, useCallback } from 'react'
import { PlusCircle } from 'lucide-react'
import { EmojiContainer } from '@/components/common'
import { cn } from '@/lib/utils'
import { getFoodEmoji } from '@/lib/food-emoji'
import type { FoodItem } from '@/types'

interface FoodTileProps {
  food: FoodItem
  onSelect: (food: FoodItem) => void
  disabled?: boolean
}

export function FoodTile({ food, onSelect, disabled = false }: FoodTileProps) {
  // Track pressed state for visual feedback on touch.
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = useCallback(() => {
    if (!disabled) setIsPressed(true)
  }, [disabled])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleClick = useCallback(() => {
    if (!disabled) {
      onSelect(food)
    }
  }, [disabled, food, onSelect])

  // M portion is the default display value per spec.
  const displayKcal = food.portions.M.kcal
  const categoryEmoji = getFoodEmoji(food)

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      disabled={disabled}
      className={cn(
        // DLS: Flat card styling - solid bg, no shadow
        'w-full bg-white rounded-lg',
        'p-4 text-left transition-all duration-200',
        // Touch target minimum 44px (enforced via padding + content).
        'min-h-[72px] tap-highlight-none',
        // Focus state for accessibility.
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        // DLS: Scale on hover, scale down on pressed
        'hover:scale-[1.02] hover:bg-gray-50',
        isPressed && !disabled && 'scale-[0.97]',
        // Disabled state: reduced opacity, no pointer events.
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: emoji container and text block so tiles match favorites visually. */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <EmojiContainer emoji={categoryEmoji} ariaLabel={food.category} size="sm" />
          <div className="min-w-0">
            {/* Vietnamese food name - primary text. */}
            <p className="text-body text-gray-900 font-medium leading-tight line-clamp-2">
              {food.name_vi}
            </p>

            {/* Calorie display - muted caption showing M portion. */}
            <p className="text-caption text-gray-500 mt-1">
              {displayKcal} kcal
            </p>
          </div>
        </div>

        {/* Right: add icon for clarity. */}
        <PlusCircle
          size={20}
          className="text-primary shrink-0 mt-0.5"
        />
      </div>
    </button>
  )
}
