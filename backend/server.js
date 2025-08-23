import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.js";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware - CORS with frontend domain allowed
app.use(cors({
  origin: 'https://e-khidmat.vercel.app',  // tumhara frontend domain
  credentials: true, // agar cookies/session use kar rahe ho to, nahi to hata bhi sakte ho
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("E-Khidmat backend is running 🚀");
});

// ✅ Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
