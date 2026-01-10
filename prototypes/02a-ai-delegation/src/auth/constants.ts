/**
 * Auth constants: localStorage keys and goal configurations
 */

import type { GoalOption } from '@/types'

export const AUTH_STORAGE_KEYS = {
  USER: 'calo_user',
  SESSION: 'calo_session',
  PROFILE: 'calo_profile',
  USER_ID: 'calo_user_id',
} as const

export const GOAL_OPTIONS: GoalOption[] = [
  {
    key: 'lose',
    icon: '🔥',
    title: 'Giảm cân',
    description: 'Giảm calo để đạt cân nặng lý tưởng',
    suggestedCalories: 1600,
  },
  {
    key: 'healthy',
    icon: '🥗',
    title: 'Ăn lành mạnh hơn',
    description: 'Theo dõi để ăn uống cân bằng',
    suggestedCalories: 2000,
  },
  {
    key: 'maintain',
    icon: '⚖️',
    title: 'Duy trì cân nặng',
    description: 'Giữ cân nặng ổn định',
    suggestedCalories: 2000,
  },
  {
    key: 'muscle',
    icon: '💪',
    title: 'Tăng cơ',
    description: 'Tăng calo và protein',
    suggestedCalories: 2400,
  },
]

export const PASSWORD_MIN_LENGTH = 8
