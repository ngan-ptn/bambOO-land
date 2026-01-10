import { useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ScanCameraPageProps {
  onCancel: () => void
  onCapture: (photo: { id: string }) => void
}

function createSimulatedPhoto(): { id: string } {
  return { id: `sim-photo:${Date.now()}` }
}

export function ScanCameraPage({ onCancel, onCapture }: ScanCameraPageProps) {
  const handleCapture = useCallback(() => {
    onCapture(createSimulatedPhoto())
  }, [onCapture])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'text-body font-medium text-foreground',
              'px-3 py-2 -my-2 -ml-3 rounded-pill',
              'hover:bg-border/50 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring'
            )}
          >
            Cancel
          </button>

          <h1 className="text-title text-foreground">
            Scan
          </h1>

          <div className="w-[72px]" />
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        <div
          className={cn(
            'w-full aspect-[3/4] rounded-card',
            'bg-background-card border border-border',
            'flex items-center justify-center'
          )}
        >
          <div className="text-center">
            <p className="text-body text-foreground">Camera preview</p>
            <p className="text-caption text-foreground-muted mt-1">
              Simulated. No real camera.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCapture}
          className={cn(
            'w-full py-4 rounded-pill',
            'bg-primary text-primary-foreground',
            'text-body font-medium',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          )}
        >
          Capture
        </button>
      </main>
    </div>
  )
}

