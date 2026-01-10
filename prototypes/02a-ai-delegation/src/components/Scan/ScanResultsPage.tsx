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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'text-body font-medium text-foreground',
              'px-3 py-2 -my-2 -ml-3 rounded-pill',
              'hover:bg-border/50 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring'
            )}
          >
            Cancel
          </button>

          <h1 className="text-title text-foreground">
            Results
          </h1>

          <div className="w-[72px]" />
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {!isDone ? (
          <section className="space-y-4">
            <div>
              <p className="text-body text-foreground">Analyzing photo...</p>
              <p className="text-caption text-foreground-muted mt-1">
                {progress}%
              </p>
            </div>

            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              onClick={onManual}
              className={cn(
                'w-full py-3 rounded-pill',
                'bg-background-card border border-border text-foreground',
                'text-body font-medium'
              )}
            >
              Use manual entry
            </button>
          </section>
        ) : (
          <section className="space-y-4">
            {/* Summary header */}
            <div className="flex items-center justify-between">
              <p className="text-body text-foreground">
                Found {detectedItems.length} item{detectedItems.length !== 1 ? 's' : ''}
              </p>
              <p className="text-body font-medium text-primary">
                {totalCalories} kcal
              </p>
            </div>

            {/* Detected items list */}
            <div className="space-y-2">
              {detectedItems.map((item, index) => {
                const level = getConfidenceLevel(item.confidence)
                const badge = getConfidenceBadge(level)
                const portionKcal = item.food.portions[item.portion].kcal

                return (
                  <div
                    key={`${item.food.id}-${index}`}
                    className={cn(
                      'bg-background-card border rounded-card p-4',
                      'transition-colors',
                      item.selected ? 'border-primary' : 'border-border'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        className={cn(
                          'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                          'transition-colors',
                          item.selected
                            ? 'bg-primary border-primary'
                            : 'bg-transparent border-border'
                        )}
                      >
                        {item.selected && (
                          <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            'text-body font-medium truncate',
                            item.selected ? 'text-foreground' : 'text-foreground-muted'
                          )}>
                            {item.food.name_vi}
                          </p>
                          <span className={cn(
                            'text-caption px-2 py-0.5 rounded-full border flex-shrink-0',
                            badge.color
                          )}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-caption text-foreground-muted mt-1">
                          Portion {item.portion} · {portionKcal} kcal
                        </p>
                      </div>

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => onEditItem(item, index)}
                        className={cn(
                          'p-2 -m-2 rounded-full',
                          'text-foreground-muted hover:text-foreground',
                          'hover:bg-border/50 transition-colors'
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

            {/* Action buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={selectedCount === 0}
                className={cn(
                  'w-full py-4 rounded-pill',
                  'bg-primary text-primary-foreground',
                  'text-body font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  selectedCount === 0 && 'opacity-50 cursor-not-allowed'
                )}
              >
                Log {selectedCount} item{selectedCount !== 1 ? 's' : ''} ({totalCalories} kcal)
              </button>

              <button
                type="button"
                onClick={onManual}
                className={cn(
                  'w-full py-3 rounded-pill',
                  'bg-background-card border border-border text-foreground',
                  'text-body font-medium'
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
