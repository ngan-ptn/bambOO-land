/**
 * NameScreen - Onboarding step 2/4
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateName } from '@/auth/validation'

export function NameScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    const validation = validateName(name)
    if (!validation.isValid) {
      setError(validation.error!)
      return
    }

    // Store name in sessionStorage temporarily during onboarding
    sessionStorage.setItem('onboarding_name', name)
    navigate('/onboarding/goal')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      <div className="w-full max-w-[440px] bg-background rounded-lg shadow-none p-12">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">👋</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bạn tên gì?</h1>
          <p className="text-foreground-muted">Tên này sẽ hiển thị trên ứng dụng</p>
        </div>

        <div className="space-y-2 mb-8">
          <label className="block text-xs font-semibold text-foreground uppercase tracking-wide">
            Tên hiển thị
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder="Ví dụ: Minh"
            className="w-full h-14 px-5 rounded-lg border-2 border-border bg-white text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
          />
          {error && <p className="text-sm text-error">{error}</p>}
        </div>

        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full h-14 bg-blue-500 text-white font-semibold rounded-lg shadow-none hover:shadow-none  transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Tiếp tục
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
