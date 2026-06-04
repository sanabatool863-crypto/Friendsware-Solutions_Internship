# Personal Expense Tracker

A professional mobile expense tracking application built with React Native, Expo, and TypeScript. The app allows users to record daily expenses, categorize spending, filter transactions, view spending summaries, and persist data locally using AsyncStorage.

---

## Project Overview

The Personal Expense Tracker helps users manage and monitor their daily expenses by providing an intuitive interface for adding, deleting, filtering, and summarizing expense records.

The application was developed as part of the Summer Internship 2026 Mobile Developer Project using React Native and Expo.

---

## Features

### Core Features

* Add new expenses
* Expense form validation
* Delete expenses
* Running total calculation
* Category selection
* Expense list display
* Date tracking for expenses
* PKR currency formatting

---

## Completed Bonus Tasks

### BONUS: Category Color Coding

Each category is displayed with a unique color badge:

| Category      | Color  |
| ------------- | ------ |
| Food          | Green  |
| Transport     | Blue   |
| Utilities     | Orange |
| Entertainment | Purple |
| Other         | Grey   |

---

### BONUS B1: AsyncStorage Persistence

* Expenses are automatically saved to local device storage.
* Data remains available after closing and reopening the application.
* Expenses are loaded automatically when the app starts.

---

### BONUS B2: Category Filter Tabs

* Horizontal filter tabs implemented.
* Users can filter expenses by category.
* Active category is visually highlighted.
* "All" tab displays every expense.

Available Filters:

* All
* Food
* Transport
* Utilities
* Entertainment
* Other

---

### BONUS B3: Swipe To Delete

* Swipe left on an expense item.
* Delete action is revealed.
* Expense is removed immediately after confirmation.
* Optimized for Android and Expo environments.

---

### BONUS B4: Summary Screen

A dedicated Summary Screen has been implemented.

The screen displays:

* Total Expenses
* Total Amount (PKR)
* Category-wise spending breakdown

Navigation between Home Screen and Summary Screen is handled using Expo Router.

The summary updates automatically whenever expenses are added or deleted.

---

### BONUS B5: Keyboard Dismiss

* Tapping outside input fields dismisses the keyboard.
* Does not interfere with:

  * Expense list scrolling
  * Filter tabs
  * Swipe-to-delete gestures

---

## Technologies Used

* React Native
* Expo
* TypeScript
* Expo Router
* React Hooks
* AsyncStorage
* React Native Gesture Handler
* FlatList
* React Native Picker

---


## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd ExpenseTracker
```

Install dependencies:

```bash
npm install
```

Install required packages:

```bash
npx expo install @react-native-picker/picker
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-gesture-handler
```

Start the development server:

```bash
npx expo start
```

Run on Android:

```bash
Press A
```

Or scan the QR code using Expo Go.

---

## How To Use

### Add Expense

1. Enter expense title.
2. Enter amount.
3. Select category.
4. Tap Add Expense.

### Delete Expense

1. Swipe left on an expense.
2. Tap Delete.

### Filter Expenses

1. Select a category tab.
2. View filtered expenses.
3. Select All to display every expense.

### View Summary

1. Tap View Summary.
2. Review total expenses.
3. Review total amount spent.
4. Review category-wise spending.

---

## Validation Rules

* Title cannot be empty.
* Amount must be greater than zero.
* Category selection is required.

---

## Performance Optimizations

* FlatList virtualization
* useMemo optimizations
* Context-based state management
* Component based architecture
* AsyncStorage persistence
* Optimized gesture handling

---

## Known Issues

* Swipe gestures may feel slightly different across Android devices due to platform gesture sensitivity.
* Expo Go and physical devices may handle gestures differently.

---

## Demo Walkthrough

### Step 1

Add a valid expense.

### Step 2

Trigger a validation error by submitting an empty form.

### Step 3

Filter expenses using category tabs.

### Step 4

Swipe left on an expense and delete it.

### Step 5

Open the Summary Screen and verify totals update correctly.

---

## Author

**Sana Batool**

Summer Internship 2026 – Mobile Developer Project
