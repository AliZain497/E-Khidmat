import User from "../models/User.js";
import OtpToken from "../models/OtpToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// ============================
// Request OTP (Signup Step 1)
// ============================
export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Remove old OTPs for this email (if any)
    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp, expiresAt });

    await sendEmail(email, "Your Signup OTP", `Your OTP is ${otp}. It will expire in 5 minutes.`);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Request OTP Error:", err);
    res.status(500).json({ message: "Server error while sending OTP" });
  }
};

// ============================
// Resend OTP
// ============================
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp, expiresAt });

    await sendEmail(email, "Your New OTP", `Your new OTP is ${otp}. It will expire in 5 minutes.`);

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ message: "Server error while resending OTP" });
  }
};

// ============================
// Verify OTP & Create User (Signup Step 2)
// ============================
export const verifyOtpAndSignup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const token = await OtpToken.findOne({ email, otp });
    if (!token) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (token.expiresAt < new Date()) {
      await OtpToken.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name, email, passwordHash });

    // Clean up OTP tokens after signup success
    await OtpToken.deleteMany({ email });

    res.json({ message: "Account created successfully. You can login now." });
  } catch (err) {
    console.error("Verify OTP & Signup Error:", err);
    res.status(500).json({ message: "Server error while creating account" });
  }
};

// ============================
// Login
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error while logging in" });
  }
};

// ============================
// Request OTP for Password Reset (Forgot Password Step 1)
// ============================
export const requestPasswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Security: don't reveal user existence
      return res.json({ message: "If this email exists, an OTP has been sent." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp, expiresAt });

    await sendEmail(email, "Your Password Reset OTP", `Your OTP is ${otp}. It will expire in 5 minutes.`);

    res.json({ message: "OTP sent to your email for password reset" });
  } catch (err) {
    console.error("Request Password Reset OTP Error:", err);
    res.status(500).json({ message: "Server error while sending password reset OTP" });
  }
};

// ============================
// Verify OTP & Reset Password (Forgot Password Step 2)
// ============================
export const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const token = await OtpToken.findOne({ email, otp });
    if (!token) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (token.expiresAt < new Date()) {
      await OtpToken.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.passwordHash = passwordHash;

    await user.save();
    await OtpToken.deleteMany({ email });

    res.json({ message: "Password reset successful. You can now login." });
  } catch (err) {
    console.error("Verify OTP & Reset Password Error:", err);
    res.status(500).json({ message: "Server error while resetting password" });
  }
};
