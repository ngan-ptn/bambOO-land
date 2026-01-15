/**
 * HouseholdDashboard - Shows all household members' progress at a glance
 * Displays mini progress rings for each member and shared meals.
 */

import { useHousehold } from '@/contexts/HouseholdContext'
import { BottomNav } from '@/components/common'
import { cn } from '@/lib/utils'

// Mini progress ring component
function MiniProgressRing({
  progress,
  color,
  size = 64,
}: {
  progress: number
  color: string
  size?: number
}) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        className="text-brown-20"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-500"
      />
    </svg>
  )
}

// Sample shared meals for demo
const SAMPLE_SHARED_MEALS = [
  { id: '1', name: 'Phở bò', peopleCount: 3, emoji: '🍜' },
  { id: '2', name: 'Cơm tấm', peopleCount: 2, emoji: '🍚' },
  { id: '3', name: 'Gỏi cuốn', peopleCount: 3, emoji: '🥗' },
]

export function HouseholdDashboard() {
  const { members } = useHousehold()

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Household</h1>
        <span className="text-sm text-foreground-muted capitalize">{today}</span>
      </div>

      {/* Member progress rings */}
      <div className="bg-background-card rounded-card p-4">
        <div className="flex justify-around items-end">
          {members.map((member) => (
            <button
              key={member.id}
              className={cn(
                'flex flex-col items-center gap-2 p-2 rounded-xl transition-all',
                'hover:bg-brown-10',
                member.isActive && 'bg-brown-10'
              )}
            >
              {/* Progress ring with percentage */}
              <div className="relative">
                <MiniProgressRing
                  progress={member.todayProgress || 0}
                  color={member.avatarColor}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">
                    {member.todayProgress || 0}%
                  </span>
                </div>
              </div>
              {/* Avatar and name */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: member.avatarColor }}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-foreground-muted">
                {member.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shared meals today */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Shared Meals Today
        </h2>
        {SAMPLE_SHARED_MEALS.length === 0 ? (
          <div className="bg-background-card rounded-card p-6 text-center">
            <p className="text-foreground-muted">No shared meals yet today</p>
            <p className="text-sm text-foreground-muted mt-1">
              Log a meal for multiple people to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {SAMPLE_SHARED_MEALS.map((meal) => (
              <div
                key={meal.id}
                className="bg-background-card rounded-card p-4 flex items-center gap-3"
              >
                <span className="text-2xl">{meal.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{meal.name}</p>
                  <p className="text-sm text-foreground-muted">
                    {meal.peopleCount} people
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-background-card rounded-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{members.length}</p>
          <p className="text-xs text-foreground-muted">Members</p>
        </div>
        <div className="bg-background-card rounded-card p-4 text-center">
          <p className="text-2xl font-bold text-secondary">
            {SAMPLE_SHARED_MEALS.length}
          </p>
          <p className="text-xs text-foreground-muted">Shared meals</p>
        </div>
        <div className="bg-background-card rounded-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {Math.round(members.reduce((acc, m) => acc + (m.todayProgress || 0), 0) / members.length)}%
          </p>
          <p className="text-xs text-foreground-muted">Avg. progress</p>
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20" />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
