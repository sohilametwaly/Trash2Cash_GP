import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createTamagui, TamaguiProvider, View } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { AuthProvider, useAuth } from "../store/context";
import * as secureStore from "expo-secure-store";
import { InventProvider } from "@/store/InventoryContext";
// import OnboardingScreen from "./OnBoardingScreen";

const config = createTamagui(defaultConfig);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <InventProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </InventProvider>
  );
}

function AppContent() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { authUser } = useAuth();

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      //await secureStore.setItem("hasSeenOnboarding", "false");
      const seen = await secureStore.getItemAsync("hasSeenOnboarding");
      setHasSeenOnboarding(seen == "true");
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded && hasSeenOnboarding !== null) {
      SplashScreen.hideAsync();
      if (hasSeenOnboarding == false) {
        return router.replace("/OnBoardingScreen");
      }
      if (!authUser) {
        return router.replace("/login");
      }
    }
  }, [loaded, hasSeenOnboarding, authUser]);

  if (!loaded || hasSeenOnboarding === null) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <Slot />
        <StatusBar style="auto" />
        <Toast />
      </TamaguiProvider>
    </ThemeProvider>
  );
}
