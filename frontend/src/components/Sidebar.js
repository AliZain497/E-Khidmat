import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [stockOpen, setStockOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out! 👋");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-[300px] h-screen bg-primary text-white p-6 overflow-y-auto flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">MC MAMUNKANJAN</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
          >
            🏠 Dashboard
          </Link>

          {/* Employees Dropdown */}
          <div>
            <button
              onClick={() => setEmployeeOpen(!employeeOpen)}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
            >
              <span>👨‍💼 Employees</span>
              {employeeOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {employeeOpen && (
              <div className="ml-6 mt-2 space-y-2 text-sm">
                <Link
                  to="/employees/add"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  ➕ Add Employee
                </Link>
                <Link
                  to="/employees/list"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  📋 Employee Data
                </Link>
              </div>
            )}
          </div>

          {/* Stock Dropdown */}
          <div>
            <button
              onClick={() => setStockOpen(!stockOpen)}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
            >
              <span>📦 Manage Stock</span>
              {stockOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {stockOpen && (
              <div className="ml-6 mt-2 space-y-2 text-sm">
                <Link
                  to="/stock/in"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  ➕ Stock In
                </Link>
                <Link
                  to="/stock/out"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  ➖ Stock Out
                </Link>
                <Link
                  to="/stockIn/history"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  📜 StockIn History
                </Link>
                <Link
                  to="/stockOut/history"
                  className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
                >
                  📜 StockOut History
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/reports"
            className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
          >
            📊 Reports
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
          >
            👤 Profile
          </Link>
          <Link
            to="/settings"
            className="block px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:scale-105"
          >
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-red-600 hover:scale-105"
      >
        🚪 Logout
      </button>
    </div>
  );
}
