/**
 * ProteinBar - Horizontal progress bar for daily protein intake.
 * Shows consumed vs goal with rounded ends and soft gradient fill.
 * Complements the ProgressRing for a complete nutrition overview.
 */

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProteinBarProps {
  consumed: number
  goal: number
  className?: string
}

export function ProteinBar({ consumed, goal, className }: ProteinBarProps) {
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
      {/* Label row: "Protein" on left, consumed/goal on right */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-body text-gray-900 font-medium">Protein</span>
        <span className="text-caption text-gray-500">
          {consumed}g / {goal}g
          {isExceeded && (
            // Show excess in neutral color (not red per design spec)
            <span className="ml-1">(+{consumed - goal}g)</span>
          )}
        </span>
      </div>

      {/* DLS: Progress bar - solid color, no gradient */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* DLS: Solid primary blue fill */}
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-700 ease-out',
            'bg-primary'
          )}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  )
}
