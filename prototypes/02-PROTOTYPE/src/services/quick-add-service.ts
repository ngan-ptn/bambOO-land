/**
 * Quick-add service - centralises business logic for logging foods from the UI.
 * This wraps the lower-level DB repositories so components do not need to know
 * about caps, retention logic, or how summaries are updated.
 */

import { createLog } from '../db/repositories/log-repository'
import { createCustomFood, getCustomFoodsByUser } from '../db/repositories/food-repository'
import type { FoodItem, PortionSize } from '../types'
import type { FoodLog } from '../db/types'

/**
 * Result codes for quick-add operations.
 * These codes let the UI render consistent toasts and behaviours across
 * different entry points (tiles, favourites, search results).
 */
export type QuickAddResultCode =
  | 'OK'
  | 'DAILY_LIMIT_REACHED'
  | 'RETENTION_VIOLATION'
  | 'MISSING_FOOD'

export interface QuickAddResult {
  status: 'ok' | 'error'
  code: QuickAddResultCode
  log: FoodLog | null
}

export interface QuickAddContext {
  /** Active user id; required for all logging. */
  userId: string
}

export interface LogFoodFromSearchArgs extends QuickAddContext {
  food: FoodItem
  portion: PortionSize
}

export interface LogFoodFromFavoriteArgs extends QuickAddContext {
  food: FoodItem
  defaultPortion: PortionSize
}

export interface LogManualEntryArgs extends QuickAddContext {
  name: string
  kcal: number
  protein?: number
  carbs?: number
  fat?: number
}

/**
 * Internal helper to build a QuickAddResult.
 */
function buildResult(
  status: QuickAddResult['status'],
  code: QuickAddResultCode,
  log: FoodLog | null
): QuickAddResult {
  return { status, code, log }
}

/**
 * Shared implementation for logging a single food item.
 * At this stage, date selection is always "today" and enforced by createLog.
 * In the future, this can be extended to use a selected date without changing
 * UI components.
 */
async function logSingleFood(
  args: QuickAddContext & { food: FoodItem; portion: PortionSize }
): Promise<QuickAddResult> {
  const { userId, food, portion } = args

  // Guard: ensure we have a valid food reference before touching the DB.
  if (!food || !food.id) {
    return buildResult('error', 'MISSING_FOOD', null)
  }

  const nutrition = food.portions[portion]

  // Delegate to repository, which already enforces DB_LIMITS for logs per day.
  const log = await createLog({
    userId,
    foodType: 'system',
    foodId: food.id,
    portion,
    nameSnapshot: food.name_vi,
    kcal: nutrition.kcal,
    protein: nutrition.protein,
    fat: nutrition.fat,
    carbs: nutrition.carbs,
  })

  // createLog returns null when the daily limit is reached.
  if (!log) {
    return buildResult('error', 'DAILY_LIMIT_REACHED', null)
  }

  // NOTE: retention is enforced by repository-level pruning; since createLog
  // only ever logs for "today", RETENTION_VIOLATION is not expected here yet.
  return buildResult('ok', 'OK', log)
}

/**
 * Log a food selected from search or general tiles.
 * UI passes the concrete FoodItem and chosen portion.
 */
export async function logFoodFromSearch(
  args: LogFoodFromSearchArgs
): Promise<QuickAddResult> {
  return logSingleFood({ userId: args.userId, food: args.food, portion: args.portion })
}

/**
 * Log a food from favourites using its default portion.
 * This is used by quick-log affordances on favourite items.
 */
export async function logFoodFromFavorite(
  args: LogFoodFromFavoriteArgs
): Promise<QuickAddResult> {
  return logSingleFood({
    userId: args.userId,
    food: args.food,
    portion: args.defaultPortion,
  })
}

/**
 * Normalizes a food name for deduplication (lowercase, trimmed).
 */
function normalizeFoodName(name: string): string {
  return name.trim().toLowerCase()
}

/**
 * Finds an existing custom food by normalized name for a user.
 * Returns the first match if found, null otherwise.
 */
async function findExistingCustomFood(
  userId: string,
  normalizedName: string
): Promise<{ id: string; name: string } | null> {
  const customFoods = await getCustomFoodsByUser(userId)
  const match = customFoods.find(
    (food) => normalizeFoodName(food.name) === normalizedName
  )
  return match ? { id: match.id, name: match.name } : null
}

/**
 * Logs a manual entry by creating or reusing a custom food and logging it.
 * This promotes manual entries to reusable custom foods so users can favourite
 * and reuse them later.
 */
export async function logManualEntry(
  args: LogManualEntryArgs
): Promise<QuickAddResult> {
  const { userId, name, kcal, protein, carbs, fat } = args

  // Normalize name for deduplication
  const normalizedName = normalizeFoodName(name)

  // Check if a custom food with this name already exists
  let customFoodId: string
  let customFoodName: string

  const existing = await findExistingCustomFood(userId, normalizedName)
  if (existing) {
    // Reuse existing custom food
    customFoodId = existing.id
    customFoodName = existing.name
  } else {
    // Create new custom food
    const customFood = await createCustomFood(userId, {
      name: name.trim(),
      kcal,
      protein: protein ?? 0,
      fat: fat ?? 0,
      carbs: carbs ?? 0,
    })

    if (!customFood) {
      // User has reached custom food limit
      return buildResult('error', 'DAILY_LIMIT_REACHED', null)
    }

    customFoodId = customFood.id
    customFoodName = customFood.name
  }

  // Log the custom food (always uses 'single' portion for custom foods)
  const log = await createLog({
    userId,
    foodType: 'custom',
    foodId: customFoodId,
    portion: 'single',
    nameSnapshot: customFoodName,
    kcal,
    protein: protein ?? 0,
    fat: fat ?? 0,
    carbs: carbs ?? 0,
  })

  if (!log) {
    return buildResult('error', 'DAILY_LIMIT_REACHED', null)
  }

  return buildResult('ok', 'OK', log)
}

