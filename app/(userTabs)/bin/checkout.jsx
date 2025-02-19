import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Checkout Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
