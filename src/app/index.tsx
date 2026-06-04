import { useEffect, useMemo, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import TotalCard from "../components/TotalCard";

import { CATEGORIES } from "../constants/categories";
import { Expense } from "../types/Expense";

const STORAGE_KEY = "expenses";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    loadExpenses();
  }, []);

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
      console.error(error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error(error);
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

      <Text style={styles.filterTitle}>Filter By Category</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        <TouchableOpacity
          style={[styles.tab, selectedCategory === "All" && styles.activeTab]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === "All" && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              selectedCategory === category.name && styles.activeTab,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === category.name && styles.activeTabText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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

  tabsContainer: {
    paddingBottom: 95,
  },

  tab: {
    backgroundColor: "#EDE9FE", // Light purple
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#7C3AED", // Primary purple
  },

  tabText: {
    color: "#1E1B4B", // Dark purple
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },
});
