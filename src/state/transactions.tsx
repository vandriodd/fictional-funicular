import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

import { transactions as seedTransactions, type Transaction } from '@/data/mock';

type TransactionsContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

function today() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions((current) => [
      { ...transaction, id: `txn-${current.length + 1}-${transaction.title}`, date: today() },
      ...current,
    ]);
  }, []);

  const value = useMemo(() => ({ transactions, addTransaction }), [transactions, addTransaction]);

  return <TransactionsContext value={value}>{children}</TransactionsContext>;
}

export function useTransactions() {
  const value = use(TransactionsContext);
  if (!value) {
    throw new Error('useTransactions must be used inside a TransactionsProvider');
  }
  return value;
}
