/**
 * CaloriesScreen - Onboarding step 4/4
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { GOAL_OPTIONS } from '@/auth/constants'
import type { GoalType } from '@/types'

export function CaloriesScreen() {
  const navigate = useNavigate()
  const { updateUser, updateProfile } = useAuthContext()

  const storedCalories = sessionStorage.getItem('onboarding_calories')
  const [calories, setCalories] = useState(parseInt(storedCalories || '2000'))

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(parseInt(e.target.value))
  }

  const percentage = ((calories - 1200) / (3000 - 1200)) * 100

  const handleComplete = async () => {
    const name = sessionStorage.getItem('onboarding_name') || ''
    const goalKey = (sessionStorage.getItem('onboarding_goal') || 'healthy') as GoalType
    const goal = GOAL_OPTIONS.find((g) => g.key === goalKey)!

    // Update user with name (saves to database)
    await updateUser({
      name,
      avatar: name[0]?.toUpperCase() || '👤',
    })

    // Create profile (saves to database)
    await updateProfile({
      dailyCalories: calories,
      goal: goalKey,
      goalIcon: goal.icon,
      goalText: goal.title,
    })

    // Clear onboarding data
    sessionStorage.removeItem('onboarding_name')
    sessionStorage.removeItem('onboarding_goal')
    sessionStorage.removeItem('onboarding_calories')

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      {/* DLS: Flat card - no shadow */}
      <div className="w-full max-w-[440px] bg-white rounded-xl p-12">
        {/* DLS: Progress dots - solid colors */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-6 h-2 rounded-full bg-primary"></div>
        </div>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mục tiêu hàng ngày</h1>
          <p className="text-gray-500">Điều chỉnh lượng calo phù hợp với bạn</p>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-1">{calories}</div>
          <div className="text-gray-500">kcal / ngày</div>
        </div>

        {/* DLS: Flat slider - solid color, no shadow */}
        <div className="mb-8">
          <div className="relative mb-3">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-200 pointer-events-none"
                style={{ width: `${percentage}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-[3px] border-primary rounded-full pointer-events-none"
                style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <input
              type="range"
              min="1200"
              max="3000"
              value={calories}
              onChange={handleSliderChange}
              className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>1200</span>
            <span>2100</span>
            <span>3000</span>
          </div>
        </div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          onClick={handleComplete}
          className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Hoàn thành
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
