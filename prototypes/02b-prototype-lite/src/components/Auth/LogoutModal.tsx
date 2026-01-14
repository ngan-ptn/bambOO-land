/**
 * LogoutModal - Confirmation modal before logout
 */

import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const navigate = useNavigate()
  const { logout } = useAuthContext()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/login')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end justify-center p-5 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] bg-white rounded-lg p-7 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-3xl">
          👋
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Đăng xuất?</h3>
        <p className="text-gray-500 text-center mb-6">
          Bạn có chắc muốn đăng xuất khỏi tài khoản?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 bg-gray-100 rounded-md font-semibold text-gray-900 hover:bg-gray-200 transition-all duration-200"
          >
            Hủy
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 h-12 bg-red-600 rounded-md font-semibold text-white hover:bg-red-700 transition-all duration-200"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}
