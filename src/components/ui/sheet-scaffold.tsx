import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, FontFamily, ScreenPadding, Spacing } from "@/constants/theme";

type SheetScaffoldProps = {
  title: string;
  actionLabel: string;
  onAction: () => void;
  actionDisabled?: boolean;
  actionColor?: string;
  actionPressedColor?: string;
  children?: ReactNode;
};

export function SheetScaffold({
  title,
  actionLabel,
  onAction,
  actionDisabled,
  actionColor,
  actionPressedColor,
  children,
}: SheetScaffoldProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.sheet,
        { paddingBottom: Math.max(insets.bottom, Spacing.xl) },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      {children ? <View style={styles.body}>{children}</View> : null}
      <PrimaryButton
        label={actionLabel}
        onPress={onAction}
        disabled={actionDisabled}
        color={actionColor}
        pressedColor={actionPressedColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: Colors.surface,
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.xxl,
    gap: Spacing.xl,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    color: Colors.ink,
    textAlign: "center",
  },
  body: {
    gap: Spacing.lg,
  },
});
