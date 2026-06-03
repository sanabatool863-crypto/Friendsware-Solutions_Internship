import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CATEGORIES } from "../constants/categories";
import { Expense } from "../types/Expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: "",
      amount: "",
      category: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: Number(amount),
      category,
      createdAt: new Date(),
    };

    onAddExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");

    setErrors({
      title: "",
      amount: "",
      category: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
      />

      {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {errors.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Select Category" value="" />

          {CATEGORIES.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      {errors.category ? (
        <Text style={styles.error}>{errors.category}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
  },
});
