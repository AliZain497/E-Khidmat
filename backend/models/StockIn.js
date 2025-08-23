import mongoose from "mongoose";

const stockInSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: String,
  purchaseDate: Date,
  description: String,
}, { timestamps: true });

export default mongoose.model("StockIn", stockInSchema);
