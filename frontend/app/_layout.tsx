// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Slot, useRouter } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// // import { Toaster } from "react-hot-toast";

// import { useColorScheme } from "@/hooks/useColorScheme";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
// import { createTamagui, TamaguiProvider, View } from "tamagui";
// import { defaultConfig } from "@tamagui/config/v4"; // for quick config install this
// import { AuthProvider, useAuth } from "../store/context";

// const config = createTamagui(defaultConfig);
// export default function RootLayout() {
//   const router = useRouter();
//   const colorScheme = useColorScheme();
//   const [user, setUser] = useState();
//   const { authUser } = useAuth();
//   const [loaded] = useFonts({
//     Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//       if (!authUser) {
//         router.replace("./login");
//       }
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <AuthProvider>
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <TamaguiProvider config={config}>
//           {/* <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//           <Stack.Screen name="+not-found" />
//           </Stack> */}

//           <Slot />
//           <StatusBar style="auto" />
//         </TamaguiProvider>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

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
import { AuthProvider, useAuth } from "../store/context"; // Import useAuth
import AdminStore from "./(adminTabs)/admin_store"; 

const config = createTamagui(defaultConfig);

// Prevent splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// This component is now within AuthProvider, so we can safely use useAuth
function AppContent() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { authUser } = useAuth(); // Now it's safe to use!

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      if (!authUser) {
        router.replace("/login");
      }
    }
  }, [loaded, authUser]); // Depend on authUser

  if (!loaded) {
    return null;
  }

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
