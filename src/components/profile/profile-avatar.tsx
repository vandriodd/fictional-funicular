import { Image } from 'expo-image';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontFamily, Radius } from '@/constants/theme';
import { user } from '@/data/mock';
import { getInitials, useProfile } from '@/state/profile';

type ProfileAvatarProps = {
  size: number;
  /** Thick white ring, as on the profile header. */
  ringWidth?: number;
  /** Overrides the stored avatar — used to preview a pick before it is saved. */
  emoji?: string | null;
  style?: StyleProp<ViewStyle>;
};

export function ProfileAvatar({ size, ringWidth, emoji, style }: ProfileAvatarProps) {
  const { name, avatarEmoji } = useProfile();
  const shown = emoji !== undefined ? emoji : avatarEmoji;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: Radius.pill,
          // Without a ring, a hairline keeps the white circle readable on white.
          borderWidth: ringWidth ?? StyleSheet.hairlineWidth,
          borderColor: ringWidth ? Colors.white : Colors.border,
        },
        style,
      ]}>
      {shown ? (
        <Text style={{ fontSize: size * 0.5 }}>{shown}</Text>
      ) : (
        <>
          {/* Doubles as the placeholder while the remote photo loads. */}
          <Text style={[styles.initials, { fontSize: size * 0.34 }]}>{getInitials(name)}</Text>
          <Image
            source={{ uri: user.avatarUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: FontFamily.bold,
    color: Colors.primary,
  },
});
