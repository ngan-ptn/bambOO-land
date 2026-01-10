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
        className="w-full max-w-[400px] bg-white rounded-3xl p-7 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center text-3xl">
          👋
        </div>
        <h3 className="text-xl font-bold text-foreground text-center mb-2">Đăng xuất?</h3>
        <p className="text-foreground-muted text-center mb-6">
          Bạn có chắc muốn đăng xuất khỏi tài khoản?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 bg-background rounded-xl font-semibold text-foreground hover:bg-border transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 h-12 bg-error rounded-xl font-semibold text-white hover:bg-error/90 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}
