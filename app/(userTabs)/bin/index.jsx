import { FlatList, Text, View, StyleSheet } from "react-native";
import OrderCard from "@/components/OrderCard";
import { Button, H2, YStack } from "tamagui";
import { Colors } from "@/constants/Colors";

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

export default function BinScreen() {
  const totalPrice = DUMMY_BIN_ITEMS.reduce(
    (sum, item) => sum + item.pricePerKg,
    0
  );
  return (
    <View>
      <YStack alignSelf="center">
        <H2 style={styles.header}>Bin</H2>
      </YStack>
      <View>
        <FlatList
          data={DUMMY_BIN_ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard order={item} inCheckout={false} />
          )}
        />
      </View>
      <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
      <Button style={styles.btn} onPress={() => router.push("/bin/checkout")}>
        Checkout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: Colors.header,
    marginBottom: 10,
  },
  totalPrice: {
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
  },
  btn: {
    backgroundColor: Colors.header,
    color: "white",
    width: "80%",
    alignSelf: "center",
    marginTop: 30,
  },
});
