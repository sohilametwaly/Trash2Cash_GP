import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function DashboardStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: Colors.header,
        headerTitleStyle: {
          color: Colors.header,
          fontSize: 22,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Dashboard", headerShown: true }}
      />
      <Stack.Screen name="users" options={{ title: "Users" }} />
    </Stack>
  );
}
