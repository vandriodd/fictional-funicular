import { StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/goals/progress-bar';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { useMoney } from '@/hooks/use-money';

export function BudgetCard({ limit, spent }: { limit: number; spent: number }) {
  const money = useMoney();
  const available = Math.max(0, limit - spent);

  return (
    <View style={styles.card}>
      <Text style={styles.caption}>Total budget</Text>
      <Text style={styles.amount}>{money.format(limit)}</Text>

      <ProgressBar
        ratio={limit === 0 ? 0 : spent / limit}
        color={Colors.white}
        trackColor="rgba(255, 255, 255, 0.32)"
      />

      <View style={styles.row}>
        <Text style={styles.detail}>Spent: {money.format(spent)}</Text>
        <Text style={styles.detail}>Available: {money.format(available)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: 11.5,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: Colors.onPrimaryMuted,
  },
  amount: {
    fontFamily: FontFamily.extraBold,
    fontSize: 28,
    letterSpacing: -0.5,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.onPrimaryMuted,
  },
});
