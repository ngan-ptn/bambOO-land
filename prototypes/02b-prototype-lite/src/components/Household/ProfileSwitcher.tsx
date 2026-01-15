/**
 * ProfileSwitcher - Bottom sheet for switching between household members
 * Shows each member's avatar, name, today's kcal, and progress bar.
 */

import { BottomSheet } from '@/components/common'
import { useHousehold } from '@/contexts/HouseholdContext'
import { cn } from '@/lib/utils'

interface ProfileSwitcherProps {
  isOpen: boolean
  onClose: () => void
  onAddMember: () => void
}

export function ProfileSwitcher({ isOpen, onClose, onAddMember }: ProfileSwitcherProps) {
  const { members, switchToMember } = useHousehold()

  const handleSelectMember = (memberId: string) => {
    switchToMember(memberId)
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Switch Profile">
      <div className="space-y-3 pb-4">
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => handleSelectMember(member.id)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-card transition-all',
              'bg-background-card hover:bg-brown-20',
              member.isActive && 'ring-2 ring-primary'
            )}
          >
            {/* Avatar circle */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ backgroundColor: member.avatarColor }}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>

            {/* Name and stats */}
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{member.name}</span>
                {member.isActive && (
                  <span className="text-xs text-primary font-medium">Active</span>
                )}
              </div>
              <div className="text-sm text-foreground-muted">
                {member.todayKcal?.toLocaleString() || 0} kcal · {member.todayProgress || 0}%
              </div>
              {/* Mini progress bar */}
              <div className="mt-1.5 h-1.5 bg-brown-20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(member.todayProgress || 0, 100)}%`,
                    backgroundColor: member.avatarColor,
                  }}
                />
              </div>
            </div>

            {/* Checkmark for active */}
            {member.isActive && (
              <div className="text-primary text-xl">✓</div>
            )}
          </button>
        ))}

        {/* Add member button */}
        <button
          onClick={onAddMember}
          className={cn(
            'w-full flex items-center justify-center gap-2 p-3 rounded-card',
            'border-2 border-dashed border-brown-30 text-foreground-muted',
            'hover:border-primary hover:text-primary transition-colors'
          )}
        >
          <span className="text-xl">+</span>
          <span className="font-medium">Add member</span>
        </button>
      </div>
    </BottomSheet>
  )
}
