/**
 * MealCard - Individual logged meal display with delete capability.
 * Shows Vietnamese dish name, calories, and time logged.
 * Delete via single tap on trash icon.
 */

import { useCallback } from 'react'
import { Trash2 } from 'lucide-react'
import { cn, formatTime } from '@/lib/utils'
import type { LogEntry } from '@/types'

interface MealCardProps {
  entry: LogEntry
  onDelete: (entryId: string) => void
}

export function MealCard({ entry, onDelete }: MealCardProps) {
  const handleDeleteClick = useCallback(() => {
    onDelete(entry.id)
  }, [entry.id, onDelete])

  return (
    <div
      className={cn(
        // DLS: Flat card - solid bg, no shadow
        'bg-white rounded-lg p-4',
        'flex items-center justify-between gap-3',
        'transition-all duration-200'
      )}
    >
      {/* Meal info: name, portion badge, and calories */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-body text-gray-900 font-medium truncate">
            {entry.name_vi}
          </p>
          {/* DLS: Portion size badge - accent color */}
          <span className="text-caption bg-accent/20 text-accent-dark px-2 py-0.5 rounded-md shrink-0 font-medium">
            {entry.portion}
          </span>
        </div>
        <p className="text-caption text-gray-500 mt-0.5">
          {entry.kcal} kcal · {formatTime(entry.timestamp)}
        </p>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cn(
          'flex items-center justify-center',
          // DLS: Scale on hover, snappy transition
          'p-2 rounded-full transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'tap-highlight-none',
          'text-gray-400 hover:text-error hover:bg-error/10 hover:scale-110'
        )}
        aria-label="Delete meal"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
