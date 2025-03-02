import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Package, Store } from "lucide-react-native";
import { useAuth } from "@/store/context";

export default function TabLayout() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (authUser === undefined) return; // Wait for auth state to load
    setIsReady(true);

    if (authUser && authUser.role === "user") {
      router.replace("/(tabs)"); // Use absolute path, not "./(tabs)"
    }
  }, [authUser]);

  if (!isReady) {
    return null; // Prevent rendering until auth state is available
  }
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.black50opacity,
          tabBarInactiveTintColor: "black",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color }) => <Package color={color} size={28} />,
          }}
        />
        <Tabs.Screen
          name="bin"
          options={{
            title: "Bin",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="trash-bin" />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="add" />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="wallet" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="person" />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ color }) => <Store size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
