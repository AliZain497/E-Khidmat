import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api";
import { toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";

export default function StockHistoryPage() {
  const [stockHistory, setStockHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/stock/history");
        setStockHistory(res.data);
      } catch (err) {
        toast.error("Failed to load stock history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const downloadQRCode = (qrValue, productName) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 150;
    canvas.height = 150;

    const tempDiv = document.createElement("div");
    tempDiv.style.position = "fixed";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);

    const svg = (
      <QRCodeSVG value={qrValue} size={150} />
    );

    import('react-dom').then(ReactDOM => {
      import('react').then(React => {
        ReactDOM.render(svg, tempDiv, () => {
          const svgElement = tempDiv.querySelector("svg");
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const img = new Image();
          const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svgBlob);

          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngFile = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngFile;
            link.download = `${productName}_QRCode.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            ReactDOM.unmountComponentAtNode(tempDiv);
            document.body.removeChild(tempDiv);
          };

          img.onerror = () => {
            toast.error("Failed to generate QR code image");
            ReactDOM.unmountComponentAtNode(tempDiv);
            document.body.removeChild(tempDiv);
          };

          img.src = url;
        });
      });
    });
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 sm:ml-[40px]">
        <h1 className="text-2xl font-bold text-primary mb-6">📦 StockIn Products</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : stockHistory.length === 0 ? (
          <p className="text-center text-gray-500">No stock-in records found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockHistory.map((item, index) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold text-primary mb-2">
                  {item.productName}
                </h2>
                <p className="text-gray-700">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                {item.qrCodeValue && (
                  <div className="mt-4">
                    {/* <QRCodeSVG value={item.qrCodeValue} size={100} /> */}
                    <button
                      onClick={() => downloadQRCode(item.qrCodeValue, item.productName)}
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                    >
                      Download QR
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
