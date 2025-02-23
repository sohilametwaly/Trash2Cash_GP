import { CreditCard } from "lucide-react-native";
import { Sheet } from "@tamagui/sheet";
import React, { memo } from "react";
import { Button, H2, Input, Label, Paragraph, XStack, YStack } from "tamagui";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";

export const CardInfoSheet = () => {
  const [position, setPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        style={{
          color: Colors.header,
          width: "75%",
          alignmentBaseline: "center",
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
        />

        <Sheet.Handle position="relative" top={260} />
        <Sheet.Frame
          padding="$4"
          alignItems="center"
          gap="$5"
          maxHeight={350}
          position="absolute"
          bottom={-70}
        >
          <View style={{ alignItems: "center", gap: 5 }}>
            <H2 color={Colors.header} paddingBottom={10}>
              Card info
            </H2>
            <XStack
              borderWidth={1}
              borderColor="$borderColor"
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                width: "100%",
              }}
            >
              <View style={{ width: "50%" }}>
                <Label
                  color={Colors.header}
                  fontSize={15}
                  fontWeight={"700"}
                  paddingLeft={7}
                >
                  Expiry
                </Label>
                <Input
                  placeholder="DD/MM"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Label
                  color={Colors.header}
                  fontSize={15}
                  fontWeight={"700"}
                  paddingLeft={7}
                >
                  CVV
                </Label>
                <XStack
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$4"
                  alignItems="center"
                  paddingHorizontal={5}
                  width={"90%"}
                  backgroundColor={"#F2F2F2"}
                >
                  <CreditCard size={20} color="black" />
                  <Input
                    placeholder="CVV code"
                    flex={1}
                    borderWidth={0}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </XStack>
              </View>
            </View>
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
