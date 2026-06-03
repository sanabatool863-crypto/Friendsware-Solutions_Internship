import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CATEGORIES } from "../constants/categories";
import { formatCurrency } from "../utils/formatCurrency";

const ExpenseItem = ({ expense, onDelete }) => {
  const categoryInfo = CATEGORIES.find(
    (item) => item.name === expense.category,
  );

  const badgeColor = categoryInfo ? categoryInfo.color : "#9E9E9E";

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(expense.id),
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{expense.title}</Text>

        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={[styles.categoryBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.categoryText}>{expense.category}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.date}>
        {new Date(expense.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default React.memo(ExpenseItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
  },

  amount: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },

  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
  },
});
