import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "tamagui";
import { Plus, Minus, Milk, Anvil, Wine, Book, Package } from "lucide-react-native";

const companies = [
  {
    id: "1",
    name: "Company 1",
    items: [
      {
        name: "Metal",
        price: "30 EGP / kg",
        weight: "1000 kg",
        quantity: "100",
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
        quantity: "50",
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
        quantity: "80",
        category: "Paper",
      },
    ],
  },
];

export default function AdminStore() {
  const [quantities, setQuantities] = useState(
    companies.map((company) =>
      company.items.map((item) => Math.max(item.quantity, 100))
    )
  );
  
  const [icons, setIcons] = useState(
    companies.map((company) =>
      company.items.map((item) => <Milk color="black" />)
    )
  );

  const [cart, setCart] = useState(
    companies.map((company) =>
      company.items.map(() => false)
    )
  );

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
      updatedCart[companyIndex][itemIndex] = !updatedCart[companyIndex][itemIndex];
      return updatedCart;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Store</Text>

      {companies.map((company, companyIndex) => (
        <View style={styles.companyContainer} key={company.id}>
          <Text style={styles.companyName}>{company.name}</Text>

          {company.items.map((item, itemIndex) => (
            <View style={styles.card} key={item.name}>
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

                <View style={styles.weightContainer}>
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
                    cart[companyIndex][itemIndex] ? styles.cancelButton : null,
                  ]}
                  onPress={() => toggleCart(companyIndex, itemIndex)}
                >
                  <Text style={styles.addButtonText}>
                    {cart[companyIndex][itemIndex] ? "Cancle" : "Add to cart"}
                  </Text>
                  <FontAwesome5
                    name={cart[companyIndex][itemIndex] ? "times" : "shopping-cart"}
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
  container: {
    flex: 1,
    padding: 16,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 9,
    marginBottom: 10,
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
