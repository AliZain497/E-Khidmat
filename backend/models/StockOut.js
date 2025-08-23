// models/StockOut.js
import mongoose from "mongoose";

const stockOutSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  customer: { type: String },
  issueDate: { type: Date, default: Date.now },
  description: { type: String },
  qrCodeValue: { type: String }, // For QR scan match (optional but useful)
}, { timestamps: true });

export default mongoose.model("StockOut", stockOutSchema);
