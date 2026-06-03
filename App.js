import { useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import { Picker } from "@react-native-picker/picker";

import ExpenseForm from "./src/components/ExpenseForm";
import ExpenseList from "./src/components/ExpenseList";
import TotalCard from "./src/components/TotalCard";

import { CATEGORIES } from "./src/constants/categories";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add Expense
  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  // Delete Expense
  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };

  // Total Amount
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Filter Expenses
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.header}>My Expenses</Text>

      <TotalCard totalAmount={totalAmount} totalExpenses={expenses.length} />

      <ExpenseForm onAddExpense={handleAddExpense} />

      {/* Category Filter */}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By Category</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <Picker.Item label="All Categories" value="All" />

            {CATEGORIES.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>
      </View>

      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 15,
    paddingTop: 50,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },

  filterContainer: {
    marginBottom: 15,
  },

  filterLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
});
