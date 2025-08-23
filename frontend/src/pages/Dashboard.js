import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      {/* 
        Mobile: no margin-left (sidebar hidden)
        sm aur upar: sidebar width 256px (w-64) ke hisaab se margin-left dena
      */}
      <div className="p-6 sm:ml-[30px] min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
          <h1 className="text-2xl font-bold text-primary mb-6">
            Welcome to Your Dashboard 🎉
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-secondary rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-primary">📦 Manage Stock</h2>
              <p className="text-gray-600 mt-2">Add, update or remove stock items.</p>
            </div>

            <div className="p-6 bg-secondary rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-primary">📊 Reports</h2>
              <p className="text-gray-600 mt-2">View daily, weekly, and monthly reports.</p>
            </div>

            <div className="p-6 bg-secondary rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-primary">👤 Profile</h2>
              <p className="text-gray-600 mt-2">Update your personal details and password.</p>
            </div>

            <div className="p-6 bg-secondary rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-primary">👨‍💼 Employees</h2>
              <p className="text-gray-600 mt-2">Add new employees and view employee records.</p>
            </div>

            <div className="p-6 bg-secondary rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-primary">⚙️ Settings</h2>
              <p className="text-gray-600 mt-2">Configure system preferences and app settings.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
