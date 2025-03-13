import Container from "@/components/Container";
import Header from "@/components/Header";
import { Save } from "lucide-react-native";
import { Button, Input, Label, YStack } from "tamagui";
import { useAuth } from "@/store/context";
export default function account() {
  const { authUser } = useAuth();
  return (
    <Container>
      <YStack marginBottom={40}>
        <Label color={"#2B4B40"} fontSize={18}>
          Full Name
        </Label>
        <Input value={authUser?.name} disabled />
        <Label color={"#2B4B40"} fontSize={18}>
          Email
        </Label>
        <Input value={authUser?.email} disabled />
        <Label color={"#2B4B40"} fontSize={18}>
          Old Password
        </Label>
        <Input placeholder="Enter Your Old Password" />
        <Label color={"#2B4B40"} fontSize={18}>
          New Password
        </Label>
        <Input placeholder="Enter Your New Password" />
      </YStack>
      <Button
        backgroundColor={"#2B4B40"}
        color={"white"}
        iconAfter={<Save size={15} />}
        fontSize={20}
        width={180}
        alignSelf="center"
      >
        Save
      </Button>
    </Container>
  );
}
