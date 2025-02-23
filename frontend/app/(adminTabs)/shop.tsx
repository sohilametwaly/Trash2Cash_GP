import { View } from "tamagui";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  Anvil,
  Book,
  Edit3,
  Milk,
  Package,
  Trash2,
  Wine,
} from "lucide-react-native";
import Header from "@/components/Header";

type ItemType = {
  id: string;
  name: string;
  price: number;
  quantity: string;
};

const materials: ItemType[] = [
  { id: "1", name: "Paper", price: 96, quantity: "03" },
  { id: "2", name: "Plastic", price: 45.5, quantity: "05" },
  { id: "3", name: "Glass", price: 81, quantity: "02" },
  { id: "4", name: "Metal", price: 127, quantity: "01" },
  { id: "5", name: "Cardboard", price: 60, quantity: "04" },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case "Paper":
      return <Book size={22} color={"#2B4B40"} />;
    case "Plastic":
      return <Milk color={"#2B4B40"} size={22} />;
    case "Metal":
      return <Anvil color={"#2B4B40"} size={22} />;
    case "Cardboard":
      return <Package color={"#2B4B40"} size={22} />;
    case "Glass":
      return <Wine color={"#2B4B40"} size={22} />;
  }
};

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Shop Management</Text> */}
      <Header title="Shop Management" />

      {materials.map((item) => {
        return <ShopItem key={item.id} item={item} />;
      })}
    </View>
  );
}

const ShopItem = ({ item }: { item: ItemType }) => {
  return (
    <View style={[styles.listItem, styles.shadowBox]}>
      <View style={styles.actionsContainer}>
        {getIcon(item.name)}
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <View style={styles.moneyBadge}>
        <Text style={styles.money}>{item.price} EGP</Text>
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.badge}>
          <Text style={styles.title}>{item.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log("edit")}
          style={styles.iconButton}
        >
          <Edit3 size={20} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#F7F8FA",
  },
  header: {
    fontSize: 28,
    color: "#2B4B40",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 6,
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  badge: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moneyBadge: {
    backgroundColor: "#2B4B40",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  money: {
    color: "white",
    fontWeight: "600",
  },
  iconButton: {
    padding: 6,
  },
});
