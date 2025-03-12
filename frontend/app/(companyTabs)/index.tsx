import Logo from "@/components/Logo";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function AddScreen() {
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  return (
    <View style={styles.container}>
      <Logo />
      {/* <Text style={styles.heading}>Add</Text> */}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Plastic"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="2.5"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="10.99"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    marginTop: 35,
    paddingHorizontal: "5%",
  },
  heading: {
    fontSize: 40,
    color: "#2B4B40",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 2,

    borderRadius: 10,
    width: "100%",
  },
  label: {
    fontSize: 25,
    color: "#2B4B40",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: "20%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  saveButton: {
    marginTop: "20%",
    backgroundColor: "#2B4B40",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    width: "85%",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF4F4F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
