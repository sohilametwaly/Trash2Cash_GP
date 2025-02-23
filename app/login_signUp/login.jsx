import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Earn cash from trash, Recycle now!</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter your Email" />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
        />
      </View>

      <Text style={styles.forgetPasswordLink}>Forget Password ?</Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text style={styles.otherWays}>Other ways</Text>
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
      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text style={styles.loginLink}>Sign up now!</Text>
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
    textAlign: "center",
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
  },
  forgetPasswordLink: {
    color: "#2B4B40",
    fontWeight: "bold",

    paddingBottom: 60,
    alignSelf: "flex-end",
  },
});
