interface ToastProps {
  message: string;
  onUndo?: () => void;
  onDismiss: () => void;
}

export function Toast({ message, onUndo, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 animate-slide-up">
      <div className="bg-[var(--color-text-primary)] text-white rounded-lg px-4 py-3 flex items-center justify-between shadow-lg">
        <span className="text-sm">{message}</span>
        <div className="flex items-center gap-2">
          {onUndo && (
            <button
              onClick={onUndo}
              className="text-[var(--color-accent-muted)] font-medium text-sm hover:underline"
            >
              Undo
            </button>
          )}
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Dismiss"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
