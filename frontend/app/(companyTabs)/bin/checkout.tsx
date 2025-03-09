import { View, StyleSheet, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import { MoveLeft, Truck } from "lucide-react-native";
import { Button, H2 } from "tamagui";
import { Colors } from "@/constants/Colors";
import OrderCard from "@/components/OrderCard";
import { PickupSheet } from "@/components/pickupSheet";

const DUMMY_BIN_ITEMS = [
  {
    id: "1",
    category: "Paper",
    weight: 3,
    pricePerKg: 15,
  },
  {
    id: "2",
    category: "Plastic",
    weight: 45,
    pricePerKg: 41,
  },
  {
    id: "3",
    category: "Glass",
    weight: 2,
    pricePerKg: 12,
  },
];

export default function CheckoutScreen() {
  const router = useRouter();

  const totalPrice = DUMMY_BIN_ITEMS.reduce(
    (sum, item) => sum + item.pricePerKg,
    0
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          size={"$9"}
          icon={MoveLeft}
          backgroundColor="transparent"
          pressStyle={{ opacity: 0.5 }}
          color={"black"}
          paddingLeft={5}
          paddingRight={0}
          height={20}
          onPress={() => router.back()}
        />
        <H2 style={styles.headerText}>Checkout</H2>
      </View>
      <View>
        <FlatList
          data={DUMMY_BIN_ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard order={item} inCheckout={true} />
          )}
        />
      </View>
      <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
      <PickupSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    padding: 15,
  },
  headerText: {
    fontSize: 30,
    color: Colors.header,
    textAlign: "left",
  },
  totalPrice: {
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 15,
  },
});
