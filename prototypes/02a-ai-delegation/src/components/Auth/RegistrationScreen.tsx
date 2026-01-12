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
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      <div className="w-full max-w-[440px] bg-white rounded-xl p-12">
        <div className="text-center mb-10">
          {/* DLS: Solid color circle instead of gradient */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center text-5xl">
            🌱
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản</h1>
          <p className="text-gray-500">Bắt đầu hành trình sống khỏe của bạn</p>
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
            <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
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
            <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
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

          {/* DLS: Primary button - solid bg, scale on hover */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

        <p className="text-center mt-6 text-gray-500">
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
