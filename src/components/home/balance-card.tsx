import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { monthlyBalance } from '@/data/mock';
import { formatMoney } from '@/utils/format';
import { useProfile } from '@/state/profile';

export function BalanceCard() {
  const { currency } = useProfile();

  return (
    <View style={styles.card}>
      <Text style={styles.caption}>Balance of month</Text>
      <Text style={styles.balance}>{formatMoney(monthlyBalance.balance, currency)}</Text>

      <View style={styles.breakdown}>
        <View style={styles.column}>
          <Text style={styles.caption}>Income</Text>
          <Text style={styles.amount}>{formatMoney(monthlyBalance.income, currency)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.caption}>Outcome</Text>
          <Text style={styles.amount}>{formatMoney(monthlyBalance.outcome, currency)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: 11.5,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: Colors.onPrimaryMuted,
  },
  balance: {
    fontFamily: FontFamily.extraBold,
    fontSize: 32,
    letterSpacing: -0.5,
    color: Colors.white,
  },
  breakdown: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  column: {
    flex: 1,
    gap: Spacing.sm,
  },
  amount: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.white,
  },
});
