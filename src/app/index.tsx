import { useMemo, useState } from "react";

import { SafeAreaView, StyleSheet, Text } from "react-native";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import TotalCard from "../components/TotalCard";

import { Expense } from "../types/Expense";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>

      <TotalCard totalAmount={totalAmount} totalExpenses={expenses.length} />

      <ExpenseForm onAddExpense={handleAddExpense} />

      <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F3FF", // Light purple background
  },

  header: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 20,
    color: "#7C3AED", // Main purple
  },
});
