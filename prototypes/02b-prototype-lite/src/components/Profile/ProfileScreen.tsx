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
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[440px] mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 px-4 py-2 bg-white rounded-chip shadow-tile hover:bg-gray-10 transition-colors flex items-center gap-2 text-foreground-muted"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Quay lại
        </button>

        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center text-4xl font-bold shadow-card">
            {user.avatar}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-foreground-muted">{user.email}</p>
        </div>

        <div
          onClick={() => navigate('/profile/edit-goals')}
          className="bg-primary text-white rounded-card p-6 mb-6 cursor-pointer hover:shadow-card transition-all"
        >
          <div className="text-xs font-semibold uppercase opacity-90 mb-2">Mục tiêu hàng ngày</div>
          <div className="text-5xl font-bold mb-1">{profile.dailyCalories}</div>
          <div className="opacity-90">kcal / ngày</div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
            <span className="text-xl">{profile.goalIcon}</span>
            <span>{profile.goalText}</span>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card overflow-hidden mb-6">
          <button
            onClick={() => navigate('/profile/edit')}
            className="w-full p-5 flex items-center gap-4 hover:bg-gray-10 transition-colors border-b border-border"
          >
            <div className="w-11 h-11 bg-background rounded-chip flex items-center justify-center text-xl">👤</div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-foreground">Thông tin cá nhân</div>
              <div className="text-sm text-foreground-muted">Tên, ảnh đại diện</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          <button
            onClick={() => navigate('/profile/change-password')}
            className="w-full p-5 flex items-center gap-4 hover:bg-gray-10 transition-colors"
          >
            <div className="w-11 h-11 bg-background rounded-chip flex items-center justify-center text-xl">🔐</div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-foreground">Đổi mật khẩu</div>
              <div className="text-sm text-foreground-muted">Cập nhật mật khẩu bảo mật</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full mt-6 h-14 bg-background rounded-card text-foreground-muted font-semibold hover:bg-gray-20 hover:text-secondary transition-all flex items-center justify-center gap-2"
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
