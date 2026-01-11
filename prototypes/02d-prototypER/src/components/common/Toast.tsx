/**
 * Toast - Success notification with optional undo and edit actions.
 * Auto-hides after 2 seconds per spec.
 * Shows food name and provides undo/edit capability for the last logged entry.
 * Uses centralized action logic via getToastActions() for extensibility.
 */

import { useEffect, useCallback, useMemo } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getToastActions } from '@/lib/toastModel'
import type { ToastState } from '@/types'

interface ToastProps {
  toast: ToastState
  onClose: () => void
  onUndo?: () => void
  onEdit?: () => void
}

// Auto-hide delay in milliseconds
const AUTO_HIDE_DELAY = 2000

export function Toast({ toast, onClose, onUndo, onEdit }: ToastProps) {
  // Auto-hide timer
  useEffect(() => {
    if (!toast.visible) return

    const timer = setTimeout(() => {
      onClose()
    }, AUTO_HIDE_DELAY)

    return () => clearTimeout(timer)
  }, [toast.visible, onClose])

  // Determine which actions to show using centralized logic
  // Supports both new declarative approach (showUndo/showEdit) and legacy (undoAction)
  const actions = useMemo(() => {
    // Legacy support: if undoAction is defined, show single undo button
    if (toast.undoAction && onUndo) {
      return [{ id: 'undo' as const, label: 'Undo' }]
    }

    // New declarative approach: use getToastActions for dynamic action list
    return getToastActions({
      toast,
      hasUndoHandler: !!onUndo,
      hasEditHandler: !!onEdit,
    })
  }, [toast, onUndo, onEdit])

  const handleActionClick = useCallback((actionId: 'undo' | 'edit') => {
    if (actionId === 'undo' && onUndo) {
      onUndo()
    } else if (actionId === 'edit' && onEdit) {
      onEdit()
    }
    onClose()
  }, [onUndo, onEdit, onClose])

  // Legacy undo handler for backward compatibility
  const handleUndoClick = useCallback(() => {
    if (toast.undoAction) {
      toast.undoAction()
    } else if (onUndo) {
      onUndo()
    }
    onClose()
  }, [toast.undoAction, onUndo, onClose])

  if (!toast.visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        // Fixed position at bottom of screen, above safe area
        'fixed bottom-6 left-4 right-4 z-40',
        'mx-auto max-w-md',
        // Card styling: rounded, shadowed
        'bg-foreground text-background rounded-card shadow-card',
        'px-4 py-3',
        'flex items-center justify-between gap-3',
        // Entry animation
        'animate-slide-up'
      )}
    >
      {/* Message content */}
      <p className="text-body flex-1 truncate">
        {toast.message}
      </p>

      {/* Action buttons container */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Dynamic action buttons - supports both undo and edit */}
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => {
              // Legacy undoAction takes precedence if defined
              if (action.id === 'undo' && toast.undoAction) {
                handleUndoClick()
              } else {
                handleActionClick(action.id)
              }
            }}
            className={cn(
              'text-secondary font-medium text-body',
              'px-2 py-1 -my-1',
              'rounded hover:bg-white/10 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-secondary',
              'tap-highlight-none'
            )}
          >
            {action.label}
          </button>
        ))}

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            'p-1 -m-1 rounded-full',
            'flex items-center justify-center',
            'hover:bg-white/10 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-secondary',
            'tap-highlight-none'
          )}
        >
          <X className="w-5 h-5 opacity-70 shrink-0" />
        </button>
      </div>
    </div>
  )
}
