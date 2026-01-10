import type { Food } from '../../types';

interface FoodTileProps {
  food: Food;
  onClick: (food: Food) => void;
}

export function FoodTile({ food, onClick }: FoodTileProps) {
  const minKcal = food.portions.S.kcal;
  const maxKcal = food.portions.L.kcal;

  return (
    <button
      onClick={() => onClick(food)}
      className="card p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow duration-150 active:scale-[0.98]"
    >
      <span className="text-3xl">{getCategoryEmoji(food.category)}</span>
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-2">
          {food.name_vi}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
          {minKcal}-{maxKcal} kcal
        </p>
      </div>
    </button>
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
