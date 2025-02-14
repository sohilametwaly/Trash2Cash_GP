import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import tamaguiConfig from "@/utils/tamagui.config"; // Make sure this exists
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
import { createTamagui, TamaguiProvider, View } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4"; // for quick config install this

const config = createTamagui(defaultConfig);
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = useState("admin");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <Stack>
          {userRole === "user" ? (
            <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(adminTabs)" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </TamaguiProvider>
    </ThemeProvider>
  );
}
