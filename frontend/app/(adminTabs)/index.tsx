import Header from "@/components/Header";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { useInventory } from "@/store/InventoryContext";

export default function AddScreen() {
  const [category, setCategory] = useState("Plastic");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const { addItem } = useInventory();

  const handleSave = () => {
    addItem({
      name: category,
      quantity: parseInt(weight),
      price: parseFloat(price),
    });
    setCategory("Plastic");
    setWeight("");
    setPrice("");
    Toast.show({
      type: "success",
      text1: "Item added to Inventory successfully!",
    });
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Plastic" value="Plastic" />
              <Picker.Item label="Paper" value="Paper" />
              <Picker.Item label="Metal" value="Metal" />
              <Picker.Item label="Glass" value="Glass" />
              <Picker.Item label="Cardboard" value="Cardboard" />
            </Picker>
          </View>

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
              <Text style={styles.label}>Price / KG</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="7"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: "20%",
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    width: "100%",
    borderRadius: 20,
  },
});
