import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/store/context";
import {ShoppingCart, Package, Plus, Store, User, Wallet } from "lucide-react-native";
export default function CompanyTabLayout() {
  console.log("Company");
  const { authUser } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (authUser === undefined) return;
    setIsReady(true);

    if (authUser && authUser.role === "admin") {
      router.replace("/(adminTabs)");
    }
    if (authUser && authUser.role === "user") {
      router.replace("/(tabs)");
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
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color }) => <Package color={color} size={25} />,
          }}
        />
        {/* store tab */}
         <Tabs.Screen
          name="company_store"
          options={{
            title: "Store",
            tabBarIcon: ({ color }) => <ShoppingCart size={25} color={color} />,
          }}
        />
        <Tabs.Screen
          name="bin"
          options={{
            title: "Bin",
            tabBarIcon: ({ color }) => (
              <Ionicons size={25} color={color} name="trash-bin" />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => <Plus size={25} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => <Wallet size={25} color={color} />,
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ color }) => <Store size={25} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={25} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
