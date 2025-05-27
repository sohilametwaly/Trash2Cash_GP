import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

import { getToken, saveToken, removeToken } from "../utils/tokenHandlers";

// const BASE_URL = "http://192.168.1.104:3000/api/user";
// const BASE_URL = "http://192.168.1.7:3000/api/user";
// const BASE_URL = "http://192.168.3.246:3000/api/user";
const BASE_URL = "http://192.168.1.4:3000/api/user";

interface LoginData {
  email: string;
  password: string;
}

interface ImgPayload {
  profileImg: string;
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
  isChangingImg: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: NewUser) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  changeProfileImg: (profileImg: ImgPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isChangingImg, setIsChangingImg] = useState(false);
  const router = useRouter();

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
      console.log("Checked successfully", res.data);
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
      await saveToken(res.data.token);
      setAuthUser(res.data);
      Toast.show({
        text1: "Account Created Successfully",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 
        error.response?.data?.message || 
        "Failed to create account. Please try again.";
      
      Toast.show({
        text1: "Sign Up Error",
        text2: errorMessage,
        type: "error",
        position: "bottom",
        visibilityTime: 4000,
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoggingIn(true);
      const res = await axios.post(`${BASE_URL}/signin`, data);
      await saveToken(res.data.token);
      setAuthUser(res.data);
      Toast.show({
        text1: "Welcome back!",
        text2: "Login successful",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 
        error.response?.data?.message ||
        "Invalid email or password";

      Toast.show({
        text1: "Login Error",
        text2: errorMessage,
        type: "error",
        position: "bottom",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      setAuthUser(null);
      router.replace("/login");
      Toast.show({
        text1: "Logged out Successfully",
        type: "success",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const changeProfileImg = async (profileImg: ImgPayload) => {
    setIsChangingImg(true);
    try {
      const token = await getToken();
      const res = await axios.post(`${BASE_URL}/profileImg`, profileImg, {
        headers: {
          token,
        },
      });
      await checkAuth();
      Toast.show({
        type: "success",
        text1: "Profile Image Updated",
        text2: "Your profile image was updated successfully",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || 
        "Failed to update profile image. Please try again.";
      
      Toast.show({
        text1: "Profile Image Error",
        text2: errorMessage,
        type: "error",
        position: "bottom",
        visibilityTime: 4000,
      });
    } finally {
      setIsChangingImg(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
        isChangingImg,
        isCheckingAuth,
        checkAuth,
        signUp,
        login,
        logout,
        changeProfileImg,
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
