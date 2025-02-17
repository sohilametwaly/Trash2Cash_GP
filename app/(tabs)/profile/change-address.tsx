import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Button } from "tamagui";
import { MapPin, Save } from "lucide-react-native";
import Header from "@/components/Header";

export default function ChangeAddressScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Enable location permissions in settings."
      );
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };

    setLocation(newLocation);
    setLoading(false);
  };

  const saveLocation = () => {
    if (location) {
      Alert.alert(
        "Location Saved",
        `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
      );
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Address" />

      {loading ? (
        <ActivityIndicator size="large" color="#2B4B40" />
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => setLocation(e.nativeEvent.coordinate)}
        >
          <Marker
            coordinate={location}
            title="Selected Location"
            draggable
            onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
          />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Location not found</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          onPress={getCurrentLocation}
          backgroundColor={"#2B4B40"}
          color={"white"}
          iconAfter={<MapPin />}
          disabled={loading}
        >
          Use My Current Location
        </Button>
        <Button onPress={saveLocation} iconAfter={<Save />} disabled={loading}>
          Save Location
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  map: { flex: 1, borderRadius: 10, overflow: "hidden" },
  errorText: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
  buttonContainer: { marginTop: 20, gap: 10 },
});
