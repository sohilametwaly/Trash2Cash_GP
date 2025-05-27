import React, { createContext, useState, useContext, useEffect } from 'react';
import Toast from "react-native-toast-message";
import { getToken } from "../utils/tokenHandlers";
import axios from 'axios';
import { useAuth } from './context';

interface CartItem {
  _id: string;
  wasteType: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isAddingToCart: boolean;
  getCart: () => void;
  isLoading: boolean;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
}

// const BASE_URL = "http://192.168.1.2:3000/api/cart";
const BASE_URL = "http://192.168.1.4:3000/api/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();

  const getCart = () => {
    if (!authUser) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (authUser) {
      getCart();
    } else {
      setCartItems([]);
    }
  }, [authUser]);

  const addToCart = (item: CartItem) => {
    setIsAddingToCart(true);
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(
          cartItem => cartItem.wasteType === item.wasteType
        );

        if (existingItem) {
          return prevItems.map(cartItem => 
            cartItem.wasteType === item.wasteType
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        }
        
        return [...prevItems, item];
      });

      Toast.show({
        text1: "Added To Cart Successfully",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text1: "Failed to add to cart",
        type: "error",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const removeFromCart = (itemId: string) => {
    try {
      setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item._id !== itemId);
        return [...newItems];
      });
      Toast.show({
        text1: "Item removed from cart",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text1: "Failed to remove item",
        type: "error",
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    try {
      setCartItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item._id.toString() === itemId
            ? { ...item, quantity: newQuantity }
            : item
        );
        return [...updatedItems];
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Failed to update quantity'
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isAddingToCart,
        getCart,
        isLoading,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 