import User from "../models/User.js";
import Expense from "../models/Expense.js";
import { generateAdminInsights } from "../services/insightService.js";

// 👥 Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ msg: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update userRole

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📊 Get analytics
export const getAnalytics = async (req, res) => {
    try {
        const users = await User.find();

        const normalUsers = users.filter(
            user => user.role === "user"
        );

        const totalUsers = normalUsers.length;

        const expenses = await Expense.find();


        const activeUsers = users.filter(
            u => u.role === "user" &&
                u.isActive !== false
        ).length;

        const totalTransactions = expenses.length;

        const totalExpenses = expenses.reduce(
            (sum, e) => sum + Number(e.amount || 0),
            0
        );

        const averagePerUser =
            totalUsers > 0
                ? (totalExpenses / totalUsers).toFixed(2)
                : 0;
        

        const categoryData = {};

        expenses.forEach((e) => {
            categoryData[e.category] =
                (categoryData[e.category] || 0) +
                Number(e.amount || 0);
        });

        const insights =
            generateAdminInsights(expenses);

        res.json({
            TEST: "ADMIN_ANALYTICS_V2",
            totalUsers,
            activeUsers,
            totalTransactions,   
            totalExpenses,
            averagePerUser,      
            expenses,
            categories: categoryData,
            insights,
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

export const getReports = async (req, res) => {
  try {

    const expenses = await Expense.find()
      .populate("userId", "name email role");

    res.json(expenses);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};