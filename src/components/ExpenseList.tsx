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
      renderItem={({ item }) => (
        <ExpenseItem expense={item} onDelete={onDeleteExpense} />
      )}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  listContainer: {
    paddingBottom: 120,
    paddingRight: 4,
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,

    shadowColor: "#7C3AED",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1E1B4B",
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
  },
});
