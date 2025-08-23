import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(false); // For cooldown timer
  const [timer, setTimer] = useState(30); // Countdown timer in seconds

  const navigate = useNavigate();
  const location = useLocation();

  // Load signup data from location state or localStorage
  useEffect(() => {
    const data = location.state || JSON.parse(localStorage.getItem("signupData") || "null");

    if (data?.name && data?.email && data?.password) {
      setSignupData(data);
    } else {
      toast.error("Session expired or invalid access. Please sign up again.");
      navigate("/signup");
    }

    setLoading(false);
  }, [location.state, navigate]);

  // Countdown timer for resend button cooldown
  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(30); // reset timer for next time
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  // Resend OTP API call handler
  const handleResendOtp = async () => {
    if (!signupData?.email) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("A new OTP has been sent to your email.");
        setResendDisabled(true);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Network error. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">E Khidmat</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-4 border-primary">
          <h2 className="text-xl font-bold text-center text-primary mb-4">Verify OTP</h2>

          {signupData?.email && (
            <p className="text-center text-gray-600 mb-4">
              OTP has been sent to <span className="font-medium">{signupData.email}</span>
            </p>
          )}

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await fetch("http://localhost:5000/api/auth/signup/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...signupData, otp }),
                });
                const data = await res.json();

                if (res.ok) {
                  toast.success("Account created successfully! Please login.");
                  localStorage.removeItem("signupData");
                  navigate("/login");
                } else {
                  toast.error(data.message || "Invalid OTP");
                }
              } catch {
                toast.error("Network error, try again later.");
              }
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />

            <button
              type="submit"
              disabled={!otp}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
            >
              Verify
            </button>
          </form>

          {/* Resend OTP Button with cooldown */}
          <div className="mt-4 text-center">
            <button
              onClick={handleResendOtp}
              disabled={resendDisabled}
              className={`text-sm font-medium underline ${
                resendDisabled ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-green-800"
              }`}
              aria-disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP in ${timer}s` : "Didn't receive OTP? Resend"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
