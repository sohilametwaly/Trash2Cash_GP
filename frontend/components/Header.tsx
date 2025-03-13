import { useAuth } from "@/store/context";
import { View, Image } from "react-native";

export default function Header() {
  const { authUser } = useAuth();
  console.log(authUser?.img);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        paddingTop: 45,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 70, height: 45, resizeMode: "contain" }}
          source={require("../assets/images/leaf.png")}
        />
        <Image
          style={{
            width: 100,
            height: 65,
            resizeMode: "contain",
            alignSelf: "baseline",
          }}
          source={require("../assets/images/logoName.png")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          width: 50,
          height: 50,
          borderRadius: 100000,
        }}
      >
        <Image
          source={{
            uri: authUser?.img
              ? authUser.img
              : require("../assets/images/Default_pfp.jpg"),
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 10000000,
            resizeMode: "cover",
          }}
        />
      </View>
    </View>
  );
}
