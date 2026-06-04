import { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { CATEGORIES } from "../constants/categories";
import { useExpenses } from "../context/ExpenseContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function SummaryScreen() {
  const { expenses } = useExpenses();

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const categoryTotals = useMemo(() => {
    return CATEGORIES.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        ...category,
        total,
      };
    });
  }, [expenses]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Expense Summary</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Expenses</Text>

          <Text style={styles.cardValue}>{expenses.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Amount</Text>

          <Text style={styles.cardValue}>{formatCurrency(totalAmount)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Category Breakdown</Text>

        {categoryTotals.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View
              style={[
                styles.colorIndicator,
                {
                  backgroundColor: category.color,
                },
              ]}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>

            <Text style={styles.categoryAmount}>
              {formatCurrency(category.total)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    padding: 16,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#7C3AED",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,

    shadowColor: "#7C3AED",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E1B4B",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 15,
    color: "#1E1B4B",
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#7C3AED",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  colorIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },

  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1B4B",
  },

  categoryAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7C3AED",
  },
});
