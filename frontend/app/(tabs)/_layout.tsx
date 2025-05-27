import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/store/context";

export default function TabLayout() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (authUser === undefined) return;
    console.log("tabs layout authUser", authUser);

    const timer = setTimeout(() => {
      setIsReady(true);
      
      if (authUser?.role === "admin") {
        router.replace("/(adminTabs)");
      } else if (authUser?.role === "company") {
        router.replace("/(companyTabs)");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [authUser]);

  if (!isReady) {
    return null;
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
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="time" />
            ),
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
            title: "Upload",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} color={color} name="camera" />
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
      </Tabs>
    </View>
  );
}
