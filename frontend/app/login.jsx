import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Separator } from "tamagui";
import axios from "axios";
import { saveToken } from "../utils/tokenHandlers";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.104:3000/api/user/signin",
        {
          email,
          password,
        }
      );

      await saveToken(response.data.token);

      if (response.data.role === "admin") {
        router.replace("./(adminTabs)");
      } else if (response.data.role === "user") {
        router.replace("./(tabs)");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Earn cash from trash, Recycle now!</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} // ✅ Update state
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // ✅ Update state
        />
      </View>

      <Text style={styles.forgetPasswordLink}>Forget Password?</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
        <Separator />
        <Text style={styles.otherWays}>Other ways</Text>
        <Separator />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("@/assets/images/facebook_ic.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("@/assets/images/google_ic.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("./signUp")}>
          <Text style={styles.loginLink}> Sign up now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    marginTop: 45,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#2B4B40",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    opacity: 0.3,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    marginVertical: 15,
    color: "#2B4B40",
  },
  input: {
    borderColor: "#ddd",
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginVertical: 13,
    fontSize: 20,
    marginLeft: 10,
    color: "#004d40",
  },
  button: {
    backgroundColor: "#2B4B40",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: 250,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  otherWays: {
    textAlign: "center",
    color: "#888",
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  socialButton: {
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 23,
    paddingLeft: 23,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  socialIcon: {
    width: 24, // Adjust size according to your icon dimensions
    height: 24,
  },
  footerText: {
    color: "#888",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  loginLink: {
    color: "#2B4B40",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
  forgetPasswordLink: {
    color: "#2B4B40",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
});
