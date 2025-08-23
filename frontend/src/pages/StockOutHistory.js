import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api";
import { toast } from "react-toastify";

export default function StockOutHistoryPage() {
  const [stockOutHistory, setStockOutHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockOutHistory = async () => {
      try {
        const res = await API.get("/stock/out/history"); // Make sure your backend route is correct
        setStockOutHistory(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch stock out history ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchStockOutHistory();
  }, []);

  return (
    <Layout>
      <div className="p-6 sm:ml-[35px]">
        <h1 className="text-2xl font-bold text-primary mb-6">📤 Stock Out History</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : stockOutHistory.length === 0 ? (
          <p className="text-center text-gray-500">No stock out records found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockOutHistory.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white rounded-xl shadow p-6 border-l-4 border-primary hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-primary mb-2">{item.productName}</h2>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Receiver:</strong> {item.receiver || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(item.issueDate || item.createdAt).toLocaleString()}
                </p>
                {item.description && (
                  <p className="text-gray-600 mt-2 italic">
                    "{item.description}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
