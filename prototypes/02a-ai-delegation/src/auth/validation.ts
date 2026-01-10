/**
 * Auth validation helpers
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Vui lòng nhập email' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email không hợp lệ' }
  }

  return { isValid: true }
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Vui lòng nhập mật khẩu' }
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Mật khẩu phải có ít nhất 8 ký tự' }
  }

  return { isValid: true }
}

export function validatePasswordMatch(password: string, confirm: string): ValidationResult {
  if (password !== confirm) {
    return { isValid: false, error: 'Mật khẩu không khớp' }
  }

  return { isValid: true }
}

export function validateName(name: string): ValidationResult {
  const trimmed = name.trim()

  if (!trimmed) {
    return { isValid: false, error: 'Tên không hợp lệ' }
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Tên phải có ít nhất 2 ký tự' }
  }

  return { isValid: true }
}

export interface PasswordStrength {
  score: number  // 0-4
  label: string  // 'Yếu' | 'Trung bình' | 'Mạnh'
  className: string  // 'weak' | 'medium' | 'strong'
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: '', className: '' }
  }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) {
    return { score, label: 'Yếu', className: 'weak' }
  } else if (score <= 2) {
    return { score, label: 'Trung bình', className: 'medium' }
  } else {
    return { score, label: 'Mạnh', className: 'strong' }
  }
}
