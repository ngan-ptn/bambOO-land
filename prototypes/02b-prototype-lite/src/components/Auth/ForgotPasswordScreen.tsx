/**
 * ForgotPasswordScreen - Email entry for password recovery
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { validateEmail } from '@/auth/validation'
import { FormInput } from './FormInput'

export function ForgotPasswordScreen() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validation = validateEmail(email)
    if (!validation.isValid) {
      setError(validation.error!)
      return
    }

    // Check if email exists
    if (!user || user.email !== email) {
      setError('Email chưa được đăng ký')
      return
    }

    setIsSubmitting(true)

    // Simulate email send delay
    setTimeout(() => {
      sessionStorage.setItem('reset_email', email)
      navigate('/reset-password')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-b from-[#E8E4DE] to-[#D8D4CE]">
      <div className="w-full max-w-[440px] bg-background rounded-3xl shadow-xl p-12">
        <button
          onClick={() => navigate('/login')}
          className="mb-6 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-foreground-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại đăng nhập
        </button>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Quên mật khẩu?</h1>
          <p className="text-foreground-muted">Nhập email để khôi phục mật khẩu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="forgot-email"
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="email@example.com"
            error={error}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                Gửi link khôi phục
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
