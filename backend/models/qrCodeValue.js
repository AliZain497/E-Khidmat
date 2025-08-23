import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 },
  supplier: { type: String },            // agar pehle nahi tha to add karlo
  purchaseDate: { type: Date },
  description: { type: String },
  qrCodeValue: { type: String },         // <--- ye line add karni hai
}, { timestamps: true });

export default mongoose.model("StockHistory", stockHistorySchema);
