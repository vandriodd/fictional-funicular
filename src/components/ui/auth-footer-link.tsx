import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Spacing } from '@/constants/theme';

type AuthFooterLinkProps = {
  prompt: string;
  actionLabel: string;
  href: Href;
};

export function AuthFooterLink({ prompt, actionLabel, href }: AuthFooterLinkProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.prompt}>{prompt} </Text>
      <Link href={href} style={styles.action}>
        {actionLabel}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: Spacing.lg,
  },
  prompt: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  action: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: Colors.link,
    textDecorationLine: 'underline',
  },
});
