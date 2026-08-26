import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { Colors, Radius } from "@/constants/theme";
import { ProfileProvider } from '@/state/profile';
import { CategoriesProvider } from '@/state/categories';
import { TransactionsProvider } from '@/state/transactions';

SplashScreen.preventAutoHideAsync();

const sheetOptions = {
  presentation: "formSheet",
  sheetAllowedDetents: "fitToContents",
  sheetGrabberVisible: true,
  sheetCornerRadius: Radius.xxl,
  contentStyle: { backgroundColor: Colors.surface },
} as const;

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.ink,
    border: Colors.border,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ProfileProvider>
      <CategoriesProvider>
        <TransactionsProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="edit-name" options={sheetOptions} />
          <Stack.Screen name="profile-icon" options={sheetOptions} />
          <Stack.Screen name="change-email" options={sheetOptions} />
          <Stack.Screen name="change-password" options={sheetOptions} />
          <Stack.Screen name="log-out" options={sheetOptions} />
        </Stack>
      </ThemeProvider>
      </TransactionsProvider>
        </CategoriesProvider>
    </ProfileProvider>
  );
}
