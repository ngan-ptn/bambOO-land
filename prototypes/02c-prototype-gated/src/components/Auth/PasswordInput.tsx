/**
 * PasswordInput - Password field with show/hide toggle
 */

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  showStrength?: boolean
  onStrengthChange?: (score: number) => void
}

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder = 'Nhập mật khẩu',
  error,
  showStrength = false,
  onStrengthChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)

    if (showStrength) {
      // Calculate password strength score (0-4)
      let score = 0
      if (newValue.length >= 8) score++
      if (/[A-Z]/.test(newValue)) score++
      if (/[0-9]/.test(newValue)) score++
      if (/[^A-Za-z0-9]/.test(newValue)) score++

      setStrength(score)
      if (onStrengthChange) {
        onStrengthChange(score)
      }
    }
  }

  // Get strength level and label based on score
  const getStrengthInfo = () => {
    if (strength <= 1) {
      return { level: 'weak', label: 'Yếu', colorClass: 'bg-error' }
    } else if (strength <= 2) {
      return { level: 'medium', label: 'Trung bình', colorClass: 'bg-warning' }
    } else {
      return { level: 'strong', label: 'Mạnh', colorClass: 'bg-primary' }
    }
  }

  const strengthInfo = getStrengthInfo()

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full h-14 px-5 rounded-2xl border-2 transition-all',
          'bg-white text-foreground placeholder:text-foreground-muted',
          'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
          error ? 'border-error bg-error/5' : 'border-border'
        )}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground-muted hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>

      {/* Password Strength Indicator */}
      {showStrength && value && (
        <div className="mt-3">
          {/* Strength Bars */}
          <div className="flex gap-2 mb-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-300',
                  bar <= strength ? strengthInfo.colorClass : 'bg-border'
                )}
              />
            ))}
          </div>

          {/* Strength Label */}
          <p
            className={cn(
              'text-caption transition-colors duration-300',
              strength <= 1 && 'text-error',
              strength === 2 && 'text-warning',
              strength >= 3 && 'text-primary'
            )}
          >
            {strengthInfo.label}
          </p>
        </div>
      )}
    </div>
  )
}
