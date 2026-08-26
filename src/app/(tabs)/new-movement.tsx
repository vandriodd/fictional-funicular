import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CurrencyDropdown } from '@/components/profile/currency-dropdown';
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon } from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { type CurrencyCode } from '@/constants/currencies';
import { Colors, FontFamily, Radius, ScreenPadding, Shadows, Spacing } from '@/constants/theme';
import { CATEGORIES } from '@/data/mock';
import { useProfile } from '@/state/profile';
import { useTransactions } from '@/state/transactions';

type MovementType = 'outcome' | 'income';

export default function NewMovementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currency: displayCurrency } = useProfile();
  const { addTransaction } = useTransactions();

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>(displayCurrency);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MovementType>('outcome');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);

  const parsedAmount = Number(amount);
  const canCreate = parsedAmount > 0 && title.trim().length > 0;

  const create = () => {
    addTransaction({
      title: title.trim(),
      amount: type === 'outcome' ? -parsedAmount : parsedAmount,
      currency,
      categoryId,
    });
    router.back();
  };

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.sm }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <ChevronLeftIcon size={22} color={Colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>New Movement</Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountRow}>
            <TextInput
              value={amount}
              onChangeText={(next) => setAmount(next.replace(/[^0-9.]/g, ''))}
              placeholder="0"
              placeholderTextColor={Colors.ink}
              keyboardType="decimal-pad"
              selectionColor={Colors.primary}
              style={styles.amountInput}
              accessibilityLabel="Amount"
            />
            <CurrencyDropdown value={currency} onChange={setCurrency} variant="plain" />
          </View>
        </View>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Goal's Name"
          placeholderTextColor={Colors.textSecondary}
          selectionColor={Colors.primary}
          style={styles.titleInput}
          accessibilityLabel="Goal's name"
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Type</Text>
          <View style={styles.typeRow}>
            <TypeCard
              label="Outcome"
              selected={type === 'outcome'}
              onPress={() => setType('outcome')}
            />
            <TypeCard
              label="Income"
              selected={type === 'income'}
              onPress={() => setType('income')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Category</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((category) => {
              const selected = category.id === categoryId;
              return (
                <Pressable
                  key={category.id}
                  accessibilityRole="button"
                  accessibilityLabel={category.label}
                  accessibilityState={{ selected }}
                  onPress={() => setCategoryId(category.id)}
                  style={({ pressed }) => [
                    styles.categoryTile,
                    selected && styles.categoryTileSelected,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <PrimaryButton
          label="Create new movement"
          onPress={create}
          disabled={!canCreate}
          style={styles.cta}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function TypeCard({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const outcome = label === 'Outcome';
  const Arrow = outcome ? ArrowDownIcon : ArrowUpIcon;
  const accent = outcome ? Colors.accent : Colors.primary;
  const surface = outcome ? Colors.accentSurface : Colors.primarySurface;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.typeCard,
        selected && { borderColor: accent },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.typeIcon, { backgroundColor: surface }]}>
        <Arrow size={18} color={accent} />
      </View>
      <Text style={styles.typeLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
    gap: Spacing.xl,
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
  amountBlock: {
    alignItems: 'center',
    gap: Spacing.xl,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  amountLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  amountInput: {
    minWidth: 40,
    fontFamily: FontFamily.extraBold,
    fontSize: 34,
    color: Colors.ink,
    textAlign: 'right',
    padding: 0,
  },
  // Borderless and centred — an underline is the only affordance, per the design.
  titleInput: {
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.ink,
    textAlign: 'center',
  },
  section: {
    gap: Spacing.md,
  },
  sectionLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
  },
  typeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  typeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.card,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  categoryTile: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 60,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTileSelected: {
    backgroundColor: Colors.primary,
  },
  categoryEmoji: {
    fontSize: 26,
  },
  cta: {
    marginTop: 'auto',
  },
});
