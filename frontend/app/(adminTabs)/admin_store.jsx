import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "tamagui";
import Header from "@/components/Header";
import {
  Plus,
  Minus,
  Milk,
  Anvil,
  Wine,
  Book,
  Package,
  ShoppingCart,
} from "lucide-react-native";
import { useInventory } from "@/store/InventoryContext";

export default function AdminStore() {
  const { adminShop, getAdminShop } = useInventory();

  useEffect(() => {
    getAdminShop();
  }, [getAdminShop, adminShop]);

  useEffect(() => {
    const updatedIcons = adminShop.map((company) =>
      company.items.map((item) => {
        switch (item.name) {
          case "Metal":
            return <Anvil color="black" />;
          case "Glass":
            return <Wine color="black" />;
          case "Paper":
            return <Book color="black" />;
          case "Plastic":
            return <Milk color="black" />;
          case "Cardboard":
            return <Package color="black" />;
          default:
            return <Milk color="black" />;
        }
      })
    );
    setIcons(updatedIcons);
  }, [adminShop]);

  const [quantities, setQuantities] = useState(
    adminShop.map((company) =>
      company.items.map((item) => Math.min(item.quantity, 100))
    )
  );

  const [icons, setIcons] = useState(
    adminShop.map((company) =>
      company.items.map((item) => <Milk color="black" />)
    )
  );

  const [cart, setCart] = useState(
    adminShop.map((company) => company.items.map(() => false))
  );

  const [cartCount, setCartCount] = useState(0);

  const increaseWeight = (companyIndex, itemIndex) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[companyIndex][itemIndex] += 50;
      return updatedQuantities;
    });
  };

  const decreaseWeight = (companyIndex, itemIndex) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[companyIndex][itemIndex] > 100) {
        updatedQuantities[companyIndex][itemIndex] -= 50;
      }
      return updatedQuantities;
    });
  };

  const toggleCart = (companyIndex, itemIndex) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const currentItemInCart = updatedCart[companyIndex][itemIndex];

      if (currentItemInCart) {
        setCartCount((prevCount) => Math.max(prevCount - 1, 0));
      } else {
        setCartCount((prevCount) => prevCount + 1);
      }

      updatedCart[companyIndex][itemIndex] =
        !updatedCart[companyIndex][itemIndex];
      return updatedCart;
    });
  };

  return (
    <ScrollView>
      <Header />

      <View style={styles.cartContainer}>
        <ShoppingCart color="black" size={30} />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </View>

      {adminShop.map((company, companyIndex) => (
        <View style={styles.companyContainer} key={company.id}>
          <Text style={styles.companyName}>{company.userName}</Text>

          {company.items.map((item, itemIndex) => (
            <View style={[styles.card, styles.shadowBox]} key={item.name}>
              <View style={styles.itemRow}>
                {icons[companyIndex][itemIndex]}
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.price}>{item.price} EGP / Item</Text>
                <Text style={styles.weight}>{item.quantity} Items</Text>
              </View>

              <View style={styles.quantityContainer}>
                <Button
                  circular
                  size={"$2"}
                  icon={Plus}
                  borderColor="$color"
                  borderWidth={1.5}
                  backgroundColor="transparent"
                  pressStyle={{ opacity: 0.5 }}
                  color={"black"}
                  onPress={() => increaseWeight(companyIndex, itemIndex)}
                />

                <View style={styles.weightContainer}>
                  <Text>{quantities[companyIndex][itemIndex]} Item</Text>
                </View>

                <Button
                  circular
                  size={"$2"}
                  icon={Minus}
                  borderColor="$color"
                  borderWidth={1.5}
                  backgroundColor="transparent"
                  pressStyle={{ opacity: 0.5 }}
                  color={"black"}
                  onPress={() => decreaseWeight(companyIndex, itemIndex)}
                />

                <TouchableOpacity
                  style={[
                    styles.addButton,
                    cart[companyIndex][itemIndex] ? styles.cancelButton : null,
                  ]}
                  onPress={() => toggleCart(companyIndex, itemIndex)}
                >
                  <Text style={styles.addButtonText}>
                    {cart[companyIndex][itemIndex] ? "Cancel" : "Add to cart"}
                  </Text>
                  <FontAwesome5
                    name={
                      cart[companyIndex][itemIndex] ? "times" : "shopping-cart"
                    }
                    size={16}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },

  cartContainer: {
    position: "absolute",
    top: 60,
    right: 80,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -15,
    right: 0,
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  companyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  companyName: {
    fontSize: 25,
    fontWeight: "400",
    color: "#2B4B40",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,

    marginBottom: 10,
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    backgroundColor: "#2B4B40",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 14,
  },
  weight: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 5,
    borderRadius: 7,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18AE7B",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  cancelButton: {
    backgroundColor: "#E74C3C",
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
    marginRight: 8,
  },
});
