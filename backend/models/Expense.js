// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: Number,
    category: String,
    note: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;