import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProfileAvatar } from '@/components/profile/profile-avatar';
import { Emoji } from '@/components/ui/emoji';
import { SheetScaffold } from '@/components/ui/sheet-scaffold';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { PROFILE_EMOJIS } from '@/data/mock';
import { useProfile } from '@/state/profile';

const COLUMNS = 6;

export default function ProfileIconSheet() {
  const router = useRouter();
  const { avatarEmoji, setAvatarEmoji } = useProfile();
  const [selected, setSelected] = useState<string | null>(avatarEmoji);

  const save = () => {
    setAvatarEmoji(selected);
    router.back();
  };

  return (
    <SheetScaffold title="Change profile icon" actionLabel="Change profile icon" onAction={save}>
      <View style={styles.preview}>
        <ProfileAvatar size={72} emoji={selected} />
      </View>

      <View style={styles.grid}>
        {PROFILE_EMOJIS.map((emoji) => {
          const isSelected = emoji === selected;
          return (
            <Pressable
              key={emoji}
              accessibilityRole="button"
              accessibilityLabel={emoji}
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelected(isSelected ? null : emoji)}
              style={({ pressed }) => [
                styles.tile,
                isSelected && styles.tileSelected,
                pressed && styles.tilePressed,
              ]}>
              <Emoji char={emoji} size={24} />
            </Pressable>
          );
        })}
      </View>
    </SheetScaffold>
  );
}

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  tile: {
    // Six per row, sharing the gaps between them.
    width: `${100 / COLUMNS}%`,
    aspectRatio: 1,
    flexGrow: 1,
    flexBasis: `${100 / COLUMNS - 5}%`,
    maxWidth: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tileSelected: {
    borderColor: Colors.primary,
  },
  tilePressed: {
    opacity: 0.7,
  },
});
