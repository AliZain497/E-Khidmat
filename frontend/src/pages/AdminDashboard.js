import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6 text-green-800">Admin Dashboard</h1>
        <nav className="flex flex-col space-y-4">
          <a
            href="/admin/sliders"
            className="text-green-700 font-semibold hover:underline"
          >
            Manage Sliders
          </a>
          {/* Add more links here for other admin modules */}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
