import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getToken } from "../utils/tokenHandlers";

// const BASE_URL = "http://192.168.1.104:3000/api/inventory";
const BASE_URL = "http://192.168.1.4:3000/api/inventory";
//const BASE_URL = 'http://192.168.1.7:3000/api/inventory'

interface Inventory {
  userId: string;
  items: Item[];
}

interface Shop {
  _id: string;
  items: Item[];
  userName: string;
  companyId: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface InventoryContextType {
  inventory: Inventory | null;
  adminShop: Shop | null;
  companyShop: Shop | null;
  isFetchingInventory: boolean;
  fetchInventory: () => Promise<void>;
  addItem: (data: Item) => Promise<void>;
  editItem: (data: Item) => Promise<void>;
  getAdminShop: () => Promise<any>;
  getCompanyShop: () => Promise<any>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const InventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inventory, setInventory] = useState(null);
  const [isFetchingInventory, setIsFetchingInventory] = useState(false);
  const [adminShop, setAdminShop] = useState(null);
  const [companyShop, setCompanyShop] = useState(null);

  const addItem = async (data: Item) => {
    try {
      const token = await getToken();
      console.log("token ", token);
      console.log("data ", data);

      const res = await axios.post(`${BASE_URL}/add`, data, {
        headers: { token: `${token}` },
      });
      console.log("res ", res);

      await fetchInventory();
      Toast.show({
        type: "success",
        text1: "Item added to Inventory successfully!",
      });
    } catch (error) {}
  };

  const editItem = async (data: Item) => {
    try {
      const token = await getToken();
      const res = await axios.put(`${BASE_URL}/edit`, data, {
        headers: { token: `${token}` },
      });

      await fetchInventory();
    } catch (error) {}
  };

  const fetchInventory = async () => {
    try {
      setIsFetchingInventory(true);
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/get`, {
        headers: { token: `${token}` },
      });
      setInventory(res.data);
    } catch (error) {
      console.log("Error in fetch inventory ", error);
    } finally {
      setIsFetchingInventory(false);
    }
  };

  const getAdminShop = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/adminShop`, {
        headers: { token: `${token}` },
      });
      // console.log("Companies inventory ", res.data);

      setAdminShop(res.data);
    } catch (error) {
      console.log("Error in get companies ", error);
    }
  };

  const getCompanyShop = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/companyShop`, {
        headers: { token: `${token}` },
      });
      setCompanyShop(res.data);
    } catch (error) {
      console.log("Error in get companies ", error);
    }
  };

  useEffect(() => {
    fetchInventory();
    getAdminShop();
    getCompanyShop();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        adminShop,
        fetchInventory,
        editItem,
        addItem,
        isFetchingInventory,
        getAdminShop,
        getCompanyShop,
        companyShop,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
