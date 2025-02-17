import Container from "@/components/Container";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <Container>
      <Header title="Profile" />
      <Btn
        title="Account Settings"
        color="black"
        onPress={() => router.push("/profile/account-settings")}
      />
      <Btn
        title="Change Address"
        color="black"
        onPress={() => router.push("/profile/change-address")}
      />
      <Btn title="Logout" color="red" />
    </Container>
  );
}

const Btn = ({
  color,
  title,
  onPress,
}: {
  color: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={[styles.title, { color: color }]}>{title}</Text>
      <ArrowRight color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
  },
});
