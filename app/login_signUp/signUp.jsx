import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      Alert.alert("Sign up successful!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Earn cash from trash, Recycle now!</Text>

      <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.otherWays}>Other ways</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("./assets/facebook_ic.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("./assets/google_ic.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.loginLink}>Login now!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    color: "#2B4B40",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    marginVertical: 15,
    color: "#2B4B40",
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
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
  button: {
    backgroundColor: "#2B4B40",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: 250,
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
  },
  loginLink: {
    color: "#2B4B40",
    fontWeight: "bold",
  },
  checkContainer: {
    marginTop: "5%",
    marginLeft: "5%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
