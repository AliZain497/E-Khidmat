// routes/stockRoutes.js

import express from "express";
import {
  addStock,             // For stock-in
  getStockHistory,      // For stock-in history
  addStockOut,          // For stock-out
  getStockOutHistory,   // For stock-out history ✅
} from "../controllers/stockControllers.js";

const router = express.Router();

// 🔵 Stock In Routes
router.post("/in", addStock);
router.get("/history", getStockHistory);

// 🔴 Stock Out Routes
router.post("/out", addStockOut);
router.get("/out/history", getStockOutHistory); // ✅ GET all stock-out records

export default router;
