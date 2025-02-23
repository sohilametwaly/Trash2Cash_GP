import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { X } from "lucide-react-native";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Sheet,
  Unspaced,
  XStack,
} from "tamagui";
import { Colors } from "@/constants/Colors";

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return false;
  }
  return true;
};

const LocationPicker = ({
  onLocationSelect,
  setIsLocationPickerOpen,
  open,
  setStringLocation,
}) => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newLocation = { coords: { latitude, longitude } };
    setLocation(newLocation);
    onLocationSelect(newLocation);
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Extract the address from the reverse geocode result
      if (reverseGeocode.length > 0) {
        const { street, city, region, country } = reverseGeocode[0];
        // Check if each variable is not null or undefined before adding it to the address
        const fullAddress = [
          street ? street : null,
          city ? city : null,
          region ? region : null,
          country ? country : null,
        ]
          .filter((part) => part !== null) // Remove null values
          .join(", "); // Join the parts with a comma

        console.log("address ", fullAddress);

        setStringLocation(fullAddress);
      }
    } catch (e) {
      console.error("Error fetching location:", e);
    }
  };

  return (
    <View style={styles.container}>
      <DialogInstance
        handleMapPress={handleMapPress}
        location={location}
        setLocation={setLocation}
        onLocationSelect={onLocationSelect}
        setIsLocationPickerOpen={setIsLocationPickerOpen}
        setStringLocation={setStringLocation}
        openDialog={open}
        mapRegion={mapRegion}
        setMapRegion={setMapRegion}
      />
    </View>
  );
};

const DialogInstance = ({
  handleMapPress,
  location,
  setLocation,
  onLocationSelect,
  setIsLocationPickerOpen,
  openDialog,
  setStringLocation,
  mapRegion,
  setMapRegion,
}) => {
  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setMapRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });

          // Extract the address from the reverse geocode result
          if (reverseGeocode.length > 0) {
            const { street, city, region, country } = reverseGeocode[0];
            // Check if each variable is not null or undefined before adding it to the address
            const fullAddress = [
              street ? street : null,
              city ? city : null,
              region ? region : null,
              country ? country : null,
            ]
              .filter((part) => part !== null) // Remove null values
              .join(", "); // Join the parts with a comma

            setStringLocation(fullAddress);
            console.log(" address: " + fullAddress);
          }
        } catch (e) {
          console.error("Error fetching location:", e);
        }
      }
    })();
  }, []);

  return (
    <Dialog
      modal
      open={openDialog}
      onOpenChange={setIsLocationPickerOpen}
      zIndex={1_200_000} // Higher than the Sheet's zIndex
    >
      <Adapt when="sm" platform="touch">
        <Sheet
          animation="medium"
          zIndex={1_999_999_999}
          modal
          dismissOnSnapToBottom
        >
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadow6"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

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
          style={{
            flexDirection: "column",
            alignItems: "center",
            minHeight: 900,
            flex: 1,
          }}
          gap="$4"
        >
          <Dialog.Title>Location</Dialog.Title>
          <Dialog.Description>
            Pick the suitable location to meet with our delivery
          </Dialog.Description>
          <Fieldset gap="$4" verticalAlign={true}>
            <MapView
              style={styles.map}
              region={mapRegion}
              onPress={handleMapPress}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Selected Location"
                />
              )}
            </MapView>
          </Fieldset>

          <XStack alignSelf="center" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <View style={{ width: "80%" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    onLocationSelect(location);
                    setIsLocationPickerOpen(false);
                  }}
                >
                  <Text style={styles.buttonText}>Confirm Location</Text>
                </TouchableOpacity>
              </View>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$3"
                icon={X}
                color={Colors.header}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  map: {
    height: 300,
    width: 300,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2B4B40",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  locationBtn: {
    color: Colors.header,
    fontSize: 20,
    width: "80%",
    alignSelf: "center",
  },
});

export default LocationPicker;
