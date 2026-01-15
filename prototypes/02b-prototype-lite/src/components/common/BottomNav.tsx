/**
 * BottomNav - Bottom navigation bar for main app sections
 * Supports: Today (Dashboard), Log, Household, Settings
 */

import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

type NavItem = {
  path: string
  label: string
  icon: string
  activeIcon: string
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Today', icon: '🏠', activeIcon: '🏠' },
  { path: '/household', label: 'Household', icon: '👥', activeIcon: '👥' },
  { path: '/profile', label: 'Settings', icon: '⚙️', activeIcon: '⚙️' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-card border-t border-brown-20 z-40">
      <div className="max-w-[1000px] mx-auto flex justify-around items-center py-2 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                'min-w-[72px]',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground-muted hover:text-foreground hover:bg-brown-10'
              )}
            >
              <span className="text-xl">{isActive ? item.activeIcon : item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
