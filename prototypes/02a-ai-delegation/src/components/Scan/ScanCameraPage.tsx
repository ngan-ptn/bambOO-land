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
    <div className="min-h-screen bg-gray-50">
      {/* DLS: Header - flat, no shadow */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'text-sm font-medium text-gray-900',
              'px-3 py-2 -my-2 -ml-3 rounded-lg',
              'hover:bg-gray-100 hover:scale-105 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
          >
            Cancel
          </button>

          <h1 className="text-lg font-bold text-gray-900">
            Scan
          </h1>

          <div className="w-[72px]" />
        </div>
      </header>

      <main className="px-5 py-6 space-y-6">
        {/* DLS: Camera preview - flat, no shadow */}
        <div
          className={cn(
            'w-full aspect-[3/4] rounded-lg',
            'bg-white',
            'flex items-center justify-center'
          )}
        >
          <div className="text-center">
            <p className="text-sm text-gray-900">Camera preview</p>
            <p className="text-xs text-gray-500 mt-1">
              Simulated. No real camera.
            </p>
          </div>
        </div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          type="button"
          onClick={handleCapture}
          className={cn(
            'w-full h-14 rounded-lg',
            'bg-primary text-white',
            'text-sm font-semibold',
            'hover:bg-primary-dark hover:scale-105 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          Capture
        </button>
      </main>
    </div>
  )
}

