import { useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { CheckIcon, FilterIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';

export type MovementFilter = 'all' | 'income' | 'outcome';

const OPTIONS: { value: MovementFilter; label: string }[] = [
  { value: 'all', label: 'All movements' },
  { value: 'income', label: 'Income only' },
  { value: 'outcome', label: 'Outcome only' },
];

const MENU_WIDTH = 200;

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
  const buttonRef = useRef<View>(null);
  const [anchor, setAnchor] = useState<{ top: number; right: number } | null>(null);

  const open = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ top: y + height + Spacing.sm, right: x + width });
    });
  };

  return (
    <>
      <Pressable
        ref={buttonRef}
        accessibilityRole="button"
        accessibilityLabel="Filter movements"
        onPress={open}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <FilterIcon size={22} color={value === 'all' ? Colors.primary : Colors.accent} />
      </Pressable>

      <Modal
        visible={anchor !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setAnchor(null)}>
        <Pressable style={styles.backdrop} onPress={() => setAnchor(null)}>
          {anchor && (
            <View
              style={[
                styles.menu,
                { top: anchor.top, left: Math.max(Spacing.lg, anchor.right - MENU_WIDTH) },
              ]}>
              {OPTIONS.map((option, index) => {
                const selected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected }}
                    onPress={() => {
                      onChange(option.value);
                      setAnchor(null);
                    }}
                    style={({ pressed }) => [
                      styles.option,
                      index < OPTIONS.length - 1 && styles.optionDivider,
                      pressed && styles.optionPressed,
                    ]}>
                    <Text style={[styles.optionLabel, selected && { color: Colors.primary }]}>
                      {option.label}
                    </Text>
                    {selected && <CheckIcon size={15} color={Colors.primary} />}
                  </Pressable>
                );
              })}
            </View>
          )}
        </Pressable>
      </Modal>
    </>
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
  pressed: {
    opacity: 0.75,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(33, 37, 41, 0.18)',
  },
  menu: {
    position: 'absolute',
    width: MENU_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.card,
    shadowOpacity: 0.16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  optionDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  optionPressed: {
    backgroundColor: Colors.background,
  },
  optionLabel: {
    flex: 1,
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.ink,
  },
});
