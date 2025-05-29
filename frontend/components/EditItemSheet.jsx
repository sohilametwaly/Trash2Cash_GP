import { Sheet } from "@tamagui/sheet";
import React, { useState, useEffect } from "react";
import { Button, Input } from "tamagui";
import { View, Keyboard, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useInventory } from "@/store/InventoryContext";
import Toast from "react-native-toast-message";

export const EditItemSheet = ({ category, quantity, price, open, setOpen }) => {
  const [position, setPosition] = React.useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);
  const [editedPrice, setEditedPrice] = useState(price);
  const { editItem } = useInventory();

  const saveHandler = async () => {
    try {
      await editItem({
        name: category,
        quantity: editedQuantity,
        price: editedPrice,
      });

      setOpen(false);
      Toast.show({
        type: "success",
        text1: `${category} updated successfully🎉`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Error occurred during updating.`,
      });
      console.error("Error saving item:", error);
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    setEditedQuantity(quantity);
    setEditedPrice(price);
  }, [quantity, price]);

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          backgroundColor="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          style={{ position: "absolute", inset: 0 }}
        />

        <Sheet.Handle position="relative" top={keyboardVisible ? 35 : 250} />
        <Sheet.Frame
          padding="$4"
          alignItems="center"
          gap="$5"
          maxHeight={290}
          position="absolute"
          bottom={-50}
          width={"100%"}
          alignSelf="stretch"
        >
          <View style={{ alignItems: "center", gap: 7 }}>
            <Text
              style={{
                color: Colors.header,
                paddingBottom: 10,
                fontSize: 30,
              }}
            >
              Edit{" "}
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 35,
                  color: Colors.header,
                }}
              >
                {category}
              </Text>
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Input
                placeholder={`${editedQuantity}`}
                placeholderTextColor={"black"}
                flex={1}
                borderWidth={1}
                borderColor="#ccc"
                maxLength={16}
                value={editedQuantity}
                onChangeText={setEditedQuantity}
                keyboardType="numeric"
              />
              <Input
                placeholder={`${editedPrice}`}
                placeholderTextColor={"black"}
                flex={1}
                borderWidth={1}
                borderColor="#ccc"
                maxLength={16}
                value={editedPrice}
                keyboardType="numeric"
                onChangeText={setEditedPrice}
              />
            </View>
            <Button
              backgroundColor={Colors.header}
              width={"70%"}
              margin={25}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              onPress={saveHandler}
            >
              <Button.Text
                textAlign="center"
                width={"100%"}
                fontSize={18}
                color={"white"}
              >
                Save
              </Button.Text>
            </Button>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
