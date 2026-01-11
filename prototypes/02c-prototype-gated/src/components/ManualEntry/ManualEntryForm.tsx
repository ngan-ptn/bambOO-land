import { useMemo, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ManualEntryInput {
  name_vi: string
  kcal: number
  protein?: number
  carbs?: number
  fat?: number
}

interface ManualEntryFormProps {
  /** Initial value for the name field (e.g., from search query) */
  initialName?: string
  /** Called when user submits valid form data */
  onSave: (input: ManualEntryInput) => void
  /** Called when user cancels the form */
  onCancel: () => void
  /** Label for the cancel button */
  cancelLabel?: string
  /** Label for the save button */
  saveLabel?: string
}

function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const num = Number(trimmed)
  if (Number.isNaN(num)) return undefined
  return num
}

/**
 * Manual entry form for creating custom food entries.
 *
 * Note: To reset this form with a new initialName, the parent component
 * should use a `key` prop to force remount (e.g., key={initialName}).
 */
export function ManualEntryForm({
  initialName = '',
  onSave,
  onCancel,
  cancelLabel = 'Back',
  saveLabel = 'Save',
}: ManualEntryFormProps) {
  const [name, setName] = useState(initialName)
  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const nameError = useMemo(() => {
    if (!submitted) return null
    return name.trim() ? null : 'Name is required'
  }, [name, submitted])

  const kcalError = useMemo(() => {
    if (!submitted) return null
    const n = parseOptionalNumber(kcal)
    if (n === undefined) return 'Calories is required'
    if (n <= 0) return 'Calories must be > 0'
    return null
  }, [kcal, submitted])

  const canSave = useMemo(() => {
    const n = parseOptionalNumber(kcal)
    return name.trim().length > 0 && n !== undefined && n > 0
  }, [name, kcal])

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
    if (!canSave) return

    onSave({
      name_vi: name.trim(),
      kcal: Number(kcal),
      protein: parseOptionalNumber(protein),
      carbs: parseOptionalNumber(carbs),
      fat: parseOptionalNumber(fat),
    })
  }, [canSave, name, kcal, protein, carbs, fat, onSave])

  return (
    <>
      {/* Form header with cancel and save buttons */}
      <div className="flex items-center justify-between gap-3 mb-6">
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
          {cancelLabel}
        </button>

        <h2 className="text-title text-foreground">
          Manual Entry
        </h2>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSave}
          className={cn(
            'text-body font-medium',
            'px-3 py-2 -my-2 -mr-3 rounded-pill',
            canSave
              ? 'bg-primary text-primary-foreground'
              : 'bg-border text-foreground-muted cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-ring'
          )}
        >
          {saveLabel}
        </button>
      </div>

      {/* Form fields */}
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-caption text-foreground-muted" htmlFor="manual-name">
            Name
          </label>
          <input
            id="manual-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Phở bò"
            className={cn(
              'w-full rounded-card bg-background-card border border-border',
              'px-4 py-3 text-body text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
          />
          {nameError && (
            <p className="text-caption text-error">{nameError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-caption text-foreground-muted" htmlFor="manual-kcal">
            Calories (kcal)
          </label>
          <input
            id="manual-kcal"
            inputMode="numeric"
            value={kcal}
            onChange={(e) => setKcal(e.target.value)}
            placeholder="520"
            className={cn(
              'w-full rounded-card bg-background-card border border-border',
              'px-4 py-3 text-body text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
          />
          {kcalError && (
            <p className="text-caption text-error">{kcalError}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-caption text-foreground-muted" htmlFor="manual-protein">
              Protein (g). Optional
            </label>
            <input
              id="manual-protein"
              inputMode="numeric"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              placeholder="0"
              className={cn(
                'w-full rounded-card bg-background-card border border-border',
                'px-4 py-3 text-body text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-caption text-foreground-muted" htmlFor="manual-carbs">
              Carbs (g). Optional
            </label>
            <input
              id="manual-carbs"
              inputMode="numeric"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              placeholder="0"
              className={cn(
                'w-full rounded-card bg-background-card border border-border',
                'px-4 py-3 text-body text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-caption text-foreground-muted" htmlFor="manual-fat">
              Fat (g). Optional
            </label>
            <input
              id="manual-fat"
              inputMode="numeric"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              placeholder="0"
              className={cn(
                'w-full rounded-card bg-background-card border border-border',
                'px-4 py-3 text-body text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}
