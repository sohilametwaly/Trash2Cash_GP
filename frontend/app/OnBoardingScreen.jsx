import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import * as secureStore from "expo-secure-store";
import { Colors } from "@/constants/Colors";
import { Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/store/context";

const slides = [
  {
    key: "one",
    text: (
      <Text style={{ fontSize: 22, textAlign: "center", color: Colors.header }}>
        Welcome to{" "}
        <Text style={{ fontWeight: "bold", color: "#2B4B40" }}>Trash2Cash</Text>
        .{"\n"}
        Scan and classify
      </Text>
    ),
    image: require("../assets/images/Screenshot 2025-03-05 160030.png"),
    icon: (
      <Image
        style={{ width: 200, height: 220 }}
        source={require("../assets/images/UI 2.png")}
      />
    ),
    backgroundColor: "#FDFDFD",
  },
  {
    key: "two",
    text: (
      <View style={{ gap: 5 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: Colors.header,
            fontWeight: "700",
          }}
        >
          Choose Your Role.
        </Text>
        {"\n"}
        <Text
          style={{
            textAlign: "left",
            color: Colors.header,
            fontSize: 13,
            width: 300,
          }}
        >
          Are you a home user looking to recycle responsibly, or a factory
          searching for bulk recyclables? Our platform connects you to the right
          opportunities.
        </Text>
      </View>
    ),
    image: require("../assets/images/Screenshot 2025-03-05 160030.png"),
    backgroundColor: "#FDFDFD",
    icon: (
      <Image
        style={{ height: 200, objectFit: "fill", width: 200 }}
        source={require("../assets/images/2911136.png")}
      />
    ),
  },
  {
    key: "three",
    text: (
      <View style={{ gap: 5 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: Colors.header,
            fontWeight: "700",
          }}
        >
          We Handle the Pickup.
        </Text>
        {"\n"}
        <Text
          style={{
            textAlign: "left",
            color: Colors.header,
            fontSize: 14,
            width: 320,
          }}
        >
          Once classified, we’ll arrange for the collection of your recyclables.
          No hassle—just a smarter way to recycle and earn!
        </Text>
      </View>
    ),
    image: require("../assets/images/Screenshot 2025-03-05 160030.png"),
    backgroundColor: "#FDFDFD",
    icon: (
      <Image
        style={{ height: 150, objectFit: "fill", width: 250 }}
        source={require("../assets/images/DALL_E_2025-03-05_17.30.50_-_A_flat_vector-style_icon_of_a_recycling_truck_with_a_clear_background._The_truck_should_be_green_with_the_hex_color__52DE97._It_should_feature_a_recyc-removebg-preview.png")}
      />
    ),
  },
];

const OnboradingScreen = () => {
  const router = useRouter();
  const { authUser } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const completeOnboarding = async () => {
    try {
      await secureStore.setItemAsync("hasSeenOnboarding", "true");
      if (authUser !== undefined) {
        router.replace("/login");
      }
    } catch (err) {
      console.error("Failed to save onboarding status:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.slide,
        { backgroundColor: item.backgroundColor },
        { flex: 1 },
      ]}
    >
      <Image source={item.image} style={styles.image} />
      <View>{item.icon}</View>
      {item.text}
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={completeOnboarding}
      activeDotStyle={{ backgroundColor: Colors.header }}
      renderDoneButton={() => (
        <TouchableOpacity style={styles.doneBtn} onPress={completeOnboarding}>
          <Text style={{ color: Colors.header, fontSize: 15 }}>Done</Text>
          <Check color={Colors.header} size={12} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 80,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    color: Colors.header,
  },
  image: {
    width: 320,
    height: 170,
  },
  doneBtn: {
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "baseline",
    marginRight: 5,
    marginTop: 5,
  },
});

export default OnboradingScreen;
