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
      {/* DLS: Flat card - no shadow */}
      <div className="w-full max-w-[440px] bg-white rounded-xl p-12">
        {/* DLS: Progress dots - solid colors */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>

        <div className="text-center mb-10">
          <div className="text-6xl mb-6">👋</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bạn tên gì?</h1>
          <p className="text-gray-500">Tên này sẽ hiển thị trên ứng dụng</p>
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
            placeholder="Ví dụ: Minh"
            className="w-full h-14 px-5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all duration-200"
          />
          {error && <p className="text-sm text-error">{error}</p>}
        </div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
