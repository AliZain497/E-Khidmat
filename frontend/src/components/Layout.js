import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar for desktop */}
      {localStorage.getItem("token") && (
        <aside className="hidden sm:flex sm:flex-col fixed top-0 left-0 w-64 h-full bg-primary text-white z-30">
          <Sidebar />
        </aside>
      )}

      {/* Overlay sidebar for mobile */}
      {isOpen && localStorage.getItem("token") && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <aside className="fixed top-0 left-0 w-64 h-full bg-primary text-white z-50 p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close Sidebar"
            >
              <X size={28} />
            </button>
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main content wrapper */}
      <main
        className={`
          flex-1
          pt-4 px-4 pb-8
          sm:ml-64
          transition-all duration-300
          min-h-screen
          flex flex-col
        `}
      >
        {/* Mobile topbar */}
        {localStorage.getItem("token") && (
          <header className="sm:hidden flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Sidebar"
              className="text-primary"
            >
              <Menu size={28} />
            </button>
          </header>
        )}

        {/* Content */}
        <div className="flex-grow">{children}</div>
      </main>
    </div>
  );
}
