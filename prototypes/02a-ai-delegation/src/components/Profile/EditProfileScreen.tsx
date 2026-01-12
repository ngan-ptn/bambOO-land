/**
 * EditProfileScreen - Edit user profile name
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { validateName } from '@/auth/validation'

export function EditProfileScreen() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuthContext()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  const handleSave = async () => {
    const validation = validateName(name)
    if (!validation.isValid) {
      setError(validation.error!)
      return
    }

    await updateUser({
      name,
      avatar: name[0]?.toUpperCase() || '👤',
    })

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
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa hồ sơ</h1>
        </div>

        <div className="space-y-2 mb-8">
          <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
            Tên hiển thị
          </label>
          {/* DLS: Gray bg input, no border, focus shows ring */}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder="Nhập tên của bạn"
            className="w-full h-14 px-5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all duration-200"
          />
          {error && <p className="text-sm text-error">{error}</p>}
        </div>

        <div className="flex-1"></div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          onClick={handleSave}
          className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Lưu thay đổi
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
