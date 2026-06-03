import { FlatList, StyleSheet, Text, View } from "react-native";

import { Expense } from "../types/Expense";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  onDeleteExpense,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No expenses added yet</Text>

        <Text style={styles.emptyText}>
          Start tracking your spending by adding your first expense.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ExpenseItem expense={item} onDelete={onDeleteExpense} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 30,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
  },
});
