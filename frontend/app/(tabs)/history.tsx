import HistoryCard from "@/components/HistoryCard";
import { FlatList } from "react-native";
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
import Header from "@/components/Header";
import { useOrders } from '@/store/orderContext';

// const DUMMY_ORDERS = [
//   {
//     id: "1",
//     date: "9/2/2025",
//     total: 95,
//     items: [
//       { category: "Paper", weight: 3, pricePerKg: 10 },
//       { category: "Glass", weight: 45, pricePerKg: 5 },
//       { category: "Metal", weight: 2, pricePerKg: 12 },
//       { category: "Cardboard", weight: 2, pricePerKg: 20 },
//     ],
//     status: "Pending",
//   },
//   {
//     id: "2",
//     date: "9/2/2025",
//     total: 95,
//     items: [
//       { category: "Paper", weight: 3, pricePerKg: 10 },
//       { category: "Glass", weight: 45, pricePerKg: 5 },
//       { category: "Metal", weight: 2, pricePerKg: 12 },
//       { category: "Cardboard", weight: 2, pricePerKg: 20 },
//     ],
//     status: "Delivered",
//   },
//   {
//     id: "3",
//     date: "9/2/2025",
//     total: 95,
//     items: [
//       { category: "Paper", weight: 3, pricePerKg: 10 },
//       { category: "Glass", weight: 45, pricePerKg: 5 },
//       { category: "Metal", weight: 2, pricePerKg: 12 },
//       { category: "Cardboard", weight: 2, pricePerKg: 20 },
//     ],
//     status: "Cancelled",
//   },
// ];

const TabsAdvancedUnderline = () => {
  const { orders, getOrderHistory, isLoading } = useOrders();
  
  React.useEffect(() => {
    getOrderHistory();
  }, []);

  const pending = React.useMemo(() => 
    orders.filter((order) => order.status === "pending"),
    [orders]
  );
  
  const delivered = React.useMemo(() => 
    orders.filter((order) => order.status === "delivered"),
    [orders]
  );
  
  const cancelled = React.useMemo(() => 
    orders.filter((order) => order.status === "cancelled"),
    [orders]
  );

  const [tabState, setTabState] = React.useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: "pending",
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
    <>
      <Header />
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        orientation="horizontal"
        size="$5"
        flexDirection="column"
        activationMode="manual"
        backgroundColor="$background"
        borderRadius="$4"
        // marginTop={20}
        alignItems="center"
        width={"100%"}
        // paddingVertical={20}
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
              <HistoryCard 
                order={{
                  ...item,
                  pickupDate: item.pickupDate,
                  items: item.items.map(i => ({
                    wasteType: i.wasteType,
                    quantity: i.quantity,
                    price: i.price
                  }))
                }}
                role="user"
                pending={true}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </Tabs.Content>

        <Tabs.Content value="delivered">
          <FlatList
            data={delivered}
            renderItem={({ item }) => (
              <HistoryCard order={item} role={"user"} pending={false} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </Tabs.Content>

        <Tabs.Content value="cancelled">
          <FlatList
            data={cancelled}
            renderItem={({ item }) => (
              <HistoryCard order={item} role={"user"} pending={false} />
            )}
            keyExtractor={(item) => item._id.toString()}
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
    </>
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
