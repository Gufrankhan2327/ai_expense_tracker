import Expense from "../models/Expense.js";
import User from "../models/User.js";

// ================= USER ANALYTICS =================

export const getUserAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id,
    });

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const averageExpense =
      expenses.length > 0
        ? (totalExpense / expenses.length).toFixed(2)
        : 0;

    // Category
    const categoryMap = {};

    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) +
        expense.amount;
    });

    const categoryData = Object.entries(
      categoryMap
    ).map(([name, value]) => ({
      name,
      value,
    }));

    // Top Category
    let topCategory = "None";

    if (categoryData.length > 0) {
      topCategory = categoryData.reduce((a, b) =>
        a.value > b.value ? a : b
      ).name;
    }

    // Monthly
    const monthMap = {};

    expenses.forEach((expense) => {
      const month = new Date(
        expense.date
      ).toLocaleString("default", {
        month: "short",
      });

      monthMap[month] =
        (monthMap[month] || 0) +
        expense.amount;
    });

    const monthlyData = Object.entries(
      monthMap
    ).map(([month, expense]) => ({
      month,
      expense,
    }));

    res.json({
      totalExpense,
      totalTransactions: expenses.length,
      averageExpense,
      topCategory,
      categoryData,
      monthlyData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADMIN ANALYTICS =================

export const getAdminAnalytics = async (
  req,
  res
) => {
  try {

    const users = await User.find();
    const expenses = await Expense.find();

    const totalUsers = users.length;

    const totalTransactions =
      expenses.length;

    const totalExpenses =
      expenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );

    const averagePerUser =
      totalUsers > 0
        ? (totalExpenses / totalUsers).toFixed(2)
        : 0;

    const categoryMap = {};

    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) +
        expense.amount;
    });

    res.json({
      totalUsers,
      totalTransactions,
      totalExpenses,
      averagePerUser,
      categories: categoryMap,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};