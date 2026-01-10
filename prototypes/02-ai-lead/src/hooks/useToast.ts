import { useState, useCallback, useRef } from 'react';

interface Toast {
  id: string;
  message: string;
  onUndo?: () => void;
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const show = useCallback(
    (message: string, onUndo?: () => void) => {
      // Clear existing toast
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = Date.now().toString();
      setToast({ id, message, onUndo });

      // Auto dismiss
      timeoutRef.current = window.setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, duration);
    },
    [duration]
  );

  const handleUndo = useCallback(() => {
    if (toast?.onUndo) {
      toast.onUndo();
    }
    dismiss();
  }, [toast, dismiss]);

  return { toast, show, dismiss, handleUndo };
}
