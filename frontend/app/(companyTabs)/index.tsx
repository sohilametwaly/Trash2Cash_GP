import Header from "@/components/Header";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { useInventory } from "@/store/InventoryContext";

export default function AddScreen() {
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("Plastic");

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

  // const handleDelete = () => {
  //   setCategory('')
  //   setWeight('')
  //   setPrice('')
  //   Toast.show({
  //     type: 'success', text1: 'Item Removed to Inventory successfully!'
  //   })
  // }

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
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="10.99"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "5%",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 40,
    color: "#2B4B40",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,

    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 6,

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
