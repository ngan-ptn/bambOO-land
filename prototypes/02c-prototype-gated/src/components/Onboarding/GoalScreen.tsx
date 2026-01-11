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
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-b from-[#E8E4DE] to-[#D8D4CE]">
      <div className="w-full max-w-[440px] bg-background rounded-3xl shadow-xl p-12">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mục tiêu của bạn?</h1>
          <p className="text-foreground-muted">Chọn mục tiêu phù hợp nhất với bạn</p>
        </div>

        <div className="space-y-3 mb-8">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal.key}
              onClick={() => setSelectedGoal(goal.key)}
              className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                selectedGoal === goal.key
                  ? 'border-primary bg-gradient-to-br from-[#F8FBF7] to-[#F0F5EE] shadow-lg'
                  : 'border-border bg-white hover:border-foreground-muted'
              }`}
            >
              <div className="text-3xl">{goal.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-foreground">{goal.title}</div>
                <div className="text-sm text-foreground-muted">{goal.description}</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedGoal === goal.key ? 'border-primary bg-primary' : 'border-border'
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

        <button
          onClick={handleContinue}
          className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
