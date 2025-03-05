import { Colors } from "@/constants/Colors";
import { Text, View, StyleSheet, Image } from "react-native";
import { H2, YStack, Button } from "tamagui";
import { CardInfoSheet } from "@/components/cardInfoSheet";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <YStack alignSelf="center">
        <H2 style={styles.header}>Wallet</H2>
      </YStack>
      <View style={styles.visaContainer}>
        <Text style={styles.visaText}>1234 **** **** ****</Text>
        <Text style={styles.visaText}>John Doe</Text>
        <Image
          source={require("../../assets/images/visa.png")}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
      <Text style={styles.balanceText}>Balance: 85 EGP</Text>
      <CardInfoSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 45,
  },
  header: {
    color: Colors.header,
  },
  visaContainer: {
    backgroundColor: Colors.header,
    height: "25%",
    width: "80%",
    borderRadius: 20,
    padding: 25,
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  visaText: {
    color: "white",
    textAlign: "left",
    fontSize: 20,
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "700",
    marginVertical: 20,
  },
});
