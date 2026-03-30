import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Onboarding from '@/components/Onboarding';
import { AppProvider, useApp } from '@/context/AppContext';
import { Colors } from '@/constants/colors';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { onboardingDone } = useApp();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Modal
        visible={!onboardingDone}
        animationType="fade"
        statusBarTranslucent
      >
        <Onboarding />
      </Modal>
    </>
  );
}

function RootLayoutInner({ fontsLoaded, fontError }: { fontsLoaded: boolean; fontError: Error | null }) {
  const { isReady } = useApp();

  useEffect(() => {
    if ((fontsLoaded || fontError) && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isReady]);

  if ((!fontsLoaded && !fontError) || !isReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <RootLayoutNav />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <RootLayoutInner fontsLoaded={fontsLoaded} fontError={fontError} />
          </AppProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
