import { useState, useMemo } from 'react';
import type { Food, Category } from '../types';
import foodData from '../data/foods.json';

interface UseFoodsReturn {
  foods: Food[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredFoods: Food[];
}

export function useFoods(): UseFoodsReturn {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const foods = foodData.foods as Food[];
  const categories = foodData.categories as Category[];

  const filteredFoods = useMemo(() => {
    let result = foods;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((food) => food.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (food) =>
          food.name_vi.toLowerCase().includes(query) ||
          food.name_en.toLowerCase().includes(query)
      );
    }

    return result;
  }, [foods, selectedCategory, searchQuery]);

  return {
    foods,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredFoods,
  };
}

export function useFoodById(foodId: string): Food | undefined {
  return useMemo(() => {
    return (foodData.foods as Food[]).find((f) => f.id === foodId);
  }, [foodId]);
}
