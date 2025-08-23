import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../components/EmployeeContext";
import API from "../api"; // ✅ Axios instance

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const { addEmployee } = useContext(EmployeeContext); // global add function

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send data to backend API
      const res = await API.post("/employees", formData);

      // ✅ Add returned employee to context
      addEmployee(res.data);

      toast.success("Employee added successfully! 🎉");

      // Clear form
      setFormData({ name: "", email: "", phone: "", position: "" });

      // Navigate to employee list
      navigate("/employees/list");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add employee ❌"
      );
    }
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Add Employee
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
