import express from "express";
const router = express.Router();

import {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense   // ✅ NEW
} from "../controllers/expenseController.js";

import authMiddleware from "../middleware/authMiddleware.js";

// 🔐 Protected Routes

// ➕ Add
router.post("/add", authMiddleware, addExpense);

// 📥 Get All
router.get("/", authMiddleware, getExpenses);

// ✏️ Update (NEW)
router.put("/:id", authMiddleware, updateExpense);

// ❌ Delete
router.delete("/:id", authMiddleware, deleteExpense);

export default router;