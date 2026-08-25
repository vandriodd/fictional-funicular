import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AuthHeader } from '@/components/brand/auth-header';
import { AuthFooterLink } from '@/components/ui/auth-footer-link';
import { PrimaryButton } from '@/components/ui/primary-button';
import { TextField } from '@/components/ui/text-field';
import { Colors, FontFamily, ScreenPadding, Spacing } from '@/constants/theme';
import { user } from '@/data/mock';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('supersecret1');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AuthHeader color={Colors.primary} dotColor={Colors.link} />

        <View style={styles.body}>
          <View style={styles.intro}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log into your account.</Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
              textContentType="password"
            />
          </View>

          <Pressable style={styles.forgotWrapper} hitSlop={8}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton label="Sign In" onPress={() => router.replace('/home')} />

          <AuthFooterLink prompt="Are you new here? then" actionLabel="Sign Up" href="/sign-up" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  body: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.md,
  },
  intro: {
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: FontFamily.extraBold,
    fontSize: 26,
    color: Colors.ink,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  form: {
    gap: Spacing.lg,
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.lg,
  },
  forgot: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Colors.primary,
  },
});
