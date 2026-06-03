import { StyleSheet, Text, View } from "react-native";

import { formatCurrency } from "../utils/formatCurrency";

const TotalCard = ({ totalAmount, totalExpenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Summary</Text>

      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Total Expenses</Text>

          <Text style={styles.value}>{totalExpenses}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Total Amount</Text>

          <Text style={styles.amount}>{formatCurrency(totalAmount)}</Text>
        </View>
      </View>
    </View>
  );
};

export default TotalCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBox: {
    flex: 1,
  },

  label: {
    color: "#E3F2FD",
    fontSize: 13,
    marginBottom: 5,
  },

  value: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  amount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
