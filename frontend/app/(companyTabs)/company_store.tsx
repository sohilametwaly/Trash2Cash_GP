import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "tamagui";
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
import Logo from "@/components/Logo";
import Header from "@/components/Header";
type Company = {
  id: string;
  name: string;
  items: {
    name: string;
    price: string;
    weight: string;
    quantity: number;
    category: string;
  }[];
};

const companies: Company[] = [
  {
    id: "1",
    name: "Company 1",
    items: [
      {
        name: "Metal",
        price: "30 EGP / kg",
        weight: "1000 kg",
        quantity: 100,
        category: "Metal",
      },
    ],
  },
  {
    id: "2",
    name: "Company 2",
    items: [
      {
        name: "Glass",
        price: "40 EGP / kg",
        weight: "500 kg",
        quantity: 50,
        category: "Glass",
      },
    ],
  },
  {
    id: "3",
    name: "Company 3",
    items: [
      {
        name: "Paper",
        price: "35 EGP / kg",
        weight: "800 kg",
        quantity: 80,
        category: "Paper",
      },
    ],
  },
];

export default function CompanyStore() {
  const [quantities, setQuantities] = useState<number[][]>(
    companies.map((company) =>
      company.items.map((item) => Math.max(item.quantity, 100))
    )
  );

  const [icons, setIcons] = useState<JSX.Element[][]>(
    companies.map((company) => company.items.map(() => <Milk color="black" />))
  );

  const [cart, setCart] = useState<boolean[][]>(
    companies.map((company) => company.items.map(() => false))
  );
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updatedIcons = companies.map((company) =>
      company.items.map((item) => {
        switch (item.category) {
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
  }, []);

  const increaseWeight = (companyIndex: number, itemIndex: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[companyIndex][itemIndex] += 50;
      return updatedQuantities;
    });
  };

  const decreaseWeight = (companyIndex: number, itemIndex: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[companyIndex][itemIndex] > 100) {
        updatedQuantities[companyIndex][itemIndex] -= 50;
      }
      return updatedQuantities;
    });
  };

  const toggleCart = (companyIndex: number, itemIndex: number) => {
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
    <>
      <ScrollView style={styles.container}>
        <Header />

        <View style={styles.cartContainer}>
          <ShoppingCart color="black" size={30} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>

        {companies.map((company, companyIndex) => (
          <View style={styles.companyContainer} key={company.id}>
            {company.items.map((item, itemIndex) => (
              <View style={[styles.card, styles.shadowBox]} key={item.name}>
                <View style={styles.itemRow}>
                  {icons[companyIndex][itemIndex]}
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.weight}>{item.weight}</Text>
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

                  <View>
                    <Text>{quantities[companyIndex][itemIndex]} KG</Text>
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
                      cart[companyIndex][itemIndex]
                        ? styles.cancelButton
                        : null,
                    ]}
                    onPress={() => toggleCart(companyIndex, itemIndex)}
                  >
                    <Text style={styles.addButtonText}>
                      {cart[companyIndex][itemIndex] ? "Cancel" : "Add to cart"}
                    </Text>
                    <FontAwesome5
                      name={
                        cart[companyIndex][itemIndex]
                          ? "times"
                          : "shopping-cart"
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: 16,
    backgroundColor: "#FDFDFD",
  },
  header: {
    fontSize: 40,
    color: "#2B4B40",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  companyContainer: {
    marginBottom: "10%",
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
});
