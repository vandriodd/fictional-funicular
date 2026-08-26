import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BudgetCard } from '@/components/goals/budget-card';
import { GoalCard } from '@/components/goals/goal-card';
import { ChevronLeftIcon, PlusIcon } from '@/components/ui/icons';
import { Wave } from '@/components/ui/wave';
import { BASE_CURRENCY, convert } from '@/constants/currencies';
import { Colors, FontFamily, Radius, ScreenPadding, Spacing } from '@/constants/theme';
import { useGoalSpend } from '@/hooks/use-goal-spend';
import { useGoals } from '@/state/goals';

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { goals, removeGoal } = useGoals();
  const goalSpend = useGoalSpend();

  // The header totals the goals below it, in the account's base currency.
  const totals = goals.reduce(
    (acc, goal) => ({
      limit: acc.limit + convert(goal.limit, goal.currency, BASE_CURRENCY),
      spent: acc.spent + convert(goalSpend(goal), goal.currency, BASE_CURRENCY),
    }),
    { limit: 0, spent: 0 },
  );

  const goBack = () => router.replace('/home');
  const create = () => router.push('/new-goal');

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
          <View style={styles.headerBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <ChevronLeftIcon size={22} color={Colors.ink} />
            </Pressable>
            <Text style={styles.headerTitle}>Goals</Text>
          </View>

          <BudgetCard limit={totals.limit} spent={totals.spent} />
        </View>
        <Wave color={Colors.primarySurface} />

        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Goals</Text>
            <Pressable
              accessibilityRole="button"
              onPress={create}
              style={({ pressed }) => [styles.addNew, pressed && styles.pressed]}>
              <Text style={styles.addNewLabel}>Add new</Text>
              <PlusIcon size={16} color={Colors.white} />
            </Pressable>
          </View>

          {goals.length === 0 ? (
            <Text style={styles.empty}>No goals yet. Add one to start tracking a limit.</Text>
          ) : (
            goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={() => router.push({ pathname: '/new-goal', params: { id: goal.id } })}
                onDelete={() => removeGoal(goal.id)}
              />
            ))
          )}
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
  body: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: FontFamily.extraBold,
    fontSize: 21,
    letterSpacing: -0.2,
    color: Colors.ink,
  },
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
  addNewLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.white,
  },
  empty: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
});
