import { useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Button, Input, Label, View, XStack, YStack } from "tamagui";
import { Text } from "react-native";
import { Camera as CameraIcon, Trash2, Upload, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "tamagui";
import { useAuth } from "@/store/context";
import { Colors } from "@/constants/Colors";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Toast from "react-native-toast-message";
import { useCart } from "@/store/cartContext";
import { useOrders } from "@/store/orderContext";

const products = [
  { id: 1, Category: "Plastic", quantity: 5 },
  { id: 2, Category: "Paper", quantity: 10 },
  { id: 3, Category: "Glass", quantity: 3 },
  { id: 4, Category: "Metal", quantity: 2 },
  { id: 5, Category: "Other", quantity: 1 },
];

export default function CameraScreen() {
  const { authUser } = useAuth();
  const [image, setImage] = useState("");
  const { addToCart, isAddingToCart } = useCart();

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

  const renderProductItem = ({ item, index }: { item: any; index: number }) => (
    <XStack key={index} style={styles.productRow} gap={5} alignSelf="center">
      <YStack width={100}>
        <Input
          disabled
          value={item.quantity?.toString()}
          style={styles.disabledInput}
        />
      </YStack>
      <YStack width={180}>
        <Input value={item.Category} disabled style={styles.disabledInput} />
      </YStack>
    </XStack>
  );

  const ListHeader = () => (
    <XStack style={styles.headerContainer} gap={5} alignSelf="center">
      <YStack width={100}>
        <Label color={"#2B4B40"} fontSize={16} fontWeight="bold">
          Quantity
        </Label>
      </YStack>
      <YStack width={180}>
        <Label color={"#2B4B40"} fontSize={16} fontWeight="bold">
          Material
        </Label>
      </YStack>
    </XStack>
  );

  const ListEmptyComponent = () => (
    <Text style={styles.emptyText}>No products available</Text>
  );

  // Add to cart handler
  const handleAddToCart = () => {
    if (products.length > 0) {
      products.forEach((product) => {
        addToCart({
          _id: product.id.toString(),
          wasteType: product.Category,
          quantity: product.quantity,
          price: 0.5,
          sellerId: authUser._id,
        });
      });
    }
  };

  return (
    <>
      <Header />
      <Container>
        <View
          style={{
            alignItems: "center",
            gap: 7,
          }}
        >
          <Text style={{ fontSize: 27 }}>
            Welcome,{" "}
            <Text style={{ color: Colors.header, fontWeight: "600" }}>
              {authUser?.name}
            </Text>
          </Text>
        </View>

        {/* <Text style={styles.header}>Upload Image</Text> */}
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
            <CameraIcon size={30} color={"#E0E0E0"} />
          )}
        </TouchableOpacity>
        {/* <Text style={styles.result}>20 KG Plastic</Text> */}

        {/* Products List */}
        {products.length > 0 && <ListHeader />}
        <View style={styles.listContainer}>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            // ListHeaderComponent={ListHeader}
            ListEmptyComponent={ListEmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

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
            onPress={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? "Adding to Bin..." : "Add to Bin"}
          </Button>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: '#f5f5f5',
    // paddingVertical: 10,
    paddingHorizontal: 15,
    // marginBottom: 10,
    // borderRadius: 8,
    width: "90%",
  },
  productRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  disabledInput: {
    backgroundColor: "#f9f9f9",
    opacity: 0.8,
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
    marginBottom: 10,
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
  listContainer: {
    flex: 1,
    height: 300, // Adjust this height based on your needs
    marginVertical: 10,
    marginTop: 0,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 14,
  },
});
