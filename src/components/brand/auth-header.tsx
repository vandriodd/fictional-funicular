import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OctopusMark } from '@/components/brand/octopus-mark';
import { Wordmark } from '@/components/brand/wordmark';
import { Wave } from '@/components/ui/wave';
import { Spacing } from '@/constants/theme';

type AuthHeaderProps = {
  /** Fills the block and tints the octopus' eyes. */
  color: string;
  dotColor: string;
};

export function AuthHeader({ color, dotColor }: AuthHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.block, { backgroundColor: color, paddingTop: insets.top + Spacing.xl }]}>
        <OctopusMark size={132} eyeColor={color} />
        <Wordmark size={30} dotColor={dotColor} style={styles.wordmark} />
      </View>
      <Wave color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    paddingBottom: Spacing.lg,
  },
  wordmark: {
    marginTop: Spacing.md,
  },
});
