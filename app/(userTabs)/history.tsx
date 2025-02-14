import HistoryCard from "@/components/HistoryCard";
import { Colors } from "@/constants/Colors";
import { FlatList, StyleSheet, View } from "react-native";
import { H2, YStack } from "tamagui";

const DUMMY_ORDERS = [
  {
    id: "1",
    date: "9/2/2025",
    total: 95,
    items: [
      { category: "Paper", weight: 3, pricePerKg: 10 },
      { category: "Glass", weight: 45, pricePerKg: 5 },
      { category: "Metal", weight: 2, pricePerKg: 12 },
      { category: "Cardboard", weight: 2, pricePerKg: 20 },
    ],
  },
  {
    id: "2",
    date: "9/2/2025",
    total: 95,
    items: [
      { category: "Paper", weight: 3, pricePerKg: 10 },
      { category: "Glass", weight: 45, pricePerKg: 5 },
      { category: "Metal", weight: 2, pricePerKg: 12 },
      { category: "Cardboard", weight: 2, pricePerKg: 20 },
    ],
  },
  {
    id: "3",
    date: "9/2/2025",
    total: 95,
    items: [
      { category: "Paper", weight: 3, pricePerKg: 10 },
      { category: "Glass", weight: 45, pricePerKg: 5 },
      { category: "Metal", weight: 2, pricePerKg: 12 },
      { category: "Cardboard", weight: 2, pricePerKg: 20 },
    ],
  },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <YStack alignSelf="center">
        <H2 style={styles.header}>History</H2>
      </YStack>
      <FlatList
        data={DUMMY_ORDERS}
        renderItem={({ item }) => <HistoryCard order={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
    justifyContent: "center",
  },
  header: {
    color: Colors.header,
  },
});
