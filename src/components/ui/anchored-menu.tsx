import { useRef, useState, type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { CheckIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';

export type MenuOption = {
  key: string;
  label: string;
  /** Rendered before the label — a flag, an icon. */
  leading?: ReactNode;
  /** Shows a tick and tints the label. */
  selected?: boolean;
  tone?: 'default' | 'danger';
  onSelect: () => void;
};

type AnchoredMenuProps = {
  trigger: ReactNode;
  triggerStyle?: StyleProp<ViewStyle>;
  accessibilityLabel: string;
  options: MenuOption[];
  width?: number;
};

/** A dropdown that hangs off its own trigger, right-aligned to it. */
export function AnchoredMenu({
  trigger,
  triggerStyle,
  accessibilityLabel,
  options,
  width = 190,
}: AnchoredMenuProps) {
  const triggerRef = useRef<View>(null);
  const [anchor, setAnchor] = useState<{ top: number; right: number } | null>(null);

  const open = () => {
    // Window coordinates, so the menu can be positioned from inside the modal.
    triggerRef.current?.measureInWindow((x, y, triggerWidth, height) => {
      setAnchor({ top: y + height + Spacing.sm, right: x + triggerWidth });
    });
  };

  return (
    <>
      <Pressable
        ref={triggerRef}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={open}
        hitSlop={6}
        style={({ pressed }) => [triggerStyle, pressed && styles.pressed]}>
        {trigger}
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
                { width, top: anchor.top, left: Math.max(Spacing.lg, anchor.right - width) },
              ]}>
              {options.map((option, index) => (
                <Pressable
                  key={option.key}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: option.selected }}
                  onPress={() => {
                    setAnchor(null);
                    option.onSelect();
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    index < options.length - 1 && styles.optionDivider,
                    pressed && styles.optionPressed,
                  ]}>
                  {option.leading}
                  <Text
                    style={[
                      styles.optionLabel,
                      option.tone === 'danger' && { color: Colors.danger },
                      option.selected && { color: Colors.primary },
                    ]}>
                    {option.label}
                  </Text>
                  {option.selected && <CheckIcon size={15} color={Colors.primary} />}
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(33, 37, 41, 0.18)',
  },
  menu: {
    position: 'absolute',
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
