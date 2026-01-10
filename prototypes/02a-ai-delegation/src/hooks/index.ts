/**
 * Public exports for hooks module.
 * Import from '@/hooks' instead of individual files.
 */

// Authentication hooks
export { useAuth } from './useAuth'

// Partner/multi-user hooks
export { usePartner } from './usePartner'
export type { UsePartnerReturn } from './usePartner'

// Database-backed hooks
export { useDatabaseStorage } from './useDatabaseStorage'
export { useDatabase } from './useDatabase'
export { useFavorites } from './useFavorites'
export { useSuggestions } from './useSuggestions'
export { useTimeline } from './useTimeline'
export { useTemplates } from './useTemplates'
export { useFoodSearch } from './useFoodSearch'
export type { SearchResultItem, SearchResults } from './useFoodSearch'
export { useDatabaseContext } from '../contexts/useDatabaseContext'
