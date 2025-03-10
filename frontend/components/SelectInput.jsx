import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";

import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";
import { StyleSheet } from "react-native";
export function SelectItem(props) {
  const [val, setVal] = useState(props.state.toLowerCase());
  const [color, setColor] = useState("red");

  useEffect(() => {
    switch (val) {
      case "pending":
        setColor("#FBBB00");
        break;
      case "cancelled":
        setColor("#A52A2A");
        break;
      case "delivered":
        setColor("#28B446");
        break;
    }
  }, [val]);
  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger
        iconAfter={() => <ChevronDown color={"white"} size={17} />}
        backgroundColor={color}
        style={styles.allOrdersStyle}
      >
        <Select.Value
          placeholder="Order Status"
          color={"white"}
          fontWeight={"500"}
          fontSize={15}
        />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animation="medium"
        >
          <Sheet.Frame maxHeight={200} bottom={-3} position="absolute">
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={100}>
          <Select.Group>
            <Select.Label>{props.label}</Select.Label>
            {props.items.map((item, i) => {
              return (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.name.toLowerCase()}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize(props.size ?? "$true")}
                color={"white"}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} color={"white"} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

const styles = StyleSheet.create({
  allOrdersStyle: {
    width: 110,
    color: "white",
    padding: 2,
    justifyContent: "center",
  },
});
