import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { DEFAULT_CURRENCY, type CurrencyCode } from '@/constants/currencies';
import { DEFAULT_AVATAR_EMOJI, user } from '@/data/mock';

type Profile = {
  name: string;
  email: string;
  /** When set, the emoji replaces the photo everywhere the avatar is shown. */
  avatarEmoji: string | null;
  currency: CurrencyCode;
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;
};

type ProfileContextValue = Profile & {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAvatarEmoji: (emoji: string | null) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setBiometricsEnabled: (enabled: boolean) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(DEFAULT_AVATAR_EMOJI);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const value = useMemo(
    () => ({
      name,
      email,
      avatarEmoji,
      currency,
      notificationsEnabled,
      biometricsEnabled,
      setName,
      setEmail,
      setAvatarEmoji,
      setCurrency,
      setNotificationsEnabled,
      setBiometricsEnabled,
    }),
    [name, email, avatarEmoji, currency, notificationsEnabled, biometricsEnabled],
  );

  return <ProfileContext value={value}>{children}</ProfileContext>;
}

export function useProfile() {
  const value = use(ProfileContext);
  if (!value) {
    throw new Error('useProfile must be used inside a ProfileProvider');
  }
  return value;
}

/** First letters of each word, for the avatar placeholder. */
export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
