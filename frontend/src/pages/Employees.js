import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // ✅ API call karke employees fetch karna hai (abhi dummy data rakha hai)
    setEmployees([
      { id: 1, name: "Ali Khan", role: "Manager", email: "ali@example.com" },
      { id: 2, name: "Sara Ahmed", role: "Accountant", email: "sara@example.com" },
      { id: 3, name: "Bilal Raza", role: "Cashier", email: "bilal@example.com" },
    ]);
  }, []);

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
          <h1 className="text-2xl font-bold text-primary mb-6">👨‍💼 Employees</h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{emp.id}</td>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3">{emp.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
