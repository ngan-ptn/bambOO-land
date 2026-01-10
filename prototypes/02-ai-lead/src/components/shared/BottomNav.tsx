interface BottomNavProps {
  activeTab: 'dashboard' | 'add';
  onTabChange: (tab: 'dashboard' | 'add') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] safe-bottom">
      <div className="flex max-w-md mx-auto">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors duration-150 ${
            activeTab === 'dashboard'
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="14" y="3" width="7" height="5" rx="1" />
            <rect x="14" y="12" width="7" height="9" rx="1" />
            <rect x="3" y="16" width="7" height="5" rx="1" />
          </svg>
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => onTabChange('add')}
          className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors duration-150 ${
            activeTab === 'add'
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="text-xs font-medium">Add</span>
        </button>
      </div>
    </nav>
  );
}
