import { StyleSheet, View } from 'react-native';

import { AnchoredMenu } from '@/components/ui/anchored-menu';
import { FilterIcon } from '@/components/ui/icons';
import { Colors, Radius, Shadows } from '@/constants/theme';

export type MovementFilter = 'all' | 'income' | 'outcome';

const OPTIONS: { value: MovementFilter; label: string }[] = [
  { value: 'all', label: 'All movements' },
  { value: 'income', label: 'Income only' },
  { value: 'outcome', label: 'Outcome only' },
];

/**
 * The design shows the filter button but not what it opens, so this offers the
 * one split the list actually has.
 */
export function TransactionFilterMenu({
  value,
  onChange,
}: {
  value: MovementFilter;
  onChange: (next: MovementFilter) => void;
}) {
  return (
    <AnchoredMenu
      accessibilityLabel="Filter movements"
      triggerStyle={styles.button}
      width={200}
      trigger={
        <View>
          <FilterIcon size={22} color={value === 'all' ? Colors.primary : Colors.accent} />
        </View>
      }
      options={OPTIONS.map((option) => ({
        key: option.value,
        label: option.label,
        selected: option.value === value,
        onSelect: () => onChange(option.value),
      }))}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.card,
  },
});
