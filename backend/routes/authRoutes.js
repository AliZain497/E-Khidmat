import express from "express";
import {
  requestOtp,
  resendOtp,
  verifyOtpAndSignup,
  login,
  requestPasswordResetOtp,
  verifyOtpAndResetPassword,
} from "../controllers/authController.js";

const router = express.Router();

//
// ========== Signup Routes ==========
//
router.post("/signup/request-otp", requestOtp);
router.post("/signup/resend-otp", resendOtp);
router.post("/signup/verify", verifyOtpAndSignup);

//
// ========== Login Route ==========
//
router.post("/login", login);

//
// ========== Forgot Password (OTP based) ==========
//
router.post("/forgot-password/request-otp", requestPasswordResetOtp);

router.post("/forgot-password/verify", verifyOtpAndResetPassword);

//
// ========== Health Check Route ==========
//
router.get("/login", (req, res) => {
  res.send("✅ Login route is live (GET) - but use POST for actual login.");
});

export default router;
