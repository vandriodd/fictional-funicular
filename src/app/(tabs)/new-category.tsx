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
import { CategoryRow } from '@/components/categories/category-row';
import { Emoji } from '@/components/ui/emoji';
import { ChevronLeftIcon } from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Colors, FontFamily, Radius, ScreenPadding, Shadows, Spacing } from '@/constants/theme';
import { CATEGORY_COLORS, CATEGORY_ICON_GROUPS, CATEGORY_ICONS } from '@/data/mock';
import { useCategories } from '@/state/categories';

export default function NewCategoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { categories, addCategory, updateCategory } = useCategories();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [label, setLabel] = useState('');
  const [emoji, setEmoji] = useState(CATEGORY_ICONS[0]);
  const [color, setColor] = useState(CATEGORY_COLORS[0]);

  const resetForm = useCallback(() => {
    setLabel('');
    setEmoji(CATEGORY_ICONS[0]);
    setColor(CATEGORY_COLORS[0]);
  }, []);

  // Tab screens stay mounted, so the form is synced on focus rather than on mount.
  const categoriesRef = useRef(categories);
  categoriesRef.current = categories;

  const pickerRef = useRef<ScrollView>(null);
  const groupOffsets = useRef<Record<string, number>>({});
  /** Set when the group holding the chosen icon has not been measured yet. */
  const pendingScroll = useRef<string | null>(null);

  /** Bring the chosen icon into view, so editing shows what is selected. */
  const revealIcon = useCallback((value: string) => {
    const group = CATEGORY_ICON_GROUPS.find((entry) => entry.icons.includes(value));
    if (!group) return;
    const offset = groupOffsets.current[group.label];
    if (offset === undefined) {
      pendingScroll.current = value;
      return;
    }
    pendingScroll.current = null;
    pickerRef.current?.scrollTo({ y: offset, animated: false });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const editing = id ? categoriesRef.current.find((category) => category.id === id) : undefined;
      if (editing) {
        setLabel(editing.label);
        setEmoji(editing.emoji);
        setColor(editing.color);
        revealIcon(editing.emoji);
      } else {
        resetForm();
        pendingScroll.current = null;
        pickerRef.current?.scrollTo({ y: 0, animated: false });
      }
    }, [id, resetForm, revealIcon]),
  );

  const save = () => {
    const payload = { label: label.trim(), emoji, color };
    if (id) {
      updateCategory(id, payload);
    } else {
      addCategory(payload);
    }
    resetForm();
    router.replace('/categories');
  };

  const goBack = () => router.replace('/categories');

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
          <Text style={styles.headerTitle}>{id ? 'Edit Category' : 'New Category'}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.sectionLabel}>Category name</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Category Name"
            placeholderTextColor={Colors.textSecondary}
            selectionColor={Colors.primary}
            style={styles.input}
            accessibilityLabel="Category name"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.sectionLabel}>Icon</Text>
          <View style={styles.iconPicker}>
            <ScrollView
              ref={pickerRef}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.iconPickerContent}>
              {CATEGORY_ICON_GROUPS.map((group) => (
                <View
                  key={group.label}
                  style={styles.iconGroup}
                  onLayout={(event) => {
                    const { y } = event.nativeEvent.layout;
                    groupOffsets.current[group.label] = y;
                    if (pendingScroll.current && group.icons.includes(pendingScroll.current)) {
                      pendingScroll.current = null;
                      pickerRef.current?.scrollTo({ y, animated: false });
                    }
                  }}>
                  <Text style={styles.iconGroupLabel}>{group.label}</Text>
                  <View style={styles.iconGrid}>
                    {group.icons.map((option) => {
                      const selected = option === emoji;
                      return (
                        <Pressable
                          key={option}
                          accessibilityRole="button"
                          accessibilityLabel={option}
                          accessibilityState={{ selected }}
                          onPress={() => setEmoji(option)}
                          style={({ pressed }) => [
                            styles.iconTile,
                            selected && styles.iconTileSelected,
                            pressed && styles.pressed,
                          ]}>
                          <Emoji char={option} size={24} />
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.lowerBlock}>
          {/* Brand watermark; purely decorative. */}
          <View style={styles.watermark} pointerEvents="none">
            <OctopusMark
              size={300}
              color={Colors.primarySurface}
              eyeColor={Colors.primarySurface}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.sectionLabel}>Color</Text>
            <View style={styles.colorGrid}>
              {CATEGORY_COLORS.map((option) => {
                const selected = option === color;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    accessibilityLabel={`Colour ${option}`}
                    accessibilityState={{ selected }}
                    onPress={() => setColor(option)}
                    style={({ pressed }) => [
                      styles.swatch,
                      { backgroundColor: option },
                      selected && styles.swatchSelected,
                      pressed && styles.pressed,
                    ]}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.preview}>
            <Text style={styles.previewTitle}>It will look like this</Text>
            <CategoryRow
              category={{
                id: 'preview',
                label: label.trim() || 'Category name',
                emoji,
                color,
                isCustom: true,
              }}
              onEdit={() => {}}
            />
          </View>
        </View>

        <PrimaryButton
          label={id ? 'Save changes' : 'Create new category'}
          onPress={save}
          disabled={label.trim().length === 0}
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
  input: {
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
    ...Shadows.card,
  },
  iconPicker: {
    height: 250,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  iconPickerContent: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  iconGroup: {
    gap: Spacing.sm,
  },
  iconGroupLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.sm,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileSelected: {
    backgroundColor: Colors.primary,
  },
  lowerBlock: {
    position: 'relative',
    gap: Spacing.xl,
  },
  watermark: {
    position: 'absolute',
    top: -Spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.md,
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
