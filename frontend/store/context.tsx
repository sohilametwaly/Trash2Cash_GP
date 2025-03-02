import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

import { getToken, saveToken, removeToken } from "../utils/tokenHandlers";

const BASE_URL = "http://192.168.1.7:3000/api/user";

interface LoginData {
  email: string;
  password: string;
}

interface NewUser {
  email: string;
  password: string;
  name: string;
}

interface AuthContextType {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: NewUser) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setAuthUser(null);
        return;
      }
      const res = await axios.get(`${BASE_URL}/profile`, {
        headers: { token: `${token}` },
      });
      // console.log("Checked successfully");
      setAuthUser(res.data);
    } catch (error: any) {
      console.error("Auth check failed:", error.response?.data || error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signUp = async (data: NewUser) => {
    try {
      setIsSigningUp(true);
      const res = await axios.post(`${BASE_URL}/signup`, data);
      console.log("Success");
      await saveToken(res.data.token);
      setAuthUser(res.data);
      Toast.show({
        text1: "Account Created Successfully",
        type: "success",
      });
      // toast.success("Account Created Successfully");
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error);
      // toast.error(error.response?.data?.msg || "Failed to create account");
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoggingIn(true);
      const res = await axios.post(`${BASE_URL}/signin`, data);
      // if (res.data.msg) {
      //   toast.error(res.data.msg);
      // }
      console.log("Login successfully");
      await saveToken(res.data.token);
      setAuthUser(res.data);
      Toast.show({
        text1: "Login Successfully",
        type: "success",
      });
      // toast.success("Login Successfully");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error);
      Toast.show({
        text1: error.response?.data?.message || "Failed to login",
        type: "error",
      });
      // toast.error();
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      setAuthUser(null);
      Toast.show({
        text1: "Logged out Successfully",
        type: "success",
      });
      // toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error);
      // toast.error("Failed to log out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
        isCheckingAuth,
        checkAuth,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
