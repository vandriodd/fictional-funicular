import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
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

import { OctopusMark } from '@/components/brand/octopus-mark';
import { GoalCard } from '@/components/goals/goal-card';
import { CurrencyDropdown } from '@/components/profile/currency-dropdown';
import { Emoji } from '@/components/ui/emoji';
import { ChevronLeftIcon } from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { type CurrencyCode } from '@/constants/currencies';
import { Colors, FontFamily, Radius, ScreenPadding, Shadows, Spacing } from '@/constants/theme';
import { CATEGORY_COLORS, QUICK_CATEGORY_IDS } from '@/data/mock';
import { useCategories } from '@/state/categories';
import { useGoals } from '@/state/goals';
import { useProfile } from '@/state/profile';

/** The five swatches the design offers; the full palette lives on categories. */
const GOAL_COLORS = CATEGORY_COLORS.slice(0, 5);

export default function NewGoalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currency: displayCurrency } = useProfile();
  const { getCategory } = useCategories();
  const { goals, addGoal, updateGoal } = useGoals();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>(displayCurrency);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(QUICK_CATEGORY_IDS[0]);
  const [color, setColor] = useState(GOAL_COLORS[0]);

  const resetForm = useCallback(() => {
    setAmount('');
    setCurrency(displayCurrency);
    setTitle('');
    setCategoryId(QUICK_CATEGORY_IDS[0]);
    setColor(GOAL_COLORS[0]);
  }, [displayCurrency]);

  // Tab screens stay mounted, so the form is synced on focus rather than on mount.
  const goalsRef = useRef(goals);
  goalsRef.current = goals;

  useFocusEffect(
    useCallback(() => {
      const editing = id ? goalsRef.current.find((goal) => goal.id === id) : undefined;
      if (editing) {
        setAmount(String(editing.limit));
        setCurrency(editing.currency);
        setTitle(editing.title);
        setCategoryId(editing.categoryId);
        setColor(editing.color);
      } else {
        resetForm();
      }
    }, [id, resetForm]),
  );

  const parsedAmount = Number(amount);
  const canSave = parsedAmount > 0 && title.trim().length > 0;

  const save = () => {
    const payload = { title: title.trim(), categoryId, limit: parsedAmount, currency, color };
    if (id) {
      updateGoal(id, payload);
    } else {
      addGoal(payload);
    }
    resetForm();
    router.replace('/goals');
  };

  const previewGoal = {
    id: 'preview',
    title: title.trim() || "Goal's name",
    categoryId,
    limit: parsedAmount || 0,
    openingSpent: id
      ? (goalsRef.current.find((goal) => goal.id === id)?.openingSpent ?? 0)
      : 0,
    currency,
    color,
  };

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
            onPress={() => router.replace('/goals')}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <ChevronLeftIcon size={22} color={Colors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>{id ? 'Edit Goal' : 'New Goal'}</Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <View style={styles.amountRow}>
            <TextInput
              value={amount}
              onChangeText={(next) => setAmount(next.replace(/[^0-9.]/g, ''))}
              placeholder="0"
              placeholderTextColor={Colors.ink}
              keyboardType="decimal-pad"
              selectionColor={Colors.primary}
              style={styles.amountInput}
              accessibilityLabel="Limit amount"
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

        <View style={styles.field}>
          <Text style={styles.sectionLabel}>Category</Text>
          <View style={styles.categoryRow}>
            {QUICK_CATEGORY_IDS.map(getCategory).map((category) => {
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
                  <Emoji char={category.emoji} size={26} />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.lowerBlock}>
          {/* Brand watermark; purely decorative. */}
          <View style={styles.watermark} pointerEvents="none">
            <OctopusMark size={300} color={Colors.primarySurface} eyeColor={Colors.primarySurface} />
          </View>

          <View style={styles.field}>
            <Text style={styles.sectionLabel}>Color</Text>
            <View style={styles.colorRow}>
              {GOAL_COLORS.map((option) => (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityLabel={`Colour ${option}`}
                  accessibilityState={{ selected: option === color }}
                  onPress={() => setColor(option)}
                  style={({ pressed }) => [
                    styles.swatch,
                    { backgroundColor: option },
                    option === color && styles.swatchSelected,
                    pressed && styles.pressed,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.preview}>
            <Text style={styles.previewTitle}>It will look like this</Text>
            <GoalCard goal={previewGoal} onEdit={() => {}} onDelete={() => {}} />
          </View>
        </View>

        <PrimaryButton
          label={id ? 'Save changes' : 'Create new goal'}
          onPress={save}
          disabled={!canSave}
          style={styles.cta}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
    gap: Spacing.lg,
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
  field: {
    gap: Spacing.md,
  },
  sectionLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
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
  lowerBlock: {
    position: 'relative',
    gap: Spacing.lg,
  },
  watermark: {
    position: 'absolute',
    top: -Spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swatch: {
    width: 52,
    height: 52,
    borderRadius: Radius.pill,
  },
  swatchSelected: {
    borderWidth: 4,
    borderColor: Colors.white,
    ...Shadows.card,
  },
  preview: {
    gap: Spacing.md,
  },
  previewTitle: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    color: Colors.ink,
  },
  cta: {
    marginTop: 'auto',
  },
});
