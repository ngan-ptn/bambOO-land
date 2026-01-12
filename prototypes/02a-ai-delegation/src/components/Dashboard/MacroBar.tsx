/**
 * MacroBar - Reusable horizontal progress bar for macronutrient display.
 * Shows consumed value with label and optional goal.
 * Used for protein, carbs, and fat tracking.
 */

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MacroBarProps {
  label: string
  consumed: number
  goal?: number
  unit?: string
  /** Tailwind colour class for the bar fill */
  colorClass?: string
  className?: string
}

export function MacroBar({
  label,
  consumed,
  goal,
  unit = 'g',
  colorClass = 'bg-primary',
  className,
}: MacroBarProps) {
  // Animate from 0 on mount for smooth entry
  const [animatedWidth, setAnimatedWidth] = useState(0)

  // Calculate progress percentage if goal exists, otherwise show proportional bar
  const hasGoal = goal !== undefined && goal > 0
  const progress = hasGoal ? Math.min(consumed / goal, 1) * 100 : 100

  // Trigger animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(progress)
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={cn('w-full', className)}>
      {/* Label row: macro name on left, value on right */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-body text-gray-900 font-medium">{label}</span>
        <span className="text-caption text-gray-500">
          {Math.round(consumed)}{unit}
          {hasGoal && ` / ${goal}${unit}`}
        </span>
      </div>

      {/* DLS: Progress bar container - muted gray background */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* DLS: Filled portion with animation */}
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-700 ease-out',
            colorClass
          )}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  )
}

