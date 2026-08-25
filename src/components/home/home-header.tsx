import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Wordmark } from "@/components/brand/wordmark";
import { BellIcon } from "@/components/ui/icons";
import { Colors, FontFamily, Radius, Spacing } from "@/constants/theme";
import { user } from "@/data/mock";

const AVATAR_SIZE = 42;

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Wordmark size={22} color={Colors.ink} dotColor={Colors.accent} />

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Notifications, ${user.unreadNotifications} unread`}
            style={styles.bellButton}
            hitSlop={6}
          >
            <BellIcon size={21} color={Colors.textSecondary} />
            {user.unreadNotifications > 0 && <View style={styles.badge} />}
          </Pressable>

          <View style={styles.avatarRing}>
            <Text style={styles.avatarInitials}>SG</Text>
            <Image
              source={{ uri: user.avatarUrl }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
              accessibilityLabel={user.fullName}
            />
          </View>
        </View>
      </View>

      <Text style={styles.greeting}>Hello, {user.firstName}</Text>
      <Text style={styles.title}>Here&rsquo;s how it&rsquo;s going</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  bellButton: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarInitials: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.white,
  },
  greeting: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    fontSize: 27,
    letterSpacing: -0.4,
    color: Colors.ink,
  },
});
