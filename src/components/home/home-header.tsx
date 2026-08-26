import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Wordmark } from '@/components/brand/wordmark';
import { ProfileAvatar } from '@/components/profile/profile-avatar';
import { BellIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { user } from '@/data/mock';
import { useProfile } from '@/state/profile';

const AVATAR_SIZE = 42;

export function HomeHeader() {
  const router = useRouter();
  const { name } = useProfile();

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

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Profile, ${name}`}
            onPress={() => router.push('/profile')}
            style={({ pressed }) => pressed && styles.pressed}>
            <ProfileAvatar size={AVATAR_SIZE} />
          </Pressable>
        </View>
      </View>

      <Text style={styles.greeting}>Hello, {name.split(' ')[0]}</Text>
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
  pressed: {
    opacity: 0.75,
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
