// controllers/stockControllers.js

import StockIn from "../models/StockIn.js";
import StockOut from "../models/StockOut.js";
import StockHistory from "../models/StockHistory.js";


// 📦 Get All StockIn History
export const getStockHistory = async (req, res) => {
  try {
    const history = await StockHistory.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("❌ Failed to fetch stock history:", err);
    res.status(500).json({ message: "Failed to fetch stock history" });
  }
};


// ➕ Add StockIn Entry
export const addStock = async (req, res) => {
  try {
    const {
      productName,
      quantity,
      supplier,
      purchaseDate,
      description,
      qrCodeValue,
    } = req.body;

    if (!productName || !quantity || isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "Invalid product name or quantity" });
    }

    // 1. Save in StockIn
    const newStockIn = new StockIn({
      productName,
      quantity: Number(quantity),
      supplier,
      purchaseDate,
      description,
      qrCodeValue,
    });

    await newStockIn.save();
    console.log("✅ StockIn record saved:", newStockIn);

    // 2. Update/create StockHistory
    const existingHistory = await StockHistory.findOne({ productName });

    if (existingHistory) {
      existingHistory.quantity += Number(quantity);
      existingHistory.qrCodeValue = qrCodeValue;
      await existingHistory.save();
      console.log("✅ Updated StockHistory:", existingHistory);
    } else {
      const newHistory = new StockHistory({
        productName,
        quantity: Number(quantity),
        qrCodeValue,
      });
      await newHistory.save();
      console.log("✅ Created new StockHistory:", newHistory);
    }

    res.status(201).json({ message: "Stock added successfully" });
  } catch (error) {
    console.error("❌ Error in addStock:", error);
    res.status(500).json({ message: "Failed to add stock" });
  }
};


// ➖ Add StockOut Entry
export const addStockOut = async (req, res) => {
  try {
    const {
      productName,
      quantity,
      receiver,
      issueDate,
      description,
      qrCodeValue,
    } = req.body;

    if (!productName || !quantity || isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "Invalid product name or quantity" });
    }

    // 1. Create new StockOut record
    const newStockOut = new StockOut({
      productName,
      quantity: Number(quantity),
      receiver,
      issueDate,
      description,
      qrCodeValue,
    });

    await newStockOut.save();
    console.log("✅ StockOut record saved:", newStockOut);

    // 2. Decrease quantity from StockHistory
    const existingHistory = await StockHistory.findOne({ productName });

    if (!existingHistory) {
      return res
        .status(404)
        .json({ message: "Product not found in stock history" });
    }

    if (existingHistory.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient stock for this product" });
    }

    existingHistory.quantity -= Number(quantity);
    await existingHistory.save();
    console.log("✅ StockHistory updated after stock-out:", existingHistory);

    res.status(201).json({ message: "Stock out successful" });
  } catch (error) {
    console.error("❌ Error in addStockOut:", error);
    res.status(500).json({ message: "Failed to perform stock out" });
  }
};


// 📋 Get All StockOut History
export const getStockOutHistory = async (req, res) => {
  try {
    const outHistory = await StockOut.find().sort({ createdAt: -1 });
    res.json(outHistory);
  } catch (err) {
    console.error("❌ Failed to fetch stock-out history:", err);
    res.status(500).json({ message: "Failed to fetch stock-out history" });
  }
};
