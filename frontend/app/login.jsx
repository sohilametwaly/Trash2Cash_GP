import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Separator } from "tamagui";
import { useAuth } from "../store/context.tsx";
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { authUser, checkAuth, login, isLoggingIn } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      navigateBasedOnRole(authUser.role);
    }
  }, [authUser]);

  const navigateBasedOnRole = (role) => {
    console.log("navigateBasedOnRole", role);
    if (role === "admin") {
      router.replace("./(adminTabs)");
    } else if (role === "user") {
      router.replace("./(tabs)");
    } else if (role === "company") {
      router.replace("./(companyTabs)");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setIsEmailValid(false);
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      return "Please enter a valid email address";
    }
    setIsEmailValid(true);
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      setIsPasswordValid(false);
      return "Password is required";
    }
    if (password.length < 6) {
      setIsPasswordValid(false);
      return "Password must be at least 6 characters";
    }
    setIsPasswordValid(true);
    return "";
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailError = validateEmail(text);
    setErrors(prev => ({ ...prev, email: emailError }));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const passwordError = validatePassword(text);
    setErrors(prev => ({ ...prev, password: passwordError }));
  };

  const handleLogin = async () => {
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // If there are any errors, don't proceed with login
    if (emailError || passwordError) {
      return;
    }

    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrors({
        ...errors,
        general: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Earn cash from trash, Recycle now!</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={[
        styles.inputContainer,
        errors.email ? styles.inputError : isEmailValid ? styles.inputSuccess : null
      ]}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
        />
        {email.length > 0 && (
          <View style={styles.validationIcon}>
            {isEmailValid ? (
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            ) : (
              <MaterialIcons name="error" size={20} color="#FF5252" />
            )}
          </View>
        )}
      </View>
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={[
        styles.inputContainer,
        errors.password ? styles.inputError : isPasswordValid ? styles.inputSuccess : null
      ]}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        {password.length > 0 && (
          <View style={styles.validationIcon}>
            {isPasswordValid ? (
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            ) : (
              <MaterialIcons name="error" size={20} color="#FF5252" />
            )}
          </View>
        )}
      </View>
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      {/* General Error Message */}
      {errors.general ? (
        <Text style={styles.errorText}>{errors.general}</Text>
      ) : null}

      <Text style={styles.forgetPasswordLink}>Forget Password?</Text>

      {/* Login Button */}
      <TouchableOpacity 
        style={[
          styles.button,
          (!isEmailValid || !isPasswordValid) && styles.buttonDisabled
        ]} 
        onPress={handleLogin}
        disabled={!isEmailValid || !isPasswordValid}
      >
        <Text style={styles.buttonText}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Text>
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
    flex: 1,
    padding: 10,
    fontSize: 16,
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
    marginVertical: 20,
    width: 250,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
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
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: '500',
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  inputSuccess: {
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  validationIcon: {
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
});