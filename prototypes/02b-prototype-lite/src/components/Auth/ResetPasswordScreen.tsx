/**
 * ResetPasswordScreen - Reset password with new password
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { validatePassword, validatePasswordMatch } from '@/auth/validation'
import { PasswordInput } from './PasswordInput'

export function ResetPasswordScreen() {
  const navigate = useNavigate()
  const { resetPassword } = useAuthContext()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const resetEmail = sessionStorage.getItem('reset_email')
    if (!resetEmail) {
      navigate('/forgot-password')
      return
    }
    setEmail(resetEmail)
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const passwordValidation = validatePassword(newPassword)
    const matchValidation = validatePasswordMatch(newPassword, confirmPassword)

    const newErrors: Record<string, string> = {}
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!
    }
    if (!matchValidation.isValid) {
      newErrors.confirm = matchValidation.error!
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const success = resetPassword(email, newPassword)
      setIsSubmitting(false)

      if (!success) {
        setErrors({ password: 'Không thể đặt lại mật khẩu' })
        return
      }

      sessionStorage.removeItem('reset_email')
      navigate('/login')
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-background">
      <div className="w-full max-w-[440px] bg-white rounded-card shadow-card p-12">
        <button
          onClick={() => navigate('/login')}
          className="mb-6 px-4 py-2 bg-gray-10 rounded-chip shadow-tile hover:bg-gray-20 transition-all duration-200 flex items-center gap-2 text-foreground-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại đăng nhập
        </button>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">🔑</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Đặt lại mật khẩu</h1>
          <p className="text-foreground-muted">Tạo mật khẩu mới cho tài khoản</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide">
              Mật khẩu mới
            </label>
            <PasswordInput
              id="reset-password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Ít nhất 8 ký tự"
              error={errors.password}
              showStrength
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide">
              Xác nhận mật khẩu
            </label>
            <PasswordInput
              id="reset-confirm"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Nhập lại mật khẩu"
              error={errors.confirm}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-primary text-white font-semibold rounded-pill shadow-card hover:bg-primary-dark hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                Đặt lại mật khẩu
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
