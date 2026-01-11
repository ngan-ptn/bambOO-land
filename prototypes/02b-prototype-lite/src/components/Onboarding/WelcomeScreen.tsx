/**
 * WelcomeScreen - Onboarding step 1/4
 */

import { useNavigate } from 'react-router-dom'

export function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-b from-[#E8E4DE] to-[#D8D4CE]">
      <div className="w-full max-w-[440px] bg-background rounded-3xl shadow-xl p-12">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-6 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        <div className="text-center mb-10">
          <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F0F5EE] to-[#E8F0E6] flex items-center justify-center text-7xl">
            🥗
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chào mừng bạn!</h1>
          <p className="text-foreground-muted">Hãy cùng thiết lập hồ sơ để bắt đầu</p>
        </div>

        <button
          onClick={() => navigate('/onboarding/name')}
          className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
