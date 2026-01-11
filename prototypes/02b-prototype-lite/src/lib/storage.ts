/**
 * localStorage utilities for migration support.
 * Used only by migrate-localStorage.ts to read legacy data.
 *
 * Note: Full localStorage implementation moved to legacy-calo-tracker/deprecated-lib/storage.ts
 */

// localStorage keys - prefixed to avoid collisions with other apps
export const STORAGE_KEYS = {
  LOGS: 'calo_logs',
  RECENT: 'calo_recent',
  GOALS: 'calo_goals',
} as const

/**
 * Safely reads and parses data from localStorage.
 * Returns null if key doesn't exist or data is corrupted.
 */
export function readFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch {
    return null
  }
}
