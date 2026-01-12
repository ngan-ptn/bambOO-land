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
        className="block text-xs font-semibold text-gray-900 uppercase tracking-wide"
      >
        {label}
      </label>
      {/* DLS: Gray 100 bg, no border, focus shows border */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full h-14 px-5 rounded-lg transition-all duration-200',
          'bg-gray-100 text-gray-900 placeholder:text-gray-500',
          'focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary',
          error ? 'ring-2 ring-error bg-error/5' : ''
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
