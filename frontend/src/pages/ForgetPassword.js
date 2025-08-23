import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  const requestOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "OTP sent to your email");
        setOtpSent(true);
        setResendDisabled(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Network error. Try again later.");
    }
  };

  const verifyOtpAndResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      toast.error("Please enter OTP and new password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password: newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset successful");
        // Reset form or redirect to login page
        setEmail("");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Network error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-primary p-5 shadow-md text-white text-center font-bold text-3xl">
        E-Khidmat
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Forgot Password</h2>

          {!otpSent ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={requestOtp}
                disabled={resendDisabled}
                className={`w-full py-3 rounded-md transition ${
                  resendDisabled
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-primary text-white hover:bg-green-800"
                }`}
              >
                {resendDisabled ? `Resend OTP in ${timer}s` : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={verifyOtpAndResetPassword}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-green-800 transition"
              >
                Reset Password
              </button>
              <button
                onClick={requestOtp}
                disabled={resendDisabled}
                className={`w-full mt-3 py-3 rounded-md transition ${
                  resendDisabled
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-primary text-white hover:bg-green-800"
                }`}
              >
                {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
