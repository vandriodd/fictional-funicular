import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type WaveProps = {
  /** Colour of the block above the wave. Below the curve stays transparent. */
  color: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * The S-curve that separates the coloured header from the page body.
 * Stretches to any width, so it is drawn once in relative units.
 */
const WAVE_PATH = 'M0 28C55 13 110 13 170 28C250 42 330 42 390 31L390 0L0 0Z';

export function Wave({ color, height = 46, style }: WaveProps) {
  return (
    <View style={[styles.container, { height }, style]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 390 60" preserveAspectRatio="none">
        <Path d={WAVE_PATH} fill={color} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Overlap the block above by a hair so no seam shows through.
    marginTop: -1,
    width: '100%',
  },
});
