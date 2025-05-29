import { View, Button } from "tamagui";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Anvil, Book, Edit3, Milk, Package, Wine } from "lucide-react-native";
import { Item, useInventory } from "@/store/InventoryContext";
import { EditItemSheet } from "@/components/EditItemSheet";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

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
  const { inventory, fetchInventory } = useInventory();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(inventory?.items[0]);
  const router = useRouter();

  const navigateToAdd = () => {
    router.push("/(companyTabs)");
  };

  useEffect(() => {
    async function fetchData() {
      await fetchInventory();
    }
    fetchData();
  }, [inventory, fetchInventory]);

  return (
    <>
      <View style={styles.container}>
        {inventory?.items ? (
          inventory?.items.map((item: Item, index) => {
            return (
              <ShopItem
                key={index}
                item={item}
                setOpen={setOpen}
                setItem={setItem}
              />
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.emptyText}>No Items in your inventory.</Text>
            <TouchableOpacity
              style={styles.addToInvent}
              onPress={navigateToAdd}
            >
              <Text style={styles.addToInventText}>Add item</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <EditItemSheet
        category={item?.name}
        price={item?.price}
        quantity={item?.quantity}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

const ShopItem = ({
  item,
  setOpen,
  setItem,
}: {
  item: Item;
  setOpen: any;
  setItem: any;
}) => {
  const togglePress = () => {
    setOpen((prev: boolean) => !prev);
    setItem(item);
  };
  return (
    <>
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
            <Text style={styles.title}>{item.quantity} KG</Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log("edit")}
            style={styles.iconButton}
          ></TouchableOpacity>
        </View>
        <Button
          onPress={togglePress}
          style={{
            color: Colors.header,
            width: "2%",
            alignSelf: "right",
            top: "2%",
            right: "5%",
          }}
        >
          <Edit3 size={15} color={"black"} />
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
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
    paddingHorizontal: 6,
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
  emptyText: {
    color: "#C9C9C9",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "500",
  },
  addToInvent: {
    marginTop: "5%",
    backgroundColor: "#2B4B40",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  addToInventText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
