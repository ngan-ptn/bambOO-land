import { useEffect, useMemo, useState, useCallback } from 'react'
import foodsData from '@/data/foods.json'
import type { FoodItem } from '@/types'
import { cn } from '@/lib/utils'
import { getScanProgressPercent, pickSimulatedScanFood } from '@/lib/scanSim'

interface ScanResultsPageProps {
  photoId: string
  onCancel: () => void
  onManual: () => void
  onConfirm: (food: FoodItem) => void
  onEditPortion: (food: FoodItem) => void
}

const ANALYSIS_TOTAL_MS = 2500
const ANALYSIS_TICK_MS = 100

export function ScanResultsPage({ photoId, onCancel, onManual, onConfirm, onEditPortion }: ScanResultsPageProps) {
  const foods = foodsData.foods as FoodItem[]

  const [elapsedMs, setElapsedMs] = useState(0)
  const [isDone, setIsDone] = useState(false)

  const progress = useMemo(() => {
    return getScanProgressPercent({ elapsedMs, totalMs: ANALYSIS_TOTAL_MS })
  }, [elapsedMs])

  useEffect(() => {
    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      if (elapsed >= ANALYSIS_TOTAL_MS) {
        setElapsedMs(ANALYSIS_TOTAL_MS)
        setIsDone(true)
        window.clearInterval(timer)
        return
      }
      setElapsedMs(elapsed)
    }, ANALYSIS_TICK_MS)

    return () => window.clearInterval(timer)
  }, [photoId])

  const candidateFood = useMemo(() => {
    if (foods.length === 0) return null
    return pickSimulatedScanFood(foods)
  }, [foods])

  const handleConfirm = useCallback(() => {
    if (!candidateFood) return
    onConfirm(candidateFood)
  }, [candidateFood, onConfirm])

  const handleEditPortion = useCallback(() => {
    if (!candidateFood) return
    onEditPortion(candidateFood)
  }, [candidateFood, onEditPortion])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white border-b-2 border-gray-200">
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
                'bg-white border border-border text-foreground',
                'text-body font-medium'
              )}
            >
              Use manual entry
            </button>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-caption text-foreground-muted">Detected food</p>
              <p className="text-title text-foreground mt-1">
                {candidateFood?.name_vi ?? 'Unknown'}
              </p>
              <p className="text-caption text-foreground-muted mt-1">
                Default portion. M
              </p>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!candidateFood}
              className={cn(
                'w-full py-4 rounded-pill',
                'bg-primary text-primary-foreground',
                'text-body font-medium',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                !candidateFood && 'opacity-50 cursor-not-allowed'
              )}
            >
              Tap to log
            </button>

            <button
              type="button"
              onClick={handleEditPortion}
              disabled={!candidateFood}
              className={cn(
                'w-full py-3 rounded-pill',
                'bg-white border border-border text-foreground',
                'text-body font-medium',
                !candidateFood && 'opacity-50 cursor-not-allowed'
              )}
            >
              Edit portion
            </button>

            <button
              type="button"
              onClick={onManual}
              className={cn(
                'w-full py-3 rounded-pill',
                'bg-white border border-border text-foreground',
                'text-body font-medium'
              )}
            >
              Not correct. Use manual entry
            </button>
          </section>
        )}
      </main>
    </div>
  )
}
