import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Expense } from "../types/Expense";

const STORAGE_KEY = "expenses";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType,
);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    saveExpenses();
  }, [expenses]);

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setExpenses(JSON.parse(data));
      }
    } catch {}
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {}
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
