import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

import {
  DEFAULT_CATEGORIES,
  SEED_CUSTOM_CATEGORIES,
  type Category,
} from '@/data/mock';

type NewCategory = Pick<Category, 'label' | 'emoji' | 'color'>;

type CategoriesContextValue = {
  /** Defaults first, then the user's own. */
  categories: Category[];
  defaultCategories: Category[];
  customCategories: Category[];
  getCategory: (id: string) => Category;
  addCategory: (category: NewCategory) => void;
  updateCategory: (id: string, category: NewCategory) => void;
};

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

function slugify(label: string) {
  return label.trim().toLowerCase().replace(/\s+/g, '-');
}

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [customCategories, setCustomCategories] = useState<Category[]>(SEED_CUSTOM_CATEGORIES);

  const addCategory = useCallback((category: NewCategory) => {
    setCustomCategories((current) => [
      ...current,
      { ...category, id: `${slugify(category.label)}-${current.length}`, isCustom: true },
    ]);
  }, []);

  const updateCategory = useCallback((id: string, category: NewCategory) => {
    setCustomCategories((current) =>
      current.map((existing) => (existing.id === id ? { ...existing, ...category } : existing)),
    );
  }, []);

  const value = useMemo(() => {
    const categories = [...DEFAULT_CATEGORIES, ...customCategories];
    return {
      categories,
      defaultCategories: DEFAULT_CATEGORIES,
      customCategories,
      getCategory: (id: string) =>
        categories.find((category) => category.id === id) ??
        DEFAULT_CATEGORIES[DEFAULT_CATEGORIES.length - 1],
      addCategory,
      updateCategory,
    };
  }, [customCategories, addCategory, updateCategory]);

  return <CategoriesContext value={value}>{children}</CategoriesContext>;
}

export function useCategories() {
  const value = use(CategoriesContext);
  if (!value) {
    throw new Error('useCategories must be used inside a CategoriesProvider');
  }
  return value;
}
