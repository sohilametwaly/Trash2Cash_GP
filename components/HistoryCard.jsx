import { Card, Paragraph, YStack, XStack } from "tamagui";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

import { Anvil, Book, Milk, Package, Wine } from "lucide-react-native";

export default function HistoryCard({ order }) {
  return (
    <YStack $sm={{ flexDirection: "column" }}>
      <Card elevate size="$4" bordered width={360} scale={0.93}>
        <Card.Header>
          <Paragraph style={styles.date}>Pickup date: {order.date}</Paragraph>
        </Card.Header>
        {order.items.map((item) => {
          return (
            <CardRow
              key={item.category}
              category={item.category}
              weight={item.weight}
              pricePerKg={item.pricePerKg}
            />
          );
        })}
        <Card.Footer padded>
          <View
            style={{
              alignItems: "center",
              textAlign: "center",
              flexDirection: "row",
              gap: 7,
              justifyContent: "center",
              height: 30,
            }}
          >
            <Text style={{ color: Colors.black50opacity, fontSize: 18 }}>
              Total Price:
            </Text>
            <View style={styles.price}>
              <Text style={styles.priceText}>{order.total} EGP</Text>
            </View>
          </View>
        </Card.Footer>
      </Card>
    </YStack>
  );
}

function CardRow({ category, weight, pricePerKg }) {
  const [icon, setIcon] = useState(<Milk color={Colors.header} />);
  useEffect(() => {
    switch (category) {
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
  }, [category]);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{icon}</Text>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.weightContainer}>
        <Text>
          {pricePerKg}{" "}
          <Text
            style={{ fontSize: 11, color: Colors.header, fontWeight: "500" }}
          >
            EGP/KG
          </Text>
        </Text>
      </View>

      <View style={styles.weightContainer}>
        <Text>{weight.toString().padStart(2, "0")} KG</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    color: Colors.black50opacity,
    alignSelf: "center",
  },
  price: {
    backgroundColor: Colors.header,
    padding: 6,
    borderRadius: 8,
    alignSelf: "center",
  },
  priceText: {
    color: "white",
    fontWeight: "500",
    fontSize: 11,
    textAlign: "center",
  },
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
  },
  weightContainer: {
    borderColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 5,
    alignItems: "center",
  },
});
