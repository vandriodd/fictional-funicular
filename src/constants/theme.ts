/**
 * Design tokens for the fictional app.
 * The product is light-only by design, so there is a single palette.
 */

export const Colors = {
  /** Brand violet — primary actions, positive amounts, active state. */
  primary: '#8338EC',
  primaryPressed: '#6F2BD1',
  /** Secondary slice of the donut chart. */
  primaryLight: '#A86EF2',
  /** Bars in the weekly chart. */
  primarySoft: '#D9C2FB',
  /** Header background and "money in" pills. */
  primarySurface: '#F0E6FE',

  /** Brand orange — sign up, FAB, "money out". */
  accent: '#FB5607',
  accentPressed: '#DB4A03',
  accentSurface: '#FFECE2',

  /** Headings and primary copy. */
  ink: '#212529',
  /** Wordmark on the auth screens. */
  inkNavy: '#1B2D4F',
  textSecondary: '#6C757D',
  textMuted: '#ADB5BD',

  background: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#E9ECEF',
  divider: '#F1F3F5',

  /** Inline links on the auth screens. */
  link: '#55BEE8',

  white: '#FFFFFF',
  onPrimaryMuted: 'rgba(255, 255, 255, 0.72)',
} as const;

export const FontFamily = {
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semiBold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
  extraBold: 'Outfit_800ExtraBold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
} as const;

/** Horizontal gutter used by every screen. */
export const ScreenPadding = 24;

export const Shadows = {
  card: {
    shadowColor: '#212529',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  /** Coloured glow under the primary CTA / FAB. */
  glow: (color: string) => ({
    shadowColor: color,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  }),
} as const;
