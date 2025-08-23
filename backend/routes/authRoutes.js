import express from "express";
import { requestOtp, verifyOtpAndSignup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup/request-otp", requestOtp);
router.post("/signup/verify", verifyOtpAndSignup);
router.post("/login", login);
router.get("/login", (req, res) => {
  res.send("✅ Login route is live (GET) - but use POST in actual requests.");
});

export default router;
