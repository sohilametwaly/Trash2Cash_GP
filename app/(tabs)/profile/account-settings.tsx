import Container from "@/components/Container";
import Header from "@/components/Header";
import { Save } from "lucide-react-native";
import { Button, Input, Label, YStack } from "tamagui";

export default function account() {
  return (
    <Container>
      <YStack marginBottom={40}>
        <Header title="Account Settings" />
        <Label>Full Name</Label>
        <Input value="Bashar Mohamed Bakr" disabled />
        <Label>Email</Label>
        <Input value="bashar.eg6645@gmail.com" disabled />
        <Label>Old Password</Label>
        <Input placeholder="Enter Your Old Password" />
        <Label>New Password</Label>
        <Input placeholder="Enter Your New Password" />
      </YStack>
      <Button backgroundColor={"#2B4B40"} color={"white"} iconAfter={<Save />}>
        Save
      </Button>
    </Container>
  );
}
