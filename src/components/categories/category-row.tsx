import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Emoji } from '@/components/ui/emoji';
import { EditIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';
import type { Category } from '@/data/mock';
import { withAlpha } from '@/utils/color';

export function CategoryRow({
  category,
  onEdit,
}: {
  category: Category;
  /** Only custom categories are editable. */
  onEdit?: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.tile, { backgroundColor: withAlpha(category.color, 0.16) }]}>
        <Emoji char={category.emoji} size={24} />
      </View>
      <Text style={styles.label}>{category.label}</Text>
      {onEdit && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit ${category.label}`}
          onPress={onEdit}
          hitSlop={8}
          style={({ pressed }) => pressed && styles.pressed}>
          <EditIcon size={21} color={Colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  tile: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.ink,
  },
  pressed: {
    opacity: 0.6,
  },
});
