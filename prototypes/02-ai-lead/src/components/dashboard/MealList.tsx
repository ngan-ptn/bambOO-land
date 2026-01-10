import type { FoodLog } from '../../types';
import { MealCard } from './MealCard';

interface MealListProps {
  logs: FoodLog[];
  onDelete: (logId: string) => void;
}

export function MealList({ logs, onDelete }: MealListProps) {
  if (logs.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-[var(--color-text-secondary)]">
        Today's Meals ({logs.length})
      </h2>
      <div className="space-y-2">
        {logs.map((log) => (
          <MealCard key={log.id} log={log} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
