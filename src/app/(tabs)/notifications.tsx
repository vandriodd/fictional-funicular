import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NotificationCard } from '@/components/notifications/notification-card';
import { ChevronLeftIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, ScreenPadding, Spacing } from '@/constants/theme';
import { useNotifications } from '@/state/notifications';

type Tab = 'all' | 'unread';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  const [tab, setTab] = useState<Tab>('all');

  const visible = tab === 'unread' ? notifications.filter((item) => !item.read) : notifications;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.sm }]}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.replace('/home')}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <ChevronLeftIcon size={22} color={Colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Pressable
            accessibilityRole="button"
            onPress={markAllRead}
            disabled={unreadCount === 0}
            hitSlop={8}
            style={({ pressed }) => pressed && styles.pressed}>
            <Text style={[styles.markAll, unreadCount === 0 && styles.markAllDisabled]}>
              Mark all as read
            </Text>
          </Pressable>
        </View>

        <View style={styles.tabs}>
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'all' }}
            onPress={() => setTab('all')}
            style={[styles.chip, tab === 'all' && styles.chipSelected]}>
            <Text style={[styles.chipLabel, tab === 'all' && styles.chipLabelSelected]}>All</Text>
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'unread' }}
            onPress={() => setTab('unread')}
            style={[styles.chip, tab === 'unread' && styles.chipSelected]}>
            <Text style={[styles.chipLabel, tab === 'unread' && styles.chipLabelSelected]}>
              Unread
            </Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeLabel}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {visible.length === 0 ? (
          <Text style={styles.empty}>Nothing unread. You are all caught up.</Text>
        ) : (
          visible.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={() => markRead(notification.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  headerTitle: {
    flex: 1,
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  markAll: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Colors.primary,
  },
  markAllDisabled: {
    color: Colors.textMuted,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySurface,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
  },
  chipLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.ink,
  },
  chipLabelSelected: {
    color: Colors.white,
  },
  badge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.white,
  },
  empty: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
});
