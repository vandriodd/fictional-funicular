import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ArrowDownIcon, ArrowUpIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';
import type { Transaction } from '@/data/mock';
import { useMoney } from '@/hooks/use-money';
import { useTransactions } from '@/state/transactions';

function TransactionRow({ transaction, isLast }: { transaction: Transaction; isLast: boolean }) {
  const money = useMoney();
  const isIncoming = transaction.amount > 0;
  const Arrow = isIncoming ? ArrowUpIcon : ArrowDownIcon;

  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <View
        style={[
          styles.iconPill,
          { backgroundColor: isIncoming ? Colors.primarySurface : Colors.accentSurface },
        ]}>
        <Arrow size={17} color={isIncoming ? Colors.primary : Colors.accent} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>

      <Text style={[styles.amount, isIncoming && styles.amountIncoming]}>
        {money.formatSigned(transaction.amount, transaction.currency)}
      </Text>
    </View>
  );
}

export function RecentTransactions() {
  const { transactions } = useTransactions();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>Recent transactions</Text>
        <Pressable accessibilityRole="button" hitSlop={8}>
          <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        {transactions.slice(0, 4).map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            isLast={index === Math.min(transactions.length, 4) - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    letterSpacing: -0.2,
    color: Colors.ink,
  },
  viewAll: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    ...Shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
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
  date: {
    fontFamily: FontFamily.regular,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  amount: {
    fontFamily: FontFamily.bold,
    fontSize: 14.5,
    color: Colors.ink,
  },
  amountIncoming: {
    color: Colors.primary,
  },
});
