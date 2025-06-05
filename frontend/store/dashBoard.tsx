import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/tokenHandlers";
import Toast from "react-native-toast-message";

const BASE_URL = "http://192.168.1.104:3000/api/user";
// const BASE_URL = "http://192.168.1.4:3000/api/user";
// const BASE_URL = "http://192.168.1.7:3000/api/user";

interface DashContextType {
  getUsers: () => Promise<void>;
  getCompanies: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getIncome: () => Promise<void>;
  getExpenses: () => Promise<void>;
  getChartData: () => Promise<void>;
  chartData: any[];
  users: any[];
  companies: any[];
  income: number;
  expenses: number;
}

const DashContext = createContext<DashContextType | undefined>(undefined);

export const DashProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [chartData, setChartData] = useState([]);

  const getUsers = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/getUsers`, {
        headers: { token: `${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.log("Error in get users ", error);
    }
  };

  const getCompanies = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/getCompanies`, {
        headers: { token: `${token}` },
      });
      setCompanies(res.data);
    } catch (error) {
      console.log("Error in get companies ", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const token = await getToken();
      await axios.delete(`${BASE_URL}/delete/${userId}`, {
        headers: { token: `${token}` },
      });
      Toast.show({
        type: "success",
        text1: "User deleted successfully",
      });
      await getUsers();
      await getCompanies();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to delete user",
      });
      console.log("Error in delete user ", error);
    }
  };

  const getIncome = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/appIncome`, {
        headers: { token: `${token}` },
      });
      console.log("res ", res.data);

      setIncome(res.data.total);
    } catch (error) {
      console.log("Error in get income ", error);
    }
  };

  const getExpenses = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/appExpenses`, {
        headers: { token: `${token}` },
      });

      setExpenses(res.data.total);
    } catch (error) {
      console.log("Error in get expenses ", error);
    }
  };

  const getChartData = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${BASE_URL}/chartData`, {
        headers: { token: `${token}` },
      });
      setChartData(res.data);
    } catch (error) {
      console.log("Error in get chart data ", error);
    }
  };

  useEffect(() => {
    getUsers();
    getCompanies();
  }, []);

  return (
    <DashContext.Provider
      value={{
        getUsers,
        getCompanies,
        deleteUser,
        getIncome,
        getExpenses,
        getChartData,
        chartData,
        expenses,
        income,
        users,
        companies,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};

export const useDash = () => {
  const context = useContext(DashContext);
  if (!context) {
    throw new Error("useDash must be used within an DashProvider");
  }
  return context;
};
