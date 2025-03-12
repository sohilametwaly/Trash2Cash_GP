import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="account-settings"
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen
        name="change-address"
        options={{ title: "Change Address" }}
      />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="orders" options={{ title: "Orders" }} />
      <Stack.Screen name="shop" options={{ title: "Inventory" }} />
      <Stack.Screen name="FAQs" options={{ title: "FAQs" }} />
    </Stack>
  );
}
