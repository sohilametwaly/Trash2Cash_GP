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
    </Stack>
  );
}
