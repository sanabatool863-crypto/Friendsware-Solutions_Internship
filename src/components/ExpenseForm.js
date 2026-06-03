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

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newExpense = {
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
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Expense</Text>

      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
      />

      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      {/* Category Picker */}
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

      {errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },

  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
  },

  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
