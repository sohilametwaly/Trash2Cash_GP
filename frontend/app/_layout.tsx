import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, Redirect, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { AuthProvider, useAuth } from "../store/context";
import * as secureStore from "expo-secure-store";
import { CartProvider } from "../store/cartContext";
import { OrderProvider } from "../store/orderContext";
import { InventProvider } from "@/store/InventoryContext";
// import OnboardingScreen from "./OnBoardingScreen";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
  // console.log("🚀 RootLayout rendering");
  const [isReady, setIsReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const status = await secureStore.getItemAsync("hasSeenOnboarding");
        setHasSeenOnboarding(status === "true");
      } catch (err) {
        console.error("Failed to check onboarding status:", err);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const isAppReady = fontsLoaded && isReady;

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <View style={{ flex: 1 }} />;
  }

  // If user hasn't seen onboarding, show it first
  // if (!hasSeenOnboarding) {
  //   console.log('🔄 Redirecting to onboarding');
  //   return (
  //     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  //       <TamaguiProvider config={config}>
  //         <View style={{ flex: 1 }}>
  //           <Redirect href="/OnBoardingScreen" />
  //         </View>
  //       </TamaguiProvider>
  //     </ThemeProvider>
  //   );
  // }

  // console.log("✅ Rendering main app layout");
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <InventProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <View style={{ flex: 1 }}>
                  <Slot />
                  <InitialNavigationHandler />
                  <StatusBar style="auto" />
                  <Toast />
                </View>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </InventProvider>
      </TamaguiProvider>
    </ThemeProvider>
  );
}

function InitialNavigationHandler() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (hasNavigated || authUser === undefined) {
      // console.log("Skip navigation:", {
      //   hasNavigated,
      //   authUserState: authUser === undefined ? "undefined" : "defined",
      // });
      return;
    }

    const timer = setTimeout(() => {
      // console.log("Attempting navigation with auth state:", {
      //   exists: !!authUser,
      //   role: authUser?.role,
      // });

      setHasNavigated(true);

      if (!authUser) {
        // console.log("Navigating to login");
        router.replace("/login");
      } else {
        // console.log("Navigating based on role:", authUser.role);
        switch (authUser.role) {
          case "admin":
            router.replace("/(adminTabs)");
            break;
          case "company":
            router.replace("/(companyTabs)");
            break;
          case "user":
            router.replace("/(tabs)");
            break;
        }
      }
    }, 1500); // Increased delay to ensure layout is fully mounted

    return () => clearTimeout(timer);
  }, [authUser, hasNavigated]);

  return null;
}
