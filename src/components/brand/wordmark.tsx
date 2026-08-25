import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

type WordmarkProps = {
  size?: number;
  color?: string;
  /** The trailing dot, which changes with the surface it sits on. */
  dotColor: string;
  style?: StyleProp<ViewStyle>;
};

export function Wordmark({
  size = 24,
  color = Colors.inkNavy,
  dotColor,
  style,
}: WordmarkProps) {
  const dotSize = Math.round(size * 0.26);

  return (
    <View style={[styles.row, style]}>
      <Text style={[styles.word, { fontSize: size, color }]}>fictional</Text>
      <View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: dotColor,
          marginLeft: size * 0.24,
          marginBottom: size * 0.06,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  word: {
    fontFamily: FontFamily.extraBold,
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
});
