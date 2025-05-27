import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Separator } from "tamagui";
import { saveToken } from "../utils/tokenHandlers";
import { useAuth } from "../store/context";
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { checkAuth, authUser, signUp, isSigningUp } = useAuth();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      navigateBasedOnRole(authUser.role);
    }
  }, [authUser]);

  const navigateBasedOnRole = (role) => {
    if (role === "admin") {
      router.replace("./(adminTabs)");
    } else if (role === "user") {
      router.replace("./(tabs)");
    }
  };

  const validateUsername = (username) => {
    if (!username) {
      setIsUsernameValid(false);
      return "Username is required";
    }
    if (username.length < 3) {
      setIsUsernameValid(false);
      return "Username must be at least 3 characters";
    }
    setIsUsernameValid(true);
    return "";
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

  const handleUsernameChange = (text) => {
    setUsername(text);
    const usernameError = validateUsername(text);
    setErrors(prev => ({ ...prev, username: usernameError }));
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

  const handleSignUp = async () => {
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      try {
        await signUp({ email, password, name: username, isCompany: isChecked });
        await checkAuth();
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          general: "Sign up failed. Please try again.",
        }));
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Earn cash from trash, Recycle now!</Text>

        <Text style={styles.label}>Username</Text>
        <View style={[
          styles.inputContainer,
          errors.username ? styles.inputError : isUsernameValid ? styles.inputSuccess : null
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Name"
            value={username}
            onChangeText={handleUsernameChange}
          />
          {username.length > 0 && (
            <View style={styles.validationIcon}>
              {isUsernameValid ? (
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              ) : (
                <MaterialIcons name="error" size={20} color="#FF5252" />
              )}
            </View>
          )}
        </View>
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

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

        <View style={styles.checkContainer}>
          <TouchableOpacity
            onPress={toggleCheckbox}
            style={styles.checkboxContainer}
          >
            <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>Is Company?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            (!isUsernameValid || !isEmailValid || !isPasswordValid) && styles.buttonDisabled
          ]} 
          onPress={handleSignUp}
          disabled={!isUsernameValid || !isEmailValid || !isPasswordValid}
        >
          <Text style={styles.buttonText}>
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("./login")}>
            <Text style={styles.loginLink}>Login now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 30,
    paddingBottom: 50,
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
    fontSize: 17,
    marginVertical: 10,
    color: "#2B4B40",
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
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  validationIcon: {
    padding: 10,
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  inputSuccess: {
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  button: {
    backgroundColor: "#2B4B40",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
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
    marginBottom: 20,
    marginTop: 10,
  },
  socialButton: {
    paddingVertical: 17,
    paddingHorizontal: 23,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    textAlign: "center",
    color: "#888",
    alignItems: "center",
  },
  loginLink: {
    color: "#2B4B40",
    fontWeight: "bold",
  },
  checkContainer: {
    marginLeft: 5,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,

    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkmark: {
    color: "#2B4B40",
    fontSize: 14,
  },
  checkedBox: {
    backgroundColor: "#2B4B40",
  },
});
