/**
 * ChangePasswordScreen - Change user password
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { validatePassword, validatePasswordMatch } from '@/auth/validation'
import { PasswordInput } from '@/components/Auth/PasswordInput'

export function ChangePasswordScreen() {
  const navigate = useNavigate()
  const { changePassword } = useAuthContext()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newPasswordValidation = validatePassword(newPassword)
    const matchValidation = validatePasswordMatch(newPassword, confirmPassword)

    const newErrors: Record<string, string> = {}

    if (!currentPassword) {
      newErrors.current = 'Vui lòng nhập mật khẩu hiện tại'
    }

    if (!newPasswordValidation.isValid) {
      newErrors.new = newPasswordValidation.error!
    }

    if (!matchValidation.isValid) {
      newErrors.confirm = matchValidation.error!
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await changePassword(currentPassword, newPassword)

    if (!success) {
      setErrors({ current: 'Sai mật khẩu hiện tại' })
      return
    }

    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-[440px] mx-auto">
        {/* DLS: Flat back button */}
        <button
          onClick={() => navigate('/profile')}
          className="mb-6 px-4 py-2 bg-white rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2 text-gray-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại
        </button>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Mật khẩu hiện tại
            </label>
            <PasswordInput
              id="current-password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Nhập mật khẩu hiện tại"
              error={errors.current}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Mật khẩu mới
            </label>
            <PasswordInput
              id="new-password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Ít nhất 8 ký tự"
              error={errors.new}
              showStrength
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Xác nhận mật khẩu mới
            </label>
            <PasswordInput
              id="confirm-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Nhập lại mật khẩu mới"
              error={errors.confirm}
            />
          </div>

          <div className="flex-1"></div>

          {/* DLS: Primary button - solid bg, scale on hover */}
          <button
            type="submit"
            className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Lưu thay đổi
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
