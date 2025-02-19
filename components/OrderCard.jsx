import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import {
  Anvil,
  Book,
  Milk,
  Package,
  Wine,
  Plus,
  Minus,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Button, Card } from "tamagui";

export default function OrderCard({ inCheckout, order }) {
  const [icon, setIcon] = useState(<Milk color={Colors.header} />);
  const [currentOrder, setCurrentOrder] = useState(order);
  function increaseWeight() {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      weight: prevOrder.weight + 1,
    }));
  }

  function decreaseWeight() {
    if (currentOrder.weight > 1) {
      setCurrentOrder((prevOrder) => ({
        ...prevOrder,
        weight: prevOrder.weight - 1,
      }));
    }
  }

  useEffect(() => {
    switch (order.category) {
      case "Plastic":
        setIcon(<Milk color={Colors.header} />);
        break;
      case "Metal":
        setIcon(<Anvil color={Colors.header} />);
        break;
      case "Glass":
        setIcon(<Wine color={Colors.header} />);
        break;
      case "Paper":
        setIcon(<Book color={Colors.header} />);
        break;
      case "Cardboard":
        setIcon(<Package color={Colors.header} />);
        break;
    }
  }, [order.category]);
  return (
    <Card
      padded
      size="$4"
      bordered
      width={360}
      scale={0.93}
      flexDirection="row"
      justifyContent="space-between"
    >
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{icon}</Text>
        <Text style={styles.categoryText}>{currentOrder.category}</Text>
      </View>

      {!inCheckout && (
        <View style={styles.weightContainer}>
          <Text>
            {currentOrder.pricePerKg}{" "}
            <Text
              style={{ fontSize: 11, color: Colors.header, fontWeight: "500" }}
            >
              EGP/KG
            </Text>
          </Text>
        </View>
      )}

      <View style={styles.quantityContainer}>
        {!inCheckout && (
          <Button
            circular
            size={"$2"}
            icon={Plus}
            borderColor="$color"
            borderWidth={1.5}
            backgroundColor="transparent"
            pressStyle={{ opacity: 0.5 }}
            color={"black"}
            onPress={increaseWeight}
          />
        )}
        <View style={styles.weightContainer}>
          <Text>{currentOrder.weight.toString().padStart(2, "0")} KG</Text>
        </View>
        {!inCheckout && (
          <Button
            circular
            size={"$2"}
            icon={Minus}
            borderColor="$color"
            borderWidth={1.5}
            backgroundColor="transparent"
            pressStyle={{ opacity: 0.5 }}
            color={"black"}
            onPress={decreaseWeight}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    textAlign: "left",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  categoryText: {
    fontSize: 18,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    paddingHorizontal: 9,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    width: "98%",
  },
  weightContainer: {
    borderColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 5,
    alignItems: "center",
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
});
