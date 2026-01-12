/**
 * FatBar - Horizontal progress bar for daily fat intake.
 * Shows consumed vs goal with rounded ends and purple gradient fill.
 */

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FatBarProps {
  consumed: number
  goal: number
  className?: string
}

export function FatBar({ consumed, goal, className }: FatBarProps) {
  // Animate from 0 on mount for smooth entry
  const [animatedWidth, setAnimatedWidth] = useState(0)

  // Calculate progress percentage, capped at 100% for bar display
  const progress = Math.min(consumed / goal, 1) * 100
  const isExceeded = consumed > goal

  // Trigger animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(progress)
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={cn('w-full', className)}>
      {/* Label row: "Fat" on left, consumed/goal on right */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-body text-gray-900 font-medium">Fat</span>
        <span className="text-caption text-gray-500">
          {Math.round(consumed)}g / {goal}g
          {isExceeded && (
            <span className="ml-1">(+{Math.round(consumed - goal)}g)</span>
          )}
        </span>
      </div>

      {/* DLS: Progress bar - solid color, no gradient */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* DLS: Solid secondary emerald fill */}
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-700 ease-out',
            'bg-secondary'
          )}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  )
}

