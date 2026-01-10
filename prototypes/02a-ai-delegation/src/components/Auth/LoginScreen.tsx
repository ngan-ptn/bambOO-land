/**
 * LoginScreen - Returning user login
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { FormInput } from './FormInput'
import { PasswordInput } from './PasswordInput'

export function LoginScreen() {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!email) {
      setErrors({ email: 'Vui lòng nhập email' })
      return
    }

    if (!password) {
      setErrors({ password: 'Vui lòng nhập mật khẩu' })
      return
    }

    setIsSubmitting(true)

    setTimeout(async () => {
      const success = await login(email, password, rememberMe)
      setIsSubmitting(false)

      if (!success) {
        setErrors({ password: 'Sai email hoặc mật khẩu' })
        return
      }

      navigate('/dashboard')
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-b from-[#E8E4DE] to-[#D8D4CE]">
      <div className="w-full max-w-[440px] bg-background rounded-3xl shadow-xl p-12">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F0F5EE] to-[#E8F0E6] flex items-center justify-center text-5xl">
            👋
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chào mừng trở lại!</h1>
          <p className="text-foreground-muted">Đăng nhập để tiếp tục theo dõi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="login-email"
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
              id="login-password"
              value={password}
              onChange={setPassword}
              placeholder="Nhập mật khẩu"
              error={errors.password}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary font-medium hover:underline float-right -mt-2"
          >
            Quên mật khẩu?
          </button>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-6 h-6 rounded-lg border-2 border-border checked:bg-primary checked:border-primary cursor-pointer"
            />
            <label htmlFor="remember-me" className="text-foreground cursor-pointer">
              Ghi nhớ đăng nhập
            </label>
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
                Đăng nhập
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-foreground-muted">
          Chưa có tài khoản?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary font-semibold hover:underline"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  )
}
