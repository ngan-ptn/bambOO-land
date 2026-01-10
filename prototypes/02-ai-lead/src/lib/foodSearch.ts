export interface SearchableFood {
  id: string
  name_vi: string
  name_en: string
}

export function normalizeSearchText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function filterFoods<T extends SearchableFood>({
  foods,
  query,
}: {
  foods: T[]
  query: string
}): T[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return foods

  return foods.filter((food) => {
    const vi = normalizeSearchText(food.name_vi)
    const en = normalizeSearchText(food.name_en)
    return vi.includes(normalizedQuery) || en.includes(normalizedQuery)
  })
}

