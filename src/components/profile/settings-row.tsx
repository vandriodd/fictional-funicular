import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronRightIcon, type IconProps } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

type SettingsRowProps = {
  Icon: (props: IconProps) => React.ReactElement;
  title: string;
  subtitle?: string;
  /** `danger` paints the icon, label and chevron orange, as on Log Out. */
  tone?: 'default' | 'danger';
  showChevron?: boolean;
  /** Rendered at the trailing edge instead of a chevron — a switch, a dropdown, a value. */
  trailing?: ReactNode;
  onPress?: () => void;
  isLast?: boolean;
};

export function SettingsRow({
  Icon,
  title,
  subtitle,
  tone = 'default',
  showChevron = false,
  trailing,
  onPress,
  isLast = false,
}: SettingsRowProps) {
  const danger = tone === 'danger';
  const accent = danger ? Colors.accent : Colors.primary;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.divider,
        pressed && onPress && styles.pressed,
      ]}>
      <View
        style={[
          styles.iconPill,
          { backgroundColor: danger ? Colors.accentSurface : Colors.primarySurface },
        ]}>
        <Icon size={21} color={accent} />
      </View>

      <View style={styles.labels}>
        <Text style={[styles.title, danger && { color: Colors.accent }]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {trailing}
      {showChevron && <ChevronRightIcon size={19} color={danger ? Colors.accent : Colors.textMuted} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 68,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  pressed: {
    backgroundColor: Colors.background,
  },
  iconPill: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.ink,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
});
