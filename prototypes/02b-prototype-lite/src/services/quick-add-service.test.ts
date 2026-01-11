/**
 * Tests for quick-add service.
 * These verify that domain-level logging behaviour (caps and errors)
 * is correctly surfaced to the UI via QuickAddResult.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { initDatabase, seedSystemFoods, createUser } from '@/db'
import { createLog } from '@/db/repositories/log-repository'
import { DB_LIMITS } from '@/db'
import { logFoodFromSearch } from '@/services/quick-add-service'
import type { FoodItem } from '@/types'
import { getSystemFoodById } from '@/db/repositories/food-repository'

async function setupUserAndFood() {
  await initDatabase()
  await seedSystemFoods()
  const user = await createUser('Test User')
  if (!user) throw new Error('Failed to create user')

  const systemFood = await getSystemFoodById('pho-bo-tai')
  if (!systemFood) throw new Error('Test food not found')

  const food: FoodItem = {
    id: systemFood.id,
    name_vi: systemFood.nameVi,
    name_en: systemFood.nameEn,
    category: systemFood.category as any,
    serving: systemFood.servingDescription ?? '',
    confidence: systemFood.confidence,
    portions: {
      S: { kcal: systemFood.kcalS, protein: systemFood.proteinS, fat: systemFood.fatS, carbs: systemFood.carbsS },
      M: { kcal: systemFood.kcalM, protein: systemFood.proteinM, fat: systemFood.fatM, carbs: systemFood.carbsM },
      L: { kcal: systemFood.kcalL, protein: systemFood.proteinL, fat: systemFood.fatL, carbs: systemFood.carbsL },
    },
  }

  return { userId: user.id, food }
}

describe('quick-add-service', () => {
  beforeEach(async () => {
    // Each test gets a fresh DB.
    await initDatabase()
    await seedSystemFoods()
  })

  it('logs a food successfully when under daily limit', async () => {
    const { userId, food } = await setupUserAndFood()

    const result = await logFoodFromSearch({
      userId,
      food,
      portion: 'M',
    })

    expect(result.status).toBe('ok')
    expect(result.code).toBe('OK')
    expect(result.log).not.toBeNull()
    if (result.log) {
      expect(result.log.userId).toBe(userId)
      expect(result.log.foodId).toBe(food.id)
      expect(result.log.portion).toBe('M')
    }
  })

  it('returns DAILY_LIMIT_REACHED when daily cap is hit', async () => {
    const { userId, food } = await setupUserAndFood()

    // Pre-fill logs to the daily cap using repository-level createLog.
    for (let i = 0; i < DB_LIMITS.MAX_LOGS_PER_DAY; i++) {
      await createLog({
        userId,
        foodType: 'system',
        foodId: food.id,
        portion: 'M',
        nameSnapshot: food.name_vi,
        kcal: food.portions.M.kcal,
        protein: food.portions.M.protein,
        fat: food.portions.M.fat,
        carbs: food.portions.M.carbs,
      })
    }

    const result = await logFoodFromSearch({
      userId,
      food,
      portion: 'M',
    })

    expect(result.status).toBe('error')
    expect(result.code).toBe('DAILY_LIMIT_REACHED')
    expect(result.log).toBeNull()
  })
})

