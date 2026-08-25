import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontFamily, Radius, Shadows } from '@/constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  /** Violet on sign in, orange on sign up. */
  color?: string;
  pressedColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  color = Colors.primary,
  pressedColor = Colors.primaryPressed,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        Shadows.glow(color),
        { backgroundColor: pressed ? pressedColor : color },
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: Radius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 17,
    color: Colors.white,
  },
});
