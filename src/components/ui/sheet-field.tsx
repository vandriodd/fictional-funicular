import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { Colors, FontFamily, Radius, Spacing } from "@/constants/theme";

type SheetFieldProps = TextInputProps & {
  label?: string;
};

export function SheetField({ label, style, ...rest }: SheetFieldProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={Colors.textMuted}
        selectionColor={Colors.primary}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: Colors.textSecondary,
  },
  input: {
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
});
