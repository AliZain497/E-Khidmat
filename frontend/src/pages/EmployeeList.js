import { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import { EmployeeContext } from "../components/EmployeeContext";
import API from "../api";
import { toast } from "react-toastify";

export default function EmployeeListPage() {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch employees ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  return (
    <Layout>
      <div className="p-4 sm:p-6 sm:ml-[30px]">
        <h1 className="text-xl sm:text-2xl font-bold text-primary mb-6">
          👨‍💼 Employee List
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 mt-10">Loading...</p>
        ) : employees.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No employees added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp, idx) => (
              <div
                key={emp._id || idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-l-4 border-primary"
              >
                <h2 className="text-lg font-semibold text-primary">{emp.name}</h2>
                <p className="text-gray-700 mt-1">
                  <strong>Email:</strong> {emp.email}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Phone:</strong> {emp.phone}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Position:</strong> {emp.position}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
