import { useState } from 'react';
import type { Food, PortionSize } from '../types';
import { useFoods, useRecentFoods } from '../hooks';
import { Header } from '../components/shared';
import {
  SearchBar,
  CategoryTabs,
  RecentSection,
  FoodGrid,
  PortionSheet,
} from '../components/quick-add';

interface QuickAddPageProps {
  onLogFood: (foodId: string, portion: PortionSize) => Promise<void>;
}

export function QuickAddPage({ onLogFood }: QuickAddPageProps) {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredFoods,
  } = useFoods();

  const { recentFoods, refresh: refreshRecent } = useRecentFoods();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
  };

  const handlePortionSelect = async (portion: PortionSize) => {
    if (!selectedFood) return;

    await onLogFood(selectedFood.id, portion);
    setSelectedFood(null);
    refreshRecent();
  };

  const handleCloseSheet = () => {
    setSelectedFood(null);
  };

  return (
    <div className="flex-1 flex flex-col pb-20">
      <Header title="Add Food" />

      <div className="flex-1 overflow-y-auto px-5">
        {/* Search */}
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Vietnamese foods..."
          />
        </div>

        {/* Category tabs */}
        <div className="mb-4">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Recent foods */}
        {!searchQuery && !selectedCategory && (
          <RecentSection foods={recentFoods} onFoodSelect={handleFoodSelect} />
        )}

        {/* Food grid */}
        <FoodGrid foods={filteredFoods} onFoodSelect={handleFoodSelect} />
      </div>

      {/* Portion picker sheet */}
      {selectedFood && (
        <PortionSheet
          food={selectedFood}
          onSelect={handlePortionSelect}
          onClose={handleCloseSheet}
        />
      )}
    </div>
  );
}
