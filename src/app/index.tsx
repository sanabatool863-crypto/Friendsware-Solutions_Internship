import { useEffect, useMemo, useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      console.log(error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.log(error);
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
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Expense Tracker</Text>

          <TotalCard
            totalAmount={totalAmount}
            totalExpenses={expenses.length}
          />

          <ExpenseForm onAddExpense={handleAddExpense} />

          <Text style={styles.filterTitle}>Filter by Category</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.tabsContainer}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                selectedCategory === "All" && styles.activeTab,
              ]}
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

          <View style={styles.listWrapper}>
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F5F3FF",
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 16,
    color: "#7C3AED",
  },

  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
    marginTop: 4,
  },

  filterScroll: {
    maxHeight: 45,
    marginBottom: 10,
  },

  tabsContainer: {
    alignItems: "center",
    paddingRight: 10,
  },

  tab: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 17,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#7C3AED",
  },

  tabText: {
    color: "#1E1B4B",
    fontSize: 13,
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  listWrapper: {
    flex: 1,
  },
});
