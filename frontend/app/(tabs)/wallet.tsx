import { Colors } from "@/constants/Colors";
import { Text, View, StyleSheet, Image } from "react-native";
import { CardInfoSheet } from "@/components/cardInfoSheet";
import Header from "@/components/Header";
import { useAuth } from "@/store/context";
import { useEffect } from "react";

export default function WalletScreen() {
  const { authUser } = useAuth();
  useEffect(() => {
    console.log("authUser ", authUser);
  }, [authUser?.balance]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.visaContainer}>
          <Text style={styles.visaText}>1234 **** **** ****</Text>
          <Text style={styles.visaText}>{authUser?.name}</Text>
          <Image
            source={require("../../assets/images/visa.png")}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
        <Text style={styles.balanceText}>Balance: {authUser?.balance} EGP</Text>
      </View>
      <CardInfoSheet />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
