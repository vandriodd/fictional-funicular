import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

/**
 * Emoji glyphs sit low inside a default line box, which leaves them visibly
 * off-centre in a tile. Pinning lineHeight to the font size removes the extra
 * leading so flex centring lands where you expect.
 */
export function Emoji({
  char,
  size,
  style,
}: {
  char: string;
  size: number;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.emoji, { fontSize: size, lineHeight: size }, style]}>
      {char}
    </Text>
  );
}

const styles = StyleSheet.create({
  emoji: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
