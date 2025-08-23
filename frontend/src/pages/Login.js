import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api"; // ✅ Axios instance with baseURL

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      toast.success(`Welcome, ${user.name}!`);

      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Try again.";
      toast.error(errorMsg);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <header className="bg-primary text-white p-4 shadow">
        <h1 className="text-2xl font-bold text-center">E-Khidmat</h1>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-4 border-primary">
          <h2 className="text-xl font-bold text-center text-primary mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
