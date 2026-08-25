import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthHeader } from '@/components/brand/auth-header';
import { AuthFooterLink } from '@/components/ui/auth-footer-link';
import { Checkbox } from '@/components/ui/checkbox';
import { PrimaryButton } from '@/components/ui/primary-button';
import { TextField } from '@/components/ui/text-field';
import { Colors, FontFamily, ScreenPadding, Spacing } from '@/constants/theme';
import { user } from '@/data/mock';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('supersecret1');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AuthHeader color={Colors.accent} dotColor={Colors.white} />

        <View style={styles.body}>
          <View style={styles.intro}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>Start taking control of your finances.</Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />
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
              autoComplete="new-password"
              textContentType="newPassword"
            />
          </View>

          <Checkbox
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
            color={Colors.accent}
            label="I accept the terms and conditions and the privacy policy"
          />

          <PrimaryButton
            label="Create new account"
            color={Colors.accent}
            pressedColor={Colors.accentPressed}
            onPress={() => router.replace('/home')}
            style={styles.cta}
          />

          <AuthFooterLink prompt="Already have an account?" actionLabel="Sign In" href="/" />
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
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.xl,
  },
  cta: {
    marginTop: Spacing.xl,
  },
});
