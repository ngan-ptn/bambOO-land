export interface ScanSimFood {
  id: string
  name_vi: string
}

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

