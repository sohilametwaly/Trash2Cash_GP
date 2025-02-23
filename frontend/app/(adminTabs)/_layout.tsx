import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Package } from "lucide-react-native";

export default function TabLayout() {
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
