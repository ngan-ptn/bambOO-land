/**
 * FormInput - Standard text/email input for auth forms
 */

import { cn } from '@/lib/utils'

interface FormInputProps {
  id: string
  type?: 'text' | 'email'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  label: string
}

export function FormInput({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  label,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-foreground uppercase tracking-wide"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full h-14 px-5 rounded-2xl border-2 transition-all',
          'bg-white text-foreground placeholder:text-foreground-muted',
          'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
          error ? 'border-error bg-error/5' : 'border-border'
        )}
      />
      {error && (
        <p className="text-sm text-error flex items-center gap-2">
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
