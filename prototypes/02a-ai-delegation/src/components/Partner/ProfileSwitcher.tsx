/**
 * ProfileSwitcher - Avatar dropdown in header to switch between profiles.
 * Shows current user's initial/avatar, tapping reveals dropdown with all profiles.
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { UserProfile } from '@/db/types'

interface ProfileSwitcherProps {
  currentUser: UserProfile | null
  partner: UserProfile | null
  isViewingPartner: boolean
  onSwitchToSelf: () => void
  onSwitchToPartner: () => void
  onAddPartner?: () => void
  onGoToSettings?: () => void
}

function getInitial(user: UserProfile | null): string {
  if (!user) return '?'
  if (user.displayName) return user.displayName[0].toUpperCase()
  if (user.email) return user.email[0].toUpperCase()
  return '?'
}

function getDisplayName(user: UserProfile | null): string {
  if (!user) return 'Unknown'
  return user.displayName || user.email || 'User'
}

export function ProfileSwitcher({
  currentUser,
  partner,
  isViewingPartner,
  onSwitchToSelf,
  onSwitchToPartner,
  onAddPartner,
  onGoToSettings,
}: ProfileSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // The "active" user is who we're viewing as
  const activeUser = isViewingPartner ? partner : currentUser
  const otherUser = isViewingPartner ? currentUser : partner

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleSwitchToSelf = useCallback(() => {
    onSwitchToSelf()
    setIsOpen(false)
  }, [onSwitchToSelf])

  const handleSwitchToPartner = useCallback(() => {
    onSwitchToPartner()
    setIsOpen(false)
  }, [onSwitchToPartner])

  const handleAddPartner = useCallback(() => {
    onAddPartner?.()
    setIsOpen(false)
  }, [onAddPartner])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* DLS: Avatar button - solid color, scale on hover */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center',
          'text-sm font-medium',
          'transition-all duration-200',
          'hover:scale-110',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isViewingPartner
            ? 'bg-accent text-white'
            : 'bg-primary text-white'
        )}
      >
        {getInitial(activeUser)}
      </button>

      {/* DLS: Dropdown - flat, no shadow, rounded-lg */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute right-0 top-full mt-2 w-56',
            'bg-white border border-gray-200 rounded-lg',
            'py-1 z-50',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
        >
          {/* Current user option */}
          <button
            type="button"
            role="option"
            aria-selected={!isViewingPartner}
            onClick={handleSwitchToSelf}
            className={cn(
              'w-full px-4 py-3 flex items-center gap-3',
              'hover:bg-gray-50 transition-all duration-200',
              'text-left',
              !isViewingPartner && 'bg-primary/5'
            )}
          >
            <span
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                'text-xs font-medium',
                'bg-primary text-white'
              )}
            >
              {getInitial(currentUser)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {getDisplayName(currentUser)}
              </p>
              <p className="text-xs text-gray-500">
                {!isViewingPartner ? 'Active' : 'Tap to switch'}
              </p>
            </div>
            {!isViewingPartner && (
              <span className="text-primary text-xs">✓</span>
            )}
          </button>

          {/* Partner option (if exists) */}
          {partner && (
            <button
              type="button"
              role="option"
              aria-selected={isViewingPartner}
              onClick={handleSwitchToPartner}
              className={cn(
                'w-full px-4 py-3 flex items-center gap-3',
                'hover:bg-gray-50 transition-all duration-200',
                'text-left',
                isViewingPartner && 'bg-accent/5'
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  'text-xs font-medium',
                  'bg-accent text-white'
                )}
              >
                {getInitial(partner)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getDisplayName(partner)}
                </p>
                <p className="text-xs text-gray-500">
                  {isViewingPartner ? 'Active' : 'Tap to switch'}
                </p>
              </div>
              {isViewingPartner && (
                <span className="text-accent text-xs">✓</span>
              )}
            </button>
          )}

          {/* Add partner option (if no partner) */}
          {!partner && onAddPartner && (
            <>
              <div className="border-t border-gray-200 my-1" />
              <button
                type="button"
                onClick={handleAddPartner}
                className={cn(
                  'w-full px-4 py-3 flex items-center gap-3',
                  'hover:bg-gray-50 transition-all duration-200',
                  'text-left'
                )}
              >
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    'text-xs font-medium',
                    'bg-gray-100 text-gray-500'
                  )}
                >
                  +
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Add Partner
                  </p>
                  <p className="text-xs text-gray-500">
                    Share meal logging
                  </p>
                </div>
              </button>
            </>
          )}

          {/* Settings / Profile option */}
          {onGoToSettings && (
            <>
              <div className="border-t border-gray-200 my-1" />
              <button
                type="button"
                onClick={() => {
                  onGoToSettings()
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full px-4 py-3 flex items-center gap-3',
                  'hover:bg-gray-50 transition-all duration-200',
                  'text-left'
                )}
              >
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    'text-xs',
                    'bg-gray-100 text-gray-500'
                  )}
                >
                  ⚙️
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Settings
                  </p>
                  <p className="text-xs text-gray-500">
                    Profile & preferences
                  </p>
                </div>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
