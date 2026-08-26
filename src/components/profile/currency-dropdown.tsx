import { StyleSheet, Text, View } from 'react-native';

import { AnchoredMenu } from '@/components/ui/anchored-menu';
import { ChevronDownIcon } from '@/components/ui/icons';
import { CURRENCIES, getCurrency, type CurrencyCode } from '@/constants/currencies';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

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
  const selected = getCurrency(value);

  return (
    <AnchoredMenu
      accessibilityLabel={`Currency, ${selected.label}`}
      triggerStyle={variant === 'pill' ? styles.pill : styles.plain}
      trigger={
        <>
          {variant === 'pill' ? (
            <>
              <Text style={styles.flag}>{selected.flag}</Text>
              <Text style={styles.symbol}>{selected.symbol}</Text>
            </>
          ) : (
            <Text style={styles.code}>{selected.code}</Text>
          )}
          <ChevronDownIcon size={variant === 'pill' ? 16 : 20} color={Colors.textSecondary} />
        </>
      }
      options={CURRENCIES.map((currency) => ({
        key: currency.code,
        label: currency.code,
        leading: <Text style={styles.flag}>{currency.flag}</Text>,
        selected: currency.code === value,
        onSelect: () => onChange(currency.code),
      }))}
    />
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
});
