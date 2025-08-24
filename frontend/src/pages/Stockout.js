import { useState, useRef, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { Html5Qrcode } from "html5-qrcode";
import jsQR from "jsqr";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function StockOutPage() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    receiver: "",
    issueDate: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [scanning, setScanning] = useState(false);
  const [cameraRequested, setCameraRequested] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(false);

  const html5QrCodeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setFormData((prev) => ({ ...prev, productName: code.data }));
          toast.success(`QR Code decoded from image: ${code.data}`);
        } else {
          toast.error("No QR code found in the image");
        }
      };
      img.onerror = () => {
        toast.error("Failed to load the image");
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const toggleScanner = useCallback(() => {
    if (scanning) {
      html5QrCodeRef.current
        ?.stop()
        .then(() => html5QrCodeRef.current.clear())
        .catch(() => {})
        .finally(() => {
          html5QrCodeRef.current = null;
          setScanning(false);
        });
    } else {
      setScanning(true);
    }
  }, [scanning]);

  useEffect(() => {
    if (!scanning) return;

    setCameraRequested(false);
    setPermissionDenied(false);

    const qrCodeRegionId = "qr-reader";
    const config = { fps: 10, qrbox: 250 };
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    html5QrCodeRef.current = html5QrCode;

    const onScanSuccess = (decodedText) => {
      setFormData((prev) => ({ ...prev, productName: decodedText }));
      toast.success(`QR Code Scanned: ${decodedText}`);
      toggleScanner();
    };

    const checkCameraPermission = async () => {
      try {
        setCameraRequested(true);
        await navigator.mediaDevices.getUserMedia({ video: true });
        html5QrCode
          .start({ facingMode: "environment" }, config, onScanSuccess)
          .catch((err) => {
            toast.error("Failed to start scanning: " + err);
            setScanning(false);
          });
      } catch (err) {
        setPermissionDenied(true);
        setScanning(false);
        toast.error("Camera permission denied");
      }
    };

    checkCameraPermission();

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
      html5QrCodeRef.current?.clear().catch(() => {});
      html5QrCodeRef.current = null;
    };
  }, [scanning, toggleScanner]);

  useEffect(() => {
    if (!scanning) {
      const input = document.querySelector('input[name="productName"]');
      if (input) input.focus();
    }
  }, [scanning]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity || formData.quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/stock/out`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          qrCodeValue: formData.productName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error during stock out");
        setLoading(false);
        return;
      }

      toast.success("✅ Stock out successful");

      setFormData({
        productName: "",
        quantity: "",
        receiver: "",
        issueDate: new Date().toISOString().split("T")[0],
        description: "",
      });
    } catch (error) {
      console.error("❌ Stock Out error:", error);
      toast.error("Network error");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-6">📤 Stock Out</h1>

          <button
            type="button"
            onClick={toggleScanner}
            className={`mb-4 w-full py-3 rounded-lg ${
              scanning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {scanning ? "Stop Scanning" : "Scan QR Code"}
          </button>

          {scanning && (
            <div
              id="qr-reader"
              className="mb-4 rounded-lg shadow-lg overflow-hidden relative"
              style={{ width: "100%", minHeight: 300 }}
            >
              {!cameraRequested && (
                <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center z-10 text-center px-4">
                  Requesting camera access...
                </div>
              )}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-sm z-10">
                📷 Align QR code inside the frame
              </div>
            </div>
          )}

          {permissionDenied && (
            <div className="text-red-600 mb-4 font-semibold">
              Camera access denied. Please enable camera permission in your
              browser.
            </div>
          )}

          {!scanning && (
            <div className="mb-4">
              <label
                htmlFor="qr-upload"
                className="block mb-1 font-semibold text-primary"
              >
                Or upload an image with QR code
              </label>
              <input
                type="file"
                accept="image/*"
                id="qr-upload"
                onChange={handleFileChange}
                className="w-full"
                disabled={loading}
              />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-4"
          >
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg"
              required
              autoComplete="off"
              disabled={loading}
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full p-3 border rounded-lg"
              min={1}
              required
              disabled={loading}
            />
            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              placeholder="Receiver"
              className="w-full p-3 border rounded-lg"
              autoComplete="off"
              disabled={loading}
            />
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              disabled={loading}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="w-full p-3 border rounded-lg"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Stock Out"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
