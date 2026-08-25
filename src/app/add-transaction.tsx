import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/primary-button';
import { Colors, FontFamily, ScreenPadding, Spacing } from '@/constants/theme';

export default function AddTransactionScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.handle} />
      <Text style={styles.title}>New transaction</Text>
      <Text style={styles.description}>
        The capture flow lands here. Nothing to fill in yet.
      </Text>
      <PrimaryButton
        label="Close"
        color={Colors.accent}
        pressedColor={Colors.accentPressed}
        onPress={() => router.back()}
        style={styles.cta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    fontSize: 24,
    color: Colors.ink,
  },
  description: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cta: {
    marginTop: 'auto',
    marginBottom: Spacing.xxl,
  },
});
