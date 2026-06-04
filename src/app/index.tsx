import { useEffect, useMemo, useState } from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import TotalCard from "../components/TotalCard";

import { CATEGORIES } from "../constants/categories";
import { Expense } from "../types/Expense";

const STORAGE_KEY = "expenses";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Load expenses when app starts
  useEffect(() => {
    loadExpenses();
  }, []);

  // Save expenses whenever they change
  useEffect(() => {
    saveExpenses();
  }, [expenses]);

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>

      <TotalCard totalAmount={totalAmount} totalExpenses={expenses.length} />

      <ExpenseForm onAddExpense={handleAddExpense} />

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter By Category</Text>

        <View style={styles.pickerContainer}>
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

  filterContainer: {
    marginBottom: 15,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },
});
