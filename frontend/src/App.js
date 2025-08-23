import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./components/EmployeeContext"; // ✅ Import Context
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerify from "./pages/OtpVerify";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployeePage from "./pages/AddEmployee"; // ✅ Updated name
import EmployeeListPage from "./pages/EmployeeList"; // ✅ Updated name
import StockInPage from "./pages/StockIn";
import StockHistory from "./pages/StockInHistory";
import StockOut from "./pages/Stockout";
import StockOutHistory from "./pages/StockOutHistory";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Signup />} />   {/* Default signup */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployeePage />} />
            <Route path="/employees/list" element={<EmployeeListPage />} />
            <Route path="/stock/in" element={<StockInPage />} />
            <Route path="/stockIn/history" element={<StockHistory />} />
            <Route path="/stock/out" element={<StockOut />} />
            <Route path="/stockOut/history" element={<StockOutHistory />} />
          </Routes>

          {/* ToastContainer outside Routes */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
