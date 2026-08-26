import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionFilterMenu, type MovementFilter } from '@/components/history/transaction-filter';
import { Emoji } from '@/components/ui/emoji';
import { ChevronLeftIcon, SearchIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, ScreenPadding, Shadows, Spacing } from '@/constants/theme';
import type { Transaction } from '@/data/mock';
import { useCategories } from '@/state/categories';
import { useMoney } from '@/hooks/use-money';
import { useTransactions } from '@/state/transactions';

type DateGroup = {
  date: string;
  items: Transaction[];
};

/** Keeps the list's newest-first order while collecting each day together. */
function groupByDate(items: Transaction[]): DateGroup[] {
  const groups: DateGroup[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.date === item.date) {
      last.items.push(item);
    } else {
      groups.push({ date: item.date, items: [item] });
    }
  }
  return groups;
}

function matches(transaction: Transaction, categoryLabel: string, query: string) {
  const haystack = [transaction.title, categoryLabel, String(Math.abs(transaction.amount))]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const money = useMoney();
  const { getCategory } = useCategories();
  const category = getCategory(transaction.categoryId);
  const isIncoming = transaction.amount > 0;

  return (
    <View style={styles.card}>
      <View style={styles.emojiTile}>
        <Emoji char={transaction.emoji ?? category.emoji} size={24} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.category}>{category.label}</Text>
      </View>
      <Text style={[styles.amount, isIncoming && styles.amountIncoming]}>
        {money.formatSigned(transaction.amount, transaction.currency)}
      </Text>
    </View>
  );
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { transactions } = useTransactions();
  const { getCategory } = useCategories();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<MovementFilter>('all');

  const groups = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      if (filter === 'income' && transaction.amount <= 0) return false;
      if (filter === 'outcome' && transaction.amount > 0) return false;
      return (
        query.trim().length === 0 ||
        matches(transaction, getCategory(transaction.categoryId).label, query)
      );
    });
    return groupByDate(filtered);
  }, [transactions, query, filter, getCategory]);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.sm }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <ChevronLeftIcon size={22} color={Colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>History</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchField}>
            <SearchIcon size={20} color={Colors.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Item, amount..."
              placeholderTextColor={Colors.textSecondary}
              selectionColor={Colors.primary}
              style={styles.searchInput}
              accessibilityLabel="Search movements"
              returnKeyType="search"
            />
          </View>
          <TransactionFilterMenu value={filter} onChange={setFilter} />
        </View>

        {groups.length === 0 ? (
          <Text style={styles.empty}>No movements match that search.</Text>
        ) : (
          groups.map((group) => (
            <View key={group.date} style={styles.group}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupDate}>{group.date.toUpperCase()}</Text>
                <View style={styles.groupRule} />
              </View>
              {group.items.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
    gap: Spacing.xl,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  headerTitle: {
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    height: 52,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
  group: {
    gap: Spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  groupDate: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.8,
    color: Colors.textSecondary,
  },
  groupRule: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  emojiTile: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.ink,
  },
  category: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  amount: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  amountIncoming: {
    color: Colors.primary,
  },
  empty: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingTop: Spacing.xxl,
  },
});
