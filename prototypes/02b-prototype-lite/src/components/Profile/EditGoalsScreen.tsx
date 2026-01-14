/**
 * EditGoalsScreen - Edit calorie goals and goal type
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { GOAL_OPTIONS } from '@/auth/constants'
import type { GoalType } from '@/types'

export function EditGoalsScreen() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useAuthContext()
  const [calories, setCalories] = useState(2000)
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('healthy')

  useEffect(() => {
    if (profile) {
      setCalories(profile.dailyCalories)
      setSelectedGoal(profile.goal)
    }
  }, [profile])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(parseInt(e.target.value))
  }

  const percentage = ((calories - 1200) / (3000 - 1200)) * 100

  const handleSave = async () => {
    const goal = GOAL_OPTIONS.find((g) => g.key === selectedGoal)!

    await updateProfile({
      dailyCalories: calories,
      goal: selectedGoal,
      goalIcon: goal.icon,
      goalText: goal.title,
    })

    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[440px] mx-auto">
        <button
          onClick={() => navigate('/profile')}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow-none hover:bg-gray-50 transition-colors flex items-center gap-2 text-foreground-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại
        </button>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-foreground">Mục tiêu dinh dưỡng</h1>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-1">{calories}</div>
          <div className="text-foreground-muted">kcal / ngày</div>
        </div>

        <div className="mb-8">
          <div className="relative mb-3">
            <div className="h-2 bg-border rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all pointer-events-none"
                style={{ width: `${percentage}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-3 border-primary rounded-full shadow-none pointer-events-none"
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
          <div className="flex justify-between text-xs text-foreground-muted">
            <span>1200</span>
            <span>2100</span>
            <span>3000</span>
          </div>
        </div>

        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Mục tiêu của bạn</p>
        <div className="space-y-3 mb-8">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal.key}
              onClick={() => setSelectedGoal(goal.key)}
              className={`w-full p-5 rounded-lg border-2 transition-all flex items-center gap-4 ${
                selectedGoal === goal.key
                  ? 'border-primary bg-emerald-50 shadow-none'
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
          onClick={handleSave}
          className="w-full h-14 bg-blue-500 text-white font-semibold rounded-lg shadow-none hover:shadow-none  transition-all flex items-center justify-center gap-2"
        >
          Lưu thay đổi
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
