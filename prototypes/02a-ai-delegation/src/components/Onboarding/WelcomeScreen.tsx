/**
 * WelcomeScreen - Onboarding step 1/4
 */

import { useNavigate } from 'react-router-dom'

export function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      {/* DLS: Flat card - no shadow */}
      <div className="w-full max-w-[440px] bg-white rounded-xl p-12">
        {/* DLS: Progress dots - solid colors */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>

        <div className="text-center mb-10">
          {/* DLS: Solid color circle instead of gradient */}
          <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center text-7xl">
            🥗
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng bạn!</h1>
          <p className="text-gray-500">Hãy cùng thiết lập hồ sơ để bắt đầu</p>
        </div>

        {/* DLS: Primary button - solid bg, scale on hover */}
        <button
          onClick={() => navigate('/onboarding/name')}
          className="w-full h-14 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Bắt đầu
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
