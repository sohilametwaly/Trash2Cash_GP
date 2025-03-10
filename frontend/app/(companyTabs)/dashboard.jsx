const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.25,
  useShadowColorFromDataset: false, // optional
};

const data = [
  {
    name: "Plastic",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Cardboard",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Paper",
    population: 8538000,
    color: "#2B4B40",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Metal",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Glass",
    population: 527612,
    color: "purple",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
import { PieChart } from "react-native-chart-kit";
import Container from "@/components/Container";
import { ScrollView, Text, View } from "tamagui";
import { Building, TrendingDown, TrendingUp, User } from "lucide-react-native";
import { StyleSheet } from "react-native";
import Logo from "@/components/Logo";
const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <Logo />
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Overview</Text>
          <StatCard
            icon={<TrendingUp color={"green"} size={48} />}
            title={"Income"}
            value={"2113 EGP"}
          />
          <StatCard
            icon={<TrendingDown color={"red"} size={48} />}
            title={"Expense"}
            value={"1520 EGP"}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Best Sellers</Text>
          <PieChart
            data={data}
            width={320}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"white"}
            style={{ borderRadius: 5, marginTop: 5 }}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <View style={styles.Card}>
      {icon}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    marginVertical: 6,
    elevation: 4,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
  },
  sectionHeader: {
    fontSize: 26,
    color: "#2B4B40",
  },
  title: {
    fontSize: 16,
    opacity: 0.6,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B4B40",
  },
  section: {
    marginVertical: 16,
  },
});

export default DashboardScreen;
