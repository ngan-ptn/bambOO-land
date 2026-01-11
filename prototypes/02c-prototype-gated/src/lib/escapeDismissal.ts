interface EscapeDismissalOptions {
  onClose: () => void
  onRestoreFocus: () => void
  shouldRestoreFocusRef: { current: boolean }
}

/**
 * Registers an Escape key listener for modal dismissal.
 * Returns a cleanup function to remove the listener.
 */
export function registerEscapeDismissal({
  onClose,
  onRestoreFocus,
  shouldRestoreFocusRef,
}: EscapeDismissalOptions): () => void {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()

      if (shouldRestoreFocusRef.current) {
        onRestoreFocus()
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Safely restores focus to a previously focused element.
 */
export function restoreFocus(element: HTMLElement | null): void {
  if (element && typeof element.focus === 'function') {
    element.focus()
  }
}
