import express from "express";

const router = express.Router();

import {
    getUsers,
    getAnalytics,
    deleteUser,
    updateUserRole,
    getReports
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// 🔐 Admin only routes
router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);

router.get("/analytics", authMiddleware, roleMiddleware("admin"), getAnalytics);
router.get("/reports" , authMiddleware, roleMiddleware("admin"), getReports);

router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

router.put("/users/:id", authMiddleware, roleMiddleware("admin"), updateUserRole);

export default router; 