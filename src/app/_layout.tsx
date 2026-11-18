import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ScheherazadeNew_400Regular } from '@expo-google-fonts/scheherazade-new/400Regular';
import { ScheherazadeNew_700Bold } from '@expo-google-fonts/scheherazade-new/700Bold';
import { CormorantGaramond_500Medium } from '@expo-google-fonts/cormorant-garamond/500Medium';
import { CormorantGaramond_600SemiBold } from '@expo-google-fonts/cormorant-garamond/600SemiBold';
import { HankenGrotesk_400Regular } from '@expo-google-fonts/hanken-grotesk/400Regular';
import { HankenGrotesk_400Regular_Italic } from '@expo-google-fonts/hanken-grotesk/400Regular_Italic';
import { HankenGrotesk_500Medium } from '@expo-google-fonts/hanken-grotesk/500Medium';
import { HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk/600SemiBold';

import { AppStateProvider, useApp } from '@/state/AppState';
import { useTheme } from '@/theme/useTheme';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync().catch(() => {});

function RootStack({ fontsReady }: { fontsReady: boolean }) {
  const { ready } = useApp();
  const { colors, isDark } = useTheme();
  const show = ready && fontsReady;

  useEffect(() => {
    if (show) SplashScreen.hideAsync().catch(() => {});
  }, [show]);

  if (!show) return null;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, animation: 'slide_from_right' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="dua/[id]" />
        <Stack.Screen name="category/[id]" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="tasbih" />
        <Stack.Screen name="search" options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="developer" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ScheherazadeNew_400Regular,
    ScheherazadeNew_700Bold,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    HankenGrotesk_400Regular,
    HankenGrotesk_400Regular_Italic,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
  });

  // If a font ever fails to load, continue with system fonts instead of a blank screen.
  return (
    <AppStateProvider>
      <RootStack fontsReady={loaded || !!error} />
    </AppStateProvider>
  );
}
