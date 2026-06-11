import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

//  CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend.vercel.app"
    ],
    credentials: true
}));

//  Middleware
app.use(express.json());

//  Test route
app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);

//  Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Server Error" });
});

//  DB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

//  Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on ${PORT}`)
);