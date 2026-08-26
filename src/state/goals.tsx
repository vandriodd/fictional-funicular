import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

import { goals as seedGoals, type Goal } from '@/data/mock';

type NewGoal = Omit<Goal, 'id' | 'openingSpent'>;

type GoalsContextValue = {
  goals: Goal[];
  addGoal: (goal: NewGoal) => void;
  updateGoal: (id: string, goal: NewGoal) => void;
  removeGoal: (id: string) => void;
};

const GoalsContext = createContext<GoalsContextValue | null>(null);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(seedGoals);

  const addGoal = useCallback((goal: NewGoal) => {
    setGoals((current) => [...current, { ...goal, id: `goal-${current.length + 1}`, openingSpent: 0 }]);
  }, []);

  const updateGoal = useCallback((id: string, goal: NewGoal) => {
    setGoals((current) =>
      current.map((existing) => (existing.id === id ? { ...existing, ...goal } : existing)),
    );
  }, []);

  const removeGoal = useCallback((id: string) => {
    setGoals((current) => current.filter((existing) => existing.id !== id));
  }, []);

  const value = useMemo(
    () => ({ goals, addGoal, updateGoal, removeGoal }),
    [goals, addGoal, updateGoal, removeGoal],
  );

  return <GoalsContext value={value}>{children}</GoalsContext>;
}

export function useGoals() {
  const value = use(GoalsContext);
  if (!value) {
    throw new Error('useGoals must be used inside a GoalsProvider');
  }
  return value;
}
