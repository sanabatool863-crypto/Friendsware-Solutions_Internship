import { StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "../utils/formatCurrency";

interface TotalCardProps {
  totalAmount: number;
  totalExpenses: number;
}

export default function TotalCard({
  totalAmount,
  totalExpenses,
}: TotalCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Summary</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Total Expenses</Text>
          <Text style={styles.value}>{totalExpenses}</Text>
        </View>

        <View>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.amount}>{formatCurrency(totalAmount)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#E3F2FD",
  },

  value: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
