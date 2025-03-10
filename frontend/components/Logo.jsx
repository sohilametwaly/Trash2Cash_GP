import { Image } from "react-native";
function Logo() {
  return (
    <Image
      style={{
        width: 240,
        height: 100,
        alignSelf: "center",
      }}
      source={require("../assets/images/Screenshot_2025-03-05_160030-removebg-preview.png")}
    />
  );
}

export default Logo;
