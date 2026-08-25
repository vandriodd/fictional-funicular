import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BalanceCard } from '@/components/home/balance-card';
import { ExpensesByCategory } from '@/components/home/expenses-by-category';
import { HomeHeader } from '@/components/home/home-header';
import { RecentTransactions } from '@/components/home/recent-transactions';
import { WeeklySpending } from '@/components/home/weekly-spending';
import { Wave } from '@/components/ui/wave';
import { Colors, ScreenPadding, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
          <HomeHeader />
          <BalanceCard />
        </View>
        <Wave color={Colors.primarySurface} />

        <View style={styles.sections}>
          <ExpensesByCategory />
          <RecentTransactions />
          <WeeklySpending />
        </View>
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
    paddingBottom: Spacing.xl,
  },
  header: {
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xs,
    gap: Spacing.lg,
  },
  sections: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.sm,
    gap: Spacing.xxl,
  },
});
