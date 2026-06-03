import { FlatList, StyleSheet, Text, View } from "react-native";

import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No expenses added yet</Text>

        <Text style={styles.emptySubtitle}>
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
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },

  emptyContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  emptySubtitle: {
    textAlign: "center",
    color: "#777",
    lineHeight: 22,
  },
});
