import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryRow } from '@/components/categories/category-row';
import { ChevronLeftIcon, PlusIcon, SearchIcon, TagIcon } from '@/components/ui/icons';
import { Colors, FontFamily, Radius, ScreenPadding, Shadows, Spacing } from '@/constants/theme';
import { useCategories } from '@/state/categories';

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { defaultCategories, customCategories } = useCategories();
  const [query, setQuery] = useState('');

  const filter = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (label: string) => needle.length === 0 || label.toLowerCase().includes(needle);
  }, [query]);

  const defaults = defaultCategories.filter((category) => filter(category.label));
  const customs = customCategories.filter((category) => filter(category.label));
  const searching = query.trim().length > 0;

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));
  const create = () => router.push('/new-category');

  return (
    <View style={styles.screen}>
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
          <Text style={styles.headerTitle}>Categories</Text>
        </View>

        <View style={styles.searchField}>
          <SearchIcon size={20} color={Colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Category Name"
            placeholderTextColor={Colors.textSecondary}
            selectionColor={Colors.primary}
            style={styles.searchInput}
            accessibilityLabel="Search categories"
            returnKeyType="search"
          />
        </View>

        {defaults.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Default" />
            {defaults.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Custom" />
          {customs.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onEdit={() => router.push({ pathname: '/new-category', params: { id: category.id } })}
            />
          ))}

          {customCategories.length === 0 ? (
            <View style={styles.emptyState}>
              <TagIcon size={40} color={Colors.primarySoft} />
              <Text style={styles.emptyText}>
                There&rsquo;s not any custom category, start by creating one to organize better your
                expenses
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={create}
                style={({ pressed }) => [styles.emptyButton, pressed && styles.pressed]}>
                <Text style={styles.emptyButtonLabel}>Add new</Text>
                <PlusIcon size={16} color={Colors.white} />
              </Pressable>
            </View>
          ) : (
            !searching && (
              <Pressable
                accessibilityRole="button"
                onPress={create}
                style={({ pressed }) => [styles.addNew, pressed && styles.pressed]}>
                <View style={styles.addNewTile}>
                  <TagIcon size={22} color={Colors.primary} />
                </View>
                <Text style={styles.addNewLabel}>Add New</Text>
                <PlusIcon size={20} color={Colors.primary} />
              </Pressable>
            )
          )}

          {searching && customs.length === 0 && customCategories.length > 0 && (
            <Text style={styles.noMatch}>No custom category matches that name.</Text>
          )}
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
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    height: 52,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.ink,
  },
  section: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.primarySoft,
  },
  addNewTile: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewLabel: {
    flex: 1,
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.primarySoft,
  },
  emptyText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
  emptyButtonLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.white,
  },
  noMatch: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
});
