import { Alert, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/goals/progress-bar';
import { AnchoredMenu } from '@/components/ui/anchored-menu';
import { Emoji } from '@/components/ui/emoji';
import { EditIcon, MoreIcon, TrashIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';
import { GOAL_WARNING_RATIO, type Goal } from '@/data/mock';
import { useGoalSpend } from '@/hooks/use-goal-spend';
import { useMoney } from '@/hooks/use-money';
import { useCategories } from '@/state/categories';
import { withAlpha } from '@/utils/color';

export function GoalCard({
  goal,
  onEdit,
  onDelete,
}: {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const money = useMoney();
  const { getCategory } = useCategories();
  const goalSpend = useGoalSpend();
  const category = getCategory(goal.categoryId);
  const spent = goalSpend(goal);

  const ratio = goal.limit === 0 ? 0 : spent / goal.limit;
  const available = Math.max(0, goal.limit - spent);
  const barColor = ratio >= GOAL_WARNING_RATIO ? Colors.accent : goal.color;

  const confirmDelete = () => {
    Alert.alert('Delete goal?', `"${goal.title}" will be removed. This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.tile, { backgroundColor: withAlpha(goal.color, 0.16) }]}>
          <Emoji char={category.emoji} size={24} />
        </View>
        <View style={styles.titles}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.category}>{category.label}</Text>
        </View>
        <AnchoredMenu
          accessibilityLabel={`Actions for ${goal.title}`}
          width={170}
          trigger={
            <View style={styles.moreButton}>
              <MoreIcon size={20} color={Colors.textMuted} />
            </View>
          }
          options={[
            {
              key: 'edit',
              label: 'Edit',
              leading: <EditIcon size={18} color={Colors.ink} />,
              onSelect: onEdit,
            },
            {
              key: 'delete',
              label: 'Delete',
              tone: 'danger',
              leading: <TrashIcon size={18} color={Colors.danger} />,
              onSelect: confirmDelete,
            },
          ]}
        />
      </View>

      <View style={styles.amounts}>
        <Text style={styles.amount}>Spent: {money.format(spent, goal.currency)}</Text>
        <Text style={styles.amount}>Limit: {money.format(goal.limit, goal.currency)}</Text>
      </View>

      <ProgressBar ratio={ratio} color={barColor} />

      <View style={styles.amounts}>
        <Text style={styles.footnote}>{Math.round(ratio * 100)}% used</Text>
        <Text style={styles.footnote}>{money.format(available, goal.currency)} available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  category: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  moreButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
  footnote: {
    fontFamily: FontFamily.regular,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
});
