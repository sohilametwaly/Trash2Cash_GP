import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  ChartPie,
  Package,
  Plus,
  Store,
  User,
  Users,
} from "lucide-react-native";
import { useAuth } from "@/store/context";

export default function TabLayout() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (authUser === undefined) return;
    setIsReady(true);

    if (authUser && authUser.role === "user") {
      router.replace("/(tabs)");
    }
    if (authUser && authUser.role === "company") {
      router.replace("./(companyTabs)");
    }
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
          name="admin_store"
          options={{
            title: "Store",
            tabBarIcon: ({ color }) => <Store size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <Ionicons size={24} color={color} name="wallet" />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => <Plus size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="bin"
          options={{
            title: "Bin",
            tabBarIcon: ({ color }) => (
              <Ionicons size={24} color={color} name="trash-bin" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
