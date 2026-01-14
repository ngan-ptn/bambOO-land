/**
 * FoodTileGrid - Main grid display for food selection.
 * Shows Recent Items section (max 8) at top, followed by category-grouped foods.
 * Supports search, filtering by tabs (all/recent/fav), and manual entry fallback.
 * Uses 2-column grid layout optimized for mobile.
 */

import { useMemo } from 'react'
import { FoodTile } from './FoodTile'
import { getCategoryEmoji } from '@/lib/food-emoji'
import { filterFoods } from '@/lib/foodSearch'
import type { FoodItem, RecentItem, FoodCategory } from '@/types'

interface FoodTileGridProps {
  allFoods: FoodItem[]
  recentItems: RecentItem[]
  onSelectFood: (food: FoodItem) => void
  disabledFoodId?: string | null
  query?: string
  filterTab?: 'all' | 'recent' | 'fav'
  onManualEntry?: () => void
  // Optional: provide search results from useFoodSearch for better grouping
  searchResults?: {
    favourites: Array<{ food: FoodItem }>
    recentlyLogged: Array<{ food: FoodItem }>
    allFoods: Array<{ food: FoodItem }>
  }
}

// Category display order with English labels.
// Emojis are sourced from the shared food-emoji config so filters
// always mirror the same visuals as cards and tiles.
const CATEGORY_ORDER: { id: FoodCategory; label: string }[] = [
  { id: 'noodles', label: 'Noodles' },
  { id: 'rice', label: 'Rice' },
  { id: 'banh_mi', label: 'Banh Mi' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'clean_eating', label: 'Clean Eating' },
]

export function FoodTileGrid({
  allFoods,
  recentItems,
  onSelectFood,
  disabledFoodId,
  query = '',
  filterTab = 'all',
  onManualEntry,
  searchResults,
}: FoodTileGridProps) {
  // Map food IDs to food objects for quick lookup
  const foodMap = useMemo(() => {
    return new Map(allFoods.map((food) => [food.id, food]))
  }, [allFoods])

  // Resolve recent items to full food objects (filter out any stale references)
  const recentFoods = useMemo(() => {
    return recentItems
      .map((item) => foodMap.get(item.foodId))
      .filter((food): food is FoodItem => food !== undefined)
  }, [recentItems, foodMap])

  const normalizedQuery = query.trim()

  // Use search results if provided (from useFoodSearch), otherwise fall back to local filtering
  const filteredAllFoods = useMemo(() => {
    if (searchResults && normalizedQuery) {
      // Combine all search result groups
      return [
        ...searchResults.favourites.map((r) => r.food),
        ...searchResults.recentlyLogged.map((r) => r.food),
        ...searchResults.allFoods.map((r) => r.food),
      ]
    }
    return filterFoods({ foods: allFoods, query: normalizedQuery })
  }, [allFoods, normalizedQuery, searchResults])

  const filteredRecentFoods = useMemo(() => {
    if (searchResults && normalizedQuery) {
      return searchResults.recentlyLogged.map((r) => r.food)
    }
    return filterFoods({ foods: recentFoods, query: normalizedQuery })
  }, [recentFoods, normalizedQuery, searchResults])

  const showFlatResults = filterTab !== 'fav' && normalizedQuery.length > 0

  // Group foods by category for organized display
  const foodsByCategory = useMemo(() => {
    const grouped = new Map<string, FoodItem[]>()
    
    CATEGORY_ORDER.forEach(({ id }) => {
      grouped.set(id, [])
    })
    
    filteredAllFoods.forEach((food) => {
      const categoryFoods = grouped.get(food.category)
      if (categoryFoods) {
        categoryFoods.push(food)
      }
    })
    
    return grouped
  }, [filteredAllFoods])

  // Favorites tab placeholder (not yet implemented)
  if (filterTab === 'fav') {
    return (
      <div className="bg-white border border-border rounded-lg p-4">
        <p className="text-body text-foreground">Favorites not implemented.</p>
        <p className="text-caption text-foreground-muted mt-1">
          Implement CR02-03 to enable this tab.
        </p>
      </div>
    )
  }

  const foodsToRender = filterTab === 'recent' ? filteredRecentFoods : filteredAllFoods

  // Show flat search results when query is active
  if (showFlatResults) {
    if (foodsToRender.length === 0) {
      return (
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-body text-foreground">No results.</p>
          {onManualEntry ? (
            <button
              type="button"
              onClick={onManualEntry}
              className="mt-3 px-3 py-2 rounded-pill bg-primary text-primary-foreground text-caption font-medium"
            >
              Manual entry
            </button>
          ) : (
            <p className="text-caption text-foreground-muted mt-1">
              Manual entry not available.
            </p>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-6 pb-24">
        <section>
          <h2 className="text-title text-foreground mb-3 px-1">
            Results
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {foodsToRender.map((food) => (
              <FoodTile
                key={food.id}
                food={food}
                onSelect={onSelectFood}
                disabled={food.id === disabledFoodId}
              />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Recent Items Section - only show if user has logged foods before */}
      {filterTab === 'all' && recentFoods.length > 0 && (
        <section>
          <h2 className="text-title text-foreground mb-3 px-1">
            Recent
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {recentFoods.map((food) => (
              <FoodTile
                key={`recent-${food.id}`}
                food={food}
                onSelect={onSelectFood}
                disabled={food.id === disabledFoodId}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent tab: show only recent items with search filtering */}
      {filterTab === 'recent' && (
        <section>
          <h2 className="text-title text-foreground mb-3 px-1">
            Recent
          </h2>
          {filteredRecentFoods.length === 0 ? (
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-body text-foreground">No recent items yet.</p>
              <p className="text-caption text-foreground-muted mt-1">
                Log a food once to see it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredRecentFoods.map((food) => (
                <FoodTile
                  key={`recent-only-${food.id}`}
                  food={food}
                  onSelect={onSelectFood}
                  disabled={food.id === disabledFoodId}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Category-grouped Food Grid */}
      {CATEGORY_ORDER.map(({ id, label }) => {
        const foods = foodsByCategory.get(id) || []
        if (foods.length === 0) return null

        const emoji = getCategoryEmoji(id)

        return (
          <section key={id}>
            <h2 className="text-title text-foreground mb-3 px-1">
              {emoji} {label}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {foods.map((food) => (
                <FoodTile
                  key={food.id}
                  food={food}
                  onSelect={onSelectFood}
                  disabled={food.id === disabledFoodId}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
