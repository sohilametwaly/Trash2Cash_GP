import HistoryCard from "@/components/HistoryCard";
// import Logo from "@/components/Logo";
import { FlatList, StyleSheet, View } from "react-native";
// import { H2, YStack } from "tamagui";

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
    status: "Pending",
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
    status: "Delivered",
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
    status: "Cancelled",
  },
];

// export default function HistoryScreen() {
//   return (
//     <View style={styles.container}>
//       <YStack alignSelf="center">
//         <Logo />
//         {/* <H2 style={styles.header}>History</H2> */}
//       </YStack>
//       <FlatList
//         data={DUMMY_ORDERS}
//         renderItem={({ item }) => <HistoryCard order={item} role={"user"} />}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 35,
//     justifyContent: "center",
//     backgroundColor: "#F7F8FA",
//   },
//   header: {
//     color: Colors.header,
//   },
// });

import { Colors } from "@/constants/Colors";
import React from "react";
import type { StackProps, TabLayout, TabsTabProps } from "tamagui";
import {
  AnimatePresence,
  H5,
  SizableText,
  Tabs,
  YStack,
  styled,
} from "tamagui";

const TabsAdvancedUnderline: React.FC = () => {
  const pending = DUMMY_ORDERS.filter((order) => order.status == "Pending");
  const deliverd = DUMMY_ORDERS.filter((order) => order.status == "Delivered");
  const cancelled = DUMMY_ORDERS.filter((order) => order.status == "Cancelled");

  const [tabState, setTabState] = React.useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: "tab1",
    intentAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) =>
    setTabState((prev) => ({ ...prev, currentTab }));
  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState((prev) => ({ ...prev, intentAt }));
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState((prev) => ({ ...prev, prevActiveAt: prev.activeAt, activeAt }));

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps["onInteraction"] = (type, layout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$5"
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$background"
      borderRadius="$4"
      marginTop={20}
      alignItems="center"
      width={"100%"}
      paddingVertical={20}
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              width={intentAt.width}
              height="$0.5"
              x={intentAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              theme="accent"
              active
              width={activeAt.width}
              height="$0.5"
              x={activeAt.x}
              bottom={0}
              backgroundColor={Colors.header}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          paddingBottom="$1.5"
          borderColor="$color3"
          borderBottomWidth="$0.5"
          width={"100%"}
        >
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value={"pending"}
            onInteraction={handleOnInteraction}
          >
            <SizableText fontSize={18}>Pending</SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="delivered"
            onInteraction={handleOnInteraction}
          >
            <SizableText fontSize={18}>Delivered</SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="cancelled"
            onInteraction={handleOnInteraction}
          >
            <SizableText fontSize={18}>Cancelled</SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>

      <Tabs.Content value="pending">
        <FlatList
          data={pending}
          renderItem={({ item }) => (
            <HistoryCard order={item} role={"user"} pending={true} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Tabs.Content>

      <Tabs.Content value="delivered">
        <FlatList
          data={deliverd}
          renderItem={({ item }) => (
            <HistoryCard order={item} role={"user"} pending={false} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Tabs.Content>

      <Tabs.Content value="cancelled">
        <FlatList
          data={cancelled}
          renderItem={({ item }) => (
            <HistoryCard order={item} role={"user"} pending={false} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Tabs.Content>
      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content
            value={currentTab}
            forceMount
            flex={1}
            justifyContent="center"
          >
            <H5 textAlign="center">{currentTab}</H5>
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
};

const TabsRovingIndicator: React.FC<{ active?: boolean } & StackProps> = ({
  active,
  ...props
}) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$color8",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,
  animation: "100ms",
  variants: {
    direction: {
      ":number": (direction: number) => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});

export default TabsAdvancedUnderline;
