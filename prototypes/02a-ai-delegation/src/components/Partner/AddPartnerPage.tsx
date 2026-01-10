/**
 * AddPartnerPage - Form to create a partner profile for shared meal logging.
 * Allows user to set partner's name and daily calorie goal.
 */

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface AddPartnerPageProps {
  onCancel: () => void
  onSubmit: (name: string, dailyKcalGoal: number) => Promise<void>
  isLoading?: boolean
}

const MIN_CALORIES = 1200
const MAX_CALORIES = 3500
const DEFAULT_CALORIES = 2000

export function AddPartnerPage({ onCancel, onSubmit, isLoading = false }: AddPartnerPageProps) {
  const [name, setName] = useState('')
  const [dailyKcal, setDailyKcal] = useState(DEFAULT_CALORIES)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Please enter a name')
      return
    }

    setError(null)
    await onSubmit(trimmedName, dailyKcal)
  }, [name, dailyKcal, onSubmit])

  const isValid = name.trim().length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={cn(
              'text-body font-medium text-foreground',
              'px-3 py-2 -my-2 -ml-3 rounded-pill',
              'hover:bg-border/50 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            Cancel
          </button>

          <h1 className="text-title text-foreground">Add Partner</h1>

          <div className="w-[72px]" />
        </div>
      </header>

      {/* Form */}
      <main className="px-5 py-6 space-y-6">
        {/* Info card */}
        <div className="bg-background-card border border-border rounded-card p-4">
          <p className="text-body text-foreground">
            Add your partner to log meals for both of you at once.
          </p>
          <p className="text-caption text-foreground-muted mt-2">
            You can switch profiles anytime from the header.
          </p>
        </div>

        {/* Name input */}
        <div className="space-y-2">
          <label htmlFor="partner-name" className="block text-body font-medium text-foreground">
            Partner's name
          </label>
          <input
            id="partner-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            disabled={isLoading}
            className={cn(
              'w-full px-4 py-3 rounded-card',
              'bg-background-card border border-border',
              'text-body text-foreground placeholder:text-foreground-muted',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'transition-colors',
              error && 'border-red-500 focus:ring-red-500'
            )}
          />
          {error && (
            <p className="text-caption text-red-500">{error}</p>
          )}
        </div>

        {/* Calorie goal slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="calorie-goal" className="text-body font-medium text-foreground">
              Daily calorie goal
            </label>
            <span className="text-body font-medium text-primary">
              {dailyKcal} kcal
            </span>
          </div>

          <input
            id="calorie-goal"
            type="range"
            min={MIN_CALORIES}
            max={MAX_CALORIES}
            step={50}
            value={dailyKcal}
            onChange={(e) => setDailyKcal(Number(e.target.value))}
            disabled={isLoading}
            className={cn(
              'w-full h-2 rounded-full appearance-none cursor-pointer',
              'bg-border',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
              '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
              '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
              '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary',
              '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'
            )}
          />

          <div className="flex justify-between text-caption text-foreground-muted">
            <span>{MIN_CALORIES}</span>
            <span>{MAX_CALORIES}</span>
          </div>
        </div>

        {/* Quick presets */}
        <div className="space-y-2">
          <p className="text-caption text-foreground-muted">Quick presets</p>
          <div className="flex gap-2">
            {[1500, 1800, 2000, 2500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDailyKcal(preset)}
                disabled={isLoading}
                className={cn(
                  'flex-1 py-2 rounded-pill text-caption font-medium',
                  'border transition-colors',
                  dailyKcal === preset
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background-card text-foreground border-border hover:border-primary'
                )}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={cn(
            'w-full py-4 rounded-pill mt-4',
            'bg-primary text-primary-foreground',
            'text-body font-medium',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'transition-opacity',
            (!isValid || isLoading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? 'Adding...' : 'Add Partner'}
        </button>
      </main>
    </div>
  )
}
