import React, { createContext, useState, useContext } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import { getToken } from "../utils/tokenHandlers";
import { useAuth } from "./context";
// import { useAuth } from './context';

interface OrderItem {
  _id: string;
  items: {
    wasteType: string;
    quantity: number;
    price: number;
    sellerId: string;
  }[];
  totalQuantity: number;
  status: "pending" | "delivered" | "cancelled";
  createdAt: Date;
  pickupDate: Date;
  pickupTime: string;
  pickupAddress: string;
  totalPrice: number;
  buyerId: string;
  sellerIds: string[];
}

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (
    items: OrderItem["items"],
    pickupDetails: {
      pickupDate: Date;
      pickupTime: string;
      pickupAddress: string;
    },
    buyerId: string,
    sellerIds: string[],
    prices: Record<string, number>
  ) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: OrderItem["status"]
  ) => Promise<void>;
  getOrderHistory: () => Promise<void>;
  isProcessingOrder: boolean;
  isLoading: boolean;
}

// const BASE_URL = "http://192.168.1.2:3000/api/order";
// const BASE_URL = "http://192.168.1.4:3000/api/order";
// const USER_URL = "http://192.168.1.4:3000/api/user";
const BASE_URL = "http://192.168.1.104:3000/api/order";
const USER_URL = "http://192.168.1.104:3000/api/user";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, updateBalance } = useAuth();

  const getOrderHistory = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(BASE_URL, {
        headers: { token },
      });

      const ordersWithDates = response.data.map((order: any) => ({
        ...order,
        pickupDate: new Date(order.pickupDate),
        createdAt: new Date(order.createdAt),
      }));

      setOrders(ordersWithDates);
    } catch (error: any) {
      console.error("Failed to fetch orders:", error);
      Toast.show({
        text1: "Failed to fetch order history",
        text2: error.response?.data?.message || "Please try again",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (
    items: OrderItem["items"],
    pickupDetails: {
      pickupDate: Date;
      pickupTime: string;
      pickupAddress: string;
    },
    buyerId: string,
    sellerIds: string[],
    prices: Record<string, number>
  ) => {
    setIsProcessingOrder(true);
    try {
      console.log("orderContext addOrder1");
      const token = await getToken();
      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      prices[buyerId] = -1 * totalPrice;
      await updateBalance(prices);
      // if(authUser.balance < totalPrice) {
      //   Toast.show({
      //     text1: "Insufficient balance",
      //     type: "error",
      //   });
      //   return;
      // }
      console.log("orderContext addOrder2");

      // const sellerIds: string[] = [];
      // sellerIds.push(authUser._id);
      // let buyerId = "";
      // if(authUser.role == "user"){
      //   buyerId = "67c42cdf06be297aa9b28bd8"
      // }
      const orderData = {
        buyerId,
        sellerIds,
        items,
        totalPrice,
        pickupDate: pickupDetails.pickupDate.toISOString(),
        pickupTime: pickupDetails.pickupTime,
        pickupAddress: pickupDetails.pickupAddress,
      };

      console.log("token OrderContext", token);
      const response = await axios.post(`${BASE_URL}/add`, orderData, {
        headers: { token },
      });
      // console.log("orderContext addOrder3");
      // const userResponse = await axios.post(`${USER_URL}/updateBalances`, {prices}, {
      //   headers: { token },
      // });
      console.log("orderContext addOrder3");
      const orderWithDate = {
        ...response.data,
        pickupDate: new Date(response.data.pickupDate),
        createdAt: new Date(response.data.createdAt),
      };

      console.log("prices OrderContext", prices);

      setOrders((prevOrders) => [...prevOrders, orderWithDate]);
      Toast.show({
        text1: "Order placed successfully",
        type: "success",
      });
      return orderWithDate;
    } catch (error: any) {
      console.error("Failed to place order:", error);
      Toast.show({
        text1: "Failed to place order",
        text2: error.response?.data?.message || "Please try again",
        type: "error",
      });
      throw error;
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderItem["status"]
  ) => {
    try {
      console.log("orderId ", orderId);
      console.log("status ", status);
      const token = await getToken();
      const response = await axios.patch(
        `${BASE_URL}/${orderId}`,
        { status },
        { headers: { token } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? response.data : order
        )
      );

      Toast.show({
        text1: `Order ${status} successfully`,
        type: "success",
      });
    } catch (error: any) {
      console.error("Failed to update order:", error);
      Toast.show({
        text1: "Failed to update order status",
        text2: error.response?.data?.message || "Please try again",
        type: "error",
      });
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderHistory,
        isProcessingOrder,
        isLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
