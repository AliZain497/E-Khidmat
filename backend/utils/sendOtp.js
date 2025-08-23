// utils/sendOtp.js
import nodemailer from "nodemailer";

export const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail or service email
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"E Khidmat" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for E Khidmat Signup",
    text: `Your OTP is: ${otp}`,
  });
};
