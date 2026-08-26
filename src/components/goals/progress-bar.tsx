import { StyleSheet, View } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

export function ProgressBar({
  ratio,
  color,
  trackColor = Colors.border,
  height = 8,
}: {
  /** 0-1; clamped so an overspent goal still renders a full bar. */
  ratio: number;
  color: string;
  trackColor?: string;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(1, ratio));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }]}>
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: Radius.pill,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
