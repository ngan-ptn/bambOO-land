import type { Food } from '../../types';

interface RecentSectionProps {
  foods: Food[];
  onFoodSelect: (food: Food) => void;
}

export function RecentSection({ foods, onFoodSelect }: RecentSectionProps) {
  if (foods.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
        Recent
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {foods.map((food) => (
          <button
            key={food.id}
            onClick={() => onFoodSelect(food)}
            className="flex-shrink-0 card px-4 py-3 flex items-center gap-2 hover:shadow-md transition-shadow duration-150"
          >
            <span className="text-xl">{getCategoryEmoji(food.category)}</span>
            <div className="text-left">
              <p className="text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                {food.name_vi}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {food.portions.M.kcal} kcal
              </p>
            </div>
          </button>
        ))}
      </div>
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
