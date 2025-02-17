import { StyleSheet, Text } from "react-native";

export default function Header({ title }: { title: string }) {
  return <Text style={styles.header}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    color: "#2B4B40",
    textAlign: "center",
    marginBottom: 32,
  },
});
