import { CreditCard } from "lucide-react-native";
import { Sheet } from "@tamagui/sheet";
import React, { useState, useEffect } from "react";
import { Button, H2, Input, Label, XStack } from "tamagui";
import { View, Keyboard } from "react-native";
import { Colors } from "@/constants/Colors";

export const CardInfoSheet = () => {
  const [position, setPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        style={{
          color: Colors.header,
          width: "75%",
          alignSelf: "center",
          bottom: "40%",
          position: "absolute",
        }}
      >
        <Button.Text fontSize={20}> Enter card Details</Button.Text>
      </Button>

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
          position="absolute"
        />

        <Sheet.Handle position="relative" top={keyboardVisible ? 50 : 330} />
        <Sheet.Frame
          padding="$4"
          alignItems="center"
          gap="$5"
          maxHeight={310}
          position="absolute"
          bottom={-70}
        >
          <View style={{ alignItems: "center", gap: 7 }}>
            <H2 color={Colors.header} paddingBottom={10}>
              Card info
            </H2>
            <XStack
              borderWidth={1}
              borderColor="black"
              borderRadius="$4"
              padding="$2"
              alignItems="center"
              width={"100%"}
              backgroundColor={"#F2F2F2"}
            >
              <CreditCard size={20} color="black" />
              <Input
                placeholder="Card number"
                flex={1}
                borderWidth={0}
                keyboardType="numeric"
                maxLength={16}
              />
            </XStack>
            <Button
              backgroundColor={Colors.header}
              width={"70%"}
              margin={25}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
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
