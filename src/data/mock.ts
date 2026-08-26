/**
 * Mock data for the UI pass. Swap these for real queries once the API exists.
 */

import type { CurrencyCode } from '@/constants/currencies';
import { Colors } from '@/constants/theme';

export const user = {
  firstName: 'Sofía',
  fullName: 'Sofía García',
  email: 'sofiagarcia@fictional.com',
  avatarUrl: 'https://i.pravatar.cc/160?img=47',
  unreadNotifications: 2,
};

/** Summary figures are held in the account's base currency. */
export const monthlyBalance = {
  balance: 246_800,
  income: 285_000,
  outcome: 38_200,
};

export type ExpenseCategory = {
  label: string;
  value: number;
  color: string;
};

/** Sums to `monthlyBalance.outcome`. */
export const expensesByCategory: ExpenseCategory[] = [
  { label: 'Food', value: 18_400, color: Colors.primary },
  { label: 'Home', value: 12_600, color: Colors.primaryLight },
  { label: 'Clothes', value: 7_200, color: Colors.accent },
];

export type Category = {
  id: string;
  label: string;
  emoji: string;
};

/** Offered when creating a movement. */
export const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'games', label: 'Games', emoji: '🎮' },
  { id: 'clothes', label: 'Clothes', emoji: '👕' },
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'other', label: 'Other', emoji: '❓' },
];

export type Transaction = {
  id: string;
  title: string;
  date: string;
  /** Signed: positive is money in, negative is money out. */
  amount: number;
  /** The currency the movement was created in. Display converts from this. */
  currency: CurrencyCode;
  categoryId: string;
};

export const recentTransactions: Transaction[] = [
  { id: 'txn-1', title: 'Salary', date: 'Aug 22, 2026', amount: 185_000, currency: 'MUR', categoryId: 'other' },
  { id: 'txn-2', title: 'Netflix', date: 'Aug 21, 2026', amount: -520, currency: 'MUR', categoryId: 'games' },
  { id: 'txn-3', title: 'Uber', date: 'Aug 20, 2026', amount: -320, currency: 'MUR', categoryId: 'other' },
  { id: 'txn-4', title: 'Refund · Zara', date: 'Aug 18, 2026', amount: 1_250, currency: 'MUR', categoryId: 'clothes' },
];

export type DailySpend = {
  label: string;
  value: number;
};

export const last7Days: DailySpend[] = [
  { label: 'Aug 16', value: 2_450 },
  { label: 'Aug 17', value: 7_000 },
  { label: 'Aug 18', value: 12_400 },
  { label: 'Aug 19', value: 4_850 },
  { label: 'Aug 20', value: 7_000 },
  { label: 'Aug 21', value: 7_050 },
  { label: 'Aug 22', value: 7_100 },
];

/** Shown until someone picks another emoji. */
export const DEFAULT_AVATAR_EMOJI = '🐙';

/** Grid offered by the "Change profile icon" sheet. */
export const PROFILE_EMOJIS = [
  '🐙', '🦊', '🐼', '🦁', '🐸', '🐧',
  '🦄', '🐝', '🦋', '🐳', '🌵', '🍄',
  '🌻', '🍕', '🚀', '⚡', '🎧', '🎸',
  '🏀', '⚽', '🧠', '👾', '🎨', '✨',
];
