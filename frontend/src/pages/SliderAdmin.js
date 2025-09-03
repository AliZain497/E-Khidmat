import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialogue'; // Adjust path if needed

export default function UploadSliderImage() {
  const [file, setFile] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sliders');
      setSliders(res.data);
    } catch (err) {
      console.error('Failed to fetch sliders:', err);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.warn("Please select an image!");

    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData);
      const uploadedImageUrl = uploadRes.data.imageUrl;

      await axios.post('http://localhost:5000/api/sliders', {
        imageUrl: uploadedImageUrl
      });

      toast.success("Image uploaded successfully!");
      setFile(null);
      fetchSliders();
    } catch (err) {
      toast.error("Upload failed!");
      console.error(err);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({
      open: true,
      id: id
    });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/sliders/${confirmDialog.id}`);
      toast.success("Deleted successfully!");
      fetchSliders();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed.");
    } finally {
      setConfirmDialog({ open: false, id: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📷 Manage Slider Images</h2>

        {/* Upload Section */}
        <div className="border-dashed border-2 border-gray-400 p-6 rounded-lg bg-gray-50 flex flex-col items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow transition-all duration-200"
          >
            <FaUpload /> Upload Image
          </button>
        </div>

        {/* Image Gallery */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🖼 Uploaded Images</h3>

          {sliders.length === 0 ? (
            <p className="text-gray-500">No images uploaded yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {sliders.map((slider) => (
                <div
                  key={slider._id}
                  className="relative bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 overflow-hidden group"
                >
                  <img
                    src={slider.imageUrl}
                    alt="Slider"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteClick(slider._id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition"
                    title="Delete Image"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        onClose={() => setConfirmDialog({ open: false, id: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
