/**
 * ProfileScreen - View and navigate to edit screens
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import { LogoutModal } from '@/components/Auth/LogoutModal'

export function ProfileScreen() {
  const navigate = useNavigate()
  const { user, profile } = useAuthContext()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  if (!profile) {
    navigate('/onboarding/welcome')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-[440px] mx-auto">
        {/* DLS: Flat back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 px-4 py-2 bg-white rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2 text-gray-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại
        </button>

        <div className="text-center mb-8">
          {/* DLS: Solid color avatar */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
            {user.avatar}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* DLS: Solid primary color card, scale on hover */}
        <div
          onClick={() => navigate('/profile/edit-goals')}
          className="bg-primary text-white rounded-xl p-6 mb-6 cursor-pointer hover:scale-[1.02] transition-all duration-200"
        >
          <div className="text-xs font-semibold uppercase opacity-90 mb-2">Mục tiêu hàng ngày</div>
          <div className="text-5xl font-bold mb-1">{profile.dailyCalories}</div>
          <div className="opacity-90">kcal / ngày</div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
            <span className="text-xl">{profile.goalIcon}</span>
            <span>{profile.goalText}</span>
          </div>
        </div>

        {/* DLS: Flat menu cards */}
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <button
            onClick={() => navigate('/profile/edit')}
            className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 border-b border-gray-200"
          >
            <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center text-xl">👤</div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Thông tin cá nhân</div>
              <div className="text-sm text-gray-500">Tên, ảnh đại diện</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          <button
            onClick={() => navigate('/profile/change-password')}
            className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
          >
            <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🔐</div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">Đổi mật khẩu</div>
              <div className="text-sm text-gray-500">Cập nhật mật khẩu bảo mật</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* DLS: Secondary button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full mt-6 h-14 bg-gray-100 rounded-lg text-gray-500 font-semibold hover:bg-gray-200 hover:text-error hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Đăng xuất
        </button>

        <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </div>
    </div>
  )
}
