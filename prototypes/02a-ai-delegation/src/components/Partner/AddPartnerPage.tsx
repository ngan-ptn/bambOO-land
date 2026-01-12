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
    <div className="min-h-screen bg-gray-50">
      {/* DLS: Header - flat, no shadow */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={cn(
              'text-sm font-medium text-gray-900',
              'px-3 py-2 -my-2 -ml-3 rounded-lg',
              'hover:bg-gray-100 hover:scale-105 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            Cancel
          </button>

          <h1 className="text-lg font-bold text-gray-900">Add Partner</h1>

          <div className="w-[72px]" />
        </div>
      </header>

      {/* Form */}
      <main className="px-5 py-6 space-y-6">
        {/* DLS: Info card - flat, no shadow */}
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-900">
            Add your partner to log meals for both of you at once.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            You can switch profiles anytime from the header.
          </p>
        </div>

        {/* DLS: Name input - gray bg, no border */}
        <div className="space-y-2">
          <label htmlFor="partner-name" className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
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
              'w-full h-14 px-5 rounded-lg',
              'bg-gray-100 text-gray-900 placeholder:text-gray-500',
              'focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary',
              'transition-all duration-200',
              error && 'ring-2 ring-error bg-error/5'
            )}
          />
          {error && (
            <p className="text-xs text-error">{error}</p>
          )}
        </div>

        {/* DLS: Calorie goal slider - flat */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="calorie-goal" className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Daily calorie goal
            </label>
            <span className="text-sm font-bold text-primary">
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
              'bg-gray-200',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6',
              '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
              '[&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6',
              '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary',
              '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'
            )}
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>{MIN_CALORIES}</span>
            <span>{MAX_CALORIES}</span>
          </div>
        </div>

        {/* DLS: Quick presets - scale on hover */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Quick presets</p>
          <div className="flex gap-2">
            {[1500, 1800, 2000, 2500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDailyKcal(preset)}
                disabled={isLoading}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-medium',
                  'transition-all duration-200 hover:scale-105',
                  dailyKcal === preset
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                )}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* DLS: Submit button - solid bg, scale on hover */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={cn(
            'w-full h-14 rounded-lg mt-4',
            'bg-primary text-white',
            'text-sm font-semibold',
            'hover:bg-primary-dark hover:scale-105',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'transition-all duration-200',
            (!isValid || isLoading) && 'opacity-50 cursor-not-allowed hover:scale-100'
          )}
        >
          {isLoading ? 'Adding...' : 'Add Partner'}
        </button>
      </main>
    </div>
  )
}
