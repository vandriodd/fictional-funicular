import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CheckIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

type CheckboxProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  /** Tint of the checked box. */
  color?: string;
};

export function Checkbox({ checked, onChange, label, color = Colors.primary }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      onPress={() => onChange(!checked)}
      style={styles.row}
      hitSlop={8}>
      <View
        style={[
          styles.box,
          checked && { backgroundColor: color, borderColor: color },
        ]}>
        {checked && <CheckIcon size={14} color={Colors.white} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 11.5,
    color: Colors.textSecondary,
  },
});
