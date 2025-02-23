import Container from "@/components/Container";
import Header from "@/components/Header";
import { ArrowRight, Camera, Edit2, Upload, X } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Button, Dialog, Image, Unspaced, View, XStack } from "tamagui";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Container>
      <Header title="Profile" />
      <DialogInstance />
      <Btn
        title="Account Settings"
        color="black"
        onPress={() => router.push("/profile/account-settings")}
      />
      <Btn
        title="Change Address"
        color="black"
        onPress={() => router.push("/profile/change-address")}
      />
      <Btn title="FAQs" color="black" />
      <Btn title="Logout" color="red" />
    </Container>
  );
}

const Btn = ({
  color,
  title,
  onPress,
}: {
  color: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={[styles.title, { color: color }]}>{title}</Text>
      <ArrowRight color={color} />
    </TouchableOpacity>
  );
};

function DialogInstance({ disableAdapt }: { disableAdapt?: boolean }) {
  const [image, setImage] = useState(
    require("../../../assets/images/Default_pfp.jpg")
  );

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
    <Dialog modal>
      <Dialog.Trigger asChild>
        <TouchableOpacity style={styles.imageInput}>
          {image ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.removeButton}>
                <Edit2 size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <Camera size={30} color={"#E0E0E0"} />
          )}
        </TouchableOpacity>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="$shadow6"
          animation="slow"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Select Image</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile Picture here. Select between camera or
            upload.
          </Dialog.Description>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button iconAfter={<Upload />} onPress={pickImage}>
                Upload
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                iconAfter={<Camera />}
                backgroundColor={"#2B4B40"}
                color={"white"}
                onPress={openCamera}
              >
                Open Camera
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={<X />}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  imageInput: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100000,
    width: 150,
    height: 150,
    marginVertical: 20,
    marginBottom: 20,
    marginHorizontal: "auto",
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
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(97, 93, 93, 0.6)",
    borderRadius: 12,
    padding: 5,
  },
});
