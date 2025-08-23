import User from "../models/User.js";
import OtpToken from "../models/OtpToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// ============================
// Request OTP (Signup Step 1)
// ============================
export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // already registered check
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // clear old OTPs
    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp, expiresAt });

    // send email
    await sendEmail(email, "Your Signup OTP", `Your OTP is ${otp}. It will expire in 5 minutes.`);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error while sending OTP" });
  }
};

// ============================
// Verify OTP & Create User (Signup Step 2)
// ============================
export const verifyOtpAndSignup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // verify OTP
    const token = await OtpToken.findOne({ email, otp });
    if (!token) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (token.expiresAt < new Date()) {
      await OtpToken.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    // check if user already exists (double safety)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // create user
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name, email, passwordHash });

    // clear OTP
    await OtpToken.deleteMany({ email });

    res.json({ message: "Account created successfully. You can login now." });
  } catch (err) {
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
    res.status(500).json({ message: "Server error while logging in" });
  }
};
