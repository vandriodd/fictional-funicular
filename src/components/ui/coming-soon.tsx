import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, Radius, ScreenPadding, Spacing } from '@/constants/theme';

type ComingSoonProps = {
  title: string;
  description: string;
};

/** Stand-in for the tabs that have no design yet. */
export function ComingSoon({ title, description }: ComingSoonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + Spacing.xxl }]}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: ScreenPadding,
  },
  card: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    fontSize: 24,
    letterSpacing: -0.3,
    color: Colors.ink,
  },
  description: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
});
