import { useCallback } from 'react';

import { convert } from '@/constants/currencies';
import type { Goal } from '@/data/mock';
import { useTransactions } from '@/state/transactions';

/**
 * A goal's spend is whatever has gone out in its category, converted into the
 * goal's currency. Income in the same category (a refund) nets back off it.
 */
export function useGoalSpend() {
  const { transactions } = useTransactions();

  return useCallback(
    (goal: Pick<Goal, 'categoryId' | 'currency' | 'openingSpent'>) => {
      const fromTransactions = transactions
        .filter((transaction) => transaction.categoryId === goal.categoryId)
        .reduce(
          (total, transaction) =>
            total + convert(-transaction.amount, transaction.currency, goal.currency),
          0,
        );
      return Math.max(0, goal.openingSpent + fromTransactions);
    },
    [transactions],
  );
}
