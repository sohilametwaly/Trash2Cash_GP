import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddScreen() {
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
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

    marginTop: "17%",
    paddingHorizontal: "5%",
  },
  heading: {
    fontSize: 40,
    color: "#2B4B40",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#D9D9D9",
    padding: 20,

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
