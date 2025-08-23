import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 },
  supplier: { type: String },
  purchaseDate: { type: Date },
  description: { type: String },
  qrCodeValue: { type: String },  // <- Ye field hona chahiye
}, { timestamps: true });

export default mongoose.model("StockHistory", stockHistorySchema);

