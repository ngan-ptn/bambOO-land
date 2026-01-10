import type { Category } from '../../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategorySelect(null)}
        className={`pill whitespace-nowrap transition-colors duration-150 ${
          selectedCategory === null
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`pill whitespace-nowrap transition-colors duration-150 ${
            selectedCategory === category.id
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
          }`}
        >
          {category.name_vi}
        </button>
      ))}
    </div>
  );
}
