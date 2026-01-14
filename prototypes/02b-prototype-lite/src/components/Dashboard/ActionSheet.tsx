import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { registerEscapeDismissal, restoreFocus } from '@/lib/escapeDismissal'

export type ActionSheetAction = 'search' | 'manual' | 'scan'

interface ActionSheetProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (action: ActionSheetAction) => void
}

export function ActionSheet({ isOpen, onClose, onSelect }: ActionSheetProps) {
  const shouldRestoreFocusRef = useRef(false)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    shouldRestoreFocusRef.current = true
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    shouldRestoreFocusRef.current = false
    previousFocusRef.current = document.activeElement as HTMLElement | null

    const cleanup = registerEscapeDismissal({
      onClose: handleClose,
      onRestoreFocus: () => {
        restoreFocus(previousFocusRef.current)
      },
      shouldRestoreFocusRef,
    })

    return () => {
      cleanup()
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Add food actions"
    >
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0',
          'bg-white rounded-t-lg shadow-none',
          'px-5 pt-4 pb-10 safe-bottom',
          'animate-slide-up'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        <h2 className="text-title text-gray-900 mb-4">Add food</h2>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onSelect('manual')}
            className={cn(
              'w-full text-left px-4 py-4 rounded-lg',
              'bg-white border border-gray-200',
              'text-body text-gray-900 font-medium',
              'hover:bg-gray-50 transition-all duration-200'
            )}
          >
            Manual entry
          </button>

          <button
            type="button"
            onClick={() => onSelect('search')}
            className={cn(
              'w-full text-left px-4 py-4 rounded-lg',
              'bg-white border border-gray-200',
              'text-body text-gray-900 font-medium',
              'hover:bg-gray-50 transition-all duration-200'
            )}
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => onSelect('scan')}
            className={cn(
              'w-full text-left px-4 py-4 rounded-lg',
              'bg-white border border-gray-200',
              'text-body text-gray-900 font-medium',
              'hover:bg-gray-50 transition-all duration-200'
            )}
          >
            Scan
          </button>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full mt-4 px-4 py-4 rounded-lg bg-gray-900 text-white text-body font-medium hover:bg-gray-800 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
