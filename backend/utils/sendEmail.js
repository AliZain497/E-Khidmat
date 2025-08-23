import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Citizen Services" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text
  });
};

export default sendEmail;   // <-- yahan default export hona chahiye
