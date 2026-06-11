import express from "express";

import {
  getUserAnalytics,
  getAdminAnalytics
} from "../controllers/analyticsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/user",
  authMiddleware,
  getUserAnalytics
);

router.get(
  "/admin",
  authMiddleware,
  getAdminAnalytics
);

export default router;