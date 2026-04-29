import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function JadwalImage() {
  const [image, setImage] = useState(null); // URL dari backend
  const [preview, setPreview] = useState(null); // preview upload
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ambil gambar dari backend
  const fetchImage = async () => {
    try {
      const res = await api.get("/schedule-image");
      setImage(res.data.image);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  // handle pilih file
  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // upload ke backend
  const handleUpload = async () => {
    if (!file) return alert("Pilih gambar dulu!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await api.post("/schedule-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(res.data.image);
      setPreview(null);
      setFile(null);

      alert("Berhasil upload!");
    } catch (err) {
      console.error(err);
      alert("Upload gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Kelola Gambar Jadwal
      </h2>

      {/* Preview gambar lama */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Gambar Saat Ini:</p>
        {image ? (
          <img
            src={image}
            alt="Jadwal"
            className="w-full rounded-lg border"
          />
        ) : (
          <p className="text-gray-400">Belum ada gambar</p>
        )}
      </div>

      {/* Preview gambar baru */}
      {preview && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Preview Baru:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg border border-blue-400"
          />
        </div>
      )}

      {/* Input file */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />

      {/* Button upload */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Upload / Ganti Gambar"}
      </button>
    </div>
  );
}