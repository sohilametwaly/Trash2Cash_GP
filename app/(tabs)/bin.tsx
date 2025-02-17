import { Edit, Edit3, X } from "lucide-react-native";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "tamagui";

type UserType = "User" | "Company";

interface User {
  name: string;
  type: UserType;
}

const users: User[] = [
  { name: "Ahmed", type: "User" },
  { name: "Ezz steel", type: "Company" },
  { name: "Mansour group", type: "Company" },
  { name: "Hashim", type: "User" },
  { name: "Nazly", type: "User" },
  { name: "Farida", type: "User" },
  { name: "Khaled", type: "User" },
];

export default function BinScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      {users.map((user) => {
        return (
          <View key={user.name} style={[styles.listItem, styles.shadowBox]}>
            <Text style={styles.title}>{user.name}</Text>
            <View style={styles.secondContainer}>
              <View style={styles.badge}>
                <Text style={styles.title}>{user.type}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => console.log("edit")}>
                  <Edit3 color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("delete")}>
                  <X color={"red"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 32,
    color: "#2B4B40",
    textAlign: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 13,
  },
  listItem: {
    borderRadius: 8,
    // borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  shadowBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
  },
  badge: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
