export interface Category {
  id: string;
  name: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "1", name: "Food", color: "#4CAF50" },
  { id: "2", name: "Transport", color: "#2196F3" },
  { id: "3", name: "Utilities", color: "#9C27B0" },
  { id: "4", name: "Entertainment", color: "#FF9800" },
  { id: "5", name: "Shopping", color: "#E91E63" },
  { id: "6", name: "Health", color: "#00BCD4" },
  { id: "7", name: "Education", color: "#3F51B5" },
  { id: "8", name: "Bills", color: "#795548" },
  { id: "9", name: "Travel", color: "#607D8B" },
  { id: "10", name: "Salary", color: "#8BC34A" },
  { id: "11", name: "Other", color: "#9E9E9E" },
];
