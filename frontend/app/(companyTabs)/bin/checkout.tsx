import { View, StyleSheet, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import { MoveLeft, Truck } from "lucide-react-native";
import { Button, H2 } from "tamagui";
import { Colors } from "@/constants/Colors";
import OrderCard from "@/components/OrderCard";
import { PickupSheet } from "@/components/pickupSheet";
import { useCart } from '@/store/cartContext';
import { useOrders } from "@/store/orderContext";
import Toast from "react-native-toast-message";
import React from "react";
import { useAuth } from "@/store/context";

interface CartItem {
  _id: string;
  wasteType: string;
  quantity: number;
  price: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { addOrder, isProcessingOrder } = useOrders();
  const { authUser } = useAuth();

  console.log("Checkout cartItems: ", cartItems);

  const totalPrice = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [cartItems]
  );

  const handlePlaceOrder = async (pickupDetails: {
    pickupDate: Date;
    pickupTime: string;
    pickupAddress: string;
  }) => {
    console.log("pickupDetails ", pickupDetails);
    try {
      const orderItems = cartItems.map(item => ({
        wasteType: item.wasteType,
        quantity: item.quantity,
        price: item.price || 0,
        sellerId: item.sellerId
      }));
      console.log("orderItems ", orderItems);
      const buyerId = authUser._id;
      const sellerIds = ["67c42cdf06be297aa9b28bd8"];
      await addOrder(orderItems, pickupDetails, buyerId, sellerIds);
      clearCart();
      Toast.show({
        type: 'success',
        text1: 'Order Placed Successfully',
        text2: 'Your order has been placed'
      });
      router.push('/(companyTabs)');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Order Failed',
        text2: 'Failed to place order. Please try again.'
      });
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Your cart is empty</Text>
        <Button onPress={() => router.back()}>Return to Cart</Button>
      </View>
    );
  }

  // Dummy function for updateQuantity since it's required by OrderCard but not needed in checkout
  const updateQuantity = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          size={"$9"}
          icon={MoveLeft}
          backgroundColor="transparent"
          pressStyle={{ opacity: 0.5 }}
          color={"black"}
          paddingLeft={5}
          paddingRight={0}
          height={20}
          onPress={() => router.back()}
        />
        <H2 style={styles.headerText}>Checkout</H2>
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item: CartItem) => item._id.toString()}
          renderItem={({ item }: { item: CartItem }) => (
            <OrderCard 
              order={{
                id: item._id.toString(),
                category: item.wasteType,
                quantity: item.quantity,
                priceperunit: item.price || 0,
              }}
              inCheckout={true}
              updateQuantity={updateQuantity}
            />
          )}
        />
      </View>
      <Text style={styles.totalPrice}>{totalPrice} EGP</Text>
      <PickupSheet onConfirm={handlePlaceOrder} isLoading={isProcessingOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 45,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    padding: 15,
  },
  headerText: {
    fontSize: 30,
    color: Colors.header,
    textAlign: "left",
  },
  totalPrice: {
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
