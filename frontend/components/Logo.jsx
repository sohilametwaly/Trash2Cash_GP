import { Image } from "react-native";
function Logo() {
  return (
    <Image
      style={{
        width: 240,
        height: 100,
        alignSelf: "center",
      }}
      source={require("../assets/images/Screenshot 2025-03-05 160030.png")}
    />
  );
}

export default Logo;
