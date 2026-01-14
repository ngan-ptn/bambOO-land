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
        'bg-white rounded-card shadow-card p-4',
        'flex items-center justify-between gap-3',
        'transition-all duration-200 hover:scale-[1.02]'
      )}
    >
      {/* Meal info: name, portion badge, and calories */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-body text-foreground font-medium truncate">
            {entry.name_vi}
          </p>
          {/* Portion size badge */}
          <span className="text-caption bg-green-10 text-green-70 px-2 py-0.5 rounded-pill shrink-0">
            {entry.portion}
          </span>
        </div>
        <p className="text-caption text-foreground-muted mt-0.5">
          {entry.kcal} kcal · {formatTime(entry.timestamp)}
        </p>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cn(
          'flex items-center justify-center',
          'p-2 rounded-chip transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary',
          'tap-highlight-none',
          'text-foreground-muted hover:text-secondary hover:bg-orange-10'
        )}
        aria-label="Delete meal"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
