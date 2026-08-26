import { useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { CheckIcon, ChevronDownIcon } from '@/components/ui/icons';
import { CURRENCIES, getCurrency, type CurrencyCode } from '@/constants/currencies';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';

const MENU_WIDTH = 190;

type Anchor = { top: number; right: number };

export function CurrencyDropdown({
  value,
  onChange,
  /** `pill` sits in a settings row; `plain` sits beside the amount being typed. */
  variant = 'pill',
}: {
  value: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
  variant?: 'pill' | 'plain';
}) {
  const pillRef = useRef<View>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const selected = getCurrency(value);

  const open = () => {
    // Measure in window coordinates so the menu can hang off the pill itself.
    pillRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ top: y + height + Spacing.sm, right: x + width });
    });
  };

  return (
    <>
      <Pressable
        ref={pillRef}
        accessibilityRole="button"
        accessibilityLabel={`Currency, ${selected.label}`}
        onPress={open}
        style={variant === 'pill' ? styles.pill : styles.plain}>
        {variant === 'pill' ? (
          <>
            <Text style={styles.flag}>{selected.flag}</Text>
            <Text style={styles.symbol}>{selected.symbol}</Text>
          </>
        ) : (
          <Text style={styles.code}>{selected.code}</Text>
        )}
        <ChevronDownIcon size={variant === 'pill' ? 16 : 20} color={Colors.textSecondary} />
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
              {CURRENCIES.map((currency, index) => {
                const isSelected = currency.code === value;
                return (
                  <Pressable
                    key={currency.code}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      onChange(currency.code);
                      setAnchor(null);
                    }}
                    style={({ pressed }) => [
                      styles.option,
                      index < CURRENCIES.length - 1 && styles.optionDivider,
                      pressed && styles.optionPressed,
                    ]}>
                    <Text style={styles.flag}>{currency.flag}</Text>
                    <Text style={[styles.optionCode, isSelected && { color: Colors.primary }]}>
                      {currency.code}
                    </Text>
                    {isSelected && <CheckIcon size={15} color={Colors.primary} />}
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
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  plain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  code: {
    fontFamily: FontFamily.medium,
    fontSize: 22,
    color: Colors.textSecondary,
  },
  flag: {
    fontSize: 14,
  },
  symbol: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.ink,
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
  optionCode: {
    flex: 1,
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.ink,
  },
});
