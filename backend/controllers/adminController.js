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
        const expenses = await Expense.find();

        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.isActive !== false).length;

        const totalExpenses = expenses.reduce(
            (sum, e) => sum + e.amount,
            0
        );

        const categoryData = {};
        expenses.forEach((e) => {
            categoryData[e.category] =
                (categoryData[e.category] || 0) + e.amount;
        });

        const insights = generateAdminInsights(expenses);

        res.json({
            totalUsers,
            activeUsers,
            totalExpenses,

            // IMPORTANT
            expenses,

            categories: categoryData,

            insights
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};