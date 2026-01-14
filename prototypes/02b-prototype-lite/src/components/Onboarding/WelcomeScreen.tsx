/**
 * WelcomeScreen - Onboarding step 1/4
 */

import { useNavigate } from 'react-router-dom'

export function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      <div className="w-full max-w-[440px] bg-background rounded-lg shadow-none p-12">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        <div className="text-center mb-10">
          <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center text-7xl">
            🥗
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chào mừng bạn!</h1>
          <p className="text-foreground-muted">Hãy cùng thiết lập hồ sơ để bắt đầu</p>
        </div>

        <button
          onClick={() => navigate('/onboarding/name')}
          className="w-full h-14 bg-blue-500 text-white font-semibold rounded-lg shadow-none hover:shadow-none  transition-all flex items-center justify-center gap-2"
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
