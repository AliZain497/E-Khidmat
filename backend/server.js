import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.js";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'https://e-khidmat.vercel.app',
  'http://localhost:3000',
  /^https:\/\/e-khidmat.*\.vercel\.app$/  // ✅ Optional: allow all vercel preview deployments
];

// ✅ CORS Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl

    const isAllowed = allowedOrigins.some(o => {
      if (typeof o === 'string') return o === origin;
      if (o instanceof RegExp) return o.test(origin);
      return false;
    });

    if (!isAllowed) {
      const msg = `🚫 CORS blocked request from origin: ${origin}`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ ROUTES (changed /api/auth to /auth to match frontend)
app.use("/employees", employeeRoutes);
app.use("/auth", authRoutes); // 🔥 This is the key change!
app.use("/api/auth", authRoutes);

console.log("📦 Registering stock routes...");

app.use("/stock", stockRoutes);

app.get("/", (req, res) => {
  res.send("E-Khidmat backend is running 🚀");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});