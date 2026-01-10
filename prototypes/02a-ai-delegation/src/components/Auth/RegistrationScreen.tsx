/**
 * RegistrationScreen - New user registration
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { validateEmail, validatePassword, validatePasswordMatch } from '@/auth/validation'
import { FormInput } from './FormInput'
import { PasswordInput } from './PasswordInput'

export function RegistrationScreen() {
  const navigate = useNavigate()
  const { register } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setErrors({})

    // Validate
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const matchValidation = validatePasswordMatch(password, confirmPassword)

    const newErrors: Record<string, string> = {}
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error!
    if (!matchValidation.isValid) newErrors.confirm = matchValidation.error!

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(async () => {
      const success = await register(email, password)
      setIsSubmitting(false)

      if (!success) {
        setErrors({ email: 'Email này đã được đăng ký' })
        return
      }

      // Registration successful → go to onboarding
      navigate('/onboarding/welcome')
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-b from-[#E8E4DE] to-[#D8D4CE]">
      <div className="w-full max-w-[440px] bg-background rounded-3xl shadow-xl p-12">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F0F5EE] to-[#E8F0E6] flex items-center justify-center text-5xl">
            🌱
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tạo tài khoản</h1>
          <p className="text-foreground-muted">Bắt đầu hành trình sống khỏe của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="reg-email"
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="email@example.com"
            error={errors.email}
          />

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide">
              Mật khẩu
            </label>
            <PasswordInput
              id="reg-password"
              value={password}
              onChange={setPassword}
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
              id="reg-confirm"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Nhập lại mật khẩu"
              error={errors.confirm}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                Đăng ký
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-foreground-muted">
          Đã có tài khoản?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary font-semibold hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  )
}
