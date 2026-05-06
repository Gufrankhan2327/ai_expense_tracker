import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; 
import expenseRoutes from "./routes/expenseRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/expenses", expenseRoutes);
app.use("/api/profile", profileRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
);