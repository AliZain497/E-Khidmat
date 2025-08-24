// src/pages/StockIn.js
import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { QRCodeSVG } from 'qrcode.react';

export default function StockInPage() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    supplier: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName.trim() || isNaN(formData.quantity) || formData.quantity <= 0) {
      toast.error("Please provide a valid product name and quantity.");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        qrCodeValue: formData.productName,
      };

      const res = await fetch("http://localhost:5000/stock/in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = null;
      }

      if (!res.ok) {
        toast.error((data && data.message) || "Error adding stock in");
        return;
      }

      toast.success("✅ Stock in added successfully!");
      setQrValue(dataToSend.qrCodeValue);

      setFormData({
        productName: "",
        quantity: "",
        supplier: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        description: "",
      });
    } catch (error) {
      console.error("❌ Stock In error:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center sm:text-left">
          ➕ Stock In
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-full mx-auto space-y-6 sm:space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              min="1"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Supplier Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition-colors duration-300"
          >
            Add Stock
          </button>
        </form>

        {qrValue && (
          <div className="mt-10 text-center sm:text-left max-w-md mx-auto sm:mx-0">
            <h2 className="text-xl font-semibold mb-4">📦 QR Code for: {qrValue}</h2>
            <div className="inline-block bg-white p-4 rounded-lg shadow-lg">
              <QRCodeSVG value={qrValue} size={180} />
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Scan this QR code during stock-out for quick reference.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
