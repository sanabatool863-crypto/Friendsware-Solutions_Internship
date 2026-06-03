# Personal Expense Tracker

A professional React Native Expense Tracker application built using Expo. The application allows users to add, view, filter, and delete personal expenses while maintaining a running total of all recorded expenses.

## Features

### Core Features

* Add new expenses
* Expense validation
* Delete expenses
* Running total calculation
* Category selection
* Scrollable expense list

### Additional Features

* Category filtering
* Category color badges
* Expense summary dashboard
* Delete confirmation dialog
* Empty state handling
* Currency formatting (PKR)
* Date tracking for expenses
* Professional UI design

## Categories

The application supports the following categories:

* Food
* Transport
* Utilities
* Entertainment
* Shopping
* Health
* Education
* Bills
* Travel
* Salary
* Other

## Technologies Used

* React Native
* Expo
* JavaScript (ES6+)
* React Hooks
* FlatList
* Expo Picker

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd ExpenseTracker
```

Install dependencies:

```bash
npm install
```

Install Picker dependency:

```bash
npx expo install @react-native-picker/picker
```

Start the development server:

```bash
npx expo start
```

Run on Android:

* Press "a" in the terminal
* OR scan the QR code using Expo Go

## How To Use

### Add Expense

1. Enter expense title
2. Enter amount
3. Select category
4. Tap "Add Expense"

### Delete Expense

1. Tap Delete button
2. Confirm deletion

### Filter Expenses

1. Select a category from the filter dropdown
2. View expenses for that category
3. Select "All Categories" to view all expenses

## Validation Rules

* Title cannot be empty
* Amount must be greater than zero
* Category must be selected

## Performance Optimizations

* FlatList for efficient rendering
* React.memo for expense cards
* useMemo for calculations
* Component-based architecture

## Author

Sana Batool 

Summer Internship 2026 – Mobile Developer Project

Built using React Native and Expo.
