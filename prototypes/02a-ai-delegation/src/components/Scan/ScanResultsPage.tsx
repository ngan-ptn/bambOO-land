import { useEffect, useMemo, useState, useCallback } from 'react'
import foodsData from '@/data/foods.json'
import type { FoodItem, PortionSize } from '@/types'
import { cn } from '@/lib/utils'
import {
  getScanProgressPercent,
  simulateMultiFoodDetection,
  getConfidenceLevel,
  getConfidenceBadge,
  calculateTotalCalories,
  type DetectedFood,
} from '@/lib/scanSim'

interface ScanResultsPageProps {
  photoId: string
  onCancel: () => void
  onManual: () => void
  onConfirmMultiple: (items: Array<{ food: FoodItem; portion: PortionSize }>) => void
  onEditItem: (item: DetectedFood, index: number) => void
}

const ANALYSIS_TOTAL_MS = 2500
const ANALYSIS_TICK_MS = 100

export function ScanResultsPage({ photoId, onCancel, onManual, onConfirmMultiple, onEditItem }: ScanResultsPageProps) {
  const foods = foodsData.foods as FoodItem[]

  const [elapsedMs, setElapsedMs] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [detectedItems, setDetectedItems] = useState<DetectedFood[]>([])

  const progress = useMemo(() => {
    return getScanProgressPercent({ elapsedMs, totalMs: ANALYSIS_TOTAL_MS })
  }, [elapsedMs])

  // Run detection once analysis completes
  useEffect(() => {
    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      if (elapsed >= ANALYSIS_TOTAL_MS) {
        setElapsedMs(ANALYSIS_TOTAL_MS)
        setIsDone(true)
        // Simulate multi-food detection
        const detected = simulateMultiFoodDetection(foods)
        setDetectedItems(detected)
        window.clearInterval(timer)
        return
      }
      setElapsedMs(elapsed)
    }, ANALYSIS_TICK_MS)

    return () => window.clearInterval(timer)
  }, [photoId, foods])

  const totalCalories = useMemo(() => {
    return calculateTotalCalories(detectedItems)
  }, [detectedItems])

  const selectedCount = useMemo(() => {
    return detectedItems.filter(item => item.selected).length
  }, [detectedItems])

  const toggleItem = useCallback((index: number) => {
    setDetectedItems(prev => prev.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    ))
  }, [])

  const handleConfirm = useCallback(() => {
    const selectedItems = detectedItems
      .filter(item => item.selected)
      .map(item => ({ food: item.food, portion: item.portion }))
    if (selectedItems.length > 0) {
      onConfirmMultiple(selectedItems)
    }
  }, [detectedItems, onConfirmMultiple])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DLS: Header - flat, no shadow */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'text-sm font-medium text-gray-900',
              'px-3 py-2 -my-2 -ml-3 rounded-lg',
              'hover:bg-gray-100 hover:scale-105 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
          >
            Cancel
          </button>

          <h1 className="text-lg font-bold text-gray-900">
            Results
          </h1>

          <div className="w-[72px]" />
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {!isDone ? (
          <section className="space-y-4">
            <div>
              <p className="text-sm text-gray-900">Analyzing photo...</p>
              <p className="text-xs text-gray-500 mt-1">
                {progress}%
              </p>
            </div>

            {/* DLS: Progress bar - solid color */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* DLS: Secondary button */}
            <button
              type="button"
              onClick={onManual}
              className={cn(
                'w-full py-3 rounded-lg',
                'bg-white text-gray-900',
                'text-sm font-medium',
                'hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200'
              )}
            >
              Use manual entry
            </button>
          </section>
        ) : (
          <section className="space-y-4">
            {/* Summary header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-900">
                Found {detectedItems.length} item{detectedItems.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm font-semibold text-primary">
                {totalCalories} kcal
              </p>
            </div>

            {/* DLS: Detected items list - flat cards */}
            <div className="space-y-2">
              {detectedItems.map((item, index) => {
                const level = getConfidenceLevel(item.confidence)
                const badge = getConfidenceBadge(level)
                const portionKcal = item.food.portions[item.portion].kcal

                return (
                  <div
                    key={`${item.food.id}-${index}`}
                    className={cn(
                      'bg-white rounded-lg p-4',
                      'transition-all duration-200',
                      item.selected ? 'ring-2 ring-primary' : ''
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* DLS: Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        className={cn(
                          'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                          'transition-all duration-200',
                          item.selected
                            ? 'bg-primary border-primary'
                            : 'bg-transparent border-gray-300'
                        )}
                      >
                        {item.selected && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            'text-sm font-medium truncate',
                            item.selected ? 'text-gray-900' : 'text-gray-500'
                          )}>
                            {item.food.name_vi}
                          </p>
                          <span className={cn(
                            'text-xs px-2 py-0.5 rounded-full border flex-shrink-0',
                            badge.color
                          )}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Portion {item.portion} · {portionKcal} kcal
                        </p>
                      </div>

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => onEditItem(item, index)}
                        className={cn(
                          'p-2 -m-2 rounded-full',
                          'text-gray-400 hover:text-gray-900',
                          'hover:bg-gray-100 hover:scale-110 transition-all duration-200'
                        )}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M11.5 2.5L13.5 4.5M2 14L2.5 11.5L12 2L14 4L4.5 13.5L2 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* DLS: Action buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={selectedCount === 0}
                className={cn(
                  'w-full h-14 rounded-lg',
                  'bg-primary text-white',
                  'text-sm font-semibold',
                  'hover:bg-primary-dark hover:scale-105 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  selectedCount === 0 && 'opacity-50 cursor-not-allowed hover:scale-100'
                )}
              >
                Log {selectedCount} item{selectedCount !== 1 ? 's' : ''} ({totalCalories} kcal)
              </button>

              <button
                type="button"
                onClick={onManual}
                className={cn(
                  'w-full py-3 rounded-lg',
                  'bg-white text-gray-900',
                  'text-sm font-medium',
                  'hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200'
                )}
              >
                Add more items manually
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
