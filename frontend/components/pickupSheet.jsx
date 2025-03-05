import { Truck } from "lucide-react-native";
import { useState } from "react";
import { Sheet } from "@tamagui/sheet";
import React from "react";
import { Button, Label, Text } from "tamagui"; // Import Text from tamagui
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "./dateTimePicker";
import LocationPicker from "./locationPicker";
import { MapPin, Search } from "lucide-react-native";

export const PickupSheet = () => {
  const [position, setPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [stringLocation, setStringLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("Selected Location:", location);
  };

  return (
    <>
      {isLocationPickerOpen && (
        <LocationPicker
          open={isLocationPickerOpen}
          onLocationSelect={handleLocationSelect}
          setIsLocationPickerOpen={setIsLocationPickerOpen}
          setStringLocation={setStringLocation}
        />
      )}
      <Button
        iconAfter={() => <Truck size={20} color={Colors.header} />}
        fontSize={17}
        backgroundColor={"#E0E0E0"}
        color={Colors.header}
        width={"80%"}
        alignSelf="center"
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text>Request a Pickup</Text>
      </Button>

      <Sheet
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={99_999}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          backgroundColor="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle position="relative" top={290} />
        <Sheet.Frame
          padding="$5"
          alignItems="center"
          gap="$5"
          maxHeight={300}
          justifyContent="space-between"
          position="absolute"
          paddingBottom={70}
          bottom={-50}
        >
          <View style={styles.sheetContainer}>
            <View style={styles.datePickerContainer}>
              <Label htmlFor="date-time-picker" style={styles.dateLabel}>
                <Text>Pick a Date</Text>
              </Label>
              <View id="date-time-picker">
                <DateTimePicker />
              </View>
            </View>
            <View>
              {!selectedLocation ? (
                <Button
                  icon={() => <Search size={25} color={Colors.header} />}
                  iconAfter={() => <MapPin size={25} color={Colors.header} />}
                  style={styles.locationBtn}
                  onPress={() => {
                    setIsLocationPickerOpen(true);
                  }}
                >
                  <Text style={{ fontSize: 18, color: Colors.header }}>
                    Pick a location
                  </Text>
                </Button>
              ) : (
                <Button
                  color={Colors.header}
                  icon={() => <Search size={20} color={Colors.header} />}
                  iconAfter={() => <MapPin size={20} color={Colors.header} />}
                  style={styles.locationBtn}
                  onPress={() => {
                    setIsLocationPickerOpen(true);
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ width: "80%" }}
                  >
                    {stringLocation}
                  </Text>
                </Button>
              )}
            </View>

            <Button
              onPress={() => setOpen((prev) => !prev)}
              style={styles.sumbitBtn}
            >
              <Text style={styles.btnText}>Submit</Text>
            </Button>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  dateLabel: {
    color: Colors.header,
    fontSize: 20,
  },
  sumbitBtn: {
    backgroundColor: Colors.header,
    width: "70%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  locationBtn: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
