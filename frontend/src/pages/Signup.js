import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }), // Only email for OTP
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Signup successful. Navigating with data:", formData);
        toast.success("OTP sent to your email!");
        
        // ✅ Save formData temporarily in localStorage (in case of refresh)
        // localStorage.setItem("signupData", JSON.stringify(formData));
        localStorage.setItem("signupData", JSON.stringify(formData));


        // ✅ Navigate to OTP verification page with state
        navigate("/otp/verify", { state: formData });
      } else {
        toast.error(data.message || "Error sending OTP");
      }
    } catch (err) {
      toast.error("Network error, please try again later");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <div className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">E Khidmat</h1>
      </div>

      {/* Signup form container */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-4 border-primary">
          <h2 className="text-xl font-bold text-center text-primary mb-4">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
