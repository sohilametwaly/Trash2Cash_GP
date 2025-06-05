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
import { useDash } from "@/store/dashBoard";
import { PieChart } from "react-native-chart-kit";
import Container from "@/components/Container";
import { ScrollView, Text, View } from "tamagui";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const DashboardScreen = () => {
  const [data, setData] = useState([]);
  const { income, expenses, chartData, getChartData, getExpenses, getIncome } =
    useDash();

  useEffect(() => {
    getIncome();
    getExpenses();
    getChartData();
  }, [getIncome, income, getExpenses, expenses, getChartData, chartData]);

  useEffect(() => {
    const updatedData = chartData.map((item) => {
      switch (item.name) {
        case "Metal":
          return {
            color: "#F00",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        case "Glass":
          return {
            color: "purple",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        case "Paper":
          return {
            color: "#2B4B40",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        case "Plastic":
          return {
            color: "rgba(131, 167, 234, 1)",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        case "Cardboard":
          return {
            color: "rgb(0, 0, 255)",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        default:
          return {
            color: "rgb(0, 0, 255)",
            name: item.name,
            population: item.population,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
      }
    });
    setData(updatedData);
  }, [chartData]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Overview</Text>
          <StatCard
            icon={<TrendingUp color={"green"} size={48} />}
            title={"Income"}
            value={`${income} EGP`}
            navigateToUsers={false}
            data={""}
          />
          <StatCard
            icon={<TrendingDown color={"red"} size={48} />}
            title={"Expenses"}
            value={`${expenses} EGP`}
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
