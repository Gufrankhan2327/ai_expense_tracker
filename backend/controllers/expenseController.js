import Expense from "../models/Expense.js";
import { categorizeExpense } from "../services/aiService.js";

// ➕ Add Expense
export const addExpense = async (req, res) => {
    try {
        let { amount, note } = req.body;

        amount = Number(amount);

        if (isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const category = categorizeExpense(note || "");

        const expense = await Expense.create({
            userId: req.user.id,
            amount,
            note,
            category,
        });

        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📥 Get Expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ Delete
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update
export const updateExpense = async (req, res) => {
    try {
        const { amount, category, note } = req.body;

        const updated = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, category, note },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: "Expense not found" });
        }

        res.json(updated);

    } catch (error) {
        res.status(500).json({ msg: "Update failed", error: error.message });
    }
};