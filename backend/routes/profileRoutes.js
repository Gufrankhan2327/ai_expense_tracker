import express from "express";
const router = express.Router();

import {
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

// 🔐 Protected
router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);

export default router;