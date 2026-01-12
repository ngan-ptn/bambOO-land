/**
 * GoalScreen - Onboarding step 3/4
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GOAL_OPTIONS } from '@/auth/constants'
import type { GoalType } from '@/types'

export function GoalScreen() {
  const navigate = useNavigate()
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('healthy')

  const handleContinue = () => {
    sessionStorage.setItem('onboarding_goal', selectedGoal)
    const goal = GOAL_OPTIONS.find((g) => g.key === selectedGoal)!
    sessionStorage.setItem('onboarding_calories', goal.suggestedCalories.toString())
    navigate('/onboarding/calories')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      {/* DLS: Flat card - no shadow */}
      <div className="w-full max-w-[440px] bg-white rounded-xl p-12">
        {/* DLS: Progress dots - solid colors */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mục tiêu của bạn?</h1>
          <p className="text-gray-500">Chọn mục tiêu phù hợp nhất với bạn</p>
        </div>

        {/* DLS: Flat selection cards - solid bg, scale on hover */}
        <div className="space-y-3 mb-8">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal.key}
              onClick={() => setSelectedGoal(goal.key)}
              className={`w-full p-5 rounded-lg transition-all duration-200 flex items-center gap-4 hover:scale-[1.01] ${
                selectedGoal === goal.key
                  ? 'bg-primary/10 ring-2 ring-primary'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-3xl">{goal.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">{goal.title}</div>
                <div className="text-sm text-gray-500">{goal.description}</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selectedGoal === goal.key ? 'border-primary bg-primary' : 'border-gray-300'
              }`}>
                {selectedGoal === goal.key && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          onClick={handleContinue}
          className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Tiếp tục
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
