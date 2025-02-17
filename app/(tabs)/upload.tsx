import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, View } from "tamagui";
import { Text } from "react-native";
import { Camera, Trash2, Upload, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "tamagui";
export default function CameraScreen() {
  const [image, setImage] = useState("");

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access Media is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Image</Text>
      <TouchableOpacity style={styles.imageInput} onPress={openCamera}>
        {image ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setImage("")}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Camera size={30} color={"#E0E0E0"} />
        )}
      </TouchableOpacity>
      <Text style={styles.result}>20 KG Plastic</Text>
      <View style={styles.actionsContainer}>
        <Button
          iconAfter={Upload}
          width={250}
          backgroundColor={"#2B4B40"}
          color={"white"}
          onPress={pickImage}
        >
          Upload
        </Button>
        <Button
          iconAfter={Trash2}
          width={250}
          color={"#2B4B40"}
          onPress={() => {
            setImage("");
            console.log("Added to Bin");
          }}
        >
          Add to Bin
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#F7F8FA", // Light background for contrast
  },
  header: {
    fontSize: 28,
    color: "#2B4B40",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  actionsContainer: {
    alignItems: "center",
    gap: 20,
  },
  imageInput: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 100000,
    width: 150,
    height: 150,
    marginVertical: 20,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  result: {
    fontSize: 24,
    color: "#2B4B40",
    textAlign: "center",
    marginVertical: 40,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 5,
  },
});
