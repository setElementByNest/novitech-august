import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppProviders } from '@/contexts/AppProviders';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Kanit100: require('../assets/fonts/Kanit-Thin.ttf'),
    Kanit100i: require('../assets/fonts/Kanit-ThinItalic.ttf'),
    Kanit200: require('../assets/fonts/Kanit-ExtraLight.ttf'),
    Kanit200i: require('../assets/fonts/Kanit-ExtraLightItalic.ttf'),
    Kanit300: require('../assets/fonts/Kanit-Light.ttf'),
    Kanit300i: require('../assets/fonts/Kanit-LightItalic.ttf'),
    Kanit400: require('../assets/fonts/Kanit-Regular.ttf'),
    Kanit400i: require('../assets/fonts/Kanit-Italic.ttf'),
    Kanit500: require('../assets/fonts/Kanit-Medium.ttf'),
    Kanit500i: require('../assets/fonts/Kanit-MediumItalic.ttf'),
    Kanit600: require('../assets/fonts/Kanit-SemiBold.ttf'),
    Kanit600i: require('../assets/fonts/Kanit-SemiBoldItalic.ttf'),
    Kanit700: require('../assets/fonts/Kanit-Bold.ttf'),
    Kanit700i: require('../assets/fonts/Kanit-BoldItalic.ttf'),

  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProviders>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AppProviders>
    </ThemeProvider>
  );
}
