import type { FoodItem } from '@/types'

export interface ScanSimFood {
  id: string
  name_vi: string
}

export interface DetectedFood {
  food: FoodItem
  confidence: number // 0-1
  selected: boolean
  portion: 'S' | 'M' | 'L'
}

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.8) return 'high'
  if (confidence >= 0.6) return 'medium'
  return 'low'
}

export function getConfidenceBadge(level: ConfidenceLevel): { label: string; color: string } {
  switch (level) {
    case 'high':
      return { label: 'Sure', color: 'bg-green-100 text-green-700 border-green-200' }
    case 'medium':
      return { label: 'Likely', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
    case 'low':
      return { label: 'Not sure', color: 'bg-red-100 text-red-700 border-red-200' }
  }
}

/**
 * Simulates AI detection returning multiple foods with confidence scores.
 * Returns 1-4 random foods from the database.
 */
export function simulateMultiFoodDetection(foods: FoodItem[]): DetectedFood[] {
  if (foods.length === 0) return []

  // Shuffle and pick 1-4 foods
  const shuffled = [...foods].sort(() => Math.random() - 0.5)
  const count = Math.min(Math.floor(Math.random() * 4) + 1, foods.length)
  const selected = shuffled.slice(0, count)

  return selected.map((food, index) => ({
    food,
    // First item has higher confidence, rest are random
    confidence: index === 0
      ? 0.85 + Math.random() * 0.15 // 0.85-1.0
      : 0.4 + Math.random() * 0.5,   // 0.4-0.9
    selected: true,
    portion: 'M' as const,
  }))
}

// Legacy function for backwards compatibility
export function pickSimulatedScanFood<T extends ScanSimFood>(foods: T[]): T | undefined {
  if (foods.length === 0) return undefined
  const preferred = foods.find((f) => f.id === 'pho-bo-tai')
  return preferred ?? foods[0]
}

export function getScanProgressPercent(input: { elapsedMs: number; totalMs: number }): number {
  const { elapsedMs, totalMs } = input
  if (totalMs <= 0) return 100
  if (elapsedMs <= 0) return 0

  const raw = Math.floor((elapsedMs / totalMs) * 100)
  if (raw <= 0) return 0
  if (raw >= 100) return 100
  return raw
}

/**
 * Calculate total calories for selected items
 */
export function calculateTotalCalories(items: DetectedFood[]): number {
  return items
    .filter(item => item.selected)
    .reduce((total, item) => {
      const portionKey = `kcal${item.portion}` as 'kcalS' | 'kcalM' | 'kcalL'
      return total + (item.food[portionKey] || item.food.kcalM || 0)
    }, 0)
}
