import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function ProfileStackLayout() {
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
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account-settings"
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen
        name="change-address"
        options={{ title: "Change Address" }}
      />
      <Stack.Screen name="FAQs" options={{ title: "FAQs" }} />
    </Stack>
  );
}
