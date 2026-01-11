/**
 * DailySummary - Main progress display combining calorie ring and macro bars.
 * Shows empty state when no meals logged today.
 * Positioned at top of dashboard as primary visual focus.
 */

import { ProgressRing } from './ProgressRing'
import { ProteinBar } from './ProteinBar'
import { CarbsBar } from './CarbsBar'
import { FatBar } from './FatBar'
import { cn } from '@/lib/utils'
import type { DailySummary as DailySummaryType, DailyGoals } from '@/types'

interface DailySummaryProps {
  summary: DailySummaryType
  goals: DailyGoals
  className?: string
}

export function DailySummary({ summary, goals, className }: DailySummaryProps) {
  const hasLogs = summary.logs.length > 0

  // Empty state when no meals logged today
  if (!hasLogs) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 px-8', className)}>
        {/* DLS-workflow: Generous spacing for empty states */}
        {/* Simple emoji illustration - keeps bundle small vs SVG illustration */}
        <div className="text-6xl mb-6 opacity-75" role="img" aria-label="Bowl of food">
          🍜
        </div>
        <p className="text-lg text-foreground-muted text-center font-medium mb-2">
          Hãy thêm món đầu tiên...
        </p>
        <p className="text-sm text-foreground-subtle text-center max-w-xs">
          Tap a food below to start tracking
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center p-8 bg-background-card rounded-lg shadow-dls-lg', className)}>
      {/* DLS-workflow: Clean card with subtle elevation and spacious padding */}
      {/* Calorie progress ring - primary visual */}
      <ProgressRing
        consumed={summary.consumedKcal}
        goal={goals.dailyKcal}
        className="mb-8"
      />

      {/* Macronutrient bars - protein, carbs, fat */}
      <div className="w-full max-w-xs space-y-5">
        {/* DLS-workflow: Increased spacing between macro elements */}
        <ProteinBar
          consumed={summary.consumedProtein}
          goal={goals.dailyProtein}
        />
        <CarbsBar
          consumed={summary.consumedCarbs}
          goal={goals.dailyCarbs}
        />
        <FatBar
          consumed={summary.consumedFat}
          goal={goals.dailyFat}
        />
      </div>
    </div>
  )
}
