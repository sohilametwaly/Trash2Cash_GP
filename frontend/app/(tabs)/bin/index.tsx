import { FlatList, Text, View, StyleSheet } from "react-native";
import OrderCard from "@/components/OrderCard";
import { Button, H2, YStack } from "tamagui";
import { Colors } from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import { useCart } from '@/store/cartContext';
import { useOrders } from '@/store/orderContext';
import React, { useState, useEffect } from 'react';
import Toast from "react-native-toast-message";

interface CartItem {
  _id: string;
  wasteType: string;
  quantity: number;
  price: number;
}

export default function BinScreen() {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart, isLoading } = useCart();
  const { isProcessingOrder } = useOrders();
  const router = useRouter();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(cartItems);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const totalPrice = localCartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const updateQuantity = (id: string, change: number) => {
    const updatedItem = localCartItems.find(item => item._id.toString() === id);
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
    if (localCartItems.length > 0) {
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

  const renderItem = ({ item }: { item: CartItem }) => (
    <OrderCard
      key={item._id}
      order={{
        id: item._id.toString(),
        category: item.wasteType,
        quantity: item.quantity,
        priceperunit: item.price || 0,
      }}
      inCheckout={false}
      updateQuantity={updateQuantity}
    />
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <FlatList
            data={localCartItems}
            renderItem={renderItem}
            keyExtractor={(item: CartItem) => item._id.toString()}
            extraData={localCartItems}
          />
        </View>
        <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
        <Button 
          style={styles.btn} 
          onPress={handleCheckout}
          disabled={localCartItems.length === 0}
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