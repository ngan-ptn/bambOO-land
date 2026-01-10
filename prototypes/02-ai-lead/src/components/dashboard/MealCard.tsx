import type { FoodLog } from '../../types';
import { useFoodById } from '../../hooks';
import { format } from 'date-fns';

interface MealCardProps {
  log: FoodLog;
  onDelete: (logId: string) => void;
}

export function MealCard({ log, onDelete }: MealCardProps) {
  const food = useFoodById(log.food_id);

  if (!food) return null;

  const time = format(new Date(log.logged_at), 'HH:mm');

  return (
    <div className="card p-4 flex items-center gap-3">
      <span className="text-2xl">{getCategoryEmoji(food.category)}</span>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)] truncate">
          {food.name_vi}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {log.portion} · {time}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-[var(--color-text-primary)]">
          {log.kcal}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">kcal</p>
      </div>

      <button
        onClick={() => onDelete(log.id)}
        className="p-2 text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
        aria-label="Delete"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="3,6 5,6 21,6" />
          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
        </svg>
      </button>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    noodles: '🍜',
    rice: '🍚',
    banh_mi: '🥖',
    snacks: '🥟',
    drinks: '🧋',
    desserts: '🍮',
    clean_eating: '🥗',
  };
  return emojiMap[category] || '🍽️';
}
