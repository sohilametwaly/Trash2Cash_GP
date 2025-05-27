// import { FlatList, Text, View, StyleSheet } from "react-native";
// import OrderCard from "@/components/OrderCard";
// import { Button, H2, YStack } from "tamagui";
// import { Colors } from "@/constants/Colors";
// import { router } from "expo-router";
// import Logo from "@/components/Logo";
// import Header from "@/components/Header";
// import { useState } from "react";

// const DUMMY_BIN_ITEMS = [
//   {
//     id: "1",
//     category: "Paper",
//     weight: 3,
//     pricePerKg: 15,
//   },
//   {
//     id: "2",
//     category: "Plastic",
//     weight: 45,
//     pricePerKg: 41,
//   },
//   {
//     id: "3",
//     category: "Glass",
//     weight: 2,
//     pricePerKg: 12,
//   },
// ];

// export default function BinScreen() {
//   const [binItems, setBinItems] = useState(DUMMY_BIN_ITEMS);
//   const totalPrice = binItems.reduce(
//     (sum, item) => sum + item.pricePerKg * item.weight,
//     0
//   );

//   const updateWeight = (id: String, change: number) => {
//     const newBinItems = setBinItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? { ...item, weight: Math.max(0, item.weight + change) }
//           : item
//       )
//     );
//   };
//   return (
//     <>
//       <Header />
//       <View style={styles.container}>
//         <View>
//           <FlatList
//             data={binItems}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <OrderCard
//                 order={item}
//                 inCheckout={false}
//                 updateWeight={updateWeight}
//               />
//             )}
//           />
//         </View>
//         <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
//         <Button style={styles.btn} onPress={() => router.push("/bin/checkout")}>
//           Checkout
//         </Button>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "white",
//     paddingTop: 10,
//   },
//   header: {
//     color: Colors.header,
//     marginBottom: 10,
//   },
//   totalPrice: {
//     fontWeight: "500",
//     fontSize: 35,
//     textAlign: "center",
//     marginTop: 30,
//   },
//   btn: {
//     backgroundColor: Colors.header,
//     color: "white",
//     width: "80%",
//     alignSelf: "center",
//     marginTop: 30,
//   },
// });
import { FlatList, Text, View, StyleSheet } from "react-native";
import OrderCard from "@/components/OrderCard";
import { Button, H2, YStack } from "tamagui";
import { Colors } from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import { useCart } from '@/store/cartContext';
import { useOrders } from '@/store/orderContext';
import React from 'react';
import Toast from "react-native-toast-message";

export default function BinScreen() {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart, isLoading } = useCart();
  const { isProcessingOrder } = useOrders();
  const router = useRouter();
  
  const totalPrice = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [cartItems]
  );

  const updateQuantity = (id: string, change: number) => {
    const updatedItem = cartItems.find(item => item._id.toString() === id);
    if (updatedItem) {
      const newQuantity = Math.max(0, updatedItem.quantity + change);
      if (newQuantity === 0) {
        removeFromCart(id);
      } else {
        updateCartItemQuantity(id, newQuantity);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading cart...</Text>
      </View>
    );
  }

  const handleCheckout = async () => {
    if (cartItems.length > 0) {
      try {
        router.navigate("/bin/checkout");
      } catch (error) {
        console.error("Checkout failed:", error);
        Toast.show({
          type: 'error',
          text1: 'Checkout failed',
          text2: 'Please try again'
        });
      }
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <OrderCard
                order={{
                  id: item._id.toString(),
                  category: item.wasteType,
                  quantity: item.quantity,
                  priceperunit: item.price || 0,
                }}
                inCheckout={false}
                updateQuantity={updateQuantity}
              />
            )}
          />
        </View>
        <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
        <Button 
          style={styles.btn} 
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
        >
          {"Checkout"}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 10,
  },
  header: {
    color: Colors.header,
    marginBottom: 10,
  },
  totalPrice: {
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
  },
  btn: {
    backgroundColor: Colors.header,
    color: "white",
    width: "80%",
    alignSelf: "center",
    marginTop: 30,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
