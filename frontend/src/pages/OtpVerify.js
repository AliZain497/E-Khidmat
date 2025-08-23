import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Signup.js se pura formData pass kiya tha
  const { name, email, password } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully! You can login now.");
        navigate("/login");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Network error, please try again later");
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border-t-4 border-primary">
        <h2 className="text-xl font-bold text-center text-primary mb-4">
          Verify OTP
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
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
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </Layout>
  );
}
