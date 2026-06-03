import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CATEGORIES } from "../constants/categories";
import { Expense } from "../types/Expense";
import { formatCurrency } from "../utils/formatCurrency";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const categoryInfo = CATEGORIES.find(
    (item) => item.name === expense.category,
  );

  const badgeColor = categoryInfo ? categoryInfo.color : "#9E9E9E";

  const handleDelete = () => {
    console.log("Deleting:", expense.id);
    onDelete(expense.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{expense.title}</Text>

        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
            },
          ]}
        >
          <Text style={styles.badgeText}>{expense.category}</Text>
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
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
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

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFF",
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
    color: "#FFF",
    fontWeight: "bold",
  },

  date: {
    marginTop: 10,
    color: "#666",
    fontSize: 12,
  },
});
