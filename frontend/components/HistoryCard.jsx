import { Card, Paragraph, YStack, XStack, Button } from "tamagui";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

import { Anvil, Book, Milk, Package, Wine } from "lucide-react-native";
import { SelectItem } from "./SelectInput";
import { useOrders } from "@/store/orderContext";

export default function HistoryCard({ order, role, pending }) {
  const { updateOrderStatus } = useOrders();
  console.log("order ", order);
  const formattedDate = order.pickupDate ? 
    format(new Date(order.pickupDate), 'dd/MM/yyyy') : 
    'Not scheduled';

  const handleCancel = () => {
    updateOrderStatus(order._id, "cancelled");
  };

  return (
    <YStack $sm={{ flexDirection: "column" }}>
      <Card
        size="$4"
        bordered
        width={360}
        scale={0.93}
        backgroundColor={"white"}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Card.Header style={role == "admin" ? styles.header : ""}>
          <Paragraph style={styles.date}>Pickup date: {formattedDate}</Paragraph>
          {role == "admin" && (
            <Paragraph style={styles.date}>{order.user}</Paragraph>
          )}
        </Card.Header>
        {order.items.map((item) => {
          return (
            <CardRow
              key={item.wasteType}
              wasteType={item.wasteType}
              quantity={item.quantity}
              price={item.price}
            />
          );
        })}
        <Card.Footer padded flexDirection="column" gap={7}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                textAlign: "center",
                gap: 7,
              }}
            >
              <Text style={{ color: Colors.black50opacity, fontSize: 18 }}>
                Total Price:
              </Text>
              <View style={styles.price}>
                <Text style={styles.priceText}>{order.totalPrice} EGP</Text>
              </View>
            </View>

            <View>
              {role == "admin" && (
                <SelectItem
                  id={order._id}
                  label="Status"
                  state={order.status}
                  items={[
                    { name: "Pending" },
                    { name: "Delivered" },
                    { name: "Cancelled" },
                  ]}
                />
              )}
            </View>
          </View>
          {role == "user" && order.status === "pending" && (
            <Button
              backgroundColor={"#C83939"}
              color={"white"}
              fontSize={17}
              width={90}
              alignSelf="flex-end"
              onPress={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Card.Footer>
      </Card>
    </YStack>
  );
}

function CardRow({ wasteType, quantity, price }) {
  const [icon, setIcon] = useState(<Milk color={Colors.header} />);
  useEffect(() => {
    switch (wasteType) {
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
  }, [wasteType]);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryText}>{icon}</View>
        <Text style={styles.categoryText}>{wasteType}</Text>
      </View>

      <View style={styles.weightContainer}>
        <Text>
          {price}{" "}
          <Text
            style={{ fontSize: 11, color: Colors.header, fontWeight: "500" }}
          >
            EGP/Unit
          </Text>
        </Text>
      </View>

      <View style={styles.weightContainer}>
        <Text>{quantity.toString().padStart(2, "0")} Unit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: Colors.black50opacity,
    alignSelf: "center",
  },
  price: {
    padding: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  priceText: {
    color: Colors.header,
    fontWeight: "500",
    fontSize: 16,
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
