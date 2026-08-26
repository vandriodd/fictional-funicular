import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CurrencyDropdown } from '@/components/profile/currency-dropdown';
import { ProfileAvatar } from '@/components/profile/profile-avatar';
import { SettingsRow } from '@/components/profile/settings-row';
import { SettingsSection } from '@/components/profile/settings-section';
import {
  BellIcon,
  ChevronLeftIcon,
  CurrencyIcon,
  FingerprintIcon,
  KeyIcon,
  LogOutIcon,
  MailIcon,
  PencilIcon,
  SmartphoneIcon,
  UserCircleIcon,
} from '@/components/ui/icons';
import { Wave } from '@/components/ui/wave';
import { Colors, FontFamily, Radius, ScreenPadding, Spacing } from '@/constants/theme';
import { useProfile } from '@/state/profile';

const AVATAR_SIZE = 130;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    name,
    email,
    currency,
    setCurrency,
    notificationsEnabled,
    setNotificationsEnabled,
    biometricsEnabled,
    setBiometricsEnabled,
  } = useProfile();

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
          <View style={styles.headerBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <ChevronLeftIcon size={22} color={Colors.ink} />
            </Pressable>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.identity}>
            <View>
              <ProfileAvatar size={AVATAR_SIZE} ringWidth={5} />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Change profile icon"
                onPress={() => router.push('/profile-icon')}
                style={({ pressed }) => [styles.editBadge, pressed && styles.pressed]}>
                <PencilIcon size={18} color={Colors.white} />
              </Pressable>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <Wave color={Colors.primarySurface} />

        <View style={styles.sections}>
          <SettingsSection title="General">
            <SettingsRow
              Icon={PencilIcon}
              title="Edit name"
              subtitle={name}
              showChevron
              onPress={() => router.push('/edit-name')}
            />
            <SettingsRow
              Icon={UserCircleIcon}
              title="Profile Icon"
              subtitle="Change emoji"
              showChevron
              isLast
              onPress={() => router.push('/profile-icon')}
            />
          </SettingsSection>

          <SettingsSection title="Account">
            <SettingsRow
              Icon={MailIcon}
              title="Email"
              subtitle={email}
              showChevron
              onPress={() => router.push('/change-email')}
            />
            <SettingsRow
              Icon={KeyIcon}
              title="Change password"
              showChevron
              isLast
              onPress={() => router.push('/change-password')}
            />
          </SettingsSection>

          <SettingsSection title="Preferences">
            <SettingsRow
              Icon={BellIcon}
              title="Notifications"
              trailing={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ true: Colors.primary, false: Colors.border }}
                  ios_backgroundColor={Colors.border}
                />
              }
            />
            <SettingsRow
              Icon={CurrencyIcon}
              title="Currency"
              isLast
              trailing={<CurrencyDropdown value={currency} onChange={setCurrency} />}
            />
          </SettingsSection>

          <SettingsSection title="Security">
            <SettingsRow
              Icon={FingerprintIcon}
              title="Biometrics"
              trailing={
                <Switch
                  value={biometricsEnabled}
                  onValueChange={setBiometricsEnabled}
                  trackColor={{ true: Colors.primary, false: Colors.border }}
                  ios_backgroundColor={Colors.border}
                />
              }
            />
            <SettingsRow
              Icon={SmartphoneIcon}
              title="App version"
              trailing={<Text style={styles.version}>{Constants.expoConfig?.version ?? '1.0.0'}</Text>}
            />
            <SettingsRow
              Icon={LogOutIcon}
              title="Log Out"
              tone="danger"
              showChevron
              isLast
              onPress={() => router.push('/log-out')}
            />
          </SettingsSection>

          <Text style={styles.footer}>Fictional © 2026    made with 🐙</Text>
        </View>
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
    paddingBottom: Spacing.lg,
  },
  header: {
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.md,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
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
    fontFamily: FontFamily.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  identity: {
    alignItems: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.xl,
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primarySurface,
  },
  name: {
    fontFamily: FontFamily.extraBold,
    fontSize: 23,
    color: Colors.ink,
    marginTop: Spacing.md,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  sections: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.sm,
    gap: Spacing.xl,
  },
  version: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingTop: Spacing.md,
  },
});
