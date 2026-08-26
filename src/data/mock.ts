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

export type ExpenseSlice = {
  categoryId: string;
  value: number;
};

/** Sums to `monthlyBalance.outcome`. */
export const expensesByCategory: ExpenseSlice[] = [
  { categoryId: 'food', value: 18_400 },
  { categoryId: 'home', value: 12_600 },
  { categoryId: 'clothes', value: 7_200 },
];

export type Category = {
  id: string;
  label: string;
  emoji: string;
  /** Identity colour — what the category is drawn with in charts. */
  color: string;
  /** Custom categories are the ones the user created and can edit. */
  isCustom?: boolean;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', label: 'Food', emoji: '🍔', color: Colors.primary },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎮', color: Colors.primaryLight },
  { id: 'clothes', label: 'Clothes', emoji: '👕', color: Colors.accent },
  { id: 'home', label: 'Home', emoji: '🏠', color: Colors.primaryLight },
  { id: 'health', label: 'Health', emoji: '💊', color: Colors.primary },
  { id: 'transport', label: 'Transport', emoji: '🚗', color: Colors.accentLight },
  { id: 'groceries', label: 'Groceries', emoji: '🛒', color: Colors.primaryLight },
  { id: 'dessert', label: 'Dessert', emoji: '🍰', color: Colors.accentLight },
  { id: 'utilities', label: 'Utilities', emoji: '💡', color: Colors.primary },
  { id: 'income', label: 'Income', emoji: '💰', color: Colors.primary },
  { id: 'other', label: 'Other', emoji: '❓', color: Colors.ink },
];

/** Seeded so the Categories screen has something under CUSTOM. */
export const SEED_CUSTOM_CATEGORIES: Category[] = [
  { id: 'subscriptions', label: 'Subscriptions', emoji: '💳', color: Colors.primary, isCustom: true },
  { id: 'holberton', label: 'Holberton', emoji: '🎓', color: Colors.accent, isCustom: true },
];

/** Icons offered when creating a category, grouped so the list stays browsable. */
export const CATEGORY_ICON_GROUPS: { label: string; icons: string[] }[] = [
  { label: 'Money', icons: ['💰', '💳', '🧾', '🏦', '💵', '🪙', '📈', '🎁', '💎', '🏧', '📊', '🤑'] },
  { label: 'Food & drink', icons: ['🍔', '🍕', '🥗', '🍰', '☕', '🍺', '🛒', '🍜', '🥐', '🍣', '🍫', '🥤'] },
  { label: 'Home & bills', icons: ['🏠', '💡', '🚿', '🔌', '🧹', '🛋️', '🔧', '📱', '📶', '🔑', '🪴', '🧺'] },
  { label: 'Transport', icons: ['🚗', '🚌', '✈️', '⛽', '🚲', '🚕', '🛵', '🅿️', '🚆', '🛳️', '🛞', '🗺️'] },
  { label: 'Health', icons: ['💊', '🏥', '🦷', '🧘', '🩺', '💪', '🧴', '🤒', '🏋️', '🥑', '😴', '🧠'] },
  { label: 'Fun', icons: ['🎮', '🎬', '🎧', '🎸', '⚽', '🎨', '📚', '🎟️', '🏀', '🎲', '🎤', '📷'] },
  { label: 'Life', icons: ['👕', '👟', '🎓', '🐶', '🌱', '✂️', '🧳', '🛡️', '👶', '🎂', '💐', '🐱'] },
  { label: 'Other', icons: ['⭐', '❤️', '🔥', '✨', '📌', '🧩', '🪄', '❓', '🔔', '🏷️', '📎', '🌀'] },
];

export const CATEGORY_ICONS = CATEGORY_ICON_GROUPS.flatMap((group) => group.icons);

/** Colours offered when creating a category. Brand colours lead the palette. */
export const CATEGORY_COLORS = [
  Colors.primary,
  Colors.primaryLight,
  Colors.accent,
  Colors.accentLight,
  Colors.ink,
  '#5B21B6',
  '#3B82F6',
  '#0EA5E9',
  '#06B6D4',
  '#10B981',
  '#22C55E',
  '#84CC16',
  '#EAB308',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#A855F7',
  '#64748B',
];

/** The five tiles offered on the New Movement screen. */
export const QUICK_CATEGORY_IDS = ['food', 'entertainment', 'clothes', 'home', 'other'];

export type Transaction = {
  id: string;
  title: string;
  date: string;
  /** Signed: positive is money in, negative is money out. */
  amount: number;
  /** The currency the movement was created in. Display converts from this. */
  currency: CurrencyCode;
  categoryId: string;
  /** Merchant-specific icon; falls back to the category's emoji. */
  emoji?: string;
};

export const transactions: Transaction[] = [
  { id: 'txn-1', title: 'Salary', date: 'Aug 22, 2026', amount: 185_000, currency: 'MUR', categoryId: 'income' },
  { id: 'txn-2', title: 'Burger King', date: 'Aug 22, 2026', amount: -450, currency: 'MUR', categoryId: 'food' },
  { id: 'txn-3', title: 'Winners Supermarket', date: 'Aug 22, 2026', amount: -2_150, currency: 'MUR', categoryId: 'groceries' },
  { id: 'txn-4', title: 'Uber', date: 'Aug 22, 2026', amount: -320, currency: 'MUR', categoryId: 'transport' },
  { id: 'txn-5', title: 'Netflix', date: 'Aug 22, 2026', amount: -520, currency: 'MUR', categoryId: 'entertainment' },
  { id: 'txn-6', title: 'Pharmacie Centrale', date: 'Aug 22, 2026', amount: -890, currency: 'MUR', categoryId: 'health' },
  { id: 'txn-7', title: 'Café Lux', date: 'Aug 22, 2026', amount: -180, currency: 'MUR', categoryId: 'dessert' },
  { id: 'txn-8', title: 'Refund · Zara', date: 'Aug 18, 2026', amount: 1_250, currency: 'MUR', categoryId: 'clothes' },
  { id: 'txn-9', title: 'CEB Electricity', date: 'Aug 15, 2026', amount: -1_750, currency: 'MUR', categoryId: 'utilities' },
  { id: 'txn-10', title: 'Zara', date: 'Aug 15, 2026', amount: -2_400, currency: 'MUR', categoryId: 'clothes' },
  { id: 'txn-11', title: 'Emtel Mobile', date: 'Aug 15, 2026', amount: -650, currency: 'MUR', categoryId: 'utilities', emoji: '📱' },
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
