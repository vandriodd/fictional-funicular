import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  BurgerIcon,
  DocumentsIcon,
  HangerIcon,
  PillIcon,
  WalletIcon,
  type IconProps,
} from '@/components/ui/icons';
import { Colors, FontFamily, Radius, Shadows, Spacing } from '@/constants/theme';
import type { AppNotification, NotificationIcon, NotificationTone } from '@/data/mock';

const ICONS: Record<NotificationIcon, (props: IconProps) => React.ReactElement> = {
  hanger: HangerIcon,
  burger: BurgerIcon,
  wallet: WalletIcon,
  documents: DocumentsIcon,
  pill: PillIcon,
};

const TONES: Record<NotificationTone, { tile: string; icon: string }> = {
  warning: { tile: Colors.accentSurface, icon: Colors.accent },
  danger: { tile: Colors.accentSurface, icon: Colors.danger },
  goal: { tile: Colors.accentSurface, icon: Colors.primary },
  info: { tile: Colors.primarySurface, icon: Colors.primary },
};

export function NotificationCard({
  notification,
  onPress,
}: {
  notification: AppNotification;
  onPress: () => void;
}) {
  const Icon = ICONS[notification.icon];
  const tone = TONES[notification.tone];
  const unread = !notification.read;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${notification.title}. ${notification.body}`}
      accessibilityState={{ selected: unread }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, unread && styles.cardUnread, pressed && styles.pressed]}>
      {/* On an unread card the lavender fill would swallow a tinted tile. */}
      <View style={[styles.tile, { backgroundColor: unread ? Colors.white : tone.tile }]}>
        <Icon size={22} color={tone.icon} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.body}</Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>

      {unread && <View style={styles.unreadDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
    ...Shadows.card,
  },
  cardUnread: {
    backgroundColor: Colors.primarySurface,
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  message: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  timestamp: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: Spacing.sm,
  },
  unreadDot: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 9,
    height: 9,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
  },
});
